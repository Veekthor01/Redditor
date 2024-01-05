# Redditor

### This is a web application that scrapes data from Reddit and displays popular posts. It fetches data from Reddit, parses the HTML to extract specific information.

## Features
- It fetches data from Reddit, using Cheerio for server-side HTML parsing.
- Stores scraped data in a MongoDB database(to avoid refetching from reddit on every request).(Optional)
- Displays fetched information

## Built with
* NextJS
* Mongodb

## Getting Started

#### To get started with the Redditor, clone or download the repository and follow these steps:
Navigate to the project directory e.g
```
cd redditor
```
Install dependencies:
```
yarn add
```
Enter your MongoDB URI and Backend URL in .env.local
```
MONGODB_URI=Enter your MongoDB URI
NEXT_PUBLIC_BACKEND_URL=localhost:3000
```
Start the dev server:
```
yarn dev
```
