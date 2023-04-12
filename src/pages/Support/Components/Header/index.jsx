import React from 'react';

import { styled, alpha } from '@mui/material/styles';

import {
  Stack,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  InputBase,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

import PropTypes from 'prop-types';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  border: '1px solid #ececec',
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header({ onSearch, onClickFilter }) {
  return (
    <Box>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ border: '1px solid #ececec' }}
      >
        <Toolbar variant="dense">
          <Stack
            direction="row"
            justifyContent="space-between"
            width="-webkit-fill-available"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h6"
                color="inherit"
                fontWeight={800}
                component="div"
              >
                Support
              </Typography>
            </Box>
            <Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                      onChange={onSearch}
                    />
                  </Search>
                </Box>
                <Stack direction="row">
                  <Box>
                    <Button
                      variant="contained"
                      startIcon={<TuneIcon />}
                      onClick={onClickFilter}
                    >
                      Filter
                    </Button>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

Header.propTypes = {
  onSearch: PropTypes.any,
  onClickFilter: PropTypes.any,
};
