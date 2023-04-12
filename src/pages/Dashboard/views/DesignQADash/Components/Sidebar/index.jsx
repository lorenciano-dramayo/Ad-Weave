import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

// MUI Components
import { styled } from '@mui/material';

// Components
import GlobalDrawer from 'components/Common/Drawer';

// Custom

const openedMixin = (theme) => ({
  width: 250,
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
  width: 0,
});

const Drawer = styled(GlobalDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: 250,
  flexShrink: 0,
  borderRight: '#ecececec',
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
          boxSizing: 'border-box',
          zIndex: 2,
          left: 'revert',
        },
      }}
      open={isOpen}
      anchor="left"
      variant="permanent"
      content={<Fragment>{content}</Fragment>}
    />
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  content: PropTypes.any,
};

export default Sidebar;
