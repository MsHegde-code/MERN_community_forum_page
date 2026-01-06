import mongoose from "mongoose";
import User from "../models/User.js";
import { dbConnection } from "../config/db.js";
const usersSeed = [
  {
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    gender: "Male",
    interests: ["Technology", "Gaming", "AI"]
  },
  {
    name: "Ananya Iyer",
    email: "ananya.iyer@example.com",
    gender: "Female",
    interests: ["UI/UX", "Design", "Photography"]
  },
  {
    name: "Rohan Verma",
    email: "rohan.verma@example.com",
    gender: "Male",
    interests: ["Web Development", "React", "Open Source"]
  },
  {
    name: "Sneha Kulkarni",
    email: "sneha.kulkarni@example.com",
    gender: "Female",
    interests: ["Machine Learning", "Python", "Data Science"]
  },
  {
    name: "Karan Malhotra",
    email: "karan.malhotra@example.com",
    gender: "Male",
    interests: ["Startups", "Entrepreneurship", "Finance"]
  },
  {
    name: "Priya Nair",
    email: "priya.nair@example.com",
    gender: "Female",
    interests: ["Cloud Computing", "AWS", "DevOps"]
  },
  {
    name: "Arjun Mehta",
    email: "arjun.mehta@example.com",
    gender: "Male",
    interests: ["Cybersecurity", "Networking", "Linux"]
  },
  {
    name: "Neha Singh",
    email: "neha.singh@example.com",
    gender: "Female",
    interests: ["Content Writing", "Blogging", "SEO"]
  },
  {
    name: "Vikram Rao",
    email: "vikram.rao@example.com",
    gender: "Male",
    interests: ["System Design", "Distributed Systems"]
  },
  {
    name: "Pooja Patel",
    email: "pooja.patel@example.com",
    gender: "Female",
    interests: ["Mobile Development", "Flutter", "UI Design"]
  },
  {
    name: "Rahul Khanna",
    email: "rahul.khanna@example.com",
    gender: "Male",
    interests: ["Backend Development", "Node.js", "MongoDB"]
  },
  {
    name: "Divya Menon",
    email: "divya.menon@example.com",
    gender: "Female",
    interests: ["Product Management", "Agile", "Scrum"]
  },
  {
    name: "Siddharth Jain",
    email: "siddharth.jain@example.com",
    gender: "Male",
    interests: ["Competitive Programming", "DSA"]
  },
  {
    name: "Meera Joshi",
    email: "meera.joshi@example.com",
    gender: "Female",
    interests: ["AI Ethics", "Research", "Philosophy"]
  },
  {
    name: "Aditya Bose",
    email: "aditya.bose@example.com",
    gender: "Male",
    interests: ["Game Development", "Unity", "C#"]
  }
];

async function seedUsers() {
  try {
    await dbConnection();
    // await User.deleteMany();
    await User.insertMany(usersSeed);

    console.log(" Dummy Users inserted successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error(" Error seeding posts:", error);
    mongoose.connection.close();
  }
}

seedUsers();
