import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { fetchArticles } from "../api";
import { useParams } from "react-router-dom";
import { Link, useSearchParams } from "react-router-dom";
import Loading from "./Loading";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "title";
  const order = searchParams.get("order") || "asc";

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(article_id)
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, [article_id]);

  const sortedArticles = [...articles].sort((a, b) => {
    let comparison = 0;
    if (sort === "title") {
      comparison = a.title.localeCompare(b.title);
    } else if (sort === "created_at") {
      comparison = new Date(a.created_at) - new Date(b.created_at);
    } else if (sort === "votes") {
      comparison = a.votes - b.votes;
    } else if (sort === "comments") {
      comparison = a.comments - b.comments;
    }

    return order === "asc" ? comparison : -comparison;
  });

  const handleSortChange = (e) => {
    setSearchParams({ sort: e.target.value, order });
  };

  const handleOrderChange = (e) => {
    setSearchParams({ sort, order: e.target.value });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div>
        <br />
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sort} onChange={handleSortChange}>
          <option value="title">Title</option>
          <option value="created_at">Date Created</option>
          <option value="votes">Votes</option>
          <option value="comments">Comments</option>
        </select>

        <label htmlFor="order">Order: </label>
        <select id="order" value={order} onChange={handleOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="articles-wrapper">
        {sortedArticles.map((article) => (
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
    </>
  );
}
