import React, { useEffect, useState } from "react";
import PostList from "./components/PostList";
import { supabase } from "./config/supabase";

// Alleen de feed-logica en UI
function App() {
  const [posts, setPosts] = useState([]);

  // Posts ophalen
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Nieuwe post toevoegen
  async function onAddPost(content, imageUrl) {
    const { error } = await supabase
      .from("posts")
      .insert([{ content, image_url: imageUrl || null, username: "admin", likes: 0 }]);
    if (!error) fetchPosts();
  }

  // Post liken
  const onLike = async (postId) => {
    const post = posts.find((p) => p.id === postId);
    const newLikes = (post?.likes || 0) + 1;
    const { error } = await supabase
      .from("posts")
      .update({ likes: newLikes })
      .eq("id", postId);
    if (!error) fetchPosts();
  };

  // Post verwijderen
  const onDeletePost = async (postId) => {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId);
    if (!error) fetchPosts();
  };

  return (
    <div className="App">
      <PostList posts={posts} onAddPost={onAddPost} onLike={onLike} onDeletePost={onDeletePost} />
    </div>
  );
}

export default App;