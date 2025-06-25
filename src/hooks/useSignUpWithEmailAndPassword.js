import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

// Hook voor het afhandelen van het aanmaken van een nieuwe gebruiker met email en wachtwoord zonder zustand
const useSignUpWithEmailAndPassword = () => {
  // Status voor laadindicator en foutmeldingen
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user-info");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Functie om een nieuwe gebruiker aan te maken
  const signUp = async ({ email, password, fullName }) => {
    setLoading(true); // Zet laadstatus aan
    setError(null); // Reset foutmelding
    try {
      // Maak gebruiker aan via Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Maak gebruikersdocument aan in Firestore
      await setDoc(doc(firestore, "users", newUser.uid), {
        uid: newUser.uid,
        email: newUser.email,
        fullName: fullName,
        createdAt: new Date(),
      });

      // Sla gebruiker lokaal op en in localStorage
      const userData = {
        uid: newUser.uid,
        email: newUser.email,
        displayName: fullName,
        photoURL: newUser.photoURL || null,
      };
      setUser(userData);
      localStorage.setItem("user-info", JSON.stringify(userData));
    } catch (err) {
      setError(err); // Zet foutmelding bij mislukking
    } finally {
      setLoading(false); // Zet laadstatus uit
    }
  };

  // Retourneer status en signup functie
  return { loading, error, user, signUp };
};

export default useSignUpWithEmailAndPassword;
