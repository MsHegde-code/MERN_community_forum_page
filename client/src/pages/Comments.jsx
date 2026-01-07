import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCommentsByPostId,
  addComment
} from "../services/CommentService";

import CommentBox from "../components/CommentBox";
import { useAuth } from "../context/authContext.jsx";
import "../styles/comments.css";


function Comments() {
  const { postId } = useParams();
  const { user, token } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH COMMENTS ---------------- */
  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchCommentsByPostId(postId);
        setComments(data);
      } catch (err) {
        console.warn("Failed to load comments", err);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [postId]);

  /* ---------------- ADD COMMENT ---------------- */
  const handleAddComment = async ({ text }) => {
    if (!token || !user?.name) {
      alert("You must be logged in to comment.");
      return;
    }

    const newComment = await addComment(
      postId,
      { text },
      token
    );
    setComments((prev) => [newComment, ...prev]);
  };

  if (loading) {
    return <p className="loading">Loading comments...</p>;
  }

  return (
    <div className="comments-page">
      {/* COMMENT INPUT */}
      <CommentBox onSubmit={handleAddComment} />

      {/* COMMENTS LIST */}
      <section className="comments-section">
        <h3>Comments ({comments.length})</h3>

        {comments.length === 0 && (
          <p className="no-comments">No comments yet</p>
        )}

        {comments.map((c) => (
          <div key={c._id} className="comment-card">
            <strong>{c.author}</strong>
            <p>{c.text}</p>
            <span className="comment-date">
              {new Date(c.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Comments;
