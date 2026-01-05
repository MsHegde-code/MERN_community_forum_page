import express from "express";
import protect from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Protected route
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

router.put("/interests", protect, async (req, res) => {
  req.user.interests = req.body.interests;
  await req.user.save();
  res.json(req.user);
});

export default router;
