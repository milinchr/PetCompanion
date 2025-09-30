import React from 'react';
import { IconButton, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


interface AddProps {
  onClick?: () => void;
}

const handleAddClick = () => {
    console.log('Butonul + a fost apăsat!');};

const Add: React.FC<AddProps> = ({ 
  onClick = () => console.log('Add button clicked')
}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
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
          backgroundColor: 'white',
          width: 60,
          height: 60,
          borderRadius: '50%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          
        }}
      >
        <AddCircleOutlineIcon 
          sx={{ 
            fontSize: 60,
            color: '#FF6F61',
            '&:hover': {
              color: '#E55A50',
            },
            transition: 'all 0.3s ease',
          }} 
        />
      </IconButton>
    </Box>
  );
};

export default Add;