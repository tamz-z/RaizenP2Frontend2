import { useEffect } from "react";
import PropTypes from "prop-types";
import useUserProfileStore from "../store/userProfileStore";
import useAuthStore from "../store/authStore";
import useFollowUser from "../hooks/useFollowUser";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";

const ProfileHeader = ({ uid }) => {
  // Custom hook voor profiel data en acties
  const { userProfile, fetchUserProfile } = useUserProfileStore();
  // Authenticated gebruiker uit store
  const authUser = useAuthStore((state) => state.user);
  // Hook voor volgen/ontvolgen functionaliteit
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(uid);
  // React Router navigate functie voor SPA navigatie
  const navigate = useNavigate();

  // Profiel data ophalen bij uid wijziging
  useEffect(() => {
    if (uid) {
      fetchUserProfile(uid);
    }
  }, [uid, fetchUserProfile]);

  if (!userProfile) {
    return <div>Profiel wordt geladen...</div>;
  }

  // Controleren of bezoeker eigen profiel bekijkt
  const visitingOwnProfile = authUser && authUser.uid === uid;
  // Controleren of bezoeker andermans profiel bekijkt
  const visitingAnotherProfile = authUser && authUser.uid !== uid;

  return (
    <div className="flex flex-col items-center p-6 border-b border-gray-300">
      {/* Profielfoto */}
      <img
        src={userProfile.profilePic || "/default-profile.png"}
        alt={userProfile.fullName}
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      {/* Volledige naam */}
      <h1 className="text-2xl font-bold">{userProfile.fullName}</h1>
      {/* Bio */}
      <p className="text-gray-600 mb-2">{userProfile.bio}</p>
      {/* Volgers en volgend aantal */}
      <div className="flex gap-6 mb-4">
        <div>
          <span className="font-bold">{userProfile.followers?.length || 0}</span> Volgers
        </div>
        <div>
          <span className="font-bold">{userProfile.following?.length || 0}</span> Volgend
        </div>
      </div>
      {/* Knop om eigen profiel te bewerken */}
      {visitingOwnProfile && (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => {
            // SPA navigatie naar bewerk profiel pagina
            navigate("/edit-profile");
          }}
        >
          Profiel bewerken
        </button>
      )}
      {/* Knop om gebruiker te volgen/ontvolgen */}
      {visitingAnotherProfile && (
        <button
          className={`px-4 py-2 rounded text-white ${
            isFollowing ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleFollowUser}
          disabled={isUpdating}
        >
          {isFollowing ? "Ontvolgen" : "Volgen"}
        </button>
      )}
    </div>
  );
};

ProfileHeader.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default ProfileHeader;
