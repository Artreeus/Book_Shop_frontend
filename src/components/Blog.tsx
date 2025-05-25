import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

// Blog Component
function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Posts', icon: Sparkles },
    { id: 'new', name: 'New Releases', icon: TrendingUp },
    { id: 'reviews', name: 'Book Reviews', icon: BookOpen },
    { id: 'events', name: 'Events', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-bounce">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Chapter & Verse
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the latest from our bookshop, where every page turns into an adventure 
              and every story finds its reader.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((blog, index) => (
              <BlogCard
                key={index}
                title={blog.title}
                description={blog.description}
                imageUrl={blog.imageUrl}
                category={blog.category}
                author={blog.author}
                readTime={blog.readTime}
                date={blog.date}
                index={index}
              />
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-12 text-center">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 mx-auto">
              Load More Articles
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

    
    </div>
  );
}

// Enhanced BlogCard Component
interface BlogCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  author: string;
  readTime: string;
  date: string;
  index: number;
}

export function BlogCard({ title, description, imageUrl, category, author, readTime, date, index }: BlogCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800 + (index * 200));
    return () => clearTimeout(timer);
  }, [index]);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div 
      className="relative group overflow-hidden rounded-2xl shadow-xl bg-white transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-purple-600 rounded-full text-sm font-semibold shadow-lg">
            {category}
          </span>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-3xl font-bold text-white mb-3 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
            {title}
          </h3>
          <p className="text-gray-200 line-clamp-2 mb-4 transform transition-all duration-300 opacity-90 group-hover:opacity-100">
            {description}
          </p>
          
          {/* Meta Information */}
          <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {readTime}
            </span>
            <span>•</span>
            <span>{author}</span>
            <span>•</span>
            <span>{date}</span>
          </div>

          {/* Read More Button */}
          <button className={`mt-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg transform transition-all duration-500 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } hover:from-purple-700 hover:to-blue-700 w-fit flex items-center gap-2 shadow-lg`}>
            Read Full Article
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className={`absolute inset-0 border-2 border-purple-400 rounded-2xl transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
}

// Skeleton Loader Component
export function SkeletonLoader() {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white">
      <div className="animate-pulse">
        <div className="h-[300px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-shimmer" />
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
          <div className="h-8 bg-gray-300 rounded w-3/4" />
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-2/3" />
          <div className="flex gap-4 mt-4">
            <div className="h-3 bg-gray-300 rounded w-16" />
            <div className="h-3 bg-gray-300 rounded w-20" />
            <div className="h-3 bg-gray-300 rounded w-16" />
          </div>
        </div>
      </div>
      
    </div>
  );
}

// Enhanced Blog Data
export interface Blog {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  author: string;
  readTime: string;
  date: string;
}

export const blogs: Blog[] = [
  {
    title: "Discover Our Latest Literary Masterpieces",
    description: "Explore our carefully curated collection of new releases, featuring award-winning authors and compelling storytelling that will transport you to new worlds and expand your imagination beyond boundaries.",
    imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80",
    category: "New Releases",
    author: "Sarah Chen",
    readTime: "5 min read",
    date: "May 24, 2025"
  },
  {
    title: "Join Our Monthly Book Club Adventures",
    description: "Connect with fellow book lovers in our vibrant community. This month we're diving into contemporary fiction that challenges perspectives and sparks meaningful conversations about life, love, and literature.",
    imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80",
    category: "Community",
    author: "Michael Roberts",
    readTime: "3 min read",
    date: "May 22, 2025"
  },
  {
    title: "Children's Corner: The Magic of Reading",
    description: "Introduce your little ones to the joy of reading with our extensive collection of children's books, from enchanting picture books to thrilling young adult novels that inspire young minds to dream big.",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80",
    category: "Kids & Teens",
    author: "Emma Thompson",
    readTime: "4 min read",
    date: "May 20, 2025"
  },
  {
    title: "Rare Books & First Editions Unveiled",
    description: "Discover our exclusive collection of rare books, first editions, and signed copies. Perfect for collectors and literary enthusiasts seeking unique treasures to add to their personal libraries.",
    imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80",
    category: "Collections",
    author: "James Mitchell",
    readTime: "6 min read",
    date: "May 18, 2025"
  }
];

export default Blog;