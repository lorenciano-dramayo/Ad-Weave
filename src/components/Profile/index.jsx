import React from 'react';

import { useHistory } from 'react-router-dom';

import _ from 'lodash';

import PropTypes from 'prop-types';

// constant
import { profile } from 'pages/Dashboard/constant';

import { useDispatch } from 'react-redux';
import { logout } from 'store/reducers/auth';

import {
  Box,
  Stack,
  Divider,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

// mui icon
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';

export default function Profile({ user, onClose }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRedirect = (type) => {
    switch (type) {
      case 'profile':
        history.push({
          pathname: '/profile',
        });
        break;

      case 'logout':
        dispatch(logout());
        break;

      default:
        console.log('soon');
        break;
    }

    onClose();
  };

  return (
    <Stack sx={{ width: '200px' }} py={1}>
      <Stack direction="row" alignItems="center" spacing={2} px={2} pb={1}>
        <Box>
          {!_.isEmpty(user?.profile_picture) &&
          user?.profile_picture?.split('/').pop() !== 'thumb_' ? (
            <Avatar alt={user?.fullname} src={user?.profile_picture} />
          ) : (
            <Avatar>
              {`${user?.fullname?.split(' ')[0][0]}${
                !_.isEmpty(user?.fullname?.split(' ')[1][0])
                  ? user?.fullname?.split(' ')[1][0]
                  : ''
              }`}
            </Avatar>
          )}
        </Box>
        <Stack justifyContent="center">
          <Box>
            <Typography
              fontWeight={700}
              variant="body1"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: '1',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textTransform: 'capitalize',
              }}
            >
              {user?.fullname}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: '1',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
              variant="body2"
            >
              {user?.team_name}
            </Typography>
          </Box>
        </Stack>
      </Stack>
      <Divider sx={{ borderColor: 'rgb(0 0 0 / 5%)' }} />
      <List dense sx={{ padding: 0 }}>
        {profile?.map((data, index) => (
          <ListItem key={index} sx={{ padding: 0 }}>
            <ListItemButton onClick={() => handleRedirect(data?.slug)}>
              <ListItemIcon sx={{ minWidth: '28px' }}>
                {data?.icon}
              </ListItemIcon>
              <ListItemText sx={{ '.MuiTypography-root': { fontWeight: 700 } }}>
                {data?.name}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
        {/* <Divider sx={{ borderColor: 'rgb(0 0 0 / 5%)' }} />
        <ListItem sx={{ padding: 0 }}>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: '28px' }}>
              <FeedbackOutlinedIcon />
            </ListItemIcon>
            <ListItemText sx={{ '.MuiTypography-root': { fontWeight: 700 } }}>
              Send Feedback
            </ListItemText>
          </ListItemButton>
        </ListItem> */}
      </List>
    </Stack>
  );
}

Profile.propTypes = {
  user: PropTypes.any,
  onClose: PropTypes.func,
};
