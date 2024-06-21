import { fetchArticles } from "../api";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";

export default function Football() {
  const [footballTopics, setFootballTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles()
      .then((data) => {
        const filteredArticles = data.filter(
          (object) => object.topic === "football"
        );
        setFootballTopics(filteredArticles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
      });
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="articles-wrapper">
      {footballTopics.map((article) => (
        <article className="article-container" key={article.article_id}>
          <Link to={`/articles/${article.article_id}`}>
            <p className="article-title">{article.title}</p>
          </Link>
          <img
            src={article.article_img_url}
            alt={article.title}
            className="article-image"
          />
          <div className="article-details">
            <p className="article-votes">Total Votes: {article.votes}</p>
            <p className="article-created">
              Created on {new Date(article.created_at).toLocaleDateString()}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
