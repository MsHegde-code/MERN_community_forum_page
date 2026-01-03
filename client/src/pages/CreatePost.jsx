import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/postService";
import { toast } from "react-toastify";
import "../styles/createPost.css";

function CreatePost() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: form.title,
        content: form.content,
        author: "Guest",
        tags: form.tags.split(",").map(tag => tag.trim())
      };

      await createPost(payload);

      toast.success("Post created successfully!");

      // Redirect to Home after short delay
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      toast.error("Failed to upload post");
    }
  };

  return (
    <div className="create-post-container">
      <div className="create-post-wrapper">
        <h2>Create Post</h2>

        <div className="create-post-card">
          <form onSubmit={handleSubmit}>

            <label>Title</label>
            <input
              value={form.title}
              placeholder="Enter post title"
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              required
            />

            <label>Content</label>
            <textarea
              value={form.content}
              placeholder="Start a discussion, Your post helps the community grow."
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
              required
            />

            <label>Hashtags</label>
            <input
              value={form.tags}
              placeholder="e.g. Tech, Coding, Issues etc"
              onChange={(e) =>
                setForm({ ...form, tags: e.target.value })
              }
            />
            <div className="hashtag-hint">
              Separate hashtags with commas (max 5)
            </div>

            <div className="create-post-actions">
              <button className="submit-btn" type="submit">
                Submit
              </button>

              <button
                className="cancel-btn"
                type="button"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
