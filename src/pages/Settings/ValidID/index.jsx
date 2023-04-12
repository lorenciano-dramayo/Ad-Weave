import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Container, Divider } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';

const useStyles = makeStyles((theme) => ({
  txtInput: {
    marginTop: '15px',
    width: '100%',
    color: '#25165B',
  },
  iconSize: {
    height: '20px',
    width: '20px',
    color: '#030303',
  },
  iconAdd: {
    height: '20px',
    width: '20px',
    marginTop: '6px',
    marginRight: '12px',
    color: '#492EBC',
    cursor: 'pointer',
  },
  txtRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'end',
  },
  txtAdd: {
    marginTop: '4px',
    color: '#492EBC',
    cursor: 'pointer',
  },
}));

const ValidID = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <h2>Valid IDs</h2>
      <Divider />
      <TextField
        className={classes.txtInput}
        id="input-with-icon-textfield"
        label="SSS"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ContactMailOutlinedIcon className={classes.iconSize} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        className={classes.txtInput}
        id="input-with-icon-textfield"
        label="Philhealth"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ContactMailOutlinedIcon className={classes.iconSize} />
            </InputAdornment>
          ),
        }}
      />
      <div className={classes.txtRight}>
        <AddBoxOutlinedIcon className={classes.iconAdd} />
        <p className={classes.txtAdd}>Add</p>
      </div>
    </Container>
  );
};

export default ValidID;
