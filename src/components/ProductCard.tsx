import { BookOpen, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import Loader from "./shared-component/Loader";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  image: string;
}

const ProductCard: React.FC = () => {
  const [books, setBooks] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://bookshopbd-backend.vercel.app/api/books");
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

    fetchBooks();
  }, []);

  const generateRandomReviews = () => {
    return Math.ceil(Math.random() * 5); // Random number between 1 and 5
  };

  const handleViewAll = () => {
    navigate("/all-products"); // Navigate to the All Products Page
  };

  return (
    <motion.div
    className="container mx-auto px-5 py-16"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
    }}
  >
    <div className="container mx-auto px-3 py-12">
      <h1 className="text-[#393280] text-5xl py-6 flex items-center gap-4">
        <BookOpen className="w-12 h-16 text-[#393280]" /> Book List
      </h1>

      {/* Loading Spinner */}
      {loading ? (
       <Loader/>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.slice(0, 6).map((book) => {
              const randomReviews = generateRandomReviews(); // Generate random reviews for each book

              return (
                <Link
                  key={book._id}
                  to={`/product-details/${book._id}`} // Link to the product details page with the book's ID
                  className="bg-white shadow-2xl rounded-lg p-4 hover:shadow-lg transition relative hover:scale-105"
                >
                  <div>
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h2 className="text-lg text-[#393280] font-semibold mt-2">{book.title}</h2>
                    <p className="text-orange-600 font-bold py-2">${book.price.toFixed(2)}</p>
                    
                    {/* Render random review stars with review number */}
                    <div className="flex justify-center items-center mt-2">
                      {[...Array(randomReviews)].map((_, index) => (
                        <Star key={index} className="text-orange-500 w-5 h-5" />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{randomReviews} Reviews</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* "View All" Button */}
          {books.length > 6 && (
            <div className="text-center mt-8">
              <button
                onClick={handleViewAll}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      )}
    </div>
    </motion.div>
  );
};

export default ProductCard;
