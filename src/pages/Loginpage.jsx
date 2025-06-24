import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Loginpage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">{isLogin ? "Login" : "Sign Up"}</h1>
          <button
            className="mt-2 text-blue-600 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Create an account" : "Have an account? Login"}
          </button>
        </div>
        {isLogin ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default Loginpage;
