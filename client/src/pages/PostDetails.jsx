import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPostById } from "../services/postService";
import Comments from "./Comments";
import "../styles/comments.css";
import BackButton from "../components/BackButton";

function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPostById(postId).then(setPost);
  }, [postId]);

  if (!post) return <p className="post-details-container">Post not found</p>;

  return (
    <div className="post-details-container">
      <BackButton />
      <div className="post-details-card">
        <h1 className="post-details-title">{post.title}</h1>

        <div className="post-details-meta">
          By {post.author} •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </div>

        <p className="post-details-content">{post.content}</p>
      </div>

      <Comments />
    </div>
  );
}

export default PostDetails;
