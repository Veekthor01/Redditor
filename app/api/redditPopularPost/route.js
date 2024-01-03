import * as cheerio from 'cheerio';
import connectDB from '@/lib/db';
import { RedditPopularPost } from '@/lib/schema';
import { NextResponse } from "next/server";

connectDB();

export async function GET() {
  const url = 'https://old.reddit.com/r/popular';

  const response = await fetch(url,
    {
        next: {
          revalidate: 0,
        },
    }
        );
const html = await response.text();
//console.log(html);
const $ = cheerio.load(html);

  const posts = [];
  $('div.thing').each((index, element) => {
    const subreddit = $(element).find('a.subreddit').text().trim();
    const title = $(element).find('p.title > a').text().trim();
    const content = $(element).find('div.usertext-body').text().trim();
    const author = $(element).find('a.author').text().trim();
    const timestamp = $(element).find('time').attr('datetime');
    posts.push({ subreddit, title, content, author, timestamp });
  });

  //console.log(posts);

  await RedditPopularPost.insertMany(posts);

  return NextResponse.json({ posts }, { status: 200 });
};