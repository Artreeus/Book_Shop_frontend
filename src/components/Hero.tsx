import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.section
      className="hero px-6 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center">
        {/* Text Section */}
        <motion.div
          className="w-full lg:w-1/2 space-y-7"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="her0h1">
            Welcome To <span className="italic">BookShopBD</span>
          </h1>
          <p className="herop">
            A place where you can find your favorite books and novels. We have
            a wide range of collection from different authors and genres.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700"
          >
            Read More →
          </motion.button>
        </motion.div>
        <motion.div
          className="mt-6 lg:mt-0"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <img src="hero.png" alt="hero-img" className="ms-auto" />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
