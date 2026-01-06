import Post from "../models/Posts.js";

/**
 * Create a new post
 */
export const createPost = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;

    const post = await Post.create({
      title,
      content,
      author,
      tags
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post" });
  }
};

/**
 * Get all posts (latest first)
 */
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Fetch post by id error:", error);
    res.status(500).json({ message: "Failed to fetch post" });
  }
};


