import mongoose from "mongoose";
import Post from "../models/Posts.js";

/**
 * Create a new post
 */
export const createPost = async (req, res) => {
  try {
    // Ensure request is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, content, tags, category } = req.body;

    const post = await Post.create({
      title,
      content,
      author: req.user.name, // store author display name
      category,
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

    // ✅ Prevent CastError
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

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


{/* Post Count */ }
export const getPostCount = async (req, res) => {
  try {
    const count = await Post.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post count" });
  }
};


export const getPostStats = async (req, res) => {
  try {
    const now = new Date();

    // Normalize start date (VERY IMPORTANT)
    const startDate = new Date(
      now.getFullYear(),
      now.getMonth() - 5,
      1,
      0,
      0,
      0
    );

    const stats = await Post.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get posts of logged-in user
export const getMyPosts = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const posts = await Post.find({ author: req.user.name }).sort({
      createdAt: -1,
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user posts" });
  }
};