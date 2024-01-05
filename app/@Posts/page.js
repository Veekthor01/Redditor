'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { getPosts } from './fetchPost';
import delay from '@/lib/delay';
import LoadingPosts from '@/lib/loading';

export default function Posts() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    // The index of the first posts to display
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      async function fetchPosts() {
        await delay(2000);
        const posts = await getPosts();
        setPosts(posts);
        setLoading(false);
      }
      fetchPosts();
    }, []);

      if (loading) {
        return <LoadingPosts />;
      }
  
      // Display the next 9 posts
    const next = () => {
      setCurrentIndex((currentIndex + 9) % posts.length);
    };
  
    // Display the previous 9 posts
    const prev = () => {
      setCurrentIndex((currentIndex - 9 + posts.length) % posts.length);
    };
  
    return (
        <div className="p-6">
          <h1 className="text-xl pb-4 text-gray-100 text-center font-bold">Top stories</h1>
          <div className="flex items-center">
          {currentIndex > 0 && 
            <button onClick={prev} className='text-white bg-red-500 rounded-full p-2 relative left-5'>
              <FiArrowLeft />
            </button>
          }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.slice(currentIndex, currentIndex + 9).map((post) => (
                <div key={`${post._id}`} className="border rounded-xl p-2 md:p-4 h-64 overflow-auto">
                    <Link href={post.url} target="_blank" rel="noopener noreferrer">
                    <img src={post.img} alt={post.title} className="object-contain h-32 w-full" />
                  <h2 className="text-base text-red-400 font-bold pb-1">{post.subreddit}</h2>
                  <p className="text-sm text-gray-300 pb-1">{post.title}</p>
                  <p className="text-sm text-gray-400 pb-1">{post.author}</p>
                  <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </Link>
                </div>
              ))}
            </div>
            {currentIndex < posts.length - 9 && 
              <button onClick={next} className='text-white bg-red-500 rounded-full p-2 relative right-5'>
                <FiArrowRight />
              </button>
            }
          </div>
        </div>
      );
  }