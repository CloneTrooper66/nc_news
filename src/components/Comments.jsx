import React, { useEffect, useState } from "react";
import { getUser } from "../api";

const Comments = ({ comments }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUser().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <div>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="comments-list">
          {comments.map((comment) => {
            const user = users.filter(
              (user) => user.username === comment.author
            )[0];

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
