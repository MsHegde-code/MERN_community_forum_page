import express from "express";
import {
  getCommentsByPostId,
  addComment,
  getTotalCommentsCount
} from "../controllers/comment.controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/count", getTotalCommentsCount); 
router.get("/:postId", getCommentsByPostId);
router.post("/:postId", protect, addComment);

export default router;
