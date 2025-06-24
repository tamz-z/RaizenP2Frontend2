import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Post from "./Post";

const ProfilePosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Simulate fetch delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Dummy posts data
        setPosts([
          { id: 1, content: "Post 1", type: "text" },
          { id: 2, content: "Post 2", type: "photo", imageUrl: "/profilepic.png" },
          { id: 3, content: "Post 3", type: "video", videoUrl: "/sample-video.mp4" },
        ]);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [userId]);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center text-gray-500 mt-4">No Posts Found 🤔</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

ProfilePosts.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default ProfilePosts;
