import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Settings = () => {
  const { pathname } = useLocation();

  return (
    <Box width="100%" height="100vh">
      {pathname}
    </Box>
  );
};

export default Settings;
 