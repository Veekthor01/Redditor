'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { getPosts } from './fetchPost';

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      async function fetchPosts() {
        const posts = await getPosts();
        setPosts(posts);
      }
      fetchPosts();
    }, []);
  
    const next = () => {
      setCurrentIndex((currentIndex + 9) % posts.length);
    };
  
    const prev = () => {
      setCurrentIndex((currentIndex - 9 + posts.length) % posts.length);
    };
  
    return (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Reddit Posts</h1>
          <div className="flex items-center">
          {currentIndex > 0 && <button onClick={prev}><FiArrowLeft /></button>}
            <div className="grid grid-cols-3 gap-4">
              {posts.slice(currentIndex, currentIndex + 9).map((post) => (
                <div key={`${post._id}`} className="border rounded-lg p-4 h-64 overflow-auto">
                    <Link href={post.url} target="_blank" rel="noopener noreferrer">
                    <img src={post.img} alt={post.title} className="object-contain h-32 w-full" />
                  <h2 className="text-lg font-bold">{post.subreddit}</h2>
                  <p className="text-gray-700">{post.title}</p>
                  <p className="text-sm text-gray-500">{post.author}</p>
                  <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </Link>
                </div>
              ))}
            </div>
            {currentIndex < posts.length - 9 && <button onClick={next}><FiArrowRight /></button>}
          </div>
        </div>
      );
  }