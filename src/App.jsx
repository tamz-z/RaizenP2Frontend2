import React, { useEffect, useState } from "react";
import PostList from "./components/PostList";
import { supabase } from "./config/supabase";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/LoginPage";
import PageLayout from "./Layouts/PageLayout";
import ProfilePage from "./pages/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";

function App() {
  // State voor posts in de feed
  const [posts, setPosts] = useState([]);
  // Firebase auth gebruiker ophalen met react-firebase-hooks
  const [authUser] = useAuthState(auth);

  // Functie om posts op te halen uit Supabase, gesorteerd op aanmaakdatum
  const fetchPosts = async () => {
    console.log("→ fetchPosts aangeroepen");
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    console.log("fetchPosts resultaat:", { data, error });
    if (error) console.error("fetchPosts error:", error);
    else setPosts(data);
  };

  // useEffect om posts te laden bij component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Functie om een nieuwe post toe te voegen
  async function onAddPost(content, imageUrl) {
    console.log("↗️ onAddPost triggered:", { content, imageUrl });
    const { data, error } = await supabase
      .from("posts")
      .insert([{ content, image_url: imageUrl || null, username: "admin", likes: 0 }])
      .select();

    console.log("↘️ insert result:", { data, error });
    if (error) console.error("Fout bij posten:", error);
    fetchPosts();
  }

  // Functie om een post te liken
  const onLike = async (postId) => {
    console.log("→ onLike:", postId);
    const post = posts.find((p) => p.id === postId);
    const newLikes = (post?.likes || 0) + 1;
    const { data, error } = await supabase
      .from("posts")
      .update({ likes: newLikes })
      .eq("id", postId)
      .select();
    console.log("like resultaat:", { data, error });
    if (error) console.error("Error liking post:", error);
    else fetchPosts();
  };

  // Functie om een post te verwijderen
  const onDeletePost = async (postId) => {
    console.log("→ onDeletePost:", postId);
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId)
      .select();
    console.log("delete resultaat:", { data, error });
    if (error) console.error("Error deleting post:", error);
    else fetchPosts();
  };

  return (
    <div className="App">
      {/* PostList component met props voor posts en acties */}
      <PostList posts={posts} onAddPost={onAddPost} onLike={onLike} onDeletePost={onDeletePost} />
      <PageLayout>
        <Routes>
          {/* Beschermde route voor homepagina, alleen zichtbaar als ingelogd */}
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/auth" />} />
          {/* Auth route alleen zichtbaar als niet ingelogd */}
          <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to="/" />} />
          {/* Profielpagina route met dynamische username */}
          <Route path="/:username" element={<ProfilePage />} />
        </Routes>
      </PageLayout>
    </div>
  );
}

export default App;
