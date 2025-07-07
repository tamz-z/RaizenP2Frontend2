import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostList from "../components/PostList";
import SuggestedUsers from "../components/SuggestedUsers";
import { supabase } from "../config/supabase";

const Container = styled.div`
  max-width: 112rem; /* max-w-7xl */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
`;

const Flex = styled.div`
  display: flex;
  gap: 2.5rem;
`;

const MainSection = styled.div`
  flex: 2;
`;

const SidebarSection = styled.div`
  display: none;
  max-width: 20rem; /* max-w-xs */
  flex: 1;

  @media (min-width: 1024px) {
    display: block;
  }
`;

const Title = styled.h1`
  font-size: 1.875rem; /* text-3xl */
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const HomePage = () => {
  const [posts, setPosts] = useState([]);

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

  async function onAddPost(content, imageUrl) {
    const { error } = await supabase
      .from("posts")
      .insert([{ content, image_url: imageUrl || null, username: "admin", likes: 0 }]);
    if (!error) fetchPosts();
  }

  const onLike = async (postId) => {
    const post = posts.find((p) => p.id === postId);
    const newLikes = (post?.likes || 0) + 1;
    const { error } = await supabase
      .from("posts")
      .update({ likes: newLikes })
      .eq("id", postId);
    if (!error) fetchPosts();
  };

  const onDeletePost = async (postId) => {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId);
    if (!error) fetchPosts();
  };

  return (
    <Container>
      <Flex>
        <MainSection>
          <Title>Home blob</Title>
          <PostList posts={posts} onAddPost={onAddPost} onLike={onLike} onDeletePost={onDeletePost} />
        </MainSection>
        <SidebarSection>
          <SuggestedUsers />
        </SidebarSection>
      </Flex>
    </Container>
  );
};

export default HomePage;
