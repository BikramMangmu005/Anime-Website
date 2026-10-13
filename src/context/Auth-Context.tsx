import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { getCurrentUser } from "../api/Profile-Api";

interface User {
  id: number;
  username: string;
  email: string;
  profilePicture: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateProfilePicture: (profilePicture: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    let cancelled = false;

    const restoreUser = async () => {
      try {
        const currentUser = await getCurrentUser(token);

        if (!cancelled) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Failed to restore user:", error);

        if (!cancelled) {
          setUser(null);
        }
      }
    };

    restoreUser();

    return () => {
      cancelled = true;
    };
  }, [token]);
  

  const login = (user: User, token: string) => {
    console.log("AuthContext login received user:", user);

    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
    console.log("LOGIN - setting user:", user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const updateProfilePicture = (profilePicture: string) => {
    console.log("Updating picture to:", profilePicture);

    setUser((currentUser) => {
      console.log("User before update:", currentUser);

      if (!currentUser) {
        console.error("Cannot update picture: user is null");
        return currentUser;
      }

      const updatedUser = {
        ...currentUser,
        profilePicture,
      };

      console.log("Updated user:", updatedUser);
      return updatedUser;
    });
  };

  const isLoggedIn = !!token;

  useEffect(() => {
    console.log("AuthContext user state changed:", user);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn,
        login,
        logout,
        updateProfilePicture,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
