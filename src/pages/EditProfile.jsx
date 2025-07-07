import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../config/firebase";
import { useAuth } from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";

const EditProfile = () => {
const { user: authUser } = useAuth();
  const { userProfile, setUserProfile } = useUserProfileStore();
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userProfile) {
      setFullName(userProfile.fullName || "");
      setBio(userProfile.bio || "");
    }
  }, [userProfile]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!authUser) return;
    setIsSaving(true);

    try {
      let profilePicURL = userProfile.profilePic || "";

      if (profilePicFile) {
        const storageRef = ref(storage, `profilePics/${authUser.uid}`);
        await uploadBytes(storageRef, profilePicFile);
        profilePicURL = await getDownloadURL(storageRef);
      }

      const userDocRef = doc(db, "users", authUser.uid);
      await updateDoc(userDocRef, {
        fullName,
        bio,
        profilePic: profilePicURL,
      });

      setUserProfile({
        ...userProfile,
        fullName,
        bio,
        profilePic: profilePicURL,
      });

      navigate(`/profile/${authUser.uid}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <label className="block mb-2 font-semibold">Full Name</label>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
      />
      <label className="block mb-2 font-semibold">Bio</label>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        rows={4}
      />
      <label className="block mb-2 font-semibold">Profile Photo</label>
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default EditProfile;
