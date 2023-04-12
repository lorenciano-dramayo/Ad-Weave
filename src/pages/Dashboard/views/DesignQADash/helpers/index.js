import { styled, Stack, TextField } from '@mui/material';

export const Default = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  paddingLeft: open ? '36.5px' : '85px',
  paddingRight: open ? '36.5px' : '85px',
  paddingBottom: '24px',
  width: 'calc(100vw - 26.4rem)',
  height: '100vh',
  overflow: 'auto',
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

export const StyledStack = styled(Stack)({
  border: '1px solid #c7c7c7',
  borderRadius: '3px',
  backgroundColor: '#fff',
});

export const StyledTextField = styled(TextField)({
  backgroundColor: 'transparent',
  borderRadius: 0,
  border: 0,
  width: 160,
  '.MuiOutlinedInput-root': {
    height: 'auto',
    backgroundColor: '#fff',
  },
  '.MuiOutlinedInput-input': {
    padding: '5.34px 14px 5.34px 0px',
  },
  '& fieldset': {
    border: '0px solid transparent !important',
    backgroundColor: 'transparent',
  },
  '&.Mui-focused fieldset': {
    border: '0px solid transparent !important',
  },
});
