import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  overflowHiddenX: {
    overflowX: 'hidden',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2em 0 2em 50px',
  },
  paper: {
    backgroundColor: 'white',
    width: '75%',
    minHeight: '-webkit-fill-available',
    maxHeight: '90vh',
    boxShadow: '0 3px 7px rgba(0, 0, 0, 0.3)',
    borderRadius: '15px',
    overflow: 'auto',
  },
}));
