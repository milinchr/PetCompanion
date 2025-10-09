// src/pages/create-tips.tsx
import React, { useState } from "react";
import { Box, Card, CardContent, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateTips: React.FC = () => {
  const navigate = useNavigate();
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [shortText, setShortText] = useState("");
  const [fullText, setFullText] = useState("");

  const handleSubmit = () => {
    if (!author || !category || !shortText || !fullText) return;
    console.log("New Tip Created:", { author, category, shortText, fullText });
    navigate("/tips"); // navigate back after submission
  };

  return (
    <Box
      sx={{
        minHeight: "94vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
        backgroundColor: "#FFFDF7",
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        ✏️ Create a New Tip
      </Typography>

      <Card sx={{ width: "100%", maxWidth: 600, p: 3 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField label="Author" fullWidth value={author} onChange={(e) => setAuthor(e.target.value)} />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <MenuItem value="Dogs">Dogs</MenuItem>
              <MenuItem value="Cats">Cats</MenuItem>
              <MenuItem value="Parrots">Parrots</MenuItem>
              <MenuItem value="Hamsters">Hamsters</MenuItem>
              <MenuItem value="Rabbits">Rabbits</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Short Tip" fullWidth value={shortText} onChange={(e) => setShortText(e.target.value)} />
          <TextField label="Full Tip" fullWidth multiline rows={4} value={fullText} onChange={(e) => setFullText(e.target.value)} />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#FF6F61", "&:hover": { backgroundColor: "#E55A50" }, borderRadius: 2 }}
            onClick={handleSubmit}
          >
            Submit Tip
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateTips;
