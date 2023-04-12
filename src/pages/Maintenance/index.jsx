import React, { useEffect } from 'react';

import _ from 'lodash';

// Redux
import { useDispatch } from 'react-redux';

import { useLocation } from 'react-router-dom';

// reducer
import { getData } from 'store/reducers/maintenance';

// Pages
import Main from 'pages/Maintenance/views/Main';

// MUI Components
import { styled, Box } from '@mui/material';

// Components
import Sidebar from 'pages/Maintenance/Components/Sidebar';

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

const Maintenance = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [urlTag, setUrlTag] = React.useState('');

  useEffect(() => {
    const { tag, headers } = _.filter(
      navigation,
      (item) => item.url === location.pathname.split('/').pop(-1)
    )[0];

    setUrlTag(tag);
    dispatch(getData(tag, headers));
  }, []);

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
        <Main handleOpen={handleDrawerClose} isOpen={open} tag={urlTag} />
      </Default>
    </Box>
  );
};

export default Maintenance;
