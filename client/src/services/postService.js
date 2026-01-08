import axios from "axios";

const API_URL = "http://localhost:5000/api/posts";

export const fetchPosts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createPost = async (postData, token) => {
  const res = await axios.post(API_URL, postData, {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : undefined,
  });
  return res.data;
};

export const fetchPostById = async (id) => {
  const res = await fetch(`http://localhost:5000/api/posts/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${res.status}`);
  }
  return res.json();
};


