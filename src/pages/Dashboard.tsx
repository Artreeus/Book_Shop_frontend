import { useState } from "react";
import { Link, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { BookForm } from "../components/Admin-Component/BookForm";
import { BookList } from "../components/Admin-Component/BookList";
import { UserManagement } from "../components/Admin-Component/UserManagment";
import { UserDashboard } from "../components/User-component/UserDashborad";
import {
  Menu,
  X,
  BookOpen,
  Users,
  Settings,
  Home,
  List,
  Key,
  LayoutDashboard,
  ShoppingBag,
  Package,
  UserCircle,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Bell,
} from "lucide-react";
import { OrderDashboard } from "../components/Admin-Component/OrderDashboard";
import { UserOrders } from "../components/User-component/UserOrders";
import { motion, AnimatePresence } from "framer-motion";

const getUserRole = () => {
  const storedData = localStorage.getItem("persist:root");
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    const role = parsedData.auth
      ? JSON.parse(parsedData.auth).user?.role
      : null;
    return role;
  }
  return null;
};

const getUserInfo = () => {
  const storedData = localStorage.getItem("persist:root");
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    const user = parsedData.auth ? JSON.parse(parsedData.auth).user : null;
    return user;
  }
  return null;
};

interface SidebarProps {
  role: string;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, isOpen, toggleSidebar }) => {
  const location = useLocation();
  const user = getUserInfo();

  const adminMenuItems = [
    {
      path: "/dashboard/book-form",
      icon: BookOpen,
      label: "Add Book",
      color: "from-purple-500 to-blue-500",
    },
    {
      path: "/dashboard/book-list",
      icon: List,
      label: "Book Management",
      color: "from-green-500 to-teal-500",
    },
    {
      path: "/dashboard/user-management",
      icon: Users,
      label: "User Management",
      color: "from-orange-500 to-red-500",
    },
    {
      path: "/dashboard/order-dashboard",
      icon: Package,
      label: "Order Management",
      color: "from-pink-500 to-purple-500",
    },
  ];

  const userMenuItems = [
    {
      path: "/dashboard/user-orders",
      icon: ShoppingBag,
      label: "My Orders",
      color: "from-purple-500 to-blue-500",
    },
    {
      path: "/dashboard/user-pass",
      icon: Key,
      label: "Update Password",
      color: "from-green-500 to-teal-500",
    },
    {
      path: "/dashboard/user-route3",
      icon: Settings,
      label: "Settings",
      color: "from-orange-500 to-red-500",
    },
  ];
  // @ts-ignore
  const menuItems = role === "admin" ? adminMenuItems : userMenuItems;

  return (
    <>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transform fixed lg:relative lg:translate-x-0 z-30 transition-transform duration-300 ease-in-out h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white lg:w-72 w-72 flex flex-col shadow-2xl`}
      >
        {/* Dashboard Header */}
        <div className="p-6 border-b border-gray-700/50 sticky top-0 z-40 bg-gray-900/95 backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Dashboard
              </h2>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* User Info */}
          <div className="bg-gray-800/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <UserCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">
                  {user?.name || "User"}
                </p>

                <p className="text-xs text-gray-400 capitalize">
                  {role} Account
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="mb-4">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-4">
                Menu
              </div>
              <ul className="space-y-2">
                {role === "admin" ? (
                  <>
                    <li>
                      <Link
                        to="/dashboard/book-form"
                        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 group ${
                          location.pathname === "/dashboard/book-form"
                            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        <BookOpen className="h-5 w-5 mr-3" />
                        <span>Add Book</span>
                        {location.pathname === "/dashboard/book-form" && (
                          <ChevronRight className="h-4 w-4 ml-auto" />
                        )}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/book-list"
                        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 group ${
                          location.pathname === "/dashboard/book-list"
                            ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        <List className="h-5 w-5 mr-3" />
                        <span>Book Management</span>
                        {location.pathname === "/dashboard/book-list" && (
                          <ChevronRight className="h-4 w-4 ml-auto" />
                        )}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/user-management"
                        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 group ${
                          location.pathname === "/dashboard/user-management"
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        <Users className="h-5 w-5 mr-3" />
                        <span>User Management</span>
                        {location.pathname === "/dashboard/user-management" && (
                          <ChevronRight className="h-4 w-4 ml-auto" />
                        )}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/order-dashboard"
                        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 group ${
                          location.pathname === "/dashboard/order-dashboard"
                            ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        <Settings className="h-5 w-5 mr-3" />
                        <span>Order Management</span>
                        {location.pathname === "/dashboard/order-dashboard" && (
                          <ChevronRight className="h-4 w-4 ml-auto" />
                        )}
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/dashboard/user-pass"
                        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 group ${
                          location.pathname === "/dashboard/user-pass"
                            ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        <Key className="h-5 w-5 mr-3" />
                        <span>Update Password</span>
                        {location.pathname === "/dashboard/user-pass" && (
                          <ChevronRight className="h-4 w-4 ml-auto" />
                        )}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/user-orders"
                        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 group ${
                          location.pathname === "/dashboard/user-orders"
                            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        <Home className="h-5 w-5 mr-3" />
                        <span>My Orders</span>
                        {location.pathname === "/dashboard/user-orders" && (
                          <ChevronRight className="h-4 w-4 ml-auto" />
                        )}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/user-route3"
                        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 group ${
                          location.pathname === "/dashboard/user-route3"
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        <Settings className="h-5 w-5 mr-3" />
                        <span>My Profile</span>
                        {location.pathname === "/dashboard/user-route3" && (
                          <ChevronRight className="h-4 w-4 ml-auto" />
                        )}
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* Quick Stats */}
        <div className="p-6 border-t border-gray-700/50">
          <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Orders</span>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">156</p>
            <p className="text-xs text-green-400">+12% from last month</p>
          </div>
        </div>
      </div>
    </>
  );
};

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
          <Bell className="h-6 w-6 text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>

      <div className="flex">
        <Sidebar
          role={role}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {/* Main Content */}
        <div className="flex-1">
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
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                      <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Welcome to the Dashboard
                      </h1>
                      <p className="text-gray-600 text-lg mb-2">
                        Logged in as:{" "}
                        <span className="font-semibold text-purple-600 capitalize">
                          {role}
                        </span>
                      </p>
                      <p className="text-gray-600 text-lg ">
                        Name:{" "}
                        <span className="font-semibold text-gray-800">
                          {getUserInfo()?.name || "User"}
                        </span>
                      </p>
                      <p className="text-gray-600 text-lg mb-8 lowercase">
                        Email:{" "}
                        <span className="font-semibold text-gray-800">
                          {getUserInfo()?.email || "No Email"}
                        </span>
                      </p>

                      {/* Quick Stats Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {role === "admin" ? (
                          <>
                            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 text-white">
                              <BookOpen className="h-8 w-8 mb-2" />
                              <h3 className="text-sm opacity-90">
                                Total Books
                              </h3>
                              <p className="text-2xl font-bold">9</p>
                            </div>
                            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white">
                              <Users className="h-8 w-8 mb-2" />
                              <h3 className="text-sm opacity-90">
                                Active Users
                              </h3>
                              <p className="text-2xl font-bold">10</p>
                            </div>
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
                              <Package className="h-8 w-8 mb-2" />
                              <h3 className="text-sm opacity-90">
                                Orders Today
                              </h3>
                              <p className="text-2xl font-bold">0</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 text-white">
                              <ShoppingBag className="h-8 w-8 mb-2" />
                              <h3 className="text-sm opacity-90">My Orders</h3>
                              <p className="text-2xl font-bold">0</p>
                            </div>
                            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white">
                              <Home className="h-8 w-8 mb-2" />
                              <h3 className="text-sm opacity-90">Wishlist</h3>
                              <p className="text-2xl font-bold">0</p>
                            </div>
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
                              <Sparkles className="h-8 w-8 mb-2" />
                              <h3 className="text-sm opacity-90">Reviews</h3>
                              <p className="text-2xl font-bold">0</p>
                            </div>
                            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-6 text-white">
                              <TrendingUp className="h-8 w-8 mb-2" />
                              <h3 className="text-sm opacity-90">Points</h3>
                              <p className="text-2xl font-bold">10</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
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
