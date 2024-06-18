import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { fetchArticles } from "../api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    fetchArticles(article_id)
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, [article_id]);

  return (
    <div className="articles-wrapper">
      {articles.map((article) => (
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
            <p className="article-votes">
              Total Votes: {article.votes}
              <button className="like-button">Like</button>
              <button className="dislike-button">Dislike</button>
            </p>
            <p className="article-created">
              Created on {new Date(article.created_at).toLocaleDateString()}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
