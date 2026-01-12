import axios from "axios";

const API_URL = "http://localhost:5000/api/posts";

// handles API communication, calls the backend endpoints. 
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
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    if (err.response) {
      throw new Error(`Failed to fetch post: ${err.response.status}`);
    }
    throw err;
  }
};
