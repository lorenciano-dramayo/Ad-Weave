import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Milestone = () => {
  const { pathname } = useLocation();

  return (
    <Box width="100%" height="100vh">
     <p>Ongoing Development</p>
    </Box>
  );
};

export default Milestone;
