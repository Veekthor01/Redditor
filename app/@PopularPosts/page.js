'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import './popularPosts.css';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getPopularPosts() {
    const posts = `${backendUrl}/api/redditPopularPost`;
    try { 
        const response = await fetch(posts);
        const data = await response.json();
        return data.posts;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export default function PopularPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const posts = await getPopularPosts();
            setPosts(posts);
        }

        fetchPosts();
    }, []);

    return (
        <div className="p-6 pl-1 max-w-sm items-center space-x-4 overflow-auto h-screen scrollbar-hide md:block hidden">
            <h1 className="text-lg pb-2 text-gray-100 text-center font-bold">Reddit Popular Posts</h1>
            <h2 className="text-sm text-gray-100 text-center">These are the top 25 posts on reddit</h2>
            <ul className="list-none list-inside">
                {posts.map((post, index) => (
                    <li key={`${post.subreddit}-${post.title}-${post.timestamp}`} className="border-t border-gray-200">
                        <Link href={post.url} target="_blank" rel="noopener noreferrer">
                        <div className="p-4">
                            <h2 className="lg:text-base text-sm text-red-400 font-bold pb-1">
                            <span className="mr-3">{index + 1}.</span>
                                <span>{post.subreddit}</span>
                            </h2>
                            <p className="text-sm md:text text-gray-300 pb-1">{post.title}</p>
                            <p className="text-sm text-gray-400 pb-1">{post.author}</p>
                            <p className="text-sm text-gray-500">{post.timestamp}</p>
                        </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/*import Link from 'next/link';
import delay from '@/lib/delay';
import './popularPosts.css';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getPopularPosts() {
    const posts = `${backendUrl}/api/redditPopularPost`;
    try { 
        const response = await fetch(posts);
        const data = await response.json();
        return data.posts;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export default async function PopularPosts() {
    await delay(2000);
    const posts = await getPopularPosts()
    return (
        <div className="p-6 pl-1 max-w-sm items-center space-x-4 overflow-auto h-screen scrollbar-hide md:block hidden">
            <h1 className="text-lg pb-2 text-gray-100 text-center font-bold">Reddit Popular Posts</h1>
            <h2 className="text-sm text-gray-100 text-center">These are the top 25 posts on reddit</h2>
            <ul className="list-none list-inside">
                {posts.map((post, index) => (
                    <li key={`${post.subreddit}-${post.title}-${post.timestamp}`} className="border-t border-gray-200">
                        <Link href={post.url} target="_blank" rel="noopener noreferrer">
                        <div className="p-4">
                            <h2 className="lg:text-base text-sm text-red-400 font-bold pb-1">
                            <span className="mr-3">{index + 1}.</span>
                                <span>{post.subreddit}</span>
                            </h2>
                            <p className="text-sm md:text text-gray-300 pb-1">{post.title}</p>
                            <p className="text-sm text-gray-400 pb-1">{post.author}</p>
                            <p className="text-sm text-gray-500">{post.timestamp}</p>
                        </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
} */