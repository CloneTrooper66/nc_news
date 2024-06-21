import { fetchArticles } from "../api";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
export default function Cooking() {
  const [cookingTopics, setCookingTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetchArticles()
      .then((data) => {
        setCookingTopics(
          data.filter((object) => {
            return object.topic === "cooking";
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
      {cookingTopics.map((article) => (
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
