import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import post1 from "../uploads/murka-sleepy.jpg";
import post2 from "../uploads/angry-cat.jpg";

interface UserData {
  username: string;
  petName: string;
  petType: string;
  password: string;
  treat: string;
  age: number;
  color: string;
  eyes: string;
  level: number;
  xp: number;
}

interface PostData {
  id: string;
  title: string;
  username: string;
  content: string;
  photo?: string;
  likes: number;
  petType: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserData | null;
  posts: PostData[];
  login: (
    username: string,
    password: string,
    petName?: string,
    petType?: string,
    treat?: string,
    age?: string,
    color?: string,
    eyes?: string,
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
    username: "use1",
    content: "Murka is sleepy again <3",
    photo: post1,
    likes: 0,
    petType: "cat",
  },
  {
    id: "p2",
    title: "Angry Bella",
    username: "user2",
    content:
      "Meet Bella, the grumpy queen of the house. I caught her mid-scowl because she wasn’t in the mood for cuddles—sometimes her attitude is just too photogenic to resist!",
    photo: post2,
    likes: 0,
    petType: "cat",
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedPosts = localStorage.getItem("posts");

    if (savedUser) setUser(JSON.parse(savedUser));

    let currentPosts: PostData[] = savedPosts ? JSON.parse(savedPosts) : [];

    const existingIds = new Set(currentPosts.map((p) => p.id));

    const newDefaultPosts = defaultPosts.filter(
      (p) => !existingIds.has(p.id)
    );

    if (newDefaultPosts.length > 0) {
      currentPosts = [...newDefaultPosts, ...currentPosts];
      localStorage.setItem("posts", JSON.stringify(currentPosts));
    }

    setPosts(currentPosts);
  }, []);

  const login = (
    username: string,
    password: string,
    petName?: string,
    petType?: string,
    treat?: string,
    age?: string,
    color?: string,
    eyes?: string,
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
        treat: treat || "",
        age: Number(age) || 0,
        color: color || "",
        eyes: eyes || "",
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
