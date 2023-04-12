import { colors } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    padding: 0,
    background: 'rgb(240, 242, 250)',
  },
  curves: {
    display: 'flex',
  },
  helperContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  formRoot: {
    width: '100%',
    height: '100vh',
    position: 'absolute',
    top: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  helperIcon: {
    fontSize: '12px',
    marginTop: '-2px',
    marginRight: '2px',
  },
  header: {
    fontSize: '32px',
    textAlign: 'center',
    marginTop: '40px',
    color: theme.palette.secondary.main,
  },
  subHeader: {
    fontSize: '1rem',
    textAlign: 'center',
    color: colors.grey[500],
    marginBottom: '1.5rem',
  },
  logoContainer: {
    width: 'auto',
    position: 'absolute',
    bottom: 0,
    margin: '0.5em 1em',
  },
  logo: {
    height: 'auto',
    width: '7rem',
  },
  labelContainer: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '34px',
    color: '#323C47',
    marginBottom: '3px',
    marginLeft: '1px',
  },
  inputContainer: {
    marginBottom: '10px',
    marginTop: 0,
  },
  form: {
    padding: '1em 2em',
    minWidth: 400,
    [theme.breakpoints.up('xs')]: {
      minWidth: 350,
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 410,
    },
  },
  rememberCredentials: {
    [theme.breakpoints.up('xs')]: {
      fontSize: '0.8em',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1em',
    },
  },
  forgotPassword: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontWeight: 700,
    [theme.breakpoints.up('xs')]: {
      fontSize: '0.8em',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1em',
    },
  },
  divider: {
    backgroundColor: 'rgba(242, 32, 118, 0.5)',
    height: '1px',
    marginLeft: '0px',
    marginRight: '0px',
  },
}));

export { useStyles };
