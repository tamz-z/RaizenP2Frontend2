import { useState, useEffect, useCallback } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

// Custom hook voor user profile ophalen en volgen
const useUserProfile = (uid) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ophalen van profiel (eenmalig)
  const fetchUserProfile = useCallback(async () => {
    if (!uid) return;
    setLoading(true);
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserProfile(docSnap.data());
    } else {
      setUserProfile(null);
    }
    setLoading(false);
  }, [uid]);

  // Live volgen van profiel
  useEffect(() => {
    if (!uid) {
      setUserProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const docRef = doc(db, "users", uid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [uid]);

  return { userProfile, setUserProfile, fetchUserProfile, loading };
};

export default useUserProfile;