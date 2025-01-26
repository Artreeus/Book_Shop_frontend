import React, { useState } from "react";

const Hero = () => {


  return (
    <section className="hero px-6 py-16">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 space-y-7">
          <h1 className="her0h1">
          Welcome To <span className="">BookShopBD</span> 
          </h1>
          <p className="herop">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna velit eleifend. Amet, quis urna, a eu.",
          </p>
          <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700">
            Read More →
          </button>
        </div>
        <div className="  mt-6 lg:mt-0 ">
          <img src="hero.png" alt="hero-img" className="ms-auto" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
