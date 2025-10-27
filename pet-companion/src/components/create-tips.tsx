// src/pages/create-tips.tsx
import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/createtips.css"

const CreateTips: React.FC = () => {
  const navigate = useNavigate();
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [shortText, setShortText] = useState("");
  const [fullText, setFullText] = useState("");

  const handleSubmit = () => {
    if (!author || !category || !shortText || !fullText) return;
    const newTip = {
    id: Date.now(),
    author,
    category,
    rating: 0,
    shortText,
    fullText,
  };

  // Retrieve existing tips
  const storedTips = JSON.parse(localStorage.getItem("customTips") || "[]");
  // Add new one
  storedTips.push(newTip);
  // Save updated list
  localStorage.setItem("customTips", JSON.stringify(storedTips));

  navigate("/tips");

};

return (
    <Box className="create-tips-page">
      <Typography variant="h4" className="create-tips-title">
        <h1>✏️ Create a New Tip</h1>
      </Typography>

      <Card className="create-tips-card">
        <CardContent className="create-tips-card-content">
          <TextField
            label="Author"
            fullWidth
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="Dogs">Dogs</MenuItem>
              <MenuItem value="Cats">Cats</MenuItem>
              <MenuItem value="Parrots">Parrots</MenuItem>
              <MenuItem value="Hamsters">Hamsters</MenuItem>
              <MenuItem value="Rabbits">Rabbits</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Short Tip"
            fullWidth
            value={shortText}
            onChange={(e) => setShortText(e.target.value)}
          />
          <TextField
            label="Full Tip"
            fullWidth
            multiline
            rows={4}
            value={fullText}
            onChange={(e) => setFullText(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            className="submit-tip-btn"
          >
            Submit Tip
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateTips;
