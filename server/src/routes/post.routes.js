import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  getPostCount,
  getPostStats
} from "../controllers/post.controller.js";

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

export default router;
