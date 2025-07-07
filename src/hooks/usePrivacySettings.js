import { useState, useEffect } from "react";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../store/authStore";

const usePrivacySettings = () => {
  const { user: authUser } = useAuth();
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authUser) {
      setLoading(false);
      return;
    }
    const docRef = doc(db, "users", authUser.uid);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setIsPrivate(docSnap.data().isPrivate || false);
        }
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [authUser]);

  const togglePrivacy = async () => {
    if (!authUser) return;
    setLoading(true);
    try {
      const docRef = doc(db, "users", authUser.uid);
      await updateDoc(docRef, { isPrivate: !isPrivate });
      setIsPrivate(!isPrivate);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { isPrivate, togglePrivacy, loading, error };
};

export default usePrivacySettings;
