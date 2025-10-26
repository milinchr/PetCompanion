import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import post1 from "../uploads/murka-sleepy.jpg";
import post2 from "../uploads/angry-cat.jpg";

export interface PostData {
  id: string;
  title: string;
  username: string;
  content: string;
  photo?: string;
  likes: number;
  petType: string;
}

interface PostContextType {
  posts: PostData[];
  skippedPosts: PostData[];
  addPost: (newPost: PostData) => void;
  likePost: (id: string) => void;
  skipPost: (id: string, username: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

const defaultPosts: PostData[] = [
  {
    id: "p1",
    title: "Murka",
    username: "user1",
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

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [skippedPosts, setSkippedPosts] = useState<string[]>([]);

  const userData = localStorage.getItem("user");
  const username = userData ? JSON.parse(userData).username : null;

  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    let currentPosts: PostData[] = savedPosts ? JSON.parse(savedPosts) : [];

    const existingIds = new Set(currentPosts.map((p) => p.id));
    const newDefaultPosts = defaultPosts.filter((p) => !existingIds.has(p.id));

    if (newDefaultPosts.length > 0) {
      currentPosts = [...newDefaultPosts, ...currentPosts];
      localStorage.setItem("posts", JSON.stringify(currentPosts));
    }

    setPosts(currentPosts);

    if (username) {
      const storedSkipped = JSON.parse(
        localStorage.getItem(`${username}-skipped`) || "[]"
      );
      setSkippedPosts(storedSkipped);
    }
  }, [username]);

  const addPost = (newPost: PostData) => {
    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
  };

  const likePost = (id: string) => {
    const updated = posts.map((p) =>
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    );
    setPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
  };

  const skipPost = (id: string, username: string) => {
    try {
      const skipped = JSON.parse(
        localStorage.getItem(`${username}-skipped`) || "[]"
      );
      if (!skipped.includes(id)) {
        skipped.push(id);
        localStorage.setItem(`${username}-skipped`, JSON.stringify(skipped));
        setSkippedPosts(skipped);
      }
    } catch (error) {
      console.error("Error skipping post:", error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        skippedPosts: skippedPosts.map((id) => posts.find((p) => p.id === id)).filter(Boolean) as PostData[],
        addPost,
        likePost,
        skipPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("usePosts must be used within PostProvider");
  return context;
};
