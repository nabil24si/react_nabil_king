// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user session on mount
  useEffect(() => {
    const sessionData = localStorage.getItem("user_session");
    if (sessionData) {
      try {
        const parsedUser = JSON.parse(sessionData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Gagal membaca session user:", error);
        localStorage.removeItem("user_session");
      }
    }
    setLoading(false);
  }, []);

  // Login function — saves user to state & localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user_session", JSON.stringify(userData));
  };

  // Logout function — clears state & localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user_session");
  };

  // Check if user has a specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasRole, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}