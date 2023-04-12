// React
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
// MUI
import { makeStyles } from '@mui/styles';
import {
  Box,
  colors,
  Container,
  Divider,
  Typography,
  Link,
  InputLabel,
} from '@mui/material';
// App hooks
import useRouteGuard from 'hooks/useRouteGuard';
// Reducers
import { login as loginRequest, loginViaGoogle } from 'store/reducers/auth';
// App components
import GLogin from './GLogin';
import InputField from 'components/Common/InputField';
import Button from 'components/Common/Button';
import Checkbox from 'components/Common/Checkbox';
// Assets
import 'assets/css/login/overide.css';
import PurpleShape from 'assets/shapes/PurpleShape';
import PinkShape from 'assets/shapes/PinkShape';
import SmallPinkShape from 'assets/shapes/SmallPinkShape';
import logo from 'assets/images/logo.png';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: '#F0F2FA',
    marginBottom: '100px',
  },
  form: {
    width: '100%',
    maxWidth: '520px',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
    padding: '48px',
    borderRadius: '10px',
  },
  logoContainer: {
    width: '203px',
    position: 'absolute',
    marginTop: '-20px',
    left: '28px',
    margin: '0.5em auto 0.5em auto',
  },
  logo: {
    height: '18.58px',
  },
  inputContainer: {
    marginBottom: '10px',
    marginTop: 0,
  },
  checkboxRoot: {
    paddingLeft: 0,
    marginLeft: '9px',
    color: '#707683',
    fontSize: '14px',
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
  divider: {
    backgroundColor: 'rgba(242, 32, 118, 0.5)',
    height: '2px',
    marginLeft: '0px',
    marginRight: '0px',
  },
  continueWith: {
    textAlign: 'center',
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '0.1em',
    marginTop: '30px',
    marginBottom: '10px',
  },
  forgotPassword: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    color: '#5887FF',
    textDecoration: 'none',
  },
  btnSign: {
    background: '#DE3D76 !important',
    borderRadius: '4px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 20px',
    width: '100%',
    marginTop: '32px',
    fontSize: '16px',
    height: '44px',
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
}));

const Login = () => {
  const classes = useStyles();
  const methods = useForm();
  const dispatch = useDispatch();

  const { handleSubmit } = methods;

  const { isLoading, error } = useSelector((state) => state.auth);
  const { data: user } = useSelector((state) => state.user);

  useRouteGuard();

  const onSubmit = (data) => {
    dispatch(loginRequest(data));
  };

  const onSSOSuccess = ({ profileObj }) => {
    dispatch(
      loginViaGoogle({
        ...profileObj,
      })
    );
  };

  const onSSOFailure = (data) => {};

  return (
    <Container className={classes.container} maxWidth={false}>
      <Box display="flex" height="11%">
        <PinkShape />
        <PurpleShape />
        <SmallPinkShape />
      </Box>
      <FormProvider {...methods}>
        <Typography className={classes.header} variant="h5">
          Welcome Back!
        </Typography>
        <Typography className={classes.subHeader}>
          Sign in to your account to continue
        </Typography>
        <form
          autoComplete="off"
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box marginY={2}>
            <Box marginY={1}>
              <InputLabel className={classes.labelContainer}>Email</InputLabel>
              <InputField
                type="email"
                name="email"
                placeholder="Enter your email"
                containerClass={classes.inputContainer}
                disabled={isLoading}
                required
              />
              <InputLabel className={classes.labelContainer}>
                Password
              </InputLabel>
              <InputField
                type="password"
                name="password"
                placeholder="Enter your password"
                containerClass={classes.inputContainer}
                disabled={isLoading}
                error={error != null}
                errorMessage={error}
                required
              />
            </Box>
            <Link className={classes.forgotPassword} href="#">
              Forgot your password?
            </Link>
            <Box display="flex" id="rememberMeCheckBox">
              <Checkbox
                name="remember"
                label="Remember me next time"
                color="secondary"
                className={classes.checkboxRoot}
                disabled={isLoading}
              />
            </Box>
          </Box>
          <Divider className={classes.divider} variant="middle" />
          <Box marginY={2}>
            <Typography className={classes.continueWith}>
              or continue with
            </Typography>
            <Box display="flex" justifyContent="center">
              <GLogin
                className={classes.glogin}
                onSuccess={onSSOSuccess}
                onFailure={onSSOFailure}
                disabled={isLoading}
              />
            </Box>
            <Box marginLeft="auto">
              <Button
                type="submit"
                loading={isLoading}
                variant="contained"
                color="secondary"
                sx={{ width: '100%' }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </form>
      </FormProvider>
      <Box className={classes.logoContainer}>
        <img src={logo} className={classes.logo} alt="adweave-logo" />
      </Box>
    </Container>
  );
};

export default Login;
