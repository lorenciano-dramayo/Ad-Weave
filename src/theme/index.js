import { unstable_createMuiStrictModeTheme as createTheme } from '@mui/material/styles';
import { appColors } from './variables';
import '@fontsource/karla';

const palette = {
  primary: {
    main: '#25165B',
    light: '#5025C4',
  },
  secondary: {
    main: '#F22076',
  },
  error: {
    main: '#F2445C',
  },
  success: {
    main: '#1ABC00',
  },
  background: {
    default: '#FFFFFF',
  },
};

const appTheme = createTheme({
  palette: {
    ...palette,
  },
  typography: {
    fontFamily: ['Karla', 'Roboto'].join(','),
    fontSize: 13,
    body1: {
      color: appColors.black,
      lineHeight: '32px',
    },
  },
  components: {
    // Overriding time picker and date picker field style
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
          '& .MuiOutlinedInput-root': {},
        },
      },
    },
    // Overriding outlined input
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: appColors.black,
          fontSize: '1em',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          '&:hover:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled) .MuiOutlinedInput-notchedOutline':
            {
              border: '1px solid #E1E3F0',
            },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${palette.secondary.main}`,
          },

          '& .MuiSvgIcon-root': {
            width: '0.70em',
            height: '0.70em',
          },

          // Overriding auto-complete
          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #fff inset',
          },
        },
        notchedOutline: {
          transition: '0.2s',
          border: '1px solid #E1E3F0',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: 'inherit',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: 'red' },
      },
    },
  },
});

export default appTheme;
