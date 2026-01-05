import express from "express";
import {
  createPost,
  getAllPosts,
  getMyPosts,
} from "../controllers/post.controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPost); // create post (protected)
router.get("/", getAllPosts); // community posts
router.get("/my-posts", protect, getMyPosts); // logged-in user's posts

export default router;

// import express from "express";
// import { createPost, getAllPosts } from "../controllers/post.controller.js";

// const router = express.Router();

// router.post("/", createPost);
// router.get("/", getAllPosts);

// export default router;
