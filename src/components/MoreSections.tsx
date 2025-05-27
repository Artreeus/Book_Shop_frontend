import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, Users, Award, Clock, ArrowRight, Star, 
  Truck, Shield, HeartHandshake, Quote, ChevronLeft, 
  ChevronRight, Sparkles,  Gift
} from 'lucide-react';

// Section 1: Why Choose Us
const WhyChooseUs = () => {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $50. Fast delivery to your doorstep within 3-5 business days.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "Your transactions are protected with bank-level security and encryption.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: HeartHandshake,
      title: "24/7 Support",
      description: "Our customer service team is here to help you anytime, anywhere.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "100% authentic books with money-back guarantee if not satisfied.",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-4">
            Why Choose <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">BookShopBD</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the best online book shopping with our premium services and customer-first approach
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center group hover:shadow-2xl transition-all duration-300"
            >
              <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Section 2: Customer Testimonials
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Sarah Ahmed",
      role: "Book Enthusiast",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      content: "BookShopBD has transformed my reading experience! The collection is vast, delivery is swift, and the customer service is exceptional. I've found rare books I couldn't find anywhere else.",
      rating: 5
    },
    {
      id: 2,
      name: "Rahim Khan",
      role: "Literature Teacher",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      content: "As an educator, I rely on BookShopBD for both classic literature and modern publications. Their academic section is comprehensive, and the prices are very competitive.",
      rating: 5
    },
    {
      id: 3,
      name: "Fatima Begum",
      role: "Parent",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      content: "Finding quality children's books has never been easier. My kids love the variety, and I appreciate the educational value. The gift wrapping service is a wonderful touch!",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
            <Users className="w-5 h-5 text-purple-600" />
            <span className="text-purple-800 font-semibold">Customer Reviews</span>
          </div>
          <h2 className="text-5xl font-bold mb-4">
            What Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Readers Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made BookShopBD their preferred bookstore
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
          >
            <Quote className="w-16 h-16 text-purple-200 mb-6" />
            
            <p className="text-xl text-gray-700 leading-relaxed mb-8 italic">
              "{testimonials[currentIndex].content}"
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonials[currentIndex].name}</h4>
                  <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                </div>
              </div>
              
              <div className="flex gap-1">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'w-8 bg-gradient-to-r from-purple-600 to-blue-600' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Section 3: Special Offers / CTA
const SpecialOffers = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"></div>
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Gift className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Limited Time Offer</span>
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Summer Reading
              <br />
              <span className="text-yellow-300">Festival Sale!</span>
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-white">
                <div className="w-5 h-5 bg-yellow-300 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-purple-900" />
                </div>
                <span className="text-lg">Up to 50% off on selected titles</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="w-5 h-5 bg-yellow-300 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-purple-900" />
                </div>
                <span className="text-lg">Free bookmark with every purchase</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="w-5 h-5 bg-yellow-300 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-purple-900" />
                </div>
                <span className="text-lg">Extra 10% off for new members</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-300 text-purple-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors shadow-lg flex items-center gap-2 group"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right Content - Timer */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 inline-block">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 justify-center lg:justify-start">
                <Clock className="w-6 h-6" />
                Offer Ends In
              </h3>
              
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-3xl lg:text-4xl font-bold text-white">
                        {String(value).padStart(2, '0')}
                      </div>
                    </div>
                    <p className="text-white/80 text-sm mt-2 capitalize">{unit}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-center lg:justify-start gap-2 text-white">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-sm">Don't miss out on these amazing deals!</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Export all sections
export default function HomePageSections() {
  return (
    <>
      <WhyChooseUs />
      <Testimonials />
      <SpecialOffers />
    </>
  );
}