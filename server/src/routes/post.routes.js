import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  getPostCount,
  getPostStats,
  getMyPosts
} from "../controllers/post.controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* ---------- FIXED ORDER ---------- */

// STATIC routes first
router.get("/count", getPostCount);
router.get("/stats", getPostStats);

// Dynamic route LAST
router.get("/:id", getPostById);

// Others
router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/my-posts", protect, getMyPosts); // logged-in user's posts

export default router;
