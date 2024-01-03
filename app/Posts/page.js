const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getPosts() {
    const posts = (`${backendUrl}/api/redditPost`);
    try { 
        const response = await fetch(posts, {
            next: {
              revalidate: 0,
            },
        });
        const data = await response.json();
        return data.posts;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export default async function Posts() {
    const posts = await getPosts();
    return (
        <div>
            <h1>Reddit Posts</h1>
            <div>
                {posts.map((post) => (
                    <div key={`${post.subreddit}-${post.title}-${post.timestamp}`}>
                        <h2>{post.subreddit}</h2>
                        <p>{post.title}</p>
                        <p>{post.author}</p>
                        <p>{post.timestamp}</p>
                    </div>
                ))}
            </div>
        </div>
    );
} 