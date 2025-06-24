import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
  // State om te wisselen tussen login en signup formulier
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div className="border border-gray-400 rounded-md p-5">
        <div className="flex flex-col space-y-4">
          {/* Logo bovenaan het formulier */}
          <img src="/logo.png" alt="Logo" className="h-24 mx-auto cursor-pointer" />
          {/* Toon login of signup formulier afhankelijk van state */}
          {isLogin ? <Login /> : <Signup />}

          {/* Scheidingslijn met OR tekst */}
          <div className="flex items-center justify-center my-4 gap-2 w-full">
            <div className="flex-grow h-px bg-gray-400"></div>
            <span className="text-gray-500">OF</span>
            <div className="flex-grow h-px bg-gray-400"></div>
          </div>

          {/* Google authenticatie knop met dynamische tekst */}
          <GoogleAuth prefix={isLogin ? "Inloggen" : "Registreren"} />
        </div>
      </div>

      {/* Wisselknop tussen login en signup */}
      <div className="border border-gray-400 rounded-md p-5 mt-4">
        <div className="flex items-center justify-center">
          <span className="mx-2 text-sm">
            {isLogin ? "Heb je nog geen account?" : "Heb je al een account?"}
          </span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 cursor-pointer text-sm font-semibold"
          >
            {isLogin ? "Registreren" : "Inloggen"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
