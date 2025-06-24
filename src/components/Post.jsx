import React, { useState } from "react";
import PropTypes from "prop-types";
import CommentSection from "./CommentSection";

export default function Post({ post, onLike, onDeletePost }) {
  // State om reacties te tonen of te verbergen
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="p-4 border-b">
      {/* Header met gebruikersnaam en verwijderknop */}
      <div className="flex justify-between">
        <strong>{post.username || "admin"}</strong>
        <button onClick={() => onDeletePost(post.id)} aria-label="Verwijder post">
          🗑️
        </button>
      </div>
      {/* Post tekst */}
      <p>{post.content}</p>
      {/* Optionele afbeelding */}
      {post.image_url && <img src={post.image_url} alt="Post afbeelding" style={{ maxWidth: "100%" }} />}
      {/* Like knop met aantal likes */}
      <button onClick={() => onLike(post.id)}>👍 Like ({post.likes || 0})</button>
      {/* Knop om reacties te tonen/verbergen */}
      <button onClick={() => setShowComments((s) => !s)}>💬 Reacties</button>
      {/* Reacties sectie */}
      {showComments && <CommentSection postId={post.id} />}
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.any.isRequired,
    username: PropTypes.string,
    content: PropTypes.string,
    image_url: PropTypes.string,
    likes: PropTypes.number,
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  onDeletePost: PropTypes.func.isRequired,
};
