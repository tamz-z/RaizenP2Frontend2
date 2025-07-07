import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CommentSection from "./CommentSection";
import { supabase } from "../config/supabase";

const PostContainer = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb; /* Tailwind gray-200 */
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
  &:hover {
    color: #ef4444; /* Tailwind red-500 */
  }
`;

const PostText = styled.p`
  margin-bottom: 0.5rem;
`;

const PostImage = styled.img`
  max-width: 100%;
  margin-bottom: 0.5rem;
  border-radius: 0.375rem;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 1rem;
  color: #2563eb; /* Tailwind blue-600 */
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const CommentToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280; /* Tailwind gray-500 */
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

export default function Post({ post, onDeletePost }) {
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);

  const toggleLike = async () => {
    try {
      if (liked) {
        // unlike
        await supabase
          .from("likes")
          .delete()
          .eq("post_id", post.id)
          .eq("user_id", post.currentUserId);
        setLikes(likes - 1);
        setLiked(false);
      } else {
        // like
        await supabase.from("likes").insert({ post_id: post.id, user_id: post.currentUserId });
        setLikes(likes + 1);
        setLiked(true);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <PostContainer>
      <PostHeader>
        <strong>{post.username || "admin"}</strong>
        <DeleteButton onClick={() => onDeletePost(post.id)} aria-label="Verwijder post">
          🗑️
        </DeleteButton>
      </PostHeader>
      <PostText>{post.content}</PostText>
      {post.image_url && <PostImage src={post.image_url} alt="Post afbeelding" />}
      <div>
        <LikeButton onClick={toggleLike} aria-pressed={liked}>
          {liked ? "👎 Ontliken" : "👍 Like"} ({likes})
        </LikeButton>
        <CommentToggleButton onClick={() => setShowComments((s) => !s)}>
          💬 Reacties
        </CommentToggleButton>
      </div>
      {showComments && <CommentSection postId={post.id} />}
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.any.isRequired,
    username: PropTypes.string,
    content: PropTypes.string,
    image_url: PropTypes.string,
    likes: PropTypes.number,
    currentUserId: PropTypes.string,
  }).isRequired,
  onDeletePost: PropTypes.func.isRequired,
};
