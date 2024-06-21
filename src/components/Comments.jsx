import React, { useEffect, useState } from "react";
import { getUser, deleteComment } from "../api";

const Comments = ({ comments, removeComment, currentUser }) => {
  const [users, setUsers] = useState([]);
  const [confirmingCommentId, setConfirmingCommentId] = useState(null);

  useEffect(() => {
    getUser().then((data) => {
      setUsers(data);
    });
  }, []);

  const handleDeleteClick = (comment_id) => {
    setConfirmingCommentId(comment_id);
  };

  const handleConfirmDelete = () => {
    if (confirmingCommentId !== null) {
      deleteComment(confirmingCommentId)
        .then(() => {
          removeComment(confirmingCommentId);
          alert("Comment deleted successfully!");
          setConfirmingCommentId(null);
        })
        .catch((error) => {
          alert("Failed to delete comment. Please try again.");
        });
    }
  };

  const handleCancelDelete = () => {
    setConfirmingCommentId(null);
  };

  return (
    <div>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="comments-list">
          {comments.map((comment) => {
            const user = users.find((user) => user.username === comment.author);
            //  console.log(user, "<<<<<<");
            return (
              <li key={comment.comment_id} className="comment-item">
                <div className="comment-box">
                  <div className="profile-picture">
                    <img
                      src={user ? user.avatar_url : "placeholder.jpg"}
                      alt="Profile"
                    />
                  </div>
                  <div className="comment-content">
                    <p>
                      <strong>{comment.author}:</strong> {comment.body}
                    </p>
                    <p>Votes: {comment.votes}</p>
                    <p>
                      Posted on
                      {new Date(comment.created_at).toLocaleDateString()}
                    </p>
                    {comment.author === currentUser ? (
                      <div>
                        <button
                          onClick={() => handleDeleteClick(comment.comment_id)}
                        >
                          Delete
                        </button>
                        {confirmingCommentId === comment.comment_id ? (
                          <div>
                            <p>Are you sure you want to delete this comment?</p>
                            <button onClick={handleConfirmDelete}>Yes</button>
                            <button onClick={handleCancelDelete}>No</button>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default Comments;
