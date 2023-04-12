import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Mui Components
import { Box, TableCell, Button, Popover, Typography } from '@mui/material';

const TaskStatus = ({ align }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <TableCell sx={{ backgroundColor: '#9e9e9e', padding: 0 }} align={align}>
      <Box
        aria-describedby={id}
        onClick={handleClick}
        component={Button}
        sx={{ width: '-webkit-fill-available', borderRadius: 0, color: '#fff' }}
      >
        {/* {value} */}-
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
        <Typography sx={{ p: 2 }}>In-Progress</Typography>
      </Popover>
    </TableCell>
  );
};

TaskStatus.propTypes = {
  align: PropTypes.string,
  value: PropTypes.any,
};

export default TaskStatus;
