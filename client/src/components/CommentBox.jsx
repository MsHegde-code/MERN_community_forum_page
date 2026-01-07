import { useState } from "react";
import { useAuth } from "../context/authContext";

function CommentBox({ onSubmit }) {
  const { user } = useAuth();
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    await onSubmit({ text });

    setText("");
  };

  return (
    <form className="comment-box" onSubmit={handleSubmit}>
      <textarea
        placeholder={
          user?.name ? `Comment as ${user.name}` : "Write a comment..."
        }
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Post Comment</button>
    </form>
  );
}

export default CommentBox;
