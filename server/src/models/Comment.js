/* Defines the structure of a comment in the database

(fields like content, user, post, replies, votes).

*/

import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",        // which post this comment belongs to
            required: true,
        },

        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",     // for nested replies
            default: null,
        },

        user: {
            type: String,       // later can be User ref
            required: true,
        },

        text: {
            type: String,
            required: true,
        },

        upvotes: {
            type: Number,
            default: 0,
        },

        downvotes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
