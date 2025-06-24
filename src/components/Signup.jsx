import { useState } from "react";
import { auth, firestore } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
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

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const signup = async () => {
    setError(null);
    if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
      setError({ message: "Please fill all the fields" });
      return;
    }

    setLoading(true);

    try {
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("username", "==", inputs.username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError({ message: "Username already exists" });
        setLoading(false);
        return;
      }

      const newUser = await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);

      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          fullName: inputs.fullName,
          bio: "",
          profilePicURL: "",
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
        placeholder="Username"
        value={inputs.username}
        onChange={handleChange}
        className="border border-gray-400 rounded px-3 py-2 text-sm"
      />
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={inputs.fullName}
        onChange={handleChange}
        className="border border-gray-400 rounded px-3 py-2 text-sm"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
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
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </div>
  );
};

export default Signup;
