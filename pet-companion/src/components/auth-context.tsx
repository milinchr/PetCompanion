import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
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

// I would separate this into its own file for better organization
// The current file is named auth-context.tsx, so it makes sense to not keep PostData interface here
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
  // Check if all these parameters marked as "?" can be optional
  login: (
    username: string,
    password: string,
    petName?: string,
    petType?: string,
    treat?: string,
    age?: string,
    color?: string,
    eyes?: string
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

  // Why setPosts is called here in this file?
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedPosts = localStorage.getItem("posts");

    if (savedUser) setUser(JSON.parse(savedUser));

    let currentPosts: PostData[] = savedPosts ? JSON.parse(savedPosts) : [];

    const existingIds = new Set(currentPosts.map((p) => p.id));

    const newDefaultPosts = defaultPosts.filter((p) => !existingIds.has(p.id));

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
    eyes?: string
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

  // All post management functions should be in a separate file
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

/* (!) NOT AN ERROR, JUST AN IMPROVEMENT SUGGESTION

If some component uses useAuth() outside <AuthProvider>, that throw happens during render.

- no Error Boundary: whole tree can crash -> white screen in prod.

- with Error Boundary: users see your friendly fallback instead. 

   What’s an error boundary?
   It’s a special React wrapper that catches runtime errors in everything inside it.

- without it: an error during render can crash the whole app -> blank/white screen.

- with it: you show a fallback UI instead of crashing.

  What’s a fallback?

the little UI you show when something breaks.

e.g. “Something went wrong. Refresh?” + a button.

Suggestion: use react-error-boundary.

import { ErrorBoundary } from "react-error-boundary";

function Fallback() {
  return <div>Oops. Something broke. Try refresh or go Home.</div>;
}

root.render(
  <ErrorBoundary FallbackComponent={Fallback}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ErrorBoundary>
);
*/
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
