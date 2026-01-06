import express from "express";
import User from "../models/User.js";
import { getUsersCount } from "../controllers/user.controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔐 Protected routes
router.get("/profile", protect, (req, res) => {
    res.json(req.user);
});

router.put("/interests", protect, async (req, res) => {
    req.user.interests = req.body.interests;
    await req.user.save();
    res.json(req.user);
});

// 📊 Dashboard route (NO auth needed)
router.get("/count", getUsersCount);

export default router;
