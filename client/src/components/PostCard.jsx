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

      {post.tags && post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map((tag, index) => (
            <span key={index} className="post-tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="post-meta">
        <span>By {post.author}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </article>
  );
}

export default PostCard;
