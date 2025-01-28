import  { useState } from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import { BookForm } from '../components/BookForm';
import { BookList } from '../components/BookList';
import { UserManagement } from '../components/UserManagment';
import { UserDashboard } from '../components/UserDashborad';
import { Menu, X, BookOpen, Users, Settings, Home, List, Key } from 'lucide-react';
import { OrderDashboard } from '../components/OrderDashboard';
import { UserOrders } from '../components/UserOrders';

const getUserRole = () => {
  const storedData = localStorage.getItem('persist:root');
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    const role = parsedData.auth ? JSON.parse(parsedData.auth).user?.role : null;
    return role;
  }
  return null;
};



const Sidebar = ({ role, isOpen, toggleSidebar }) => (
  <div
    className={`${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } transform fixed lg:relative lg:translate-x-0 z-30 transition-transform duration-300 ease-in-out h-screen bg-gray-900 text-white lg:w-64 w-64 flex flex-col shadow-xl`}
  >
    {/* Dashboard Header */}
    <div className="flex items-center justify-between p-4 border-b border-gray-800">
      <h2 className="text-xl font-bold text-indigo-400">Dashboard</h2>
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-gray-300 hover:text-white"
      >
        <X className="h-6 w-6" />
      </button>
    </div>

    {/* Navigation */}
    <nav className="flex-1 overflow-y-auto">
      <div className="p-4">
        <div className="mb-4">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Menu
          </div>
          <ul className="mt-4 space-y-2">
            {role === 'admin' && (
              <>
                <li>
                  <Link
                    to="/dashboard/book-form"
                    className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors group"
                  >
                    <BookOpen className="h-5 w-5 mr-3 text-gray-400 group-hover:text-indigo-400" />
                    <span>Book Form</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/book-list"
                    className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors group"
                  >
                    <List className="h-5 w-5 mr-3 text-gray-400 group-hover:text-indigo-400" />
                    <span>Book List</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/user-management"
                    className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors group"
                  >
                    <Users className="h-5 w-5 mr-3 text-gray-400 group-hover:text-indigo-400" />
                    <span>User Management</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/order-dashboard"
                    className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors group"
                  >
                    <Settings className="h-5 w-5 mr-3 text-gray-400 group-hover:text-indigo-400" />
                    <span>Order Managment</span>
                  </Link>
                </li>
              </>
            )}
            {role === 'user' && (
              <>
                <li>
                  <Link
                    to="/dashboard/user-pass"
                    className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors group"
                  >
                    <Key className="h-5 w-5 mr-3 text-gray-400 group-hover:text-indigo-400" />
                    <span>Update Password</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/user-orders"
                    className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors group"
                  >
                    <Home className="h-5 w-5 mr-3 text-gray-400 group-hover:text-indigo-400" />
                    <span>My Orders</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/user-route3"
                    className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors group"
                  >
                    <Settings className="h-5 w-5 mr-3 text-gray-400 group-hover:text-indigo-400" />
                    <span>Settings</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  </div>
);

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const role = getUserRole();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-gray-900 text-white p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          onClick={toggleSidebar}
          className="text-gray-300 hover:text-white focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="flex">
        <Sidebar role={role} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <div className="p-6">
            <Routes>
              <Route path="book-form" element={<BookForm />} />
              <Route path="book-list" element={<BookList />} />
              <Route path="user-management" element={<UserManagement />} />
              <Route path="order-dashboard" element={<OrderDashboard />} />
              <Route path="user-pass" element={<UserDashboard />} />
              <Route path="user-orders" element={<UserOrders />} />
              <Route
                path="*"
                element={
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                      Welcome to the Dashboard
                    </h1>
                    <p className="text-gray-600">
                      You are logged in as: <span className="font-semibold text-indigo-600">{role}</span>
                    </p>
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;