import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  actions: {
    right: '16px',
    width: 'auto',
    display: 'flex',
    position: 'fixed',
    bottom: '16px',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 3,
  },
  button: {
    borderRadius: '5px',
    padding: '0.5em 1.2em 0.5em 1em',
    bottom: '0.3em',
    minWidth: 'inherit',
    backgroundColor: '#25165B',
    color: 'white',
  },
  drawer: {
    zIndex: 9,
  },
}));
