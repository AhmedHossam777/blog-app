import { apiClient, clearTokens, setTokens } from "@/lib/apiClient";
import type {
  AuthResponse,
  GetUserResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "@/types/auth.interfaces";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await apiClient<GetUserResponse>("/users/me", {
          method: "GET",
          requiresAuth: true,
        });
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        clearTokens();
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await apiClient<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      requiresAuth: false,
    });
    setUser(response.data.user);
    setTokens(
      response.data.tokens.accessToken,
      response.data.tokens.refreshToken,
    );
  };

  const register = async (credentials: RegisterCredentials) => {
    const response = await apiClient<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(credentials),
      requiresAuth: false,
    });
    setUser(response.data.user);
    setTokens(
      response.data.tokens.accessToken,
      response.data.tokens.refreshToken,
    );
  };

  const logout = () => {
    clearTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
