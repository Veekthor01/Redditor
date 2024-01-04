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
  img: {
    type: String,
  },
  url: {
    type: String,
  },
});

export const RedditPost = mongoose.models.redditposts || mongoose.model('redditposts', redditSchema);
export const RedditPopularPost = mongoose.models.redditpopularposts || mongoose.model('redditpopularposts', redditSchema);