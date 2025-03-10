import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { authService } from "../services/api";

type UserType = "customer" | "provider" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  type: UserType;
  digitalCurrency: number;
  verified: boolean;
}

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string, type?: UserType) => Promise<void>;
  signup: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Check for saved user on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const savedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (savedUser && token) {
          setUser(JSON.parse(savedUser));
          setIsLoggedIn(true);

          // Verify token is still valid by fetching current user
          const { data } = await authService.getCurrentUser();
          setUser(data);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        // If token is invalid, log out
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (
    email: string,
    password: string,
    type?: UserType,
  ): Promise<void> => {
    try {
      setLoading(true);
      const { user, token } = await authService.login(email, password);
      setUser(user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    userData: Partial<User>,
    password: string,
  ): Promise<void> => {
    try {
      setLoading(true);
      const { user, token } = await authService.register({
        ...userData,
        password,
      });
      setUser(user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    authService.logout();
    setUser(null);
    setIsLoggedIn(false);
  };

  const updateUser = (userData: Partial<User>): void => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, loading, login, signup, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
