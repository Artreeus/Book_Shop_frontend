import {
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ArrowRight,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    // Simulate subscription
    setTimeout(() => {
      setIsSubscribing(false);
      setEmail("");
      // You can add toast notification here
    }, 2000);
  };

  return (
    <footer className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-6 sm:p-8 md:p-12 transform hover:scale-[1.02] transition-all duration-300">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                {/* Left Side */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg animate-pulse">
                      <Mail className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold">
                      Subscribe to Our Newsletter
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Get the latest updates on new books, exclusive offers, and
                    literary events!
                  </p>
                </div>

                {/* Right Side - Form */}
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg focus:outline-none focus:border-white/40 text-white placeholder-gray-400 transition-all duration-200"
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubscribing ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 group">
                <img
                  src="https://i.ibb.co.com/6RGzpwZ/erasebg-transformed-resized-679904588a746.webp"
                  alt="Logo"
                  className="h-30 w-auto transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <p className="text-gray-300 leading-relaxed">
                BookShopBd is Bangladesh's premier bookstore offering a vast
                collection of books and ebooks. Discover your next favorite read
                with us!
              </p>
              <div className="flex space-x-3">
                {[
                  { Icon: Facebook, color: "hover:bg-blue-600" },
                  { Icon: Linkedin, color: "hover:bg-blue-700" },
                  { Icon: Twitter, color: "hover:bg-sky-500" },
                  { Icon: Youtube, color: "hover:bg-red-600" },
                ].map(({ Icon, color }, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`p-3 bg-white/10 backdrop-blur-lg rounded-lg ${color} hover:scale-110 transform transition-all duration-200 group`}
                  >
                    <Icon className="w-5 h-5 group-hover:animate-bounce" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded"></div>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  "Home",
                  "About Us",
                  "All Books",
                  "E-Books",
                  "New Releases",
                  "Best Sellers",
                  "Contact",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white flex items-center gap-2 group transition-all duration-200"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {item}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Latest News */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded"></div>
                Latest News
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Summer Reading Festival 2025",
                    date: "15 May 2025",
                    description:
                      "Join us for exclusive discounts and author meet-ups",
                  },
                  {
                    title: "New Mystery Collection Launch",
                    date: "10 May 2025",
                    description:
                      "Discover thrilling new titles from bestselling authors",
                  },
                ].map((news, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer transform transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg group-hover:from-orange-500/30 group-hover:to-red-500/30 transition-all duration-200">
                        <Calendar className="w-4 h-4 text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white group-hover:text-orange-400 transition-colors duration-200">
                          {news.title}
                        </h4>
                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                          {news.description}
                        </p>
                        <span className="text-xs text-orange-400 mt-2 block">
                          {news.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded"></div>
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-200">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">123 Book Street, Dhaka 1205</p>
                    <p className="text-gray-400 text-sm">Bangladesh</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-200">
                    <Phone className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-gray-300">+880 1234-567890</p>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-200">
                    <Mail className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-gray-300">info@bookshopbd.com</p>
                </div>
              </div>

              {/* Special Badge */}
              <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-lg rounded-lg border border-orange-500/20">
                <div className="flex items-center gap-2 text-orange-400">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-semibold">
                    Open 7 Days a Week!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-orange-400" />
                <p className="text-gray-400 text-sm">
                  © 2025{" "}
                  <span className="text-white font-semibold">BookShopBd.</span>{" "}
                  All Rights Reserved.
                </p>
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 group"
                >
                  Privacy Policy
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
                <span className="text-gray-600">•</span>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 group"
                >
                  Terms of Service
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
                <span className="text-gray-600">•</span>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 group"
                >
                  Sitemap
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
