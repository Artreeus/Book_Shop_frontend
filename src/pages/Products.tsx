import React, { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface CartItem {
  _id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  category: string;
  availability: boolean;
}

const Products: React.FC = () => {
  const [books, setBooks] = useState<CartItem[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 300]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books");
        const data = await response.json();

        if (data && Array.isArray(data.data)) {
          setBooks(data.data); // Set all books into state
          setFilteredBooks(data.data); // Initially display all books

          // Extract unique authors and categories
          const authorsList = [
            ...new Set(data.data.map((book: CartItem) => book.author)),
          ];
          const categoriesList = [
            ...new Set(data.data.map((book: CartItem) => book.category)),
          ];

          setAuthors(authorsList);
          setCategories(categoriesList);
        } else {
          console.error(
            "API response does not contain a valid 'data' array:",
            data
          );
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filterBooks = () => {
    let filtered = books;

    if (search) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase()) ||
          book.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (book) => book.price >= priceRange[0] && book.price <= priceRange[1]
    );

    if (selectedAuthor) {
      filtered = filtered.filter((book) => book.author === selectedAuthor);
    }

    if (selectedCategory) {
      filtered = filtered.filter((book) => book.category === selectedCategory);
    }

    setFilteredBooks(filtered);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPriceRange = [...priceRange];
    newPriceRange[+e.target.name] = +e.target.value;
    setPriceRange(newPriceRange);
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAuthor(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    filterBooks();
  }, [search, priceRange, selectedAuthor, selectedCategory]);

  return (
    <div className="container mx-auto px-5 py-16">
      <h1 className="text-[#393280] text-5xl py-6 flex items-center gap-5">
        <BookOpen className="w-12 h-16 text-[#393280]" />
        All Products
      </h1>

      {/* Search and Filter Section */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by title, author, or category"
          className="px-4 py-2 border border-gray-300 rounded-md w-full mb-4"
        />

        {/* Filters Section */}
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-1 gap-6">
          <div>
            <label htmlFor="price-range" className="block mb-2">
              Price Range
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="0"
                value={priceRange[0]}
                onChange={handlePriceRangeChange}
                className="px-3 py-1 border border-gray-300 rounded w-full sm:w-auto"
                min="0"
              />
              <span>-</span>
              <input
                type="number"
                name="1"
                value={priceRange[1]}
                onChange={handlePriceRangeChange}
                className="px-3 py-1 border border-gray-300 rounded w-full sm:w-auto"
                min="0"
              />
            </div>
          </div>

          <div>
            <label htmlFor="author" className="block mb-2">
              Author
            </label>
            <select
              name="author"
              value={selectedAuthor}
              onChange={handleAuthorChange}
              className="px-4 py-2 border border-gray-300 rounded w-full"
            >
              <option value="">All Authors</option>
              {authors.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="category" className="block mb-2">
              Category
            </label>
            <select
              name="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-4 py-2 border border-gray-300 rounded w-full"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full border-t-4 border-indigo-600 w-16 h-16"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.length === 0 ? (
            <div className="col-span-3 text-center text-xl text-gray-600">
              No books found.
            </div>
          ) : (
            filteredBooks.map((book) => (
              <div
  key={book._id}
  className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform transform hover:scale-105"
>
  <div className="relative">
    <img
      src={book.image}
      alt={book.title}
      className="w-full h-72 object-cover rounded-lg shadow-lg hover:opacity-90 transition-opacity"
    />
  </div>
  <div className="mt-6 text-center space-y-2">
    <h2 className="text-2xl text-[#393280] font-semibold">{book.title}</h2>
    <p className="text-lg text-gray-700 font-medium">
      Price: ${book.price.toFixed(2)}
    </p>
    <p className="text-sm text-gray-500">Author: {book.author}</p>
    <p className="text-sm text-gray-500">Category: {book.category}</p>
    <Link
      to={`/product-details/${book._id}`}
      className="mt-4 inline-block px-8 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
    >
      View Details
    </Link>
  </div>
</div>

            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
