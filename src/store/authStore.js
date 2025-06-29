import React, { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user-info");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user-info", JSON.stringify(user));
    } else {
      localStorage.removeItem("user-info");
    }
  }, [user]);

  const clearUser = () => {
    setUser(null);
  };

  return React.createElement(
    AuthContext.Provider,
    { value: { user, setUser, clearUser } },
    children
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
