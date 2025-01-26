import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { useState } from 'react';
import Footer from './components/Footer';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  return (
    <Router> {/* Wrap the entire app in Router */}
       <Navbar cart={cart} /> {/* Place Navbar here so it appears on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-products" element={<Products />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
