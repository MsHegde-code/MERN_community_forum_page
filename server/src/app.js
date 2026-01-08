import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

import dotenv from "dotenv";

// Ensure .env is loaded even when the server is started from the repo root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/user", userRoutes);


export default app;