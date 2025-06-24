import PropTypes from "prop-types";
import { useState } from "react";
import { auth, firestore, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

const GoogleAuth = ({ prefix }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setUser = useAuthStore((state) => state.setUser);

  const handleGoogleAuth = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userRef = doc(firestore, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // login
        const userDoc = userSnap.data();
        setUser(userDoc);
      } else {
        // signup
        const userDoc = {
          uid: user.uid,
          email: user.email,
          username: user.email.split("@")[0],
          fullName: user.displayName || "",
          bio: "",
          profilePicURL: user.photoURL || "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", user.uid), userDoc);
        setUser(userDoc);
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleGoogleAuth}
      disabled={loading}
      className="flex items-center justify-center gap-2 border border-gray-400 rounded px-3 py-2 text-sm hover:bg-gray-100 disabled:opacity-50"
    >
      <img src="/google.png" alt="Google logo" className="w-5 h-5" />
      <span className="text-blue-600">{loading ? "Processing..." : `${prefix} with Google`}</span>
      {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
    </button>
  );
};

GoogleAuth.propTypes = {
  prefix: PropTypes.string.isRequired,
};

export default GoogleAuth;
