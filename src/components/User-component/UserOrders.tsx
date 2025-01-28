import { useState, useEffect } from "react";
import {
  Package,
  AlertCircle,
  Loader2,
  Clock,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react";

interface Order {
  _id: string;
  books: {
    book: {
      title: string;
      price: number;
      image?: string;
    };
    quantity: number;
  }[];
  totalPrice: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
}

const getAccessToken = () => {
  const persistRoot = localStorage.getItem("persist:root");
  if (persistRoot) {
    const { auth } = JSON.parse(persistRoot);
    const { accessToken } = JSON.parse(auth);
    return accessToken;
  }
  return null;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-yellow-100 text-yellow-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4" />;
    case "cancelled":
      return <XCircle className="w-4 h-4" />;
    case "processing":
      return <Package className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

export function UserOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchOrders = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      setError("Please log in to view your orders");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://bookshopbd-backend.vercel.app/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId: string) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      setError("Please log in to cancel orders");
      return;
    }

    setUpdating(orderId);
    try {
      const response = await fetch(
        `https://bookshopbd-backend.vercel.app/api/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "cancelled" }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to cancel order");
      }

      await fetchOrders(); // Refresh orders after cancellation
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to cancel order");
    } finally {
      setUpdating(null);
    }
  };

  const deleteOrder = async (orderId: string) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      setError("Please log in to delete orders");
      return;
    }

    setUpdating(orderId);
    try {
      const response = await fetch(
        `https://bookshopbd-backend.vercel.app/api/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete order");
      }

      // Remove the order from the local state instead of refetching
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete order");
    } finally {
      setUpdating(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.books.some((item) =>
      item.book.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-700 hover:text-red-800"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
            <p className="mt-2 text-gray-500">
              When you make a purchase, your orders will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-medium">{order._id}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                      {order.status === "pending" && (
                        <button
                          onClick={() => cancelOrder(order._id)}
                          disabled={updating === order._id}
                          className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
                        >
                          {updating === order._id ? (
                            <span className="flex items-center gap-1">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Cancelling...
                            </span>
                          ) : (
                            "Cancel Order"
                          )}
                        </button>
                      )}
                      {order.status === "cancelled" && (
                        <button
                          onClick={() => deleteOrder(order._id)}
                          disabled={updating === order._id}
                          className="text-gray-600 hover:text-gray-800 font-medium disabled:opacity-50"
                        >
                          {updating === order._id ? (
                            <span className="flex items-center gap-1">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Deleting...
                            </span>
                          ) : (
                            "Delete Order"
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-b border-gray-200 py-4 my-4">
                    {order.books.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 mb-4 last:mb-0"
                      >
                        {item.book.image && (
                          <img
                            src={item.book.image}
                            alt={item.book.title}
                            className="w-16 h-20 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium">{item.book.title}</h4>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity} × $
                            {item.book.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="font-medium">
                          ${(item.quantity * item.book.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </div>
                    <div className="text-lg font-bold">
                      Total: ${order.totalPrice.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
