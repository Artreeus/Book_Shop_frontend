import  { useState, useEffect } from "react";
import { Ban, UserCheck, AlertCircle, Users, Loader2 } from "lucide-react";
import Loader from "../shared-component/Loader";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "Blocked";
  createdAt: string;
}

const getAccessToken = () => {
  const persistRoot = localStorage.getItem("persist:root");
  if (persistRoot) {
    const { auth } = JSON.parse(persistRoot);
    const { accessToken } = JSON.parse(auth);
    return accessToken;
  }
  return null;
};

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchUsers = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      setError("Authentication token not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://bookshopbd-backend.vercel.app/api/users/all",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateStatus = async (
    userId: string,
    newStatus: "user" | "Blocked"
  ) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      setError("Authentication token not found. Please log in again.");
      return;
    }

    setUpdatingUserId(userId);
    try {
      const response = await fetch(
        `https://bookshopbd-backend.vercel.app/api/users/${userId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user status");
      }

      const { data } = await response.json();
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, role: data.role } : user
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update user status"
      );
    } finally {
      setUpdatingUserId(null);
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  // Reset to page 1 if users data changes and currentPage would be invalid
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [users, currentPage, totalPages]);

  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1) return;
    if (pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-[#393280] text-5xl py-6 flex items-center gap-4">
          <Users className="w-8 h-8" />
          User Management
        </h1>
        <p className="text-gray-600 mt-2">
          Manage user accounts and their access status
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Email
              </th>
              <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Joined
              </th>
              <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                  </div>
                </td>
                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === "Blocked"
                        ? "bg-red-100 text-red-800"
                        : user.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm">
                  {user.role !== "admin" && (
                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          user._id,
                          user.role === "Blocked" ? "user" : "Blocked"
                        )
                      }
                      disabled={updatingUserId === user._id}
                      className={`inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-md text-sm font-medium ${
                        user.role === "Blocked"
                          ? "text-green-700 bg-green-50 hover:bg-green-100"
                          : "text-red-700 bg-red-50 hover:bg-red-100"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {updatingUserId === user._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : user.role === "Blocked" ? (
                        <>
                          <UserCheck className="w-4 h-4 sm:mr-1" />
                          <span className="hidden sm:inline">Unblock</span>
                        </>
                      ) : (
                        <>
                          <Ban className="w-4 h-4 sm:mr-1" />
                          <span className="hidden sm:inline">Block</span>
                        </>
                      )}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center items-center gap-3 text-gray-700 select-none">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md border border-gray-300 hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => goToPage(pageNum)}
            className={`px-4 py-2 rounded-md border border-gray-300 hover:bg-purple-100 ${
              pageNum === currentPage ? "bg-purple-600 text-white border-purple-600" : ""
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-md border border-gray-300 hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
