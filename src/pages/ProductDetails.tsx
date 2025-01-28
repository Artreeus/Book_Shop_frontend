import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, AlertCircle, Loader2, ArrowLeft } from "lucide-react";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  description: string;
  quantity: number;
}

export function ProductDetails() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://bookshopbd-backend.vercel.app/api/books/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const result = await response.json();
        if (result.success && result.data) {
          setBook(result.data);
        } else {
          throw new Error("Book not found");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderQuantity(parseInt(e.target.value));
  };

  const handleBuyNow = () => {
    if (book) {
      navigate("/checkout", {
        state: {
          book: {
            ...book,
            orderQuantity,
          },
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto bg-red-50 rounded-lg p-6 text-red-700 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <p>{error || "Book not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Books
      </button>

      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden md:flex">
        <div className="md:w-1/2 p-8">
          <img
            src={
              book.image || "https://via.placeholder.com/400x600?text=No+Image"
            }
            alt={book.title}
            className="w-full h-[500px] object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="md:w-1/2 p-8 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
            <p className="text-lg text-gray-600">by {book.author}</p>
            <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
              {book.category}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Description</h2>
            <p className="text-gray-600 leading-relaxed">{book.description}</p>
          </div>

          <div className="space-y-4 pt-6 border-t">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                ${book.price.toFixed(2)}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  book.inStock
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {book.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {book.inStock && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label htmlFor="quantity" className="text-gray-700">
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    value={orderQuantity}
                    onChange={handleQuantityChange}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {[...Array(Math.min(book.quantity, 10))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Buy Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
