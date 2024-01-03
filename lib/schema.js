import mongoose from 'mongoose';

const redditSchema = new mongoose.Schema({
  subreddit: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  author: {
    type: String,
  },
  timestamp: {
    type: String,
  },
});

export const RedditPost = mongoose.models.RedditPost || mongoose.model('RedditPost', redditSchema);
export const RedditPopularPost = mongoose.models.RedditPopularPost || mongoose.model('RedditPopularPost', redditSchema);