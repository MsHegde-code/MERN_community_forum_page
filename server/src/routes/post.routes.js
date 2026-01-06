import express from "express";
import {
    getPostsPerMonth,
    getTotalPosts,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/stats", getPostsPerMonth);      // existing
router.get("/count", getTotalPosts);         // ✅ NEW

export default router;
