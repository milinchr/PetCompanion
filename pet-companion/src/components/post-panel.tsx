import React from "react";
import { useAuth } from "../components/auth-context";
import Post from "./post";

const PostPanel = () => {
  const { posts } = useAuth();

  return (
    <div>
      <h1 style={{ textAlign: "left" }}>Posts</h1>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          photo={post.photo}
          likes={post.likes}
        />
      ))}
    </div>
  );
};

export default PostPanel;
