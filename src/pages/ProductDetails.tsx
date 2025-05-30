import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, AlertCircle, ArrowLeft, Star, Heart, Shield, Truck, RefreshCw, Check, Minus, Plus, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import Loader from "../components/shared-component/Loader";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  description: string;
  quantity: number;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export function ProductDetails() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "details" | "reviews">("description");
  const [mainImage, setMainImage] = useState<string>("");
  const navigate = useNavigate();

  // Mock data for demonstration
  const rating = 4.5;
  const totalReviews = 342;
  const mockReviews: Review[] = [
    {
      id: 1,
      name: "No reviews Yet Published",
      rating: 5,
      date: "2 weeks ago",
      comment: "Absolutely loved this book! The storytelling is captivating and I couldn't put it down.",
      verified: true
    }
  ];

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://bookshopbd-backend.vercel.app/api/books/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const result = await response.json();
        if (result.success && result.data) {
          setBook(result.data);
          setMainImage(result.data.image);
        } else {
          throw new Error("Book not found");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase" && book && orderQuantity < Math.min(book.quantity, 10)) {
      setOrderQuantity(prev => prev + 1);
    } else if (action === "decrease" && orderQuantity > 1) {
      setOrderQuantity(prev => prev - 1);
    }
  };

  const handleBuyNow = () => {
    if (book) {
      navigate("/checkout", {
        state: {
          book: {
            ...book,
            orderQuantity,
          },
        },
      });
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-6">
        <motion.div 
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error || "Book not found"}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <motion.button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Books
        </motion.button>

        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="space-y-6">
                  {/* Main Image */}
                  <motion.div 
                    className="relative group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={mainImage || "https://via.placeholder.com/400x600?text=No+Image"}
                      alt={book.title}
                      className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
                    />
                    {/* Badges */}
                    {book.inStock && book.quantity < 5 && (
                      <div className="absolute top-4 left-4 px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold shadow-lg">
                        Only {book.quantity} left!
                      </div>
                    )}
                    <button
                      onClick={toggleWishlist}
                      className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                    >
                      <Heart
                        className={`w-6 h-6 transition-colors duration-300 ${
                          isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                        }`}
                      />
                    </button>
                  </motion.div>

                  {/* Thumbnail Images (if multiple images were available) */}
                  <div className="flex gap-4 justify-center">
                    {[1, 2, 3].map((_, index) => (
                      <button
                        key={index}
                        className={`w-20 h-28 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          index === 0 ? 'border-purple-600' : 'border-gray-200 opacity-50'
                        }`}
                      >
                        <img
                          src={book.image}
                          alt={`${book.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-8 lg:p-12 space-y-8">
                {/* Title and Author */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
                      <p className="text-xl text-gray-600">by {book.author}</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
                      <BookOpen className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">{book.category}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-lg font-semibold">{rating}</span>
                    </div>
                
                  </div>
                </motion.div>

                {/* Tabs */}
                <motion.div 
                  className="border-b border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex gap-8">
                    {(['description', 'details', 'reviews'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 capitalize font-medium transition-all duration-300 ${
                          activeTab === tab
                            ? 'text-purple-600 border-b-2 border-purple-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Tab Content */}
                <motion.div 
                  className="min-h-[200px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {activeTab === "description" && (
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-600 leading-relaxed">
                        {book.description || "This book offers an incredible journey through its pages. A must-read for anyone interested in great storytelling and compelling narratives."}
                      </p>
                    </div>
                  )}

                  {activeTab === "details" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Publisher</p>
                          <p className="font-semibold">BookShopBD Press</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Language</p>
                          <p className="font-semibold">English</p>
                        </div>
                       
                      </div>
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div className="space-y-6">
                      {mockReviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{review.name}</h4>
                               
                              </div>
                              
                            </div>
                          </div>
                          
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Price and Actions */}
                <motion.div 
                  className="space-y-6 pt-6 border-t border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        ${book.price.toFixed(2)}
                      </span>
                      <span className="ml-3 text-xl text-gray-400 line-through">
                        ${(book.price * 1.3).toFixed(2)}
                      </span>
                      <span className="ml-3 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        Save 23%
                      </span>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${
                        book.inStock
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${book.inStock ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                      {book.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  {book.inStock && (
                    <div className="space-y-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-4">
                        <span className="text-gray-700 font-medium">Quantity:</span>
                        <div className="flex items-center gap-0 bg-gray-100 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange("decrease")}
                            className="p-3 hover:bg-gray-200 transition-colors rounded-l-lg"
                            disabled={orderQuantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-6 py-3 font-semibold min-w-[60px] text-center">
                            {orderQuantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange("increase")}
                            className="p-3 hover:bg-gray-200 transition-colors rounded-r-lg"
                            disabled={orderQuantity >= Math.min(book.quantity, 10)}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        <motion.button
                          onClick={handleBuyNow}
                          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ShoppingCart className="w-5 h-5" />
                          Buy Now
                        </motion.button>
                        
                      </div>
                    </div>
                  )}

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-4 pt-6">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Truck className="w-6 h-6 text-purple-600" />
                      <span className="text-sm text-gray-600">Free Delivery</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Shield className="w-6 h-6 text-purple-600" />
                      <span className="text-sm text-gray-600">Secure Payment</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-center">
                      <RefreshCw className="w-6 h-6 text-purple-600" />
                      <span className="text-sm text-gray-600">Easy Returns</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          
       
        </div>
      </div>

      
    </div>
  );
}