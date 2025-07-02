import { useState } from "react";
import { auth, firestore } from "../config/firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import useAuthStore from "../store/authStore";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setUser = useAuthStore((state) => state.setUser);

  // Update inputvelden bij verandering
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Functie voor registratie met email en wachtwoord
  const signup = async () => {
    setError(null);
    if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
      setError({ message: "Vul alle velden in" });
      return;
    }

    setLoading(true);

    try {
      // Controleren of gebruikersnaam al bestaat
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("username", "==", inputs.username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError({ message: "Gebruikersnaam bestaat al" });
        setLoading(false);
        return;
      }

      // Nieuwe gebruiker aanmaken via Firebase Auth
      const newUser = await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);

      if (newUser) {
        // Gebruikersprofiel opslaan in Firestore
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          fullName: inputs.fullName,
          bio: "",
          profilePic: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        setUser(userDoc);
      }
    } catch (err) {
      setError({ message: err.message });
    }

    setLoading(false);
  };

  // Functie voor Google login via popup
  const googleLogin = async () => {
    setError(null);
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Controleren of gebruiker al in Firestore staat
      const userDocRef = doc(firestore, "users", user.uid);
      const userDocSnap = await getDocs(query(collection(firestore, "users"), where("uid", "==", user.uid)));

      if (userDocSnap.empty) {
        // Nieuwe gebruiker toevoegen aan Firestore
        const newUserDoc = {
          uid: user.uid,
          email: user.email,
          username: user.displayName?.replace(/\s+/g, "").toLowerCase() || user.uid,
          fullName: user.displayName || "",
          bio: "",
          profilePic: user.photoURL || "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(userDocRef, newUserDoc);
        setUser(newUserDoc);
      } else {
        // Bestaande gebruiker ophalen
        const existingUser = userDocSnap.docs[0].data();
        setUser(existingUser);
      }
    } catch (err) {
      setError({ message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={inputs.email}
        onChange={handleChange}
        className="border border-gray-400 rounded px-3 py-2 text-sm"
      />
      <input
        type="text"
        name="username"
        placeholder="Gebruikersnaam"
        value={inputs.username}
        onChange={handleChange}
        className="border border-gray-400 rounded px-3 py-2 text-sm"
      />
      <input
        type="text"
        name="fullName"
        placeholder="Volledige naam"
        value={inputs.fullName}
        onChange={handleChange}
        className="border border-gray-400 rounded px-3 py-2 text-sm"
      />
      <input
        type="password"
        name="password"
        placeholder="Wachtwoord"
        value={inputs.password}
        onChange={handleChange}
        className="border border-gray-400 rounded px-3 py-2 text-sm"
      />
      {error && <div className="text-red-600 text-xs">{error.message}</div>}
      <button
        onClick={signup}
        disabled={loading}
        className="bg-blue-600 text-white py-2 rounded text-sm disabled:opacity-50"
      >
        {loading ? "Bezig met registreren..." : "Registreren"}
      </button>
      <button
        onClick={googleLogin}
        disabled={loading}
        className="mt-2 bg-red-600 text-white py-2 rounded text-sm hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "Bezig..." : "Registreren met Google"}
      </button>
    </div>
  );
};

export default Signup;
