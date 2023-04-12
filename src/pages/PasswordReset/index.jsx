import React, { useState } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

// Hooks
import useRouteGuard from 'hooks/useRouteGuard';

// Reducers
import { setResetPassword } from 'store/reducers/forgotPassword';

//MUI Components
import {
  Typography,
  Container,
  Stack,
  Box,
  Grid,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

//Styles
import { useStyles } from './styles';

//images
import SmallPinkShape from 'assets/shapes/SmallPinkShape';
import PurpleShape from 'assets/shapes/PurpleShape';
import PinkShape from 'assets/shapes/PinkShape';
import logo from 'assets/images/logo.png';

const ForgotPassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useRouteGuard();

  const { key } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const [password, setPassword] = useState('');

  const { isLoading, statusCode } = useSelector(
    (state) => state.forgotPassword
  );

  //functions
  const onSubmit = () => {
    dispatch(setResetPassword(password, key));
  };

  const validatePassword = (values) => {
    setPassword(values);

    values.split('').length > 5 ? setDisabled(false) : setDisabled(true);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const backToLogin = () => {
    history.push('/');
  };

  return (
    <Container maxWidth={false} className={classes.root}>
      {/* Curves */}
      <Box className={classes.curves}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <PinkShape />
            <PurpleShape />
          </Grid>
          <Grid item xs={3}>
            <SmallPinkShape />
          </Grid>
        </Grid>
      </Box>
      {/* Forms */}

      <Box className={classes.formRoot}>
        {statusCode === 'SUCCESSFUL_RESET_PASSWORD' ? (
          <Stack alignItems="center" justifyContent="center" mb={8} spacing={2}>
            <Stack>
              <Typography className={classes.header}>
                Password updated successfully!
              </Typography>
              <Typography className={classes.subHeader}>
                Let&apos;s try your new password.
              </Typography>
            </Stack>

            <Button variant="contained" disableElevation onClick={backToLogin}>
              Back to Login
            </Button>
          </Stack>
        ) : (
          <Stack alignItems="center" justifyContent="center" mb={8}>
            <Typography className={classes.header}>
              Reset your password
            </Typography>

            <Typography className={classes.subHeader}>
              What would you like your new password to be.
            </Typography>
            <Stack>
              <Stack spacing={1}>
                <OutlinedInput
                  value={password}
                  type={showPassword ? 'text' : 'password'}
                  id="outlined-basic"
                  placeholder="Password"
                  variant="outlined"
                  sx={{
                    width: 400,
                  }}
                  onChange={(e) => validatePassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />

                <LoadingButton
                  size="large"
                  variant="contained"
                  disableElevation
                  disabled={isDisabled}
                  onClick={onSubmit}
                  color="secondary"
                  loading={isLoading}
                >
                  Save
                </LoadingButton>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Box>
      {/* Logo */}
      <Box className={classes.logoContainer}>
        <img src={logo} className={classes.logo} alt="ad-weave" />
      </Box>
    </Container>
  );
};

export default ForgotPassword;
