import express from "express";
import { createPost, getAllPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", createPost);
router.get("/", getAllPosts);

export default router;
