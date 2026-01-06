import axios from "axios";

const API_URL = "http://localhost:5000/api/posts";

export const fetchPosts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const fetchPostById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createPost = async (postData) => {
  const res = await axios.post(API_URL, postData);
  return res.data;
};

export const fetchCommentsByPostId = async (postId) => {
  const res = await axios.get(`http://localhost:5000/api/comments/${postId}`);
  return res.data;
};

export const createComment = async (commentData) => {
  const res = await axios.post(`http://localhost:5000/api/comments`, commentData);
  return res.data;
};
