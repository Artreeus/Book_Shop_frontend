import React, { useState } from 'react';
import Hero from '../components/Hero';
import FeaturedBook from '../components/FeaturedBook';
import ProductCard from '../components/ProductCard';
import Blog from '../components/Blog';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Home = () => {
  const [cart, setCart] = useState<CartItem[]>([]); // Define the cart state here

  return (
    <div>
      <Hero />
      <ProductCard cart={cart} setCart={setCart} />
      <FeaturedBook />
      <Blog />
    </div>
  );
};

export default Home;
