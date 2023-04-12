import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

// Hooks
import useRouteGuard from 'hooks/useRouteGuard';

// Reducers
import { setForgotPassword } from 'store/reducers/forgotPassword';

//MUI Components
import {
  Typography,
  Container,
  Stack,
  Box,
  Grid,
  TextField,
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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

  useRouteGuard();

  const [validate, setValidate] = useState(null);
  const [isDisabled, setDisabled] = useState(true);
  const [email, setEmail] = useState('');

  const { isLoading, statusCode } = useSelector(
    (state) => state.forgotPassword
  );

  //functions
  const onSubmit = () => {
    const formData = new FormData();
    formData.append('email', email);
    dispatch(setForgotPassword(formData));
  };

  const validateEmail = (values) => {
    const errors = {};
    setEmail(values);

    if (!values) {
      errors.email = 'Required.';
      setDisabled(true);
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values)) {
      errors.email = 'Invalid email address.';
      setDisabled(true);
    } else {
      if (!values.includes('ad-lib.io')) {
        errors.email = 'Invalid Ad-Lib.io email address.';
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }

    setValidate(_.isEmpty(errors) ? null : errors?.email);
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
        {statusCode === 'RESET_TOKEN_SENT' ? (
          <Stack alignItems="center" justifyContent="center" mb={8}>
            <Typography className={classes.header}>
              Check in your mail!
            </Typography>

            <Typography className={classes.subHeader}>
              We just emailed you the instruction to reset your password.
            </Typography>
          </Stack>
        ) : (
          <Stack alignItems="center" justifyContent="center" mb={8}>
            <Typography className={classes.header}>
              Forgot your password?
            </Typography>

            <Typography className={classes.subHeader}>
              Enter your Ad-Lib.io e-mail address and will send you a link to
              reset your password
            </Typography>
            <Stack>
              <Stack direction="row">
                <TextField
                  value={email}
                  id="outlined-basic"
                  placeholder="Email Address"
                  variant="outlined"
                  sx={{
                    width: 400,
                    '.MuiOutlinedInput-root': {
                      borderRadius: '0.5em 0 0 0.5em',
                    },
                  }}
                  onChange={(e) => validateEmail(e.target.value)}
                />

                <LoadingButton
                  size="large"
                  variant="contained"
                  disableElevation
                  sx={{ borderRadius: '0 0.5em 0.5em 0' }}
                  disabled={isDisabled}
                  onClick={onSubmit}
                  loading={isLoading}
                >
                  Reset
                </LoadingButton>
              </Stack>

              {!_.isEmpty(validate) && (
                <div className={classes.helperContainer}>
                  <InfoOutlinedIcon
                    color="secondary"
                    className={classes.helperIcon}
                  />
                  <Typography color="secondary" variant="caption">
                    {validate}
                  </Typography>
                </div>
              )}
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
