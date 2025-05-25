import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreditCard,
  AlertCircle,
  Loader2,
  CheckCircle,
  ShoppingCart,
  Truck,
  Shield,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  Home,
  Building,
  Hash,
  ArrowLeft,
  Package,
} from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  orderQuantity: number;
}

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

const initialFormState: CheckoutForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

const getAccessToken = () => {
  const persistRoot = localStorage.getItem("persist:root");
  if (persistRoot) {
    const { auth } = JSON.parse(persistRoot);
    const { accessToken } = JSON.parse(auth);
    return accessToken;
  }
  return null;
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CheckoutForm>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [currentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const book = location.state?.book as Book;

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      navigate("/login", { replace: true });
      setTimeout(() => {
        toast.error("Please log in to complete your purchase", {
          autoClose: 3000,
        });
      }, 1500);
    }
  }, [navigate]);

  if (!book) {
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Product Selected
          </h2>
          <p className="text-gray-600 mb-6">
            Please select a product before checkout
          </p>
          <button
            onClick={() => navigate("/all-products")}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  const subtotal = book.price * book.orderQuantity;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const totalAmount = subtotal + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const accessToken = getAccessToken();
    if (!accessToken) {
      setError("Please log in to complete your purchase");
      setLoading(false);
      navigate("/login", { replace: true });
      return;
    }

    try {
      const response = await fetch(
        "https://bookshopbd-backend.vercel.app/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            books: [
              {
                book: book._id,
                quantity: book.orderQuantity,
              },
            ],
            shippingDetails: formData,
            paymentMethod,
            totalAmount,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create order");
      }

      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard/user-orders");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-6">
        <motion.div
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Order Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Redirecting to your orders...
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
              animate={{ width: "100%" }}
              transition={{ duration: 1.5 }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  const formFields = [
    {
      name: "name",
      label: "Full Name",
      icon: User,
      type: "text",
      placeholder: "John Doe",
    },
    {
      name: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      placeholder: "john@example.com",
    },
    {
      name: "phone",
      label: "Phone Number",
      icon: Phone,
      type: "tel",
      placeholder: "+880 1234567890",
    },
    {
      name: "address",
      label: "Street Address",
      icon: Home,
      type: "text",
      placeholder: "123 Main Street",
    },
    {
      name: "city",
      label: "City",
      icon: Building,
      type: "text",
      placeholder: "Dhaka",
    },
    {
      name: "postalCode",
      label: "Postal Code",
      icon: Hash,
      type: "text",
      placeholder: "1205",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Product
        </motion.button>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Checkout
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Complete your order in just a few steps
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 1
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  1
                </div>
                <div
                  className={`w-32 h-1 ${currentStep >= 2 ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gray-200"}`}
                />
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 2
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  2
                </div>
                <div
                  className={`w-32 h-1 ${currentStep >= 3 ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gray-200"}`}
                />
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 3
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  3
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-2">
              <span className="text-sm text-gray-600 w-32 text-center">
                Shipping
              </span>
              <span className="text-sm text-gray-600 w-32 text-center">
                Payment
              </span>
              <span className="text-sm text-gray-600 w-32 text-center">
                Review
              </span>
            </div>
          </motion.div>

          {error && (
            <motion.div
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-5 h-5" />
              {error}
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Information */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-purple-600" />
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formFields.map((field) => (
                      <div
                        key={field.name}
                        className={
                          field.name === "address" ? "md:col-span-2" : ""
                        }
                      >
                        <label
                          htmlFor={field.name}
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          {field.label}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <field.icon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            required
                            value={formData[field.name as keyof CheckoutForm]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-purple-600" />
                    Payment Method
                  </h2>
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 cursor-pointer transition-all duration-200">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      />
                      <div className="ml-3 flex-1">
                        <p className="font-semibold text-gray-900">
                          Cash on Delivery
                        </p>
                        <p className="text-sm text-gray-600">
                          Pay when you receive your order
                        </p>
                      </div>
                      <Package className="w-6 h-6 text-gray-400" />
                    </label>

                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 cursor-pointer transition-all duration-200 opacity-50">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        disabled
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      />
                      <div className="ml-3 flex-1">
                        <p className="font-semibold text-gray-900">
                          Credit/Debit Card
                        </p>
                        <p className="text-sm text-gray-600">Coming soon</p>
                      </div>
                      <CreditCard className="w-6 h-6 text-gray-400" />
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Place Order • ${totalAmount.toFixed(2)}
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Order Summary Sidebar */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                {/* Product Details */}
                <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={book.image || "https://via.placeholder.com/100"}
                    alt={book.title}
                    className="w-20 h-28 object-cover rounded-lg shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600">by {book.author}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-500">
                        Qty: {book.orderQuantity}
                      </span>
                      <span className="font-semibold">
                        ${(book.price * book.orderQuantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-2">
                      Shipping
                      {shipping === 0 && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          FREE
                        </span>
                      )}
                    </span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        ${totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="w-full sm:flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                    <button className="w-full sm:w-auto px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <span>Free shipping over $50</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span>Delivery in 3-5 business days</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
