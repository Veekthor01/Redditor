//const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getPosts() {
    const posts = `http://localhost:3000/api/redditPost`;
    try { 
        const response = await fetch(posts);
        const data = await response.json();
        return data.posts;
    } catch (err) {
        console.error(err);
        throw err;
    }
}