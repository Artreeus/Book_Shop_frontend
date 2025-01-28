
const Hero = () => {


  return (
    <section className="hero px-6 py-16">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 space-y-7">
          <h1 className="her0h1">
          Welcome To <span className="italic ">BookShopBD</span> 
          </h1>
          <p className="herop">
            A place where you can find your favorite books and novels. We have
            a wide range of collection from different authors and genres.
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
