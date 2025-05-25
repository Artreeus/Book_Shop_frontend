import React, { useEffect, useState } from "react";
import { BookOpen, Search, X, Star, Heart, ShoppingCart, Grid, List, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://bookshopbd-backend.vercel.app/api/books"
        );
        const data = await response.json();

        if (data && Array.isArray(data.data)) {
          setBooks(data.data);
          setFilteredBooks(data.data);

          const authorsList = [
            ...new Set(data.data.map((book: CartItem) => book.author)),
          ];
          const categoriesList = [
            ...new Set(data.data.map((book: CartItem) => book.category)),
          ];

          setAuthors(authorsList as string[]);
          setCategories(categoriesList as string[]);
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

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredBooks(filtered);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const newPriceRange = [...priceRange];
    newPriceRange[parseInt(e.target.name)] = value;
    setPriceRange(newPriceRange);
  };

  const clearFilters = () => {
    setSearch("");
    setPriceRange([0, 300]);
    setSelectedAuthor("");
    setSelectedCategory("");
    setSortBy("featured");
  };

  const toggleWishlist = (bookId: string) => {
    setWishlist(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  useEffect(() => {
    filterBooks();
  }, [search, priceRange, selectedAuthor, selectedCategory, sortBy]);

  const generateRating = () => (Math.random() * 2 + 3).toFixed(1);
  const generateReviews = () => Math.floor(Math.random() * 1000 + 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-5 py-16">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-bounce">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              All Products
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Browse our complete collection of {books.length} books
          </p>
        </motion.div>

        {/* Search and Controls Bar */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search by title, author, or category..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              />
            </div>

            {/* Controls */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center gap-2"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>

              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}
                >
                  <Grid className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}
                >
                  <List className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full lg:w-80"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Price Range
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          name="0"
                          value={priceRange[0]}
                          onChange={handlePriceRangeChange}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                          min="0"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="number"
                          name="1"
                          value={priceRange[1]}
                          onChange={handlePriceRangeChange}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                          min="0"
                        />
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-purple-600"
                      />
                    </div>
                  </div>

                  {/* Author Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Author
                    </label>
                    <select
                      value={selectedAuthor}
                      onChange={(e) => setSelectedAuthor(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                    >
                      <option value="">All Authors</option>
                      {authors.map((author) => (
                        <option key={author} value={author}>
                          {author}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Active Filters */}
                  {(selectedAuthor || selectedCategory || search) && (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Active Filters:</p>
                      <div className="flex flex-wrap gap-2">
                        {search && (
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-1">
                            "{search}"
                            <X className="w-3 h-3 cursor-pointer" onClick={() => setSearch("")} />
                          </span>
                        )}
                        {selectedAuthor && (
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-1">
                            {selectedAuthor}
                            <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedAuthor("")} />
                          </span>
                        )}
                        {selectedCategory && (
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-1">
                            {selectedCategory}
                            <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("")} />
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid/List */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full border-t-4 border-purple-600 w-16 h-16"></div>
              </div>
            ) : (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-gray-600">
                    Showing {filteredBooks.length} of {books.length} books
                  </p>
                </div>

                {filteredBooks.length === 0 ? (
                  <motion.div 
                    className="text-center py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-xl text-gray-600">No books found matching your criteria.</p>
                    <button
                      onClick={clearFilters}
                      className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700"
                    >
                      Clear Filters
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {filteredBooks.map((book, index) => {
                      const rating = generateRating();
                      const reviews = generateReviews();
                      const isWishlisted = wishlist.includes(book._id);

                      return (
                        <motion.div
                          key={book._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={viewMode === "grid" ? "" : "flex gap-6 bg-white rounded-xl shadow-lg p-6"}
                        >
                          {viewMode === "grid" ? (
                            // Grid View
                            <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                              <div className="relative overflow-hidden h-80">
                                <img
                                  src={book.image}
                                  alt={book.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                <button
                                  onClick={() => toggleWishlist(book._id)}
                                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                                >
                                  <Heart
                                    className={`w-5 h-5 transition-colors duration-300 ${
                                      isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                                    }`}
                                  />
                                </button>

                                
                              </div>

                              <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                                  {book.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">by {book.author}</p>
                                
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
                                  <span className="text-sm text-gray-600">({reviews})</span>
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    ${book.price.toFixed(2)}
                                  </span>
                                  <Link
                                    to={`/product-details/${book._id}`}
                                    className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                                  >
                                    View Details →
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ) : (
                            // List View
                            <>
                              <img
                                src={book.image}
                                alt={book.title}
                                className="w-32 h-48 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
                                <p className="text-gray-600 mb-1">by {book.author}</p>
                                <p className="text-sm text-gray-500 mb-3">Category: {book.category}</p>
                                
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
                                  <span className="text-sm text-gray-600">{rating} ({reviews} reviews)</span>
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    ${book.price.toFixed(2)}
                                  </span>
                                  <div className="flex gap-3">
                                    <button
                                      onClick={() => toggleWishlist(book._id)}
                                      className="p-2 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition-colors"
                                    >
                                      <Heart
                                        className={`w-5 h-5 ${
                                          isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                                        }`}
                                      />
                                    </button>
                                    <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 flex items-center gap-2">
                                      <ShoppingCart className="w-4 h-4" />
                                      Add to Cart
                                    </button>
                                    <Link
                                      to={`/product-details/${book._id}`}
                                      className="px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50"
                                    >
                                      View Details
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default Products;