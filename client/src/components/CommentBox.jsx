/*
Used for Comment UI Component (Main)

Display comments

Handle nested replies (threaded)

Upvote / downvote UI

Reply button
*/

//Share button

import React, { forwardRef } from "react";

const CommentBox = forwardRef(({ value, onChange, onSubmit }, ref) => {
    return (
        <div className="comment-input-card">
            <textarea
                ref={ref}
                value={value}       //It takes values
                onChange={(e) => onChange(e.target.value)}
                placeholder="Add a comment..."
                className="comment-input"
            />
            <button className="comment-btn" 
            onClick={onSubmit}
            disabled={!value.trim()}>
                Comment
            </button>
        </div>
    );
});

export default CommentBox;
