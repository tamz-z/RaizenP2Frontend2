import React, { useState, createContext, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const UserProfileContext = createContext(null);

export function UserProfileProvider({ children }) {
  const [userProfile, setUserProfile] = useState(null);

  const fetchUserProfile = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
      } else {
        setUserProfile(null);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUserProfile(null);
    }
  };

  return React.createElement(
    UserProfileContext.Provider,
    { value: { userProfile, setUserProfile, fetchUserProfile } },
    children
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
}
