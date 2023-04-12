import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '0.2em 2em',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    width: '12em',
    alignItems: 'center',
    justifyContent: 'space-between',
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
