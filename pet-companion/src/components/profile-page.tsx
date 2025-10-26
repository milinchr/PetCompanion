import React from "react";
import { useAuth } from "../components/auth-context";
import Post from "./post";
import { Box, Typography, Card, CardContent } from "@mui/material";

import cat from "../images/pets/cat.png";
import dog from "../images/pets/dog.png";
import hamster from "../images/pets/hamster.png";
import parrot from "../images/pets/parrot.png";
import rabbit from "../images/pets/rabbit.png";
import { useParams } from "react-router-dom";
import { usePosts } from "./post-context";
import "../styles/profile.css"

const pets: Record<string, { name: string; image: string }> = {
  cat: { name: "Cat", image: cat },
  dog: { name: "Dog", image: dog },
  hamster: { name: "Hamster", image: hamster },
  parrot: { name: "Parrot", image: parrot },
  rabbit: { name: "Rabbit", image: rabbit },
};

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { posts } = usePosts();
  const { user } = useAuth();

  if (!username) return <p>User not found</p>;

  const profileUser =
    user && user.username === username
      ? user
      : JSON.parse(localStorage.getItem(username) || "null");

  if (!profileUser) return <p>User not found</p>;


  const pet = pets[profileUser.petType];
  const userPosts = posts.filter((p) => p.username === profileUser.username);

  const getProgressWidth = (xp: number) => `${(xp / 20) * 100}%`; // I noticed it's used in multiple places. Consider moving this to a utility file

  return (
    <Box className="profile-page">
      <Card className="profile-card">
        <CardContent className="profile-card-content">
          <img
            src={pet.image}
            alt={pet.name}
            className="profile-pet-image"
          />
          <Typography variant="h4">{profileUser.petName}</Typography>
          <Typography variant="subtitle1">@{profileUser.username}</Typography>
          <Typography>Pet Type: {pet.name}</Typography>
          <Typography>
            Level: {profileUser.level} (XP: {profileUser.xp})
          </Typography>

          <Box className="xp-bar">
            <Box
              className="xp-progress"
              style={{ width: getProgressWidth(profileUser.xp) }}
            />
          </Box>
        </CardContent>
      </Card>

      <Box className="profile-posts-section">
        <Typography variant="h5" className="profile-posts-title">
          Posts by @{profileUser.username}
        </Typography>

        {userPosts.length === 0 ? (
          <Typography>No posts yet.</Typography>
        ) : (
          userPosts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              username={post.username}
              title={post.title}
              content={post.content}
              photo={post.photo}
              likes={post.likes}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;