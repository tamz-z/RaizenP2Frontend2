import { useState } from "react";
import useLogin from "../hooks/useLogin";

// Login component voor gebruikers om in te loggen met email en wachtwoord
const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { login, loading, error } = useLogin();

  // Update inputvelden bij verandering
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Verwerk formulier indien ingediend
  const handleSubmit = (e) => {
    e.preventDefault();
    login(inputs); // Roep login functie aan uit hook
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={inputs.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Wachtwoord"
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={inputs.password}
        onChange={handleChange}
        required
      />
      {error && (
        <div className="text-red-600 text-sm">
          {error.message || "Inloggen mislukt. Probeer het opnieuw."}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Bezig met inloggen..." : "Inloggen"}
      </button>
    </form>
  );
};

export default Login;
