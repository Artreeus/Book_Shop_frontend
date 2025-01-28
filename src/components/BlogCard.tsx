import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { SkeletonLoader } from './SkeletonLoader';


interface BlogCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export function BlogCard({ title, description, imageUrl }: BlogCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); // Simulate data loading
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg">
      <div className="relative h-[300px] w-full">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 transition-opacity duration-300" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-200">{description}</p>
          <button className="mt-6 px-6 py-3 bg-indigo-700 text-white rounded-lg opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 w-fit flex items-center gap-2">
            Read more
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export interface Blog {
  title: string;
  description: string;
  imageUrl: string;
}

export const blogs: Blog[] = [
  {
    title: "Discover Our Latest Literary Masterpieces",
    description: "Explore our carefully curated collection of new releases, featuring award-winning authors and compelling storytelling that will transport you to new worlds...",
    imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80"
  },
  {
    title: "Join Our Monthly Book Club",
    description: "Connect with fellow book lovers in our vibrant community. This month we're diving into contemporary fiction that challenges perspectives...",
    imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80"
  },
  {
    title: "Children's Corner: Magic of Reading",
    description: "Introduce your little ones to the joy of reading with our extensive collection of children's books, from picture books to young adult novels...",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80"
  },
  {
    title: "Rare Books & First Editions",
    description: "Discover our exclusive collection of rare books, first editions, and signed copies. Perfect for collectors and literary enthusiasts...",
    imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80"
  }
];
