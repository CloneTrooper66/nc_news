import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { fetchArticles } from "../api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
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
  const [sort, setSort] = useState("a_to_z");

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
    if (sort === "a_to_z") {
      return a.title.localeCompare(b.title);
    } else if (sort === "z_to_a") {
      return b.title.localeCompare(a.title);
    } else if (sort === "newest") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sort === "oldest") {
      return new Date(a.created_at) - new Date(b.created_at);
    } else if (sort === "most_votes") {
      return b.votes - a.votes;
    } else if (sort === "least_votes") {
      return a.votes - b.votes;
    }
  });

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div>
        <br />
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="a_to_z">Title: A - Z</option>
          <option value="z_to_a">Title: Z - A</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="most_votes">Most Votes</option>
          <option value="least_votes">Least Votes</option>
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
