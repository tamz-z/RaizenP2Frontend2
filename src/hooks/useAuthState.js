import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

// Hook voor het beheren van de authenticatiestatus zonder zustand
const useAuthState = (setUserCallback, clearUserCallback) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Je kunt hier extra user data ophalen uit Firestore indien nodig
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        if (setUserCallback) {
          setUserCallback(userData);
        }
      } else {
        if (clearUserCallback) {
          clearUserCallback();
        }
      }
    });

    return () => unsubscribe();
  }, [setUserCallback, clearUserCallback]);
};

export default useAuthState;
