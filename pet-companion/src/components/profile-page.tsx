import React from "react";
import { useAuth } from "../components/auth-context";
import { useParams } from "react-router-dom";
import { usePosts } from "./post-context";
import Post from "./post";
import { Box, Typography, Card, CardContent } from "@mui/material";

import cat from "../images/pets/cat.png";
import dog from "../images/pets/dog.png";
import hamster from "../images/pets/hamster.png";
import parrot from "../images/pets/parrot.png";
import rabbit from "../images/pets/rabbit.png";
import { useParams } from "react-router-dom";
import { usePosts } from "./post-context";

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
    <Box
      // Move to CSS or use styled-components
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        // Move to CSS or use styled-components
        sx={{
          width: "600px",
          borderRadius: 3,
          p: 3,
          mb: 4,
          backgroundColor: "#FFFDF7",
        }}
      >
        <CardContent
          // Move to CSS or use styled-components
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <img
            src={pet.image}
            alt={pet.name}
            width={200}
            height={200}
            style={{ borderRadius: 12 }}
          />
          <Typography variant="h4">{profileUser.petName}</Typography>
          <Typography variant="subtitle1">@{profileUser.username}</Typography>
          <Typography>Pet Type: {pet.name}</Typography>
          <Typography>
            Level: {profileUser.level} (XP: {profileUser.xp})
          </Typography>
          <Box
            // Move to CSS or use styled-components
            sx={{
              width: "100%",
              backgroundColor: "#e0e0e0",
              borderRadius: 2,
              height: 10,
            }}
          >
            <Box
              // Move to CSS or use styled-components
              sx={{
                width: getProgressWidth(profileUser.xp),
                backgroundColor: "#56CCF2",
                height: "100%",
                borderRadius: 2,
              }}
            />
          </Box>
        </CardContent>

        <Box sx={{ mt: 3, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: "40%", backgroundColor: "#e0e0e0", borderRadius: 2, height: 10 }}>
            <Box sx={{ width: progressWidth, backgroundColor: "#56CCF2", height: "100%", borderRadius: 2 }} />
          </Box>
        </Box>
      </Card>

      <Box
        // Move to CSS or use styled-components
        sx={{
          width: "100%",
          maxWidth: 1050,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
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