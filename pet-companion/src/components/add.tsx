import React from "react";
import { IconButton, Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "../styles/add.css"

interface AddProps {
  onClick?: () => void;
}


const Add: React.FC<AddProps> = ({
  onClick = () => console.log("Add button clicked"),
}) => {
  return (
    <Box className='add-container'
    >
      <IconButton aria-label="add" onClick={onClick} className="add-button">

        <AddCircleOutlineIcon className="add-icon"/>
      </IconButton>
    </Box>
  );
};

export default Add;
