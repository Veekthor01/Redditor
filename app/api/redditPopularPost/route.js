import * as cheerio from 'cheerio';
import connectDB from '@/lib/db';
import { RedditPopularPost } from '@/lib/schema';
import { NextResponse } from "next/server";

connectDB();

export async function GET() {
  // Check if there are any posts in the database
  let posts = await RedditPopularPost.find();
  if (posts.length > 0) {
     // If there are posts, return them
    return NextResponse.json({ posts }, { status: 200 });
  }

  const url = 'https://old.reddit.com/r/popular';
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  posts = [];
  $('div.thing').each((index, element) => {
    const subreddit = $(element).find('a.subreddit').text().trim();
    const title = $(element).find('p.title > a').text().trim();
    const url = $(element).find('p.title > a').attr('href');
    const author = $(element).find('a.author').text().trim();
    const timestamp = $(element).find('time').attr('datetime');
    posts.push({ subreddit, title, author, timestamp, url });
  });

  await RedditPopularPost.insertMany(posts);

  // Fetch the data from the database
  const dbPosts = await RedditPopularPost.find();

  return NextResponse.json({ posts: dbPosts }, { status: 200 });
};