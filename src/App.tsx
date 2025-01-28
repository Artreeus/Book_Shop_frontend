import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; // Import Router and useLocation
import Home from './pages/Home';
import Products from './pages/Products';
import AboutUs from './pages/AboutUs';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import { useState } from 'react';
import Footer from './components/shared-component/Footer';
import { ProductDetails } from './pages/ProductDetails';
import Navbar from './components/shared-component/Navbar';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

// Create a separate component to handle conditional footer rendering
function FooterWrapper() {
  const location = useLocation(); // Get current location

  // Check if the current path is Login or Register page
  const showFooter = !['/login', '/register' ,"/dashboard", "/dashboard/*"].includes(location.pathname);

  return showFooter ? <Footer /> : null; // Render Footer conditionally
}

function App() {
  const [cart] = useState<CartItem[]>([]);

  return (
    <Router>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-products" element={<Products />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <FooterWrapper /> {/* Render FooterWrapper here */}
    </Router>
  );
}

export default App;
