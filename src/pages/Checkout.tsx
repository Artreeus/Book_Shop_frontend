import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, AlertCircle, Loader2, CheckCircle } from "lucide-react";

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

  const book = location.state?.book as Book;

  if (!book) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto bg-red-50 rounded-lg p-6 text-red-700 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <p>No product selected for checkout</p>
        </div>
      </div>
    );
  }

  const totalAmount = book.price * book.orderQuantity;

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
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto bg-green-50 rounded-lg p-6 text-green-700 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <p>Order placed successfully! Redirecting to orders page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-[#393280] text-5xl py-6 flex items-center gap-4">
          Checkout
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex gap-4 mb-4">
              <img
                src={book.image || "https://via.placeholder.com/100"}
                alt={book.title}
                className="w-24 h-32 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{book.title}</h3>
                <p className="text-gray-600">by {book.author}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {book.orderQuantity}
                </p>
                <p className="font-medium">${book.price.toFixed(2)} each</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md space-y-4"
          >
            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  required
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Place Order
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
