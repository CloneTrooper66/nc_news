import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticles, fetchComments, updateArticleVotes } from "../api";
import "ldrs/leapfrog";
import Loading from "./Loading";
import ErrorComponent from "./ErrorComponent";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
export default function ArticleDetail() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleVote = (inc_votes) => {
    const newVotes = article.votes + inc_votes;
    setArticle({ ...article, votes: newVotes });
    updateArticleVotes(article_id, inc_votes).catch((error) => {
      setArticle({ ...article, votes: article.votes - inc_votes });
    });
  };

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

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

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
      <button className="like-button" onClick={() => handleVote(1)}>
        Like
      </button>
      <button className="dislike-button" onClick={() => handleVote(-1)}>
        Dislike
      </button>
      <p>Created on {new Date(article.created_at).toLocaleDateString()}</p>
      <h2>Comments</h2>
      <Comments comments={comments} />
      <CommentForm article_id={article_id} addComment={addComment} />
    </div>
  );
}
