import * as React from 'react';

import { TextField, Button, Popover, Stack, IconButton } from '@mui/material';

import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Stack direction="row" spacing={1}>
        <IconButton size="small" color="secondary" onClick={handleClick}>
          <HandshakeOutlinedIcon />
        </IconButton>

        <IconButton size="small" color="secondary" onClick={handleClick}>
          <AutoAwesomeOutlinedIcon />
        </IconButton>

        <IconButton size="small" color="secondary" onClick={handleClick}>
          <CampaignOutlinedIcon />
        </IconButton>
      </Stack>
      <Popover
        id={id}
        disablePortal
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Stack sx={{ width: 300 }}>List...</Stack>
      </Popover>
    </div>
  );
}
