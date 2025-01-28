import React, { useState, useEffect } from 'react';
import { Package, AlertCircle, Loader2, Clock, CheckCircle, XCircle, Search } from 'lucide-react';

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
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

const getAccessToken = () => {
  const persistRoot = localStorage.getItem('persist:root');
  if (persistRoot) {
    const { auth } = JSON.parse(persistRoot);
    const { accessToken } = JSON.parse(auth);
    return accessToken;
  }
  return null;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-yellow-100 text-yellow-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4" />;
    case 'cancelled':
      return <XCircle className="w-4 h-4" />;
    case 'processing':
      return <Package className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

export function UserOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      setError('Please log in to view your orders');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/orders/my-orders', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => 
    order.books.some(item => 
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
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
            <p className="mt-2 text-gray-500">When you make a purchase, your orders will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map(order => (
              <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-medium">{order._id}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="border-t border-b border-gray-200 py-4 my-4">
                    {order.books.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 mb-4 last:mb-0">
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
                            Quantity: {item.quantity} × ${item.book.price.toFixed(2)}
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