import { BookOpen, Star, ShoppingCart, Heart, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
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
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const navigate = useNavigate();

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
    return Math.ceil(Math.random() * 5);
  };

  const generateRandomRating = () => {
    return (Math.random() * 2 + 3).toFixed(1); // Random rating between 3.0 and 5.0
  };

  const handleViewAll = () => {
    navigate("/all-products");
  };

  const toggleWishlist = (bookId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-5 py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-bounce">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Featured Books
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of must-read books
          </p>
          
          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {['Bestsellers', 'New Arrivals', 'Staff Picks', 'Award Winners'].map((category, index) => (
              <motion.span
                key={category}
                className="px-4 py-2 bg-white shadow-md rounded-full text-sm font-medium text-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {category}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
          <>
            {/* Book Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {books.slice(0, 6).map((book, index) => {
                const randomReviews = generateRandomReviews();
                const rating = generateRandomRating();
                const isWishlisted = wishlist.includes(book._id);
                const isHovered = hoveredBook === book._id;

                return (
                  <motion.div
                    key={book._id}
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    onMouseEnter={() => setHoveredBook(book._id)}
                    onMouseLeave={() => setHoveredBook(null)}
                  >
                    <Link
                      to={`/product-details/${book._id}`}
                      className="block bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
                    >
                      {/* Image Container */}
                      <div className="relative overflow-hidden h-80 group">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Badges */}
                        {index === 0 && (
                          <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Bestseller
                          </div>
                        )}
                        {index === 1 && (
                          <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            New
                          </div>
                        )}
                        
                        {/* Wishlist Button */}
                        <motion.button
                          onClick={(e) => toggleWishlist(book._id, e)}
                          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart
                            className={`w-5 h-5 transition-colors duration-300 ${
                              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                            }`}
                          />
                        </motion.button>
                        
                        {/* Quick Add to Cart */}
                        <motion.div
                          className={`absolute bottom-4 left-4 right-4 transform transition-all duration-300 ${
                            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                          }`}
                        >
                          <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 flex items-center justify-center gap-2 shadow-lg">
                            <ShoppingCart className="w-5 h-5" />
                            Quick Add
                          </button>
                        </motion.div>
                      </div>
                      
                      {/* Book Details */}
                      <div className="p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors duration-200">
                          {book.title}
                        </h2>
                        
                        {/* Rating and Reviews */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(Number(rating))
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          
                        </div>
                        
                        {/* Price */}
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                              ${book.price.toFixed(2)}
                            </span>
                            {index < 3 && (
                              <span className="ml-2 text-sm text-gray-400 line-through">
                                ${(book.price * 1.3).toFixed(2)}
                              </span>
                            )}
                          </div>
                          {index < 3 && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              23% OFF
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* View All Button */}
            {books.length > 6 && (
              <motion.div 
                className="text-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <button
                  onClick={handleViewAll}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 mx-auto group"
                >
                  View All Books
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}
          </>
        )}
      </motion.div>

      
    </div>
  );
};

export default ProductCard;