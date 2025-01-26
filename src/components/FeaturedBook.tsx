import React from "react";
import { Button } from "@/components/ui/button";

const FeaturedBook = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-pink-100 via-white to-blue-100 p-6 rounded-2xl shadow-lg">
      {/* Left Side - Book Cover */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="/path-to-your-image.png"
          alt="Book Cover"
          className="rounded-xl shadow-md max-w-[300px]"
        />
      </div>

      {/* Right Side - Book Details */}
      <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-8 text-center md:text-left">
        <p className="text-sm text-gray-500 uppercase font-medium">By Timbur Hood</p>
        <h2 className="text-3xl font-bold text-gray-800 mt-2">Birds Gonna Be Happy</h2>
        <p className="text-gray-600 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac.
        </p>
        <p className="text-xl font-semibold text-red-500 mt-4">$45.00</p>

        <Button className="mt-6 w-full md:w-auto bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-lg shadow-md">
          View More →
        </Button>
      </div>
    </div>
  );
};

export default FeaturedBook;
