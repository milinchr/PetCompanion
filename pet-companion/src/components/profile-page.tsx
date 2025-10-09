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

const pets: Record<string, { name: string; image: string }> = {
  cat: { name: "Cat", image: cat },
  dog: { name: "Dog", image: dog },
  hamster: { name: "Hamster", image: hamster },
  parrot: { name: "Parrot", image: parrot },
  rabbit: { name: "Rabbit", image: rabbit },
};

const ProfilePage = () => {
  const { username } = useParams();
  const { posts } = useAuth();
  const { user } = useAuth();

  const profileUser = user && user.username === username ? user : null;

  if (!profileUser) return <p>User not found</p>;

  const pet = pets[profileUser.petType] ?? pets["cat"];
  const userPosts = posts.filter((p) => p.username === profileUser.username);

  const getProgressWidth = (xp: number) => `${(xp / 20) * 100}%`;

  return (
    <Box sx={{ padding: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Card sx={{ width: "600px", borderRadius: 3, p: 3, mb: 4, backgroundColor: "#FFFDF7" }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <img src={pet.image} alt={pet.name} width={200} height={200} style={{ borderRadius: 12 }} />
          <Typography variant="h4">{profileUser.petName}</Typography>
          <Typography variant="subtitle1">@{profileUser.username}</Typography>
          <Typography>Pet Type: {pet.name}</Typography>
          <Typography>Level: {profileUser.level} (XP: {profileUser.xp})</Typography>
          <Box sx={{ width: "100%", backgroundColor: "#e0e0e0", borderRadius: 2, height: 10 }}>
            <Box sx={{ width: getProgressWidth(profileUser.xp), backgroundColor: "#56CCF2", height: "100%", borderRadius: 2 }} />
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ width: "100%", maxWidth: 1050, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Posts by @{profileUser.username}</Typography>
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
              petType={post.petType}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;