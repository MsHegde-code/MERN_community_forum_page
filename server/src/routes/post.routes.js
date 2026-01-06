import express from "express";
import { createPost, getAllPosts, getPostById, getPostsPerMonth,
    getTotalPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/stats", getPostsPerMonth);      
router.get("/count", getTotalPosts);
router.get("/:id", getPostById);         

export default router;
