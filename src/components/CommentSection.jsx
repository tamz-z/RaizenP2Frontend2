import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabase";

export default function CommentSection({ postId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const fetchComments = async () => {
        console.log("→ fetchComments voor postId:", postId);
        const { data, error } = await supabase
            .from("comments")
            .select("*")
            .eq("post_id", postId)
            .order("created_at", { ascending: true });
        console.log("fetchComments result:", { data, error });
        if (error) console.error("fetchComments error:", error);
        else setComments(data);
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const addComment = async () => {
        console.log("→ addComment:", newComment);
        if (!newComment.trim()) return;
        const { data, error } = await supabase
            .from("comments")
            .insert({ post_id: postId, text: newComment.trim() })
            .select();
        console.log("insert comment result:", { data, error });
        if (error) console.error("addComment error:", error);
        else {
            setNewComment("");
            fetchComments();
        }
    };

    return (
        <div className="border-t pt-2">
            {comments.length === 0 && <p>Geen reacties</p>}
            {comments.map((c) => (
                <p key={c.id}>{c.text}</p>
            ))}
            <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Schrijf reactie..."
            />
            <button disabled={!newComment.trim()} onClick={addComment}>
                Verzenden
            </button>
        </div>
    );
}
