import express from "express";
import cors from "cors";
import { dbConnection } from "./src/config/db.js";
import postRoutes from "./src/routes/post.routes.js";
import commentRoutes from "./src/routes/comment.route.js"

const app = express();

dbConnection();

app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
