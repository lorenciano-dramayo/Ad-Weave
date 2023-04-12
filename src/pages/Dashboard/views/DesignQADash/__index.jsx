import React, { useEffect } from 'react';

// MUI
import { styled, Box } from '@mui/material';

// reducer
import { getData } from 'store/reducers/maintenance';

// Components
import Sidebar from 'pages/Dashboard/views/DesignQADash/Components/Sidebar';

// Menu Items
import { navigation } from 'pages/Maintenance/variables/maintenance';

const Default = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(5),
  width: 'calc(100vw - 26.4rem)',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DesignQADash = () => {
  const [open, setOpen] = React.useState(true);

  useEffect(() => {}, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex" backgroundColor="#F5F5F5">
      <Sidebar
        navigation={navigation}
        isOpen={open}
        handleClose={handleDrawerOpen}
        getData={getData}
      />
      <Default open={open}>
        <>AW</>
      </Default>
    </Box>
  );
};

export default DesignQADash;
