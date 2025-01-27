import { BookOpen } from "lucide-react";
import React, { useEffect, useState } from "react";



interface CartItem {
  _id: string;
  title: string;
  price: number;
  image: string;
}

const Products: React.FC = () => {
  const [books, setBooks] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books");
        const data = await response.json();

        if (data && Array.isArray(data.data)) {
          setBooks(data.data); // Set all books into state
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

  return (
    <div className="container mx-auto px-5 py-16">
      <h1 className="text-[#393280] text-5xl py-6 flex items-center gap-5"><BookOpen className="w-12 h-16 text-[#393280]" />All Products</h1>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full border-t-4 border-indigo-600 w-16 h-16"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
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
                <p className="text-gray-600">${book.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
