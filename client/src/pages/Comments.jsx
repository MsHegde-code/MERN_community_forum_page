import React, { useRef, useState, useEffect } from "react";
import "../styles/comments.css";
import { MessageCircle, Share2 } from "lucide-react";
import CommentBox from "../components/CommentBox";
import axios from "axios";
import { useParams } from "react-router-dom";

function Comments() {
    const commentRef = useRef(null);

    const { postId } = useParams(); 

    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);

    const loggedInUserName = "Alex Johnson";

    /* Scroll to comment box */
    const handleCommentClick = () => {
        commentRef.current?.scrollIntoView({ behavior: "smooth" });
        commentRef.current?.focus();
    };

    /* Share button */
    const handleShare = async () => {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
    };

    /* CREATE COMMENT */
    const handleAddComment = async () => {
        if (!commentText.trim()) return;

        const res = await axios.post(
            "http://localhost:8080/api/comments",
            {
                postId: postId,          // ✅ dynamic
                parentId: null,
                user: loggedInUserName,
                text: commentText,
            }
        );

        setComments([res.data, ...comments]);
        setCommentText("");
    };

    /* FETCH COMMENTS */
    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/comments/${postId}`)
            .then((res) => setComments(res.data));
    }, [postId]);

    return (
        <div className="comments-page">

            {/* POST */}
            <div className="post-card big-post">
                <div className="post-vote">
                    <button>▲</button>
                    <span>128</span>
                    <button>▼</button>
                </div>

                <div className="post-body">
                    <h1>Post on Technology</h1>
                    <p>
                        Technology is evolving rapidly with advancements in AI,
                        wearable devices, and AR/VR.
                    </p>

                    <div className="post-actions">
                        <button onClick={handleCommentClick}>
                            <MessageCircle size={18} /> Comment
                        </button>
                        <button onClick={handleShare}>
                            <Share2 size={18} /> Share
                        </button>
                    </div>
                </div>
            </div>

            {/* COMMENT INPUT */}
            <CommentBox
                ref={commentRef}
                value={commentText}
                onChange={setCommentText}
                onSubmit={handleAddComment}
            />

            {/* COMMENTS LIST */}
            <div className="comments-list">
                {comments.map((c) => (
                    <div key={c._id} className="comment-card">
                        <strong>{c.user}</strong>
                        <p>{c.text}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Comments;
