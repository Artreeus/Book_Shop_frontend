import { motion } from "framer-motion";
import { BookOpen, Star, ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const [currentBook, setCurrentBook] = useState(0);
  const floatingBooks = [
    { rotate: 15, x: -20, y: -30 },
    { rotate: -10, x: 40, y: 20 },
    { rotate: 25, x: -40, y: 40 },
  ];

  // Stats counter animation
  const stats = [
    { label: "Happy Readers", value: 50000, icon: Users },
    { label: "Books Available", value: 10000, icon: BookOpen },
    { label: "Five Star Reviews", value: 4800, icon: Star },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBook((prev) => (prev + 1) % floatingBooks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="relative min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -top-20 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [-50, 50, -50],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Section */}
          <motion.div
            className="w-full lg:w-1/2 space-y-8"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-800">
                Bangladesh's #1 Online Bookstore
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="text-gray-900">Welcome To</span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent italic">
                BookShopBD
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-xl text-gray-700 leading-relaxed max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Discover your next favorite read from our curated collection of over 10,000 books. 
              From timeless classics to contemporary bestsellers, we bring stories that inspire, 
              educate, and entertain.
            </motion.p>

            {/* Features */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {['Free Delivery', 'Secure Payment', '24/7 Support'].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 font-semibold flex items-center gap-2 justify-center group"
              >
                Explore Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center gap-2 justify-center"
              >
                <TrendingUp className="w-5 h-5" />
                Trending Now
              </motion.button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="flex items-center gap-8 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="text-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 border-2 border-white"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">50k+ Happy Readers</p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-600 ml-2">4.9/5 Rating</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="w-full lg:w-1/2 relative"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="relative">
              {/* Floating Book Elements */}
              {floatingBooks.map((book, index) => (
                <motion.div
                  key={index}
                  className={`absolute w-20 h-28 bg-gradient-to-r ${
                    index === 0 ? 'from-purple-400 to-blue-400' :
                    index === 1 ? 'from-orange-400 to-red-400' :
                    'from-green-400 to-teal-400'
                  } rounded-lg shadow-lg ${
                    currentBook === index ? 'opacity-100' : 'opacity-40'
                  }`}
                  style={{
                    top: `${book.y}%`,
                    left: `${book.x}%`,
                    transform: `rotate(${book.rotate}deg)`,
                  }}
                  animate={{
                    y: currentBook === index ? [0, -10, 0] : 0,
                    scale: currentBook === index ? 1.1 : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Main Hero Image */}
              <motion.img
                src="hero.png"
                alt="BookShopBD Hero"
                className="relative z-10 w-full max-w-lg mx-auto drop-shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />

              {/* Decorative Circle */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-200 to-blue-200 rounded-full -z-10 opacity-30"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ y: -5 }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <motion.h3
                className="text-3xl font-bold text-gray-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              >
                {stat.value.toLocaleString()}+
              </motion.h3>
              <p className="text-gray-600 font-medium mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;