import { Link, Route, Routes, Navigate } from 'react-router-dom';
import { BookForm } from '../components/BookForm';
import { BookList } from '../components/BookList';
import { UserManagement } from '../components/UserManagment';

// Helper function to get the user role from localStorage
const getUserRole = () => {
  const storedData = localStorage.getItem('persist:root');
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    const role = parsedData.auth ? JSON.parse(parsedData.auth).user?.role : null;
    return role;
  }
  return null;
};




const Sidebar = ({ role  }) => (
  <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
    <h2 className="text-xl font-bold p-4 border-b border-gray-700">Dashboard</h2>
    <nav className="flex-1">
      <ul className="space-y-2 p-4">
        {role === 'admin' && (
          <>
            <li><Link to="/dashboard/book-form" className="block p-2 rounded hover:bg-gray-700">Book Form</Link></li>
            <li><Link to="/dashboard/book-list" className="block p-2 rounded hover:bg-gray-700">Book List</Link></li>
            <li><Link to="/dashboard/user-management" className="block p-2 rounded hover:bg-gray-700">User Management</Link></li>
            <li><Link to="/dashboard/admin-route2" className="block p-2 rounded hover:bg-gray-700">Admin Route 2</Link></li>
            <li><Link to="/dashboard/admin-route3" className="block p-2 rounded hover:bg-gray-700">Admin Route 3</Link></li>
          </>
        )}
        {role === 'user' && (
          <>
            <li><Link to="/dashboard/user-route1" className="block p-2 rounded hover:bg-gray-700">User Route 1</Link></li>
            <li><Link to="/dashboard/user-route2" className="block p-2 rounded hover:bg-gray-700">User Route 2</Link></li>
            <li><Link to="/dashboard/user-route3" className="block p-2 rounded hover:bg-gray-700">User Route 3</Link></li>
          </>
        )}
      </ul>
    </nav>
  </div>
);

const Dashboard = () => {
  const role = getUserRole();

  if (!role) {
    return <Navigate to="/login" replace />; // Redirect to login if no role is found
  }

  return (
<div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 bg-gray-100 p-6">
        <Routes>
          <Route path="book-form" element={<BookForm />} />
          <Route path="book-list" element={<BookList />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route
            path="*"
            element={
              <div className="text-center text-4xl mt-10">
                <p>Welcome to The Dashboard {role}</p>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
