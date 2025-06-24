import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import useAuthStore from "../store/authStore";

// Hook voor het afhandelen van het inloggen van gebruikers
const useLogin = () => {
  // Status voor laadindicator en foutmeldingen
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Functie om de gebruiker in de Zustand store te zetten
  const setUser = useAuthStore((state) => state.setUser);

  // Functie om in te loggen met email en wachtwoord
  const login = async ({ email, password }) => {
    setLoading(true); // Zet laadstatus aan
    setError(null); // Reset foutmelding
    try {
      // Probeer in te loggen via Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Sla de gebruiker op in de Zustand store
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    } catch (err) {
      setError(err); // Zet foutmelding bij mislukking
    } finally {
      setLoading(false); // Zet laadstatus uit
    }
  };

  // Retourneer status en login functie
  return { loading, error, login };
};

export default useLogin;
