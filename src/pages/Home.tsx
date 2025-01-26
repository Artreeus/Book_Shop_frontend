import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto ">
      <div className='flex justify-between items-center '> 
        <div>
          <h1>Home</h1>
          <p>Home page content</p>
          <button>Click me</button>
        </div>
        <div><img src="hero.png" alt="" /></div>
      </div>
    </div>
  );
};

export default Home;
