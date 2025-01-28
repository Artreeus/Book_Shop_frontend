import React, { useState, useEffect } from 'react';
import { DollarSign, Package, TrendingUp, AlertCircle, Loader2, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Order {
  _id: string;
  user: {
    email: string;
    name: string;
  };
  books: {
    book: {
      title: string;
      price: number;
    };
    quantity: number;
  }[];
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

interface Revenue {
  totalRevenue: number;
  totalOrders: number;
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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
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
    default:
      return <Clock className="w-4 h-4" />;
  }
};

export function OrderDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [revenue, setRevenue] = useState<Revenue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      setError('Authentication token not found. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const [ordersResponse, revenueResponse] = await Promise.all([
        fetch('http://localhost:5000/api/orders/all', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }),
        fetch('http://localhost:5000/api/orders/revenue', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
      ]);

      if (!ordersResponse.ok || !revenueResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const [ordersData, revenueData] = await Promise.all([
        ordersResponse.json(),
        revenueResponse.json()
      ]);

      // Handle the nested orders data structure
      setOrders(ordersData.data.orders || []);
      setRevenue(revenueData.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  const averageOrderValue = revenue ? revenue.totalRevenue / revenue.totalOrders : 0;

  return (
    <div className="containe-fluid mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Order Dashboard</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {revenue && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(revenue.totalRevenue)}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{revenue.totalOrders}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Average Order Value</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(averageOrderValue)}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Order ID
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Customer
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Items
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Total Amount
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Date
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {orders.map(order => (
        <tr key={order._id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {order._id.slice(-8)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {order.user.email}
          </td>
          <td className="px-6 py-4 text-sm text-gray-500">
            <div className="max-w-xs">
              {order.books.map((item, index) => (
                <div key={index} className="truncate">
                  {item.quantity}x {item.book.title}
                </div>
              ))}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {formatCurrency(order.totalPrice)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {formatDate(order.createdAt)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
    </div>
  );
}