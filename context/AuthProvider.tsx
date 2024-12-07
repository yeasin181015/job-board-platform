"use client";

import { WebsiteLoader } from "@/components/common/Loader";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const updateAuthState = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    setLoading(true);
    try {
      updateAuthState();
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }

    // Listen for changes to the token in localStorage
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "token") {
        updateAuthState();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (loading) {
    return <WebsiteLoader />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
