import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

// Hook voor het afhandelen van het uitloggen van gebruikers zonder zustand
const useLogout = () => {
  // Status voor laadindicator en foutmeldingen
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Functie om uit te loggen
  const logout = async () => {
    setLoading(true); // Zet laadstatus aan
    setError(null); // Reset foutmelding
    try {
      // Probeer uit te loggen via Firebase Auth
      await signOut(auth);
      // Verwijder gebruiker uit localStorage
      localStorage.removeItem("user-info");
    } catch (err) {
      setError(err); // Zet foutmelding bij mislukking
    } finally {
      setLoading(false); // Zet laadstatus uit
    }
  };

  // Retourneer status en logout functie
  return { loading, error, logout };
};

export default useLogout;
