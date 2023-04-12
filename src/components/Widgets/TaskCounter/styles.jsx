import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '8em',
    padding: '1em',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  multiLineEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical',
  },
}));

export { useStyles };
