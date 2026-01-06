import express from "express";
import {
  getCommentsByPostId,
  addComment,
  getTotalCommentsCount
} from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/count", getTotalCommentsCount); 
router.get("/:postId", getCommentsByPostId);
router.post("/:postId", addComment);

export default router;
