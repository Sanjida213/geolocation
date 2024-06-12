import { useState, useEffect } from "react";
import "./News.scss";
import { Article, NewsApiResponse } from "../../../types/NewsData";

const News = () => {
  const [newsData, setNewsData] = useState<Article[] | null>(null);

  const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const getNews = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${NEWS_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Error fetching news data: ${res.statusText}`);
      }
      const data: NewsApiResponse = await res.json();
      console.log('Fetched news data:', data);
      setNewsData(data.articles);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="news-container">
      <h1>Top Headlines</h1>
      <div className="news-articles">
        {newsData && (
          newsData.map((article, index) => (
            <div key={index} className="news-article">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default News;
