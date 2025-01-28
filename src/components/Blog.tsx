import { BookOpen } from 'lucide-react';
import { BlogCard, blogs } from './BlogCard';


function Blog() {
  return (
    
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="w-12 h-16 text-[#393280]" />
          <h1 className="text-[#393280] text-5xl py-6">Chapter & Verse </h1>
        </div>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover the latest from our bookshop, where every page turns into an adventure and every story finds its reader.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              title={blog.title}
              description={blog.description}
              imageUrl={blog.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;