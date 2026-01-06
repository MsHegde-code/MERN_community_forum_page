import express from "express";
import {
  getCommentsByPostId,
  addComment
} from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/:postId", getCommentsByPostId);
router.post("/:postId", addComment);

export default router;
