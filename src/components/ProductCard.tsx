import { BookOpen, Star } from "lucide-react";
import React, { useEffect, useState } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const ProductCard: React.FC<ProductCardProps> = ({ cart, setCart }) => {
  // State to store books fetched from API
  const [books, setBooks] = useState<CartItem[]>([]);
  // State to track loading
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch books from API when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books");
        const data = await response.json();

        // Check if the response has a 'data' property that is an array
        if (data && Array.isArray(data.data)) {
          setBooks(data.data); // Update state with the books array inside 'data'
        } else {
          console.error("API response does not contain a valid 'data' array:", data);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false); // Once the fetch is done, set loading to false
      }
    };

    fetchBooks();
  }, []); // Empty dependency array means this runs only once when the component mounts

  const handleAddToCart = (book: CartItem) => {
    setCart((prevCart) => [...prevCart, book]);
  };

  // Function to generate random reviews between 1 and 5 stars
  const generateRandomReviews = () => {
    return Math.ceil(Math.random() * 5); // Random number between 1 and 5
  };

  return (
    <div className="container mx-auto px-5 py-16">
      <h1 className="text-[#393280] text-5xl py-6 flex items-center gap-4">
        <BookOpen className="w-12 h-16 text-[#393280]" /> Book List
      </h1>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full border-t-4 border-indigo-600 w-16 h-16"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.length === 0 ? (
            <div className="col-span-3 text-center text-xl text-gray-600">
              No books available.
            </div>
          ) : (
            books.map((book) => {
              const randomReviews = generateRandomReviews(); // Generate random reviews for each book

              return (
                <div
                  key={book.id}
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
                    
                    {/* Render random review stars with review number */}
                    <div className="flex justify-center items-center mt-2">
                      {[...Array(randomReviews)].map((_, index) => (
                        <Star key={index} className="text-yellow-500 w-5 h-5" />
                      ))}
                      <span className="ml-2 text-sm text-gray-600 font-bold">{randomReviews} Reviews</span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(book)}
                      className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
