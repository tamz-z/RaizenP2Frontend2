import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

// Hook voor het afhandelen van het inloggen van gebruikers zonder zustand
const useLogin = () => {
  // Status voor laadindicator en foutmeldingen
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    // Probeer user uit localStorage te laden
    const storedUser = localStorage.getItem("user-info");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Functie om in te loggen met email en wachtwoord
  const login = async ({ email, password }) => {
    setLoading(true); // Zet laadstatus aan
    setError(null); // Reset foutmelding
    try {
      // Probeer in te loggen via Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;
      // Sla de gebruiker lokaal op en in localStorage
      const userData = {
        uid: loggedInUser.uid,
        email: loggedInUser.email,
        displayName: loggedInUser.displayName,
        photoURL: loggedInUser.photoURL,
      };
      setUser(userData);
      localStorage.setItem("user-info", JSON.stringify(userData));
    } catch (err) {
      setError(err); // Zet foutmelding bij mislukking
    } finally {
      setLoading(false); // Zet laadstatus uit
    }
  };

  // Functie om uit te loggen
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user-info");
  };

  // Retourneer status, user en login functie
  return { loading, error, user, login, logout };
};

export default useLogin;
