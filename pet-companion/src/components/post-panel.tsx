import React from "react";
import { useAuth } from "../components/auth-context";
import Post from "./post";

const PostPanel = () => {
  const { posts } = useAuth();
  const { user } = useAuth();

  return (
    <div>
      <h1 style={{ textAlign: "left" }}>Posts</h1>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          title={post.title}
          content={post.content}
          photo={post.photo}
          likes={post.likes}
          petType={post.petType}
        />
      ))}
    </div>
  );
};

export default PostPanel;
