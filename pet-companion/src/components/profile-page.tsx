import React from "react";
import { useAuth } from "../components/auth-context";
import { useParams } from "react-router-dom";
import { usePosts } from "./post-context";
import Post from "./post";
import "../styles/profile.css";
import { Box, Typography, Card, CardContent } from "@mui/material";

import cat from "../images/pets/cat.png";
import dog from "../images/pets/dog.png";
import hamster from "../images/pets/hamster.png";
import parrot from "../images/pets/parrot.png";
import rabbit from "../images/pets/rabbit.png";

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
    user?.username === username
      ? user
      : JSON.parse(localStorage.getItem(username) || "null");

  if (!profileUser) return <p>User not found</p>;

  if (!profileUser.petType || !pets[profileUser.petType]) {
    profileUser.petType = "cat";
  }
  const pet = pets[profileUser.petType];
  const userPosts = posts.filter((p) => p.username === profileUser.username);
  const progressWidth = `${(profileUser.xp / 20) * 100}%`;

  return (
  <div className="profile-page">
    <Box
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        className="profile-card"
        sx={{
          width: "100%",
          maxWidth: 700,
          p: 3,
          mb: 4,
          backgroundColor: "#FFFDF7",
        }}
      >
        <Box
          className="profile-card-content"
          sx={{ mb: 3 }}
        >
          <Typography variant="h4" fontWeight={600}>
            {profileUser.petName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            @{profileUser.username}
          </Typography>
        </Box>

        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ minWidth: 150, display: "flex", flexDirection: "column", gap: 1, textAlign: "right" }}>
            <Typography><b>Pet Type:</b> {pet.name}</Typography>
            <Typography><b>Level:</b> {profileUser.level} (XP: {profileUser.xp})</Typography>
            <Typography><b>Age:</b> {profileUser.age || "—"}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img className="profile-pet-image" src={pet.image} alt={pet.name} />
          </Box>

          <Box sx={{ minWidth: 150, display: "flex", flexDirection: "column", gap: 1, textAlign: "left" }}>
            <Typography><b>Treat:</b> {profileUser.treat || "—"}</Typography>
            <Typography><b>Fur Color:</b> {profileUser.color || "—"}</Typography>
            <Typography><b>Eye Color:</b> {profileUser.eyes || "—"}</Typography>
          </Box>
        </CardContent>

        <Box sx={{ mt: 3, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <div className="xp-bar">
            <div className="xp-progress" style={{ width: progressWidth }}></div>
          </div>
        </Box>
      </Card>

      <div className="profile-posts-section">
        <Typography className="profile-posts-title" variant="h5">
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
      </div>
    </Box>
  </div>
);
};

export default ProfilePage;