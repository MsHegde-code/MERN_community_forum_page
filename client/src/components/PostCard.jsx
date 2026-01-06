import { useNavigate } from "react-router-dom";

function PostCard({ post }) {
  const navigate = useNavigate();

  return (
    <article
      className="post-card"
      onClick={() => navigate(`/posts/${post._id}`)}
      style={{ cursor: "pointer" }}
    >
      <h3 className="post-title">{post.title}</h3>

      <p className="post-content">
        {post.content.length > 160
          ? post.content.slice(0, 160) + "..."
          : post.content}
      </p>

      <div className="post-meta">
        <span>By {post.author}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </article>
  );
}

export default PostCard;
