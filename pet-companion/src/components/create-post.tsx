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
import { usePosts } from "./post-context";
import "../styles/createpost.css"

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
  const { user, updateUser} = useAuth();
  const { addPost } = usePosts();
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
    <Box className="create-post-page">
      <Typography variant="h4" component="h1" gutterBottom className="create-post-title">
        <h1>Create a New Post</h1>
      </Typography>

      <Card className="create-post-card">
        <CardContent className="create-post-card-content">
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
            className="upload-btn"
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
              <img src={image} alt="Preview" className="preview-img" />
            </Box>
          )}

          <Button variant="contained" onClick={handleSubmit} className="submit-btn">
            Create Post
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreatePost;
