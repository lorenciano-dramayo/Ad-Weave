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

import IcoKnowledgeBase from 'assets/images/ico_knowledge_base.png';

import SearchIcon from '@mui/icons-material/Search';

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

const StyledTypographyH6 = styled(Typography)`
    align-items: center;
    display: flex;
    line-height: 0px;

    & img {
      height: 25px;
      width: auto;
      margin-right:10px
    }
`;

export default function Header() {
  return (
    <Box>
      <AppBar
        className='container'
        position="static"
        color="transparent"
        elevation={0}
        sx={{ color: 'white', backgroundColor: '#29125F' }}
      >
        <Toolbar variant="dense">
          <Stack
            direction="row"
            justifyContent="space-between"
            width="-webkit-fill-available"
            alignItems="center"
          >
            <Box>
              <StyledTypographyH6
                variant="h6"
                color="inherit"
                fontWeight={800}
                component="div"
              >
                <img src={IcoKnowledgeBase} alt="Knowledge Base Icon" /> Knowledge Base
              </StyledTypographyH6>
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
                    />
                  </Search>
                </Box>
                <Stack direction="row">
                  <Box>
                    <Button variant="contained" sx={{ color: 'white', backgroundColor: '#F22076' }}>
                      Search
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
