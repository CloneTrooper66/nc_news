import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticles, fetchComments } from "../api";
import "ldrs/leapfrog";
import Loading from "./Loading";
import ErrorComponent from "./ErrorComponent";

export default function ArticleDetail() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchArticles(article_id)
      .then((data) => {
        setArticle(data);
        return fetchComments(article_id);
      })
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [article_id]);

  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className="article-detail">
      <h1>{article.title}</h1>
      <img src={article.article_img_url} alt={article.title} />
      <p>{article.body}</p>
      <p>Total Votes: {article.votes}</p>
      <p>Created on {new Date(article.created_at).toLocaleDateString()}</p>

      <h2>Comments</h2>
      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.comment_id} className="comment-item">
            <div className="comment-box">
              <div className="profile-picture">
                <img src={comment.avatar_url} alt="Profile" />
              </div>
              <div className="comment-content">
                <p>
                  <strong>{comment.author}:</strong> {comment.body}
                </p>
                <p>Votes: {comment.votes}</p>
                <p>
                  Posted on {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}