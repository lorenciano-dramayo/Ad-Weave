import React from 'react';

import PropTypes from 'prop-types';

import { AppBar, Box, Stack, Typography } from '@mui/material';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

import logo from 'assets/adLibLogo.svg';

const Header = ({ onSettingsClicked }) => {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#ffffff',
        zIndex: 3,
        border: 0,
        borderBottom: '1px solid #ececec',
      }}
      elevation={0}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={3}
        sx={{ height: '48px' }}
      >
        <Box sx={{ display: 'flex' }}>
          <img src={logo} alt="ad-lib-logo" />
        </Box>

        <Box>
          <Box>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                cursor: 'pointer',
                padding: '8px 16px 8px 32px',
                color: '#5025c4',
                ':hover': {
                  backgroundColor: '#f220763d',
                },
              }}
              onClick={() => onSettingsClicked('settings')}
            >
              <SettingsOutlinedIcon />
              <Typography fontWeight={700} color="inherit">
                Settings
              </Typography>
              <ExpandMoreRoundedIcon />
            </Stack>
          </Box>
        </Box>
      </Stack>
    </AppBar>
  );
};

Header.propTypes = {
  onSettingsClicked: PropTypes.func,
};

export default Header;
