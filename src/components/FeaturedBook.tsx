import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedBook = () => {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-between hero2 px-5 py-16 my-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Left Side - Book Cover */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center"
        whileHover={{ scale: 1.05 }}
      >
        <img
          src="book.png"
          alt="Book Cover"
          className="rounded-xl shadow-md max-w-[300px]"
        />
      </motion.div>

      {/* Right Side - Book Details */}
      <motion.div
        className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-8 text-center md:text-left space-y-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1 className="text-[#393280] text-5xl py-6 flex lg:flex-row md:flex-row-reverse sm:flex-col items-center gap-4">
          Our Featured Book <BookOpen className="w-12 h-16 text-[#393280]" />
        </h1>
        <p className="text-sm text-[#393280] uppercase font-medium">
          By Timbur Hood
        </p>
        <h2 className="text-2xl font-bold text-[#393280] mt-2">
          Birds Gonna Be Happy
        </h2>
        <p className="text-[#393280] mt-4">
          Birds gonna be Happy is a book about the writer who was sent on a
          mission to save the world from the evil birds. The writer was sent on
          a mission to save the world from the evil birds.
        </p>
        <p className="text-xl font-semibold text-red-500 mt-4">$45.00</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700"
        >
          <Link to="/all-products">View More →</Link>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default FeaturedBook;
