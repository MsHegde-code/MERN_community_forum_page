import mongoose from "mongoose";
import { dbConnection } from "../config/db.js";
import Post from "../models/Posts.js";

const dummyPosts = [
  {
    title: "How to get started with MERN stack?",
    content:
      "I am new to MERN stack. Can someone explain how frontend and backend communicate?",
    author: "Alice",
    tags: ["mern", "react", "mongodb"]
  },
  {
    title: "Best practices for MongoDB schema design",
    content:
      "What are some common mistakes beginners make while designing MongoDB schemas?",
    author: "Bob",
    tags: ["mongodb", "database"]
  },
  {
    title: "React state management confusion",
    content:
      "Should I use Context API or Redux for a medium-scale application?",
    author: "Charlie",
    tags: ["react", "state-management"]
  },
  {
    title: "Express middleware explained simply",
    content:
      "Can someone explain middleware with a real-world analogy?",
    author: "David",
    tags: ["express", "backend"]
  },
  {
    title: "Pagination strategy for large datasets",
    content:
      "What is the most efficient way to implement pagination in MongoDB?",
    author: "Eva",
    tags: ["pagination", "performance"]
  }
];

async function seedPosts() {
  try {
    await dbConnection();
    await User.deleteMany();
    await Post.insertMany(dummyPosts);

    console.log(" Dummy posts inserted successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error(" Error seeding posts:", error);
    mongoose.connection.close();
  }
}

seedPosts();
