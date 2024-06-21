import { fetchArticles } from "../api";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
export default function Coding() {
  const [codingTopics, setCodingTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetchArticles()
      .then((data) => {
        setCodingTopics(
          data.filter((object) => {
            return object.topic === "coding";
          })
        );
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
      {codingTopics.map((article) => (
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
              <br />
              <br />
              <br />
              Created on {new Date(article.created_at).toLocaleDateString()}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
