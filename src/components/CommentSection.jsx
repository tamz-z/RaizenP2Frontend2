import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabase";

export default function CommentSection({ postId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from("comments")
            .select("id, text, created_at, author_id, user:author_id (username, profilePic)")
            .eq("post_id", postId)
            .order("created_at", { ascending: true });
        if (error) console.error("fetchComments error:", error);
        else setComments(data);
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const addComment = async () => {
        if (!newComment.trim()) return;
        const { error } = await supabase
            .from("comments")
            .insert({ post_id: postId, text: newComment.trim() });
        if (error) console.error("addComment error:", error);
        else {
            setNewComment("");
            fetchComments();
        }
    };

    const deleteComment = async (commentId) => {
        const { error } = await supabase
            .from("comments")
            .delete()
            .eq("id", commentId);
        if (error) console.error("deleteComment error:", error);
        else fetchComments();
    };

    return (
        <div className="border-t pt-2">
            {comments.length === 0 && <p>Geen reacties</p>}
            {comments.map((c) => (
                <div key={c.id} className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                        <img src={c.user?.profilePic || "/default-profile.png"} alt={c.user?.username} className="w-6 h-6 rounded-full" />
                        <span className="font-semibold">{c.user?.username || "Anon"}</span>
                        <span className="text-gray-500 text-xs">{new Date(c.created_at).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <p>{c.text}</p>
                        <button onClick={() => deleteComment(c.id)} className="text-red-600 hover:text-red-800 text-xs">Verwijder</button>
                    </div>
                </div>
            ))}
            <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Schrijf reactie..."
                className="border rounded px-2 py-1 w-full"
            />
            <button disabled={!newComment.trim()} onClick={addComment} className="mt-1 bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50">
                Verzenden
            </button>
        </div>
    );
}
