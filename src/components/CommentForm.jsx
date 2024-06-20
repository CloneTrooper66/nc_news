import { useState } from "react";
import { postComment, deleteComment } from "../api";

const CommentForm = ({ article_id, addComment, currentUser }) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    setIsSubmittingComment(true);

    postComment(article_id, currentUser, newComment)
      .then((newComment) => {
        addComment(newComment);
        setNewComment("");
        setIsSubmittingComment(false);
        alert("Comment submitted successfully!");
      })
      .catch((error) => {
        setIsSubmittingComment(false);
        alert("Failed to submit comment. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmitComment}>
      <textarea
        rows="4"
        cols="50"
        value={newComment}
        onChange={handleCommentChange}
        placeholder="Add a comment…"
        required
      />
      <br />
      <button type="submit" disabled={isSubmittingComment}>
        {isSubmittingComment ? "Submitting..." : "Submit Comment"}
      </button>
    </form>
  );
};
export default CommentForm;
