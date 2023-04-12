import React from 'react';
import clsx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import libi from 'assets/libi.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: '-140px',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: '50px',
  },
  result: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: '0em',
    paddingLeft: '50px',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexFlow: 'column',
    background: '#25165B',
    color: '#fff',
  },
}));

const SidebarProject = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.result}>
          <Box style={{ textAlign: 'center' }}>
            <img src={libi} alt="libi" style={{ width: '50%' }} />
          </Box>
          <Box mt={3}>
            <Typography variant="h5" gutterBottom component="div">
              Unknown error, please contact support.
            </Typography>
          </Box>
        </div>
      </main>
    </div>
  );
};

export default SidebarProject;
