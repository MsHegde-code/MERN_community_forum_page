import Comment from "../models/Comment.js";

export const getCommentsByPostId = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { text, author } = req.body;

    if (!text || !author) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const comment = await Comment.create({
      postId: req.params.postId,
      text,
      author
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};

export const getTotalCommentsCount = async (req, res) => {
  try {
    const count = await Comment.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Total comments count error:", error);
    res.status(500).json({ message: "Failed to fetch comments count" });
  }
};
