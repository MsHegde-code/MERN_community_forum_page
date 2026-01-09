import express from "express";
import { createSubject, deleteSubject, getAllSubjects } from "../controllers/subjectController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllSubjects);
router.post("/", authMiddleware, createSubject); // Add admin check middleware if strictly needed, but authMiddleware + frontend logic is first step. Ideally should verify admin in controller or middleware.
router.delete("/:id", authMiddleware, deleteSubject);

export default router;
