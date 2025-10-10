import React from "react";
import { IconButton, Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface AddProps {
  onClick?: () => void;
}

// Remove unused code
const handleAddClick = () => {
  console.log("Butonul + a fost apăsat!");
};

// It's better to keep the styles in a separate css file.
// If some styles are reused, consider using styled-components

// Example:
// import styled from 'styled-components';

// const FloatingContainer = styled(Box)`
//   position: fixed;
//   bottom: 24px;
//   right: 24px;
//   z-index: 1000;
// `;

// Or you might can use import { styled } from "@mui/material/styles";
// As you already did in create-post.tsx

const Add: React.FC<AddProps> = ({
  // Remove console log if not needed anymore
  onClick = () => console.log("Add button clicked"),
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1000,
      }}
    >
      <IconButton
        aria-label="add"
        onClick={onClick}
        sx={{
          padding: 0,
          backgroundColor: "white",
          width: 60,
          height: 60,
          borderRadius: "50%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        {/* It's a good practice to store color hex codes in a theme or constants file for easier maintenance */}
        <AddCircleOutlineIcon
          sx={{
            fontSize: 60,
            color: "#FF6F61",
            "&:hover": {
              color: "#E55A50",
            },
            transition: "all 0.3s ease",
          }}
        />
      </IconButton>
    </Box>
  );
};

export default Add;
