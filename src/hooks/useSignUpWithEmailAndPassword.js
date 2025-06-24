import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

// Hook voor het afhandelen van het aanmaken van een nieuwe gebruiker met email en wachtwoord
const useSignUpWithEmailAndPassword = () => {
  // Status voor laadindicator en foutmeldingen
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Functie om de gebruiker in de Zustand store te zetten
  const setUser = useAuthStore((state) => state.setUser);

  // Functie om een nieuwe gebruiker aan te maken
  const signUp = async ({ email, password, fullName }) => {
    setLoading(true); // Zet laadstatus aan
    setError(null); // Reset foutmelding
    try {
      // Maak gebruiker aan via Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Maak gebruikersdocument aan in Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        fullName: fullName,
        createdAt: new Date(),
      });

      // Sla gebruiker op in Zustand store
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: fullName,
        photoURL: user.photoURL || null,
      });
    } catch (err) {
      setError(err); // Zet foutmelding bij mislukking
    } finally {
      setLoading(false); // Zet laadstatus uit
    }
  };

  // Retourneer status en signup functie
  return { loading, error, signUp };
};

export default useSignUpWithEmailAndPassword;
