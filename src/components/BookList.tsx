import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Save, X, AlertCircle, Loader2 } from 'lucide-react';

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
  const persistRoot = localStorage.getItem('persist:root');
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
  const [error, setError] = useState<string | null>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/books");
      const data = await response.json();

      if (data && Array.isArray(data.data)) {
        setBooks(data.data);
      } else {
        console.error("API response does not contain a valid 'data' array:", data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleEdit = (book: Book) => {
    setEditingBook(book);
  };

  const handleUpdate = async (book: Book) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      setError('Authentication token not found. Please log in again.');
      return;
    }

    setUpdatingId(book._id);
    try {
      const response = await fetch(`http://localhost:5000/api/books/${book._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error('Failed to update book');
      }

      setBooks(books.map(b => b._id === book._id ? book : b));
      setEditingBook(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while updating');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (bookId: string) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      setError('Authentication token not found. Please log in again.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this book?')) {
      return;
    }

    setDeletingId(bookId);
    try {
      const response = await fetch(`http://localhost:5000/api/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete book');
      }

      setBooks(books.filter(book => book._id !== bookId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while deleting');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full border-t-4 border-indigo-600 w-16 h-16"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-[#393280] text-5xl py-6 flex items-center gap-4">Book Management</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map(book => (
          <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Book Image */}
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              {book.image ? (
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-gray-400">No image available</div>
              )}
            </div>

            {/* Book Details */}
            <div className="p-4">
              {editingBook?._id === book._id ? (
                // Edit Form
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editingBook.title}
                    onChange={e => setEditingBook({ ...editingBook, title: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    value={editingBook.author}
                    onChange={e => setEditingBook({ ...editingBook, author: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Author"
                  />
                  <input
                    type="number"
                    value={editingBook.price}
                    onChange={e => setEditingBook({ ...editingBook, price: parseFloat(e.target.value) })}
                    className="w-full p-2 border rounded"
                    placeholder="Price"
                    step="0.01"
                  />
                  <select
                    value={editingBook.category}
                    onChange={e => setEditingBook({ ...editingBook, category: e.target.value })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Science">Science</option>
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                  </select>
                  <textarea
                    value={editingBook.description}
                    onChange={e => setEditingBook({ ...editingBook, description: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Description"
                    rows={3}
                  />
                  <input
                    type="number"
                    value={editingBook.quantity}
                    onChange={e => setEditingBook({ ...editingBook, quantity: parseInt(e.target.value) })}
                    className="w-full p-2 border rounded"
                    placeholder="Quantity"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingBook(null)}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleUpdate(editingBook)}
                      disabled={updatingId === book._id}
                      className="px-3 py-1 text-green-600 hover:text-green-800"
                    >
                      {updatingId === book._id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Save className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                // Display View
                <>
                  <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-1">By {book.author}</p>
                  <p className="text-indigo-600 font-semibold mb-2">${book.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mb-2">{book.category}</p>
                  <p className="text-sm text-gray-600 mb-2">{book.description}</p>
                  <p className="text-sm text-gray-600">Stock: {book.quantity}</p>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(book)}
                      className="p-2 text-indigo-600 hover:text-indigo-800"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      disabled={deletingId === book._id}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      {deletingId === book._id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}