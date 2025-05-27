import  { useState  } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Calendar, Clock, User, ArrowRight, Search, 
  Filter, TrendingUp, Star, MessageCircle, Heart, Bookmark,
  ChevronLeft, ChevronRight, Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  tags: string[];
  image: string;
  readTime: string;
  publishedDate: string;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
}

const BlogsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([]);
  const postsPerPage = 6;

  // Categories with icons and colors
  const categories = [
    { id: 'all', name: 'All Posts', icon: BookOpen, color: 'from-purple-500 to-blue-500' },
    { id: 'reviews', name: 'Book Reviews', icon: Star, color: 'from-yellow-500 to-orange-500' },
    { id: 'guides', name: 'Reading Guides', icon: BookOpen, color: 'from-green-500 to-teal-500' },
    { id: 'interviews', name: 'Author Interviews', icon: User, color: 'from-pink-500 to-purple-500' },
    { id: 'news', name: 'Literary News', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
  ];

  // Mock blog data
  const allBlogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Art of Building a Personal Library: A Comprehensive Guide",
      excerpt: "Transform your book collection into a curated personal library that reflects your journey as a reader. Learn organization tips, preservation techniques, and display ideas.",
      content: "Full content here...",
      author: {
        name: "Sarah Ahmed",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        role: "Head Librarian"
      },
      category: "guides",
      tags: ["library", "organization", "book care"],
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800",
      readTime: "8 min read",
      publishedDate: "May 24, 2025",
      views: 1234,
      likes: 89,
      comments: 12,
      featured: true
    },
    {
      id: 2,
      title: "Review: 'The Midnight Garden' - A Masterpiece of Modern Fiction",
      excerpt: "An in-depth review of this year's most talked-about novel. Does it live up to the hype? We explore the intricate plot, memorable characters, and stunning prose.",
      content: "Full content here...",
      author: {
        name: "Rahim Khan",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        role: "Book Critic"
      },
      category: "reviews",
      tags: ["fiction", "review", "2025 releases"],
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800",
      readTime: "6 min read",
      publishedDate: "May 23, 2025",
      views: 892,
      likes: 67,
      comments: 8,
      featured: false
    },
    {
      id: 3,
      title: "Exclusive Interview: Bestselling Author Discusses New Release",
      excerpt: "We sit down with award-winning author Jane Doe to discuss her latest novel, writing process, and what readers can expect from her upcoming works.",
      content: "Full content here...",
      author: {
        name: "Fatima Begum",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        role: "Editor-in-Chief"
      },
      category: "interviews",
      tags: ["author interview", "exclusive", "new release"],
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800",
      readTime: "10 min read",
      publishedDate: "May 22, 2025",
      views: 2156,
      likes: 156,
      comments: 23,
      featured: true
    },
    {
      id: 4,
      title: "Bangladesh Book Fair 2025: Everything You Need to Know",
      excerpt: "Your complete guide to this year's biggest literary event. From must-visit stalls to author signings and exclusive book launches.",
      content: "Full content here...",
      author: {
        name: "Karim Ali",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        role: "Events Coordinator"
      },
      category: "news",
      tags: ["book fair", "events", "bangladesh"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
      readTime: "5 min read",
      publishedDate: "May 21, 2025",
      views: 3421,
      likes: 234,
      comments: 45,
      featured: false
    },
    {
      id: 5,
      title: "10 Must-Read Bengali Classics for Modern Readers",
      excerpt: "Rediscover the timeless beauty of Bengali literature with our curated list of classics that continue to resonate with contemporary readers.",
      content: "Full content here...",
      author: {
        name: "Sarah Ahmed",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        role: "Head Librarian"
      },
      category: "guides",
      tags: ["bengali literature", "classics", "reading list"],
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800",
      readTime: "7 min read",
      publishedDate: "May 20, 2025",
      views: 1876,
      likes: 145,
      comments: 19,
      featured: false
    },
    {
      id: 6,
      title: "The Rise of Digital Reading: E-books vs Physical Books",
      excerpt: "Exploring the ongoing debate between digital and physical books. We analyze the pros and cons of each format and what it means for the future of reading.",
      content: "Full content here...",
      author: {
        name: "Rahim Khan",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        role: "Book Critic"
      },
      category: "news",
      tags: ["technology", "e-books", "future of reading"],
      image: "https://images.unsplash.com/photo-1428790067070-0ebf4418d9d8?w=800",
      readTime: "9 min read",
      publishedDate: "May 19, 2025",
      views: 987,
      likes: 78,
      comments: 15,
      featured: false
    }
  ];

  // Filter and sort posts
  const filteredPosts = allBlogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.views - a.views;
      case 'mostLiked':
        return b.likes - a.likes;
      case 'latest':
      default:
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const displayedPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const toggleBookmark = (postId: number) => {
    setBookmarkedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  // Featured post (first featured post or first post)
  const featuredPost = allBlogPosts.find(post => post.featured) || allBlogPosts[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-12 px-6">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="inline-flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-bounce">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Chapter & Verse Blog
                </h1>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover literary insights, author interviews, book reviews, and the latest from the world of books
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles, tags, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="px-6 pb-12">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="h-96 lg:h-full overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-semibold">
                        Featured
                      </span>
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {featuredPost.views.toLocaleString()} views
                      </span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{featuredPost.author.name}</p>
                        <p className="text-sm text-gray-500">
                          {featuredPost.publishedDate} • {featuredPost.readTime}
                        </p>
                      </div>
                    </div>
                    <Link to={`/blog/${featuredPost.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 flex items-center gap-2 group"
                      >
                        Read Full Article
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Categories and Filters */}
        <section className="px-6 pb-12">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              {/* Categories */}
              <div className="flex-1">
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-full font-medium transition-all ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                      }`}
                      style={{
                        backgroundImage: selectedCategory === category.id 
                          ? `linear-gradient(to right, var(--tw-gradient-stops))`
                          : undefined,
                        '--tw-gradient-from': selectedCategory === category.id ? category.color.split(' ')[1] : undefined,
                        '--tw-gradient-to': selectedCategory === category.id ? category.color.split(' ')[3] : undefined,
                      } as any}
                    >
                      <div className="flex items-center gap-2">
                        <category.icon className="w-4 h-4" />
                        {category.name}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white rounded-lg shadow border-0 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Most Popular</option>
                  <option value="mostLiked">Most Liked</option>
                </select>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {displayedPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                  >
                    {/* Image */}
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 capitalize">
                          {post.category}
                        </span>
                      </div>
                      {/* Bookmark Button */}
                      <button
                        onClick={() => toggleBookmark(post.id)}
                        className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                      >
                        <Bookmark
                          className={`w-5 h-5 ${
                            bookmarkedPosts.includes(post.id)
                              ? 'fill-purple-600 text-purple-600'
                              : 'text-gray-600'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.publishedDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Author */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{post.author.name}</p>
                            <p className="text-xs text-gray-500">{post.author.role}</p>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => toggleLike(post.id)}
                            className="flex items-center gap-1 text-gray-500 hover:text-purple-600 transition-colors"
                          >
                            <Heart
                              className={`w-5 h-5 ${
                                likedPosts.includes(post.id)
                                  ? 'fill-red-500 text-red-500'
                                  : ''
                              }`}
                            />
                            <span className="text-sm">{post.likes}</span>
                          </button>
                          <span className="flex items-center gap-1 text-gray-500">
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm">{post.comments}</span>
                          </span>
                        </div>
                        <Link to={`/blog/${post.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-purple-600 font-medium hover:text-purple-700 flex items-center gap-1 group"
                          >
                            Read More
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                      currentPage === index + 1
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </section>

      
       
      </div>

      
    </div>
  );
};

export default BlogsPage;