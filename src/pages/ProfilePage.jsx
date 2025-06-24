import { useParams } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";

const ProfilePage = () => {
  const { uid } = useParams();

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <ProfileHeader uid={uid} />
      {/* Profile tabs and posts can be added here */}
      <div className="border-t border-gray-300 pt-4">
        <h2 className="text-xl font-semibold mb-4">Posts</h2>
        {/* Placeholder for profile posts */}
        <p className="text-gray-500">User posts will be displayed here.</p>
      </div>
    </div>
  );
};

export default ProfilePage;
