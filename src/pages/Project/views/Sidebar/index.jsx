import React from 'react';

import PropTypes from 'prop-types';

// MUI Components
import {
  styled,
} from '@mui/material';

// Components
import GlobalDrawer from 'components/Common/Drawer';

// Custom

const openedMixin = (theme) => ({
  width: 270,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(GlobalDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: '#F5F6F8',
  width: 270,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));



const Sidebar = ({ isOpen, content }) => {

  return (
    <Drawer
      sx={{
        height: '100vh',
        '& .MuiDrawer-paper': {
          backgroundColor: '#f5f6f8',
          boxSizing: 'border-box',
          boxShadow: !isOpen ? '2px 0px 4px rgba(0, 0, 0, 0.15)' : 'none' ,
          zIndex: 1,
          left: 'revert',
        },
      }}
      open={isOpen}
      anchor="left"
      variant="permanent"
      content={content}
    />
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  content: PropTypes.any
};

export default Sidebar;
