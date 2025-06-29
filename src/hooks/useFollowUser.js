import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../config/firebase";


const useFollowUser = (targetUserId, authUser, userProfile, setUserProfile) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!authUser || !targetUserId) return;

    const checkFollowing = async () => {
      const followingDocRef = doc(db, "users", authUser.uid, "following", targetUserId);
      const docSnap = await getDoc(followingDocRef);
      setIsFollowing(docSnap.exists());
    };

    checkFollowing();
  }, [authUser, targetUserId]);

  const handleFollowUser = async () => {
    if (!authUser || !targetUserId) return;
    setIsUpdating(true);

    const followingDocRef = doc(db, "users", authUser.uid, "following", targetUserId);
    const followerDocRef = doc(db, "users", targetUserId, "followers", authUser.uid);
    const targetUserDocRef = doc(db, "users", targetUserId);

    try {
      if (isFollowing) {
        // Unfollow
        await deleteDoc(followingDocRef);
        await deleteDoc(followerDocRef);
        // Update followers count in target user's profile
        await updateDoc(targetUserDocRef, {
          followers: arrayRemove(authUser.uid),
        });
        // Update local userProfile via callback
        if (setUserProfile && userProfile) {
          setUserProfile({
            ...userProfile,
            followers: userProfile.followers.filter((id) => id !== authUser.uid),
          });
        }
        setIsFollowing(false);
      } else {
        // Follow
        await setDoc(followingDocRef, { followedAt: new Date() });
        await setDoc(followerDocRef, { followedAt: new Date() });
        // Update followers count in target user's profile
        await updateDoc(targetUserDocRef, {
          followers: arrayUnion(authUser.uid),
        });
        // Update local userProfile via callback
        if (setUserProfile && userProfile) {
          setUserProfile({
            ...userProfile,
            followers: [...(userProfile.followers || []), authUser.uid],
          });
        }
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Error updating follow status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return { isFollowing, isUpdating, handleFollowUser };
};

export default useFollowUser;
