import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    overflow: 'hidden',
    padding: '1em',
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
