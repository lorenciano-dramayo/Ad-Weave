import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  Box,
  TableCell,
  Avatar,
  AvatarGroup,
  Button,
  Popover,
  Typography,
} from '@mui/material';

const Users = ({ align, value }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const extractInitials = (data) => {
    if (_.isEmpty(data)) return '';

    return data
      .match(/\b(\w)/g)
      .join('')
      .toUpperCase();
  };

  return (
    <TableCell sx={{ padding: 0 }} align={align}>
      <Box
        aria-describedby={id}
        onClick={handleClick}
        display="flex"
        justifyContent="center"
        component={Button}
        disableRipple
        sx={{ width: '-webkit-fill-available', borderRadius: 0 }}
      >
        <AvatarGroup
          max={3}
          sx={{
            '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 15 },
          }}
        >
          {value.map((data, index) => (
            <Avatar
              alt={data}
              key={index}
              sx={{ width: 24, height: 24, backgroundColor: '#25165B' }}
            >
              {extractInitials(data)}
            </Avatar>
          ))}
        </AvatarGroup>
      </Box>
      {/* Popover */}
      <Popover
        PaperProps={{ sx: { width: 100, borderRadius: '0 0 0.3em 0.3em' } }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography sx={{ p: 2 }}>user list</Typography>
      </Popover>
    </TableCell>
  );
};

Users.propTypes = {
  align: PropTypes.string,
  value: PropTypes.any,
};

export default Users;
