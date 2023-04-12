import React, { useState } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Reducers
import { logout } from 'store/reducers/auth';

// MUI Components
import {
  Stack,
  Box,
  Button,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';

// Icons
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';

// styles
import { useStyles } from 'components/Dashboard/Header/styles';

const Header = () => {
  const classes = useStyles();
  const { data: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setAnchorEl(null);
    dispatch(logout());
  };

  return (
    <Stack className={classes.root}>
      <Box>{<Moment format="dddd, MMMM D, YYYY" />}</Box>
      <Box>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <Stack className={classes.header}>
            <Box>
              {!_.isEmpty(user?.profile_picture) &&
              user?.profile_picture?.split('/').pop() !== 'thumb_' ? (
                <Avatar
                  className={classes.avatar}
                  alt={user.fullname}
                  src={user.profile_picture}
                />
              ) : (
                <Avatar
                  sx={{
                    border: '2px solid #25165b',
                  }}
                >
                  {`${user?.fullname.split(' ')[0][0]}${
                    !_.isEmpty(user?.fullname.split(' ')[1][0])
                      ? user?.fullname.split(' ')[1][0]
                      : ''
                  }`}
                </Avatar>
              )}
            </Box>
            <Box width="-webkit-fill-available">
              <Stack textAlign="left" marginLeft="1em">
                <Box className={classes.multiLineEllipsis}>
                  <Typography variant="button" fontWeight="bold">
                    {user.fullname}
                  </Typography>
                </Box>
                <Box className={classes.multiLineEllipsis}>
                  <Typography
                    className={classes.multiLineEllipsis}
                    variant="caption"
                  >
                    {user.team_name}&nbsp;Team
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MenuItem component={Link} to="/profile">
            <Stack
              direction="row"
              minWidth="4.5em"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <AccountCircleOutlinedIcon />
              </Box>
              <Box>Profile</Box>
            </Stack>
          </MenuItem>
          <MenuItem onClick={handleLogoutClick}>
            <Stack
              direction="row"
              minWidth="4.5em"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <PowerSettingsNewOutlinedIcon />
              </Box>
              <Box>Logout</Box>
            </Stack>
          </MenuItem>
        </Menu>
      </Box>
    </Stack>
  );
};

export default Header;
