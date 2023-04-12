import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100vh',
    padding: 0,
    background: '#E5E5E5',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3em 1em',
    backgroundColor: '#25165B',
    color: '#fff',
    fontWeight: 700,
  },
  listIcon: {
    marginRight: '2em',
  },
  listButton: {
    padding: '1em 8em 1em 5em !important',
  },
  extraAction: {
    right: '3em',
  },
  divider: {
    borderColor: '#a9a3a31f',
  },
}));

export { useStyles };
