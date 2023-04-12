import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
// Hooks
import useRouteGuard from 'hooks/useRouteGuard';
// Reducers
import { login as loginRequest } from 'store/reducers/auth';

import { useOnMount } from 'hooks';

//MUI Components
import {
  FormControlLabel,
  Typography,
  InputLabel,
  Container,
  FormGroup,
  Checkbox,
  Divider,
  Link,
  Card,
  Grid,
  Box,
} from '@mui/material';

//reuseable
import InputField from 'components/Common/InputField';
import Button from 'components/Common/Button';

//Styles
import { useStyles } from './styles';

//images
import SmallPinkShape from 'assets/shapes/SmallPinkShape';
import PurpleShape from 'assets/shapes/PurpleShape';
import PinkShape from 'assets/shapes/PinkShape';
import logo from 'assets/images/logo.png';

const Login = () => {
  const methods = useForm();
  const classes = useStyles();
  const dispatch = useDispatch();

  useRouteGuard();

  useOnMount(() => {
    document.title = 'Ad-Weave';
  });

  //destructured
  const { handleSubmit } = methods;

  //reducers-value
  const { isLoading, error } = useSelector((state) => state.auth);

  //functions
  const onSubmit = (data) => {
    dispatch(loginRequest(data));
  };

  return (
    <Container maxWidth={false} className={classes.root}>
      {/* Curves */}
      <div className={classes.curves}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <PinkShape />
            <PurpleShape />
          </Grid>
          <Grid item xs={3}>
            <SmallPinkShape />
          </Grid>
        </Grid>
      </div>
      {/* Forms */}
      <Box className={classes.formRoot}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <FormProvider {...methods}>
            <Typography className={classes.header}>Welcome Back!</Typography>
            <Typography className={classes.subHeader}>
              Sign in to your account to continue
            </Typography>

            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Card variant="outlined" className={classes.form}>
                <Box marginY={2} px={3} py={1}>
                  <Box marginY={1}>
                    <InputLabel className={classes.labelContainer}>
                      Email
                    </InputLabel>
                    <InputField
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      containerClass={classes.inputContainer}
                      disabled={isLoading}
                      required
                      sx={{ borderRadius: '4px' }}
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
                      sx={{ borderRadius: '4px' }}
                    />
                  </Box>

                  <Grid container>
                    <Grid item xs={7}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="secondary"
                              defaultChecked
                              sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                            />
                          }
                          label={
                            <Typography className={classes.rememberCredentials}>
                              Remember me
                            </Typography>
                          }
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item xs={5} className={classes.forgotPassword}>
                      <Link href="/forgot-password" underline="hover">
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
                <Box px={3} my={1}>
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
              </Card>
            </form>
          </FormProvider>
        </Grid>
      </Box>
      {/* Logo */}
      <Box className={classes.logoContainer}>
        <img src={logo} className={classes.logo} alt="ad-weave" />
      </Box>
    </Container>
  );
};

export default Login;
