import React, { useState } from 'react';
import Hero from '../components/Hero';
import FeaturedBook from '../components/FeaturedBook';
import ProductCard from '../components/ProductCard';

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
    </div>
  );
};

export default Home;
