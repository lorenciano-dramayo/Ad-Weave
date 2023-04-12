import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100vh',
    padding: '0 6em',
    background: '#25165B',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: '24px',
    padding: '0.4em 0',
    color: '#D99898',
    borderColor: 'rgb(255 255 255 / 87%)',
    '&::after': {
      border: '1px solid rgb(255 255 255 / 87%)',
    },
    '&::before': {
      border: '0',
      content: 'none',
    },
  },
  extraBox: {
    height: 'calc(100vh - 27em)',
    marginTop: '3em',
    width: '100%',
  },
  extraSearch: {
    display: 'flex',
    alignItems: 'center',
  },
  mainFilterRoot: {
    marginTop: '1em',
  },
  mainFilter: {
    justifyContent: 'space-between',
  },
  genericButton: {
    color: '#fff',
    textTransform: 'inherit',
    fontSize: '1em',
    textAlign: 'left',
    marginBottom: '0.5em',
  },
  mainButton: {
    color: '#fff',
    textTransform: 'inherit',
    fontSize: '1em',
    textAlign: 'left',
    marginBottom: '0.5em',
    padding: '6px 16px',
    marginRight: '0.5em',
  },
  result: {
    backgroundColor: '#fff',
    height: 'inherit',
    border: '1px solid #f220768f',
    borderRadius: '0.5em',
    overflow: 'hidden',
  },
}));

export { useStyles };
