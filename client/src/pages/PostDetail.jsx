import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostById, fetchCommentsByPostId } from "../services/postService";
import { createComment } from "../services/postService";
import CommentBox from "../components/CommentBox";
import { MessageCircle, Share2 } from "lucide-react";
import "../styles/postDetail.css";
import "../styles/comments.css";

// #region agent log
fetch('http://127.0.0.1:7242/ingest/e99fdd60-98d7-4dbf-9ffb-8cf0051c7546',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PostDetail.jsx:6',message:'PostDetail component loaded',data:{hasComments:false},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
// #endregion

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const commentRef = useRef(null);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const loggedInUserName = "Guest";

  useEffect(() => {
    const loadPostAndComments = async () => {
      try {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/e99fdd60-98d7-4dbf-9ffb-8cf0051c7546',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PostDetail.jsx:14',message:'Loading post and comments',data:{postId:id},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        setLoading(true);
        const [postData, commentsData] = await Promise.all([
          fetchPostById(id),
          fetchCommentsByPostId(id)
        ]);
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/e99fdd60-98d7-4dbf-9ffb-8cf0051c7546',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PostDetail.jsx:19',message:'Post and comments loaded',data:{postId:id,hasPost:!!postData,commentsCount:commentsData.length},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        setPost(postData);
        setComments(commentsData);
        setError(null);
      } catch (err) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/e99fdd60-98d7-4dbf-9ffb-8cf0051c7546',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PostDetail.jsx:25',message:'Error loading post/comments',data:{error:err.message,postId:id},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        setError("Failed to load post");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPostAndComments();
    }
  }, [id]);

  const handleCommentClick = () => {
    commentRef.current?.scrollIntoView({ behavior: "smooth" });
    commentRef.current?.focus();
  };

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link copied!");
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const newComment = await createComment({
        postId: id,
        parentId: null,
        user: loggedInUserName,
        text: commentText,
      });

      setComments([newComment, ...comments]);
      setCommentText("");
    } catch (err) {
      console.error("Failed to add comment:", err);
      alert("Failed to add comment. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="post-detail-container">
        <div className="post-detail-loading">Loading...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="post-detail-container">
        <div className="post-detail-error">
          <p>{error || "Post not found"}</p>
          <button onClick={() => navigate("/")} className="back-button">
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      <button onClick={() => navigate("/")} className="back-button">
        ← Back to Posts
      </button>

      <article className="post-detail">
        <h1 className="post-detail-title">{post.title}</h1>

        <div className="post-detail-meta">
          <span>By {post.author}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="post-detail-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="post-detail-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="post-detail-content">
          <p>{post.content}</p>
        </div>

        {/* Post Actions */}
        <div className="post-actions" style={{ marginTop: "1.5rem", display: "flex", gap: "20px", alignItems: "center" }}>
          <button onClick={handleCommentClick} className="action-btn" style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", color: "#2563eb", fontSize: "14px" }}>
            <MessageCircle size={18} /> Comment
          </button>
          <button onClick={handleShare} className="action-btn" style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", color: "#2563eb", fontSize: "14px" }}>
            <Share2 size={18} /> Share
          </button>
        </div>

        {/* Comment Input */}
        <div style={{ marginTop: "2rem" }}>
          <CommentBox
            ref={commentRef}
            value={commentText}
            onChange={setCommentText}
            onSubmit={handleAddComment}
          />
        </div>

        {/* Comments Section */}
        <div className="post-detail-comments">
          <h2 className="post-detail-comments-title">Comments</h2>
          {comments.length === 0 ? (
            <p className="post-detail-no-comments">No comments yet. Be the first to comment!</p>
          ) : (
            <div className="post-detail-comments-list">
              {comments.map((comment) => (
                <div key={comment._id} className="post-detail-comment">
                  <div className="post-detail-comment-header">
                    <span className="post-detail-comment-author">{comment.user}</span>
                    <span className="post-detail-comment-date">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="post-detail-comment-content">{comment.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export default PostDetail;

