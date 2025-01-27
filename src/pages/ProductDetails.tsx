import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface CartItem {
  _id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  description: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState<CartItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/books/${id}`);
        const result = await response.json();
        if (result.success && result.data) {
          setBook(result.data); // Set the book data if the request is successful
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin border-4 border-blue-500 rounded-full w-16 h-16 border-t-transparent"></div>
      </div>
    );
  }

  if (!book) {
    return <div className="text-center text-xl">Book not found</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden md:flex">
        {/* Left - Book Image */}
        <div className="md:w-1/2 p-6 flex justify-center items-center">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-80 object-cover rounded-xl shadow-lg transform transition duration-300 hover:scale-105"
          />
        </div>

        {/* Right - Book Info */}
        <div className="md:w-1/2 p-6 space-y-6">
          <h1 className="text-4xl font-extrabold text-[#393280] mb-4 tracking-tight">{book.title}</h1>
          <p className="text-lg text-gray-700 mb-2">
            Author: <span className="font-semibold">{book.author}</span>
          </p>
          <p className="text-md text-gray-500 mb-4">
            Category: <span className="font-medium">{book.category}</span>
          </p>

          <div className="space-y-4 mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Description:</h3>
            <p className="text-lg text-gray-600 line-clamp-5">{book.description}</p>
          </div>

          <p
            className={`text-lg font-medium ${book.inStock ? 'text-green-500' : 'text-red-500'}`}
          >
            {book.inStock ? 'Available' : 'Out of stock'}
          </p>

          <div className="mt-6">
            <button className="w-full bg-[#393280] text-white py-3 rounded-lg hover:bg-[#2c2f7f] transition duration-300 transform hover:scale-105">
              Add to Cart - ${book.price.toFixed(2)}
            </button>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-4 text-center">
        <button
          onClick={() => navigate(-1)} // This will take the user back to the previous page
          className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
