import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import post1 from "../uploads/murka-sleepy.jpg";
import post2 from "../uploads/angry-cat.jpg";

interface UserData {
  username: string;
  petName: string;
  petType: string;
  password: string;
  level: number;
  xp: number;
}

interface PostData {
  id: string;
  title: string;
  content: string;
  photo?: string;
  likes: number;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserData | null;
  posts: PostData[];
  login: (
    username: string,
    password: string,
    petName?: string,
    petType?: string
  ) => boolean;
  logout: () => void;
  updateUser: (updatedUser: UserData) => void;
  addPost: (newPost: PostData) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultPosts: PostData[] = [
  {
    id: "p1",
    title: "Murka",
    content: "Murka is sleepy again <3",
    photo: post1,
    likes: 0,
  },
  {
    id: "p2",
    title: "Angry Bella",
    content:
      "Meet Bella, the grumpy queen of the house. I caught her mid-scowl because she wasn’t in the mood for cuddles—sometimes her attitude is just too photogenic to resist!",
    photo: post2,
    likes: 0,
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [posts, setPosts] = useState<PostData[]>([]);

  // Load user & posts when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedPosts = localStorage.getItem("posts");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedPosts) {
      setPosts([...defaultPosts, ...JSON.parse(savedPosts)]);
    } else {
      setPosts(defaultPosts);
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
      }
      return false;
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

  const addPost = (newPost: PostData) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        user,
        posts,
        login,
        logout,
        updateUser,
        addPost,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
