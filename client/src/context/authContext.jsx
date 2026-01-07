import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Always start unauthenticated on app load
  useEffect(() => {
    setLoading(false);
  }, []);

  // Fetch user profile using protected backend route
  const fetchUserProfile = async (jwtToken) => {
    try {
      const res = await fetch("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setUser(data);
    } catch (error) {
      logout(); // token invalid or expired
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = (jwtToken) => {
    setToken(jwtToken);
    fetchUserProfile(jwtToken);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        login,
        logout,
        isAuthenticated: !!token, // ✅ FIXED
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
