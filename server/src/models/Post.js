import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        tags: {
            type: [String],
            default: []
        },
        createdAt: {
            type: Date,
            default: Date.now // Corrected from 'true' to 'Date.now'
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }
    // timestamps: true removed from here
);

export default mongoose.model("Post", postSchema);