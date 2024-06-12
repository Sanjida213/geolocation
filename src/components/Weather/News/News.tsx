import { useState, useEffect } from "react";
import "./News.scss";
import { Article, NewsApiResponse } from "../../../types/NewsData";

const News = () => {
  const [newsData, setNewsData] = useState<Article[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const getNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=46e560414cfb4eacb2210f131be112ba`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Error fetching news data: ${res.statusText}`);
      }
      const data: NewsApiResponse = await res.json();
      console.log('Fetched news data:', data);
      setNewsData(data.articles);
    } catch (error: any) {
      console.error('Error fetching news data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="news__container">
      <h1>Top BBC News Headlines</h1>
      {loading && <p>Loading news...</p>}
      {error && <p className="error">{error}</p>}
      <div className="news__articles">
        {newsData && (
          newsData.slice(0,3).map((article, index) => (
            <div key={index} className="news__article">
              <h2 className="news__article-title">{article.title}</h2>
              <p className="news__article-description">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="news__article-link">
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
