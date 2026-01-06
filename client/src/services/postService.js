import axios from "axios";

const API_URL = "http://localhost:5000/api/posts";

export const fetchPosts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createPost = async (postData) => {
  const res = await axios.post(API_URL, postData);
  return res.data;
};

export const fetchPostById = async (postId) => {
  if (!postId) return null;

  try {
    const res = await axios.get(`http://localhost:5000/api/posts/${postId}`);
    return res.data;
  } catch (err) {
    if (err.response?.status === 404) {
      return null;
    }
    throw err;
  }
};


