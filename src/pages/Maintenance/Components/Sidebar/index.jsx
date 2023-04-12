import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

// Routes
import { Link, useLocation } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';

// MUI Components
import {
  Typography,
  IconButton,
  Divider,
  Stack,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Tooltip,
} from '@mui/material';

// MUI Icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Components
import GlobalDrawer from 'components/Common/Drawer';

// Custom

const openedMixin = (theme) => ({
  width: 254,
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
  width: 254,
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

const StyledListItem = styled(ListItem)({
  borderRadius: '7px',
  margin: '4px 0',
  '&.Mui-selected': {
    backgroundColor: '#df3c76',
    color: '#fff',
  },
});

const Sidebar = ({ navigation, getData, isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleDispatch = (tag, headers) => {
    dispatch(getData(tag, headers));
  };

  return (
    <Drawer
      sx={{
        height: '100vh',
        '& .MuiDrawer-paper': {
          backgroundColor: '#f5f6f8',
          boxSizing: 'border-box',
          boxShadow: '2px 0px 4px rgba(0, 0, 0, 0.15)',
          zIndex: 1,
          left: 'revert',
        },
      }}
      open={isOpen}
      anchor="left"
      variant="permanent"
      content={
        <Fragment>
          <Stack sx={{ height: '4.847em' }} justifyContent="center">
            {isOpen ? (
              <Box px={2}>
                <Typography variant="h6" fontWeight={700} color="primary">
                  Maintenance
                </Typography>
              </Box>
            ) : (
              <Box display="flex" justifyContent="center">
                <IconButton
                  onClick={handleClose}
                  sx={{
                    background: '#25165B',
                    color: '#fff',
                    '&:hover': { background: '#25165B' },
                  }}
                  size="small"
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            )}
          </Stack>
          <Box px={2}>
            <Divider />
          </Box>
          <List sx={{ margin: isOpen ? '0 1em' : '0 0.4em' }}>
            {navigation.map((data, index) => (
              <Box
                component={isOpen ? 'div' : Tooltip}
                placement="right"
                title={isOpen ? null : data.label}
                key={index}
                arrow
              >
                <StyledListItem
                  disablePadding
                  component={Link}
                  to={`${data.url}`}
                  onClick={() => handleDispatch(data.tag, data.headers)}
                  selected={data.url === location.pathname.split('/').pop(-1)}
                >
                  <ListItemButton
                    sx={{ borderRadius: '7px', padding: '4px 10px' }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: isOpen ? 3 : 'auto',
                        justifyContent: 'center',
                        color:
                          data.url === location.pathname.split('/').pop(-1)
                            ? '#fff'
                            : 'initial',
                      }}
                    >
                      {data.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={data.label}
                      sx={{
                        opacity: isOpen ? 1 : 0,
                        '& .MuiTypography-root': {
                          fontWeight: 700,
                          color:
                            data.url === location.pathname.split('/').pop(-1)
                              ? '#fff'
                              : 'initial',
                        },
                      }}
                    />
                  </ListItemButton>
                </StyledListItem>
              </Box>
            ))}
          </List>
        </Fragment>
      }
    />
  );
};

Sidebar.propTypes = {
  navigation: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  getData: PropTypes.any,
  handleClose: PropTypes.func.isRequired,
};

export default Sidebar;
