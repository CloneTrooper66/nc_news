import { fetchArticles } from "../api";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
export default function Cooking() {
  const [cookingTopics, setCookingTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState("a_to_z");
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

  const sortedArticles = [...cookingTopics].sort((a, b) => {
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
