/* Contains the business logic for comments

(how comments are created, fetched, voted, moderated).

*/

import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCommentsByPost = async (req, res) => {
    try {
        const comments = await Comment.find({
            postId: req.params.postId,
        }).sort({ createdAt: -1 });

        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

