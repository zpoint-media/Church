import { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("church_admin_token");
    if (!token) {
      setLoading(false);
      return;
    }

    getMe()
      .then((data) => {
        if (data?.user) setUser(data.user);
        else localStorage.removeItem("church_admin_token");
      })
      .catch(() => {
        // Token invalid or server down — clear it silently
        localStorage.removeItem("church_admin_token");
      })
      .finally(() => setLoading(false));
  }, []);

  const signIn = (token, userData) => {
    localStorage.setItem("church_admin_token", token);
    setUser(userData);
  };

  const signOut = () => {
    localStorage.removeItem("church_admin_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
