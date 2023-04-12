import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100vw',
    height: 'calc(100vh - 18em)',
    padding: 0,
  },
  wrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
  },
  header: {
    backgroundColor: '#25175a',
    color: '#fff',
    padding: '0.3em 16px',
    fontWeight: 'bold',
    zIndex: 3,
  },
  content: {
    height: '100%',
    padding: 0,
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 16px 0',
  },
  notificationList: {
    border: '1px solid #ececec',
    borderRadius: '0.2em',
    marginBottom: '0.1em',
  },
  multiLineEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical',
  },
  box: {
    overflowY: 'auto',
    height: 'calc(100vh - 360px)',
    padding: '0 16px',
    borderTop: '1px solid #ececec',
  },
  footer: {},
}));

export { useStyles };
