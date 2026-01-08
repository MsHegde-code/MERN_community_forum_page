import express from "express";
import {
  getUsersCount,
  getAllUsers,
  deleteUserById,
  getProfile
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= AUTH ================= */

// Get logged-in user profile
router.get("/profile", authMiddleware, getProfile);

// Update interests
router.put("/interests", authMiddleware, async (req, res) => {
  req.user.interests = req.body.interests;
  await req.user.save();
  res.json(req.user);
});

/* ================= DASHBOARD ================= */

router.get("/count", getUsersCount);
router.get("/", getAllUsers);
router.delete("/:id", deleteUserById);

export default router;
