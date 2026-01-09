import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/postService";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import { getAllSubjects } from "../services/subjectService";
import "../styles/createPost.css";

function CreatePost() {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [subjects, setSubjects] = useState([]);

  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
    category: ""
  });

  useEffect(() => {
    getAllSubjects()
      .then(setSubjects)
      .catch((err) => toast.error("Failed to load categories"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        toast.error("You must be logged in to create a post.");
        return;
      }

      if (!form.category) {
        toast.error("Please select a category");
        return;
      }

      const payload = {
        title: form.title,
        content: form.content,
        author: user?.name || "Guest",
        category: form.category,
        tags: form.tags
          ? form.tags.split(",").map(tag => tag.trim()).filter(Boolean)
          : []
      };

      await createPost(payload, token);

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

            <label>Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
              className="create-post-select"
            >
              <option value="" disabled>Select a category</option>
              {subjects.map((sub) => (
                <option key={sub._id} value={sub.name}>
                  {sub.name}
                </option>
              ))}
            </select>

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
