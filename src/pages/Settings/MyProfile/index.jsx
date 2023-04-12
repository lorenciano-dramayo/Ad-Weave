import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Container, Divider } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const useStyles = makeStyles((theme) => ({
  txtInput: {
    marginTop: '15px',
    width: '100%',
    color: '#25165B',
    borderBottom: '1px solid #333',
  },
  iconSize: {
    height: '20px',
    width: '20px',
    color: '#25165B',
  },
}));

const MyProfile = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <h2>Account Settings</h2>
      <Divider />
      <TextField
        className={classes.txtInput}
        id="input-with-icon-textfield"
        label="Name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlineOutlinedIcon className={classes.iconSize} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        className={classes.txtInput}
        id="input-with-icon-textfield"
        label="Username"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlineOutlinedIcon className={classes.iconSize} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        className={classes.txtInput}
        id="input-with-icon-textfield"
        label="Email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailOutlineOutlinedIcon className={classes.iconSize} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.txtInput}
        id="input-with-icon-textfield"
        label="Contact"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneOutlinedIcon className={classes.iconSize} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.txtInput}
        id="input-with-icon-textfield"
        label="Team"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PeopleAltOutlinedIcon className={classes.iconSize} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.txtInput}
        id="input-with-icon-textfield"
        label="Schedule"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DateRangeOutlinedIcon className={classes.iconSize} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.txtInput}
        id="input-with-icon-textfield"
        label="Start Time"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <QueryBuilderOutlinedIcon className={classes.iconSize} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.txtInput}
        id="input-with-icon-textfield"
        label="End Time"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <QueryBuilderOutlinedIcon className={classes.iconSize} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.txtInput}
        id="input-with-icon-textfield"
        label="Password"
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlinedIcon className={classes.iconSize} />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
};

export default MyProfile;
