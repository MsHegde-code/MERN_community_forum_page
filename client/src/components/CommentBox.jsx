import { useState } from "react";

function CommentBox({ onSubmit }) {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!author.trim() || !text.trim()) {
      alert("Both fields are required");
      return;
    }

    await onSubmit({ author, text });

    setAuthor("");
    setText("");
  };

  return (
    <form className="comment-box" onSubmit={handleSubmit}>
      <input
        placeholder="Your name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <textarea
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Post Comment</button>
    </form>
  );
}

export default CommentBox;
