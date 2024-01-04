import Link from 'next/link';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getPopularPosts() {
    const posts = (`${backendUrl}/api/redditPopularPost`);
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
    const posts = await getPopularPosts()
    return (
        <div className="p-6 max-w-sm items-center space-x-4">
            <h1 className="text-xl text-center font-bold">Reddit Popular Posts</h1>
            <ul className="list-none list-inside">
                {posts.map((post, index) => (
                    <li key={`${post.subreddit}-${post.title}-${post.timestamp}`} className="border-t border-gray-200">
                        <Link href={post.url} target="_blank" rel="noopener noreferrer">
                        <div className="p-4">
                            <h2 className="text-lg font-bold">
                            <span className="mr-3">{index + 1}.</span>
                                <span>{post.subreddit}</span>
                            </h2>
                            <p className="text-gray-700">{post.title}</p>
                            <p className="text-sm text-gray-500">{post.author}</p>
                            <p className="text-sm text-gray-500">{post.timestamp}</p>
                        </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
} 