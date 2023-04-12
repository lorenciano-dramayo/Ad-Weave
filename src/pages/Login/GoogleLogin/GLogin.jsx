import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Common/Button';
import GoogleLogin from 'react-google-login';
import { apiUrl, googleClientID, cookiePolicy } from 'config';
import GoogleIcon from 'assets/icons/GoogleIcon';

const useStyles = makeStyles(() => ({
  googleLogin: {
    backgroundColor: 'white !important',
    border: '2px solid #F22076',
    boxShadow: 'none',
    borderRadius: '8px',
    padding: '15px 30px',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .10)',
      boxShadow: 'inherit',
    },
  },
  googleIcon: {
    width: '25px',
    height: '25px',
  },
}));

const GLogin = ({ onSuccess, onFailure, isDisabled }) => {
  const classes = useStyles();
  return (
    <GoogleLogin
      clientId={googleClientID}
      disabled={isDisabled}
      render={(renderProps) => {
        return (
          <Button
            onClick={renderProps.onClick}
            disabled={renderProps.enable}
            className={classes.googleLogin}
          >
            <GoogleIcon className={classes.googleIcon} />
          </Button>
        );
      }}
      onSuccess={onSuccess}
      onFailure={onFailure}
      redirectUri={apiUrl}
      cookiePolicy={cookiePolicy}
    />
  );
};

GLogin.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default GLogin;
