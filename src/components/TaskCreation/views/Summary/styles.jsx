import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  root: {
    padding: '2em 2.5em',
  },
  title: {
    fontWeight: 800,
    wordBreak: 'break-word',
    backgroundImage: 'linear-gradient(90deg,#e0238c,#f22076 47.43%,#f96666)',
    backgroundSize: '100%',
    '-webkit-background-clip': 'text',
    '-moz-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    '-moz-text-fill-color': 'transparent',
  },
}));
