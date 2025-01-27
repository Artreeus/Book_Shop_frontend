import React, { useState, useEffect } from 'react';
import { Ban, UserCheck, AlertCircle, Loader2, Users } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'Blocked';
  createdAt: string;
}

const getAccessToken = () => {
  const persistRoot = localStorage.getItem('persist:root');
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

  const fetchUsers = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      setError('Authentication token not found. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/all', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateStatus = async (userId: string, newStatus: 'user' | 'Blocked') => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      setError('Authentication token not found. Please log in again.');
      return;
    }

    setUpdatingUserId(userId);
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }

      const { data } = await response.json();
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: data.role } : user
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user status');
    } finally {
      setUpdatingUserId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Users className="w-8 h-8" />
          User Management
        </h2>
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

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {user.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.role === 'Blocked' 
                      ? 'bg-red-100 text-red-800'
                      : user.role === 'admin'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {user.role !== 'admin' && (
                    <button
                      onClick={() => handleUpdateStatus(
                        user._id, 
                        user.role === 'Blocked' ? 'user' : 'Blocked'
                      )}
                      disabled={updatingUserId === user._id}
                      className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                        user.role === 'Blocked'
                          ? 'text-green-700 bg-green-50 hover:bg-green-100'
                          : 'text-red-700 bg-red-50 hover:bg-red-100'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {updatingUserId === user._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : user.role === 'Blocked' ? (
                        <>
                          <UserCheck className="w-4 h-4 mr-1" />
                          Unblock
                        </>
                      ) : (
                        <>
                          <Ban className="w-4 h-4 mr-1" />
                          Block
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
    </div>
  );
}