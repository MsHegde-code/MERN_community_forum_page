import axios from "axios";

const API_BASE = "http://localhost:5000/api/comments";

/**
 * Fetch comments for a post
 */
export const fetchCommentsByPostId = async (postId) => {
  const res = await axios.get(`${API_BASE}/${postId}`);
  return res.data;
};

/**
 * Add a new comment to a post
 */
export const addComment = async (postId, commentData, token) => {
  const res = await axios.post(`${API_BASE}/${postId}`, commentData, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return res.data;
};
