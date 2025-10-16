import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAuth } from "../components/auth-context";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  width: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
});

const CreatePost: React.FC = () => {
  const { user, updateUser, addPost } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!title || !content || !user) return;

    const newPost = {
      id: Date.now().toString(),
      title,
      username: user.username,
      content,
      photo: image || undefined,
      likes: 0,
      petType: user.petType,
    };

    addPost(newPost);

    // I would separate this to a funtion and call it here to keep handleSubmit cleaner
    const xpToAdd = image ? 10 : 5;
    let newXP = user.xp + xpToAdd;
    let newLevel = user.level;

    if (newXP >= 20) {
      newXP -= 20;
      newLevel += 1;
    }

    updateUser({ ...user, xp: newXP, level: newLevel });

    // Redirect the user to the homepage instead of just clearing the form and remaining on the same page
    setTitle("");
    setContent("");
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Box
      // I would move the styles to a separate css file or use styled-component
      sx={{
        minHeight: "93vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
        backgroundColor: "#FFFDF7",
        backgroundImage:
          "url('https://images7.alphacoders.com/126/thumb-1920-1269810.jpg')",
        backgroundRepeat: "no-repeat",
        // backgroundSize: "auto", Change the size here if needed
        backgroundAttachment: "fixed",
        pt: 4,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: 4, width: "100%" }}
      >
        <h1>Create a New Post</h1>
      </Typography>

      <Card sx={{ width: "100%", maxWidth: 600, p: 3, mb: 4 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            sx={{
              color: "#828282",
              borderColor: "#828282",
              "&:hover": {
                backgroundColor: "#828282",
                color: "white",
                borderColor: "#828282",
              },
            }}
          >
            Upload Image
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
            />
          </Button>

          {image && (
            <Box sx={{ textAlign: "center" }}>
              <img
                src={image}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }}
              />
            </Box>
          )}

          {/* It's a good practice to store color hex codes in a theme or constants file for easier maintenance */}
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              fontWeight: "bold",
              borderRadius: 2,
              backgroundColor: "#FF6F61",
              "&:hover": { backgroundColor: "#E55A50" },
            }}
          >
            Create Post
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreatePost;
