const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getPosts() {
    const posts = `${backendUrl}/api/redditPost`;
    try { 
        const response = await fetch(posts,
            {
                next: {
                  revalidate: 0, // 24 hours in seconds 86400
                },
            });
        const data = await response.json();
        return data.posts;
    } catch (err) {
        console.error(err);
        throw err;
    }
}