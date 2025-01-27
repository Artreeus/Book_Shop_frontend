import { BookOpen } from "lucide-react";
import React from "react";

const FeaturedBook = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between hero2 px-5 py-16 my-6">
      {/* Left Side - Book Cover */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="book.png"
          alt="Book Cover"
          className="rounded-xl shadow-md max-w-[300px]"
        />
      </div>

      {/* Right Side - Book Details */}
      <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-8 text-center md:text-left space-y-4">
        <h1 className="text-[#393280] text-5xl py-6 flex items-center gap-4">Our Featured Book <BookOpen className="w-12 h-16 text-[#393280]" /> </h1>
        <p className="text-sm text-[#393280] uppercase font-medium">
          By Timbur Hood
        </p>
        <h2 className="text-2xl font-bold text-[#393280] mt-2">
          Birds Gonna Be Happy
        </h2>
        <p className="text-[#393280] mt-4">
          Birds gonna be Happy is a book about the writer who was sent on a mission to save the world from the evil birds. The writer was sent on a mission to save the world from the evil birds.
        </p>
        <p className="text-xl font-semibold text-red-500 mt-4">$45.00</p>

        <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700">
          View More →
        </button>
      </div>
    </div>
  );
};

export default FeaturedBook;
