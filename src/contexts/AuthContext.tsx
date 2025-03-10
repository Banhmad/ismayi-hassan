import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type UserType = "customer" | "provider";

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
  login: (email: string, password: string, type: UserType) => Promise<void>;
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

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (
    email: string,
    password: string,
    type: UserType,
  ): Promise<void> => {
    // In a real app, this would validate credentials with a backend
    // For demo purposes, we'll create a mock user
    const mockUser: User = {
      id: "123456",
      name: type === "customer" ? "John Doe" : "Business Name",
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      type,
      digitalCurrency: 100, // Starting amount
      verified: true,
    };

    setUser(mockUser);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  const signup = async (
    userData: Partial<User>,
    password: string,
  ): Promise<void> => {
    // In a real app, this would create a new user in the backend
    // For demo purposes, we'll create a mock user
    const mockUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name: userData.name || "New User",
      email: userData.email || "user@example.com",
      avatar:
        userData.avatar ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
      type: userData.type || "customer",
      digitalCurrency: 50, // Welcome bonus
      verified: false,
    };

    setUser(mockUser);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  const logout = (): void => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
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
      value={{ user, isLoggedIn, login, signup, logout, updateUser }}
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
