import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useLogout from "../hooks/useLogout";
import useLogin from "../hooks/useLogin";

// Navbar component met navigatie en gebruikersinformatie
const Navbar = () => {
  // Haal user state lokaal op via useLogin hook
  const { user } = useLogin();
  // Haal logout functie en laadstatus op uit hook
  const { logout, loading } = useLogout();
  const navigate = useNavigate();

  // Redirect naar login pagina als gebruiker niet ingelogd is
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <nav className="bg-white border-b border-gray-300 px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-gray-800">
        Raizen
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <img
              src={user.photoURL || "/profilepic.png"}
              alt={user.displayName || "User"}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="hidden sm:inline text-gray-700">{user.displayName || user.email}</span>
            <button
              onClick={logout}
              disabled={loading}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
            >
              Uitloggen
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-blue-600 hover:underline"
            >
              Inloggen
            </Link>
            <Link
              to="/signup"
              className="text-blue-600 hover:underline"
            >
              Registreren
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
