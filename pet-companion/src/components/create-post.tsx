import React, { useState, useRef } from "react";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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

type Post = {
  id: number;
  title: string;
  content: string;
  image: string | null;
};

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!title || !content) return;
    const newPost: Post = {
      id: Date.now(),
      title,
      content,
      image,
    };
    setPosts([newPost, ...posts]);
    setTitle("");
    setContent("");
    setImage(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 3, backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: "center", marginBottom: 4 }}>
        Create a New Post
      </Typography>

      <Box display="flex" flexDirection="column" gap={4}>
        <Box sx={{ backgroundColor: "white", p: 3, borderRadius: 2, boxShadow: 2 }}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Content"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            sx={{ mt: 2, mb: 2,color: '#828282',borderColor: '#828282','&:hover': {backgroundColor: '#828282',color: 'white', borderColor: '#828282',  }}}fullWidth>
            Upload Image
            <VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef}/>

          </Button>

          {image && (
            <Box sx={{ mt: 2, mb: 2, textAlign: "center" }}>
              <img src={image} alt="Preview" style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }} />
            </Box>
          )}

          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2, fontWeight: "bold", borderRadius: 2, backgroundColor: "#FF6F61", }} fullWidth>
            Create Post
          </Button>
        </Box>

        {/* Display posts */}
        {posts.map((post) => (
          <Card key={post.id} sx={{ mb: 2 }}>
            {post.image && (
              <img src={post.image} alt={post.title} style={{ width: "100%", maxHeight: 200, objectFit: "cover" }} />
            )}
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2">{post.content}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CreatePost;


