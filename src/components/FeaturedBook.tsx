import { motion } from "framer-motion";
import { BookOpen, Star, ShoppingCart, Heart, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const FeaturedBook = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-5 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-semibold mb-4">
            <TrendingUp className="w-4 h-4" />
            Featured This Week
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
          {/* Left Side - Book Cover */}
          <motion.div
            className="relative w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative">
              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20 blur-xl"
                animate={{ scale: isHovered ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-20 blur-xl"
                animate={{ scale: isHovered ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Book Image Container */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05, rotateY: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <img
                  src="book.png"
                  alt="Birds Gonna Be Happy Book Cover"
                  className="rounded-xl shadow-2xl max-w-[350px] w-full"
                />
                
                {/* Bestseller Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
                  <Award className="w-5 h-5" />
                  <span className="font-bold text-sm">Bestseller</span>
                </div>

                {/* Wishlist Button */}
                <motion.button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart 
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`}
                  />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Book Details */}
          <motion.div
            className="w-full lg:w-1/2 space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Title Section */}
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 flex items-center justify-center lg:justify-start gap-4">
                Our Featured Book
                <BookOpen className="w-10 h-10 text-purple-600" />
              </h1>
              
              <motion.p 
                className="text-sm text-gray-600 uppercase font-medium tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                By Timbur Hood
              </motion.p>
            </div>

            {/* Book Title */}
            <motion.h2 
              className="text-3xl font-bold text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Birds Gonna Be Happy
            </motion.h2>

            {/* Rating */}
            <motion.div 
              className="flex items-center gap-2 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600">(4.9/5)</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">2,847 reviews</span>
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-gray-700 leading-relaxed text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Embark on an extraordinary journey where a reluctant hero discovers their destiny 
              to save the world from mystical birds with dark powers. A tale of courage, 
              friendship, and the magic that lies within nature's most beautiful creatures.
            </motion.p>

            {/* Features */}
            <motion.div 
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {['Fantasy', 'Adventure', '423 Pages', 'Hardcover'].map((feature, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                >
                  {feature}
                </span>
              ))}
            </motion.div>

            {/* Price and Actions */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-baseline gap-3 justify-center lg:justify-start">
                <span className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  $45.00
                </span>
                <span className="text-xl text-gray-400 line-through">$60.00</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  25% OFF
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 font-semibold flex items-center gap-2 justify-center"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </motion.button>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/all-products"
                    className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-300 flex items-center gap-2 justify-center"
                  >
                    Browse More Books
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex items-center gap-6 text-sm text-gray-600 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                In Stock
              </span>
              <span>✓ Free Shipping</span>
              <span>✓ 30-Day Returns</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      
    </div>
  );
};

export default FeaturedBook;