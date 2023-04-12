import React from 'react';
import clsx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import {
  Drawer,
  Button,
  Avatar,
  Grid,
  ListItemIcon,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import defaultProfile from 'assets/images/user1.svg';
import defaultBanner from 'assets/images/banner-default.png';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import MyProfile from 'pages/Settings/MyProfile';
import ValidID from 'pages/Settings/ValidID';
import { SearchIcon } from 'assets/icons';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
  },
  fullList: {
    width: 'auto',
  },
  avatar: {
    border: '2px solid #fff',
    width: '35px',
    height: '35px',
  },
  avatarSub: {
    border: '2px solid #fff',
    width: '90px',
    height: '90px',
    position: 'absolute',
    top: '130px',
  },
  plr20: {
    padding: '0px 20px',
    height: '80vh',
  },
  mt20: {
    marginTop: '49px',
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'block',
  },
  avatarContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  shadowLeft: {
    boxShadow: '12px 0 15px -4px rgb(0 0 0 / 15%);',
  },
  active: {
    color: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '47px',
    borderRadius: '7px',
    height: '50px',
    display: 'flex',
    // backgroundColor:'#e0238c',
    '&:hover': {
      color: 'white',
      backgroundColor: '#e0238c',
      width: '47px',
      borderRadius: '7px',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex'
    },
    '&:active': {
      color: 'white',
      backgroundColor: '#e0238c',
      width: '47px',
      borderRadius: '7px',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex'
    },
  },


}));

const SidebarSettings = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown') {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <img src={defaultBanner} alt="Banner" />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5} className={classes.shadowLeft}>
          <div className={classes.avatarContainer}>
            <Avatar className={classes.avatarSub} src={defaultProfile} />
          </div>
          <div className={classes.plr20}>
            <h2 className={classes.mt20}>Settings</h2>
            <List component="nav">
              <ListItem
                button
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemIcon>
                  <PermIdentityOutlinedIcon
                    className={selectedIndex === 1 ? classes.active : ''}
                  />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItem>
              <ListItem
                button
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemIcon>
                  <CreditCardOutlinedIcon
                    className={selectedIndex === 0 ? classes.active : ''}
                  />
                </ListItemIcon>
                <ListItemText primary="Valid ID's" />
              </ListItem>
              <ListItem
                button
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <ExitToAppOutlinedIcon
                    className={selectedIndex === 2 ? classes.active : ''}
                  />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </div>
        </Grid>
        <Grid item xs={12} sm={7}>
          <div className={classes.container}>
            <div className={selectedIndex === 1 ? classes.show : classes.hide}>
              <MyProfile />
            </div>
            <div className={selectedIndex === 0 ? classes.show : classes.hide}>
              <ValidID />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Avatar className={classes.avatar} src={defaultProfile} /> */}
          <div className={classes.active}>
            <SearchIcon onClick={toggleDrawer(anchor, true)} />
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SidebarSettings;
