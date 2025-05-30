import { useState, useEffect } from "react";
import { 
  Pencil, Trash2, Save, X, AlertCircle, Loader2, BookOpenCheck,
  Search,  ChevronUp, ChevronDown,  AlertTriangle
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  image?: string;
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

export function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Book | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        "https://bookshopbd-backend.vercel.app/api/books"
      );
      const data = await response.json();

      if (data && Array.isArray(data.data)) {
        setBooks(data.data);
        toast.success("Books loaded successfully!");
      } else {
        console.error(
          "API response does not contain a valid 'data' array:",
          data
        );
        toast.error("Failed to load books.");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("An error occurred while fetching books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSort = (field: keyof Book) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook({ ...book });
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    if (!editingBook) return;

    const accessToken = getAccessToken();
    if (!accessToken) {
      toast.error("Authentication token not found. Please log in again.");
      return;
    }

    setUpdatingId(editingBook._id);
    try {
      const response = await fetch(
        `https://bookshopbd-backend.vercel.app/api/books/${editingBook._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(editingBook),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update book");
      }

      setBooks(books.map((b) => (b._id === editingBook._id ? editingBook : b)));
      setShowEditModal(false);
      setEditingBook(null);
      toast.success("Book updated successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred while updating";
      toast.error(errorMessage);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deletingBook) return;

    const accessToken = getAccessToken();
    if (!accessToken) {
      toast.error("Authentication token not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `https://bookshopbd-backend.vercel.app/api/books/${deletingBook._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      setBooks(books.filter((book) => book._id !== deletingBook._id));
      setShowDeleteModal(false);
      setDeletingBook(null);
      toast.success("Book deleted successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred while deleting";
      toast.error(errorMessage);
    }
  };

  // Filter books based on search
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filtered books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = sortedBooks.slice(startIndex, endIndex);

  // Reset page to 1 if searchTerm changes and current page would be invalid
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortField, sortOrder]);

  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1) return;
    if (pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full border-t-4 border-purple-600 w-16 h-16"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
              <BookOpenCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Book Management
            </h1>
          </div>
        </motion.div>

        {error && (
          <motion.div 
            className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-2 text-red-700"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </motion.div>
        )}

        {/* Search Bar */}
        <motion.div 
          className="mb-6 bg-white rounded-xl shadow-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title, author, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
            />
          </div>
        </motion.div>

        {/* Table */}
        <motion.div 
          className="bg-white rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-1">
                      Image
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => handleSort("title")}
                  >
                    <div className="flex items-center gap-1">
                      Title
                      {sortField === "title" && (
                        sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => handleSort("author")}
                  >
                    <div className="flex items-center gap-1">
                      Author
                      {sortField === "author" && (
                        sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => handleSort("price")}
                  >
                    <div className="flex items-center gap-1">
                      Price
                      {sortField === "price" && (
                        sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th 
                    className="px-6 py-4 text-left cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => handleSort("quantity")}
                  >
                    <div className="flex items-center gap-1">
                      Stock
                      {sortField === "quantity" && (
                        sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentBooks.map((book, index) => (
                  <motion.tr 
                    key={book._id}
                    className="hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4">
                      <div className="w-16 h-20 bg-gray-200 rounded-lg overflow-hidden">
                        {book.image ? (
                          <img
                            src={book.image}
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <BookOpenCheck className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{book.title}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{book.author}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-purple-600">
                        ${book.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {book.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        book.quantity > 10 
                          ? 'bg-green-100 text-green-700' 
                          : book.quantity > 0 
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}>
                        {book.quantity} units
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(book)}
                          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setDeletingBook(book);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-center items-center gap-3 text-gray-700 select-none">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md border border-gray-300 hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              className={`px-4 py-2 rounded-md border border-gray-300 hover:bg-purple-100 ${
                pageNum === currentPage
                  ? "bg-purple-600 text-white border-purple-600"
                  : ""
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md border border-gray-300 hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Next
          </button>
        </div>

        {/* Edit Modal */}
        <AnimatePresence>
          {showEditModal && editingBook && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setShowEditModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Edit Book</h2>
                    <button
                      onClick={() => setShowEditModal(false)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={editingBook.title}
                        onChange={(e) =>
                          setEditingBook({ ...editingBook, title: e.target.value })
                        }
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Author
                      </label>
                      <input
                        type="text"
                        value={editingBook.author}
                        onChange={(e) =>
                          setEditingBook({ ...editingBook, author: e.target.value })
                        }
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price
                      </label>
                      <input
                        type="number"
                        value={editingBook.price}
                        onChange={(e) =>
                          setEditingBook({
                            ...editingBook,
                            price: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={editingBook.category}
                        onChange={(e) =>
                          setEditingBook({
                            ...editingBook,
                            category: e.target.value,
                          })
                        }
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                      >
                        <option value="Fiction">Fiction</option>
                        <option value="Religious">Religious</option>
                        <option value="Science">Science</option>
                        <option value="SelfDevelopment">Self Development</option>
                        <option value="Poetry">Poetry</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        value={editingBook.quantity}
                        onChange={(e) =>
                          setEditingBook({
                            ...editingBook,
                            quantity: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={editingBook.image || ""}
                        onChange={(e) =>
                          setEditingBook({ ...editingBook, image: e.target.value })
                        }
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={editingBook.description}
                      onChange={(e) =>
                        setEditingBook({
                          ...editingBook,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                      rows={4}
                    />
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={updatingId === editingBook._id}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center gap-2"
                  >
                    {updatingId === editingBook._id ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && deletingBook && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setShowDeleteModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
                    Delete Book?
                  </h3>
                  <p className="text-center text-gray-600 mb-6">
                    Are you sure you want to delete "<span className="font-semibold">{deletingBook.title}</span>"? 
                    This action cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete Book
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
