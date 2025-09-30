import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserData {
  username: string;
  petName: string;
  petType: string;
  password: string;
  level: number;
  xp: number;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserData | null;
  login: (
    username: string,
    password: string,
    petName?: string,
    petType?: string
  ) => boolean;
  logout: () => void;
  updateUser: (updatedUser: UserData) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (
  username: string,
  password: string,
  petName?: string,
  petType?: string
): boolean => {
    const savedUser = localStorage.getItem(username);

    if (savedUser) {
      const parsedUser: UserData = JSON.parse(savedUser);
      if (parsedUser.password === password) {
        setUser(parsedUser);
        localStorage.setItem("user", JSON.stringify(parsedUser));
        return true;
      } else {
        return false;
      }
    } else {
      if (!petName || !petType) return false;
      const newUser: UserData = {
        username,
        petName,
        petType,
        password,
        level: 0,
        xp: 0,
      };
      localStorage.setItem(username, JSON.stringify(newUser));
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      return true;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUser = (updatedUser: UserData) => {
  setUser(updatedUser);
  localStorage.setItem("user", JSON.stringify(updatedUser));
  localStorage.setItem(updatedUser.username, JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};