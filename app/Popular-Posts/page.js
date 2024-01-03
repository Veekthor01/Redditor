const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getPopularPosts() {
    const posts = (`${backendUrl}/api/redditPopularPost`);
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

export default async function PopularPosts() {
    const posts = await getPopularPosts()
    return (
        <div>
            <h1>Reddit Popular Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={`${post.subreddit}-${post.title}-${post.timestamp}`}>
                        <h2>{post.subreddit}</h2>
                        <p>{post.title}</p>
                        <p>{post.author}</p>
                        <p>{post.timestamp}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
} 