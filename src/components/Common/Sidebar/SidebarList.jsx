import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// constant
import { upperNavigation, lowerNavigation } from 'constants/sidebarItems';

// MUI Components
import { List, Grid } from '@mui/material';

// components
import SidebarItem from './SidebarItem';

import GlobalDrawer from 'components/Common/Drawer';
import GlobalPopper from 'components/Common/Popper';
import Notification from 'components/Notification';
import Profile from 'components/Profile';

// Pages
import Search from 'pages/Search';
import HelpCenter from 'pages/HelpCenter';

// styles
import { useStyles } from './styles';

import 'assets/global.css';

const SidebarList = ({ count }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeNav, setActiveNav] = useState(null);
  const [isSearchActive, setSearchActive] = useState(false);
  const [isHelpCenterActive, setHelpCenterActive] = useState(false);
  const [isNotificationActive, setNotificationActive] = useState(false);
  const [isProfileActive, setProfileActive] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(null);

  const { data: user } = useSelector((state) => state.user);

  const onItemClick = (index) => (event) => {
    if (!user.first_login) {
      switch (index) {
        case 4:
          setHelpCenterActive(false);
          setSearchActive(false);
          setProfileActive(false);
          //popover notification
          setAnchorEl(event.currentTarget);
          setTimeout(() => {
            setNotificationActive((prevOpen) => !prevOpen);
            activeNav !== 4 ? setActiveNav(index) : setActiveNav(null);
            clearTimeout();
          }, 600);
          break;
        case 5:
          setHelpCenterActive(false);
          setNotificationActive(false);
          setProfileActive(false);
          //search
          setTimeout(() => {
            setDrawerWidth('calc(100%)');
            setSearchActive(!isSearchActive);
            activeNav !== 5 ? setActiveNav(index) : setActiveNav(null);
            clearTimeout();
          }, 500);
          break;
        case 6:
          setSearchActive(false);
          setNotificationActive(false);
          setProfileActive(false);
          // help center
          setTimeout(() => {
            setDrawerWidth(600);
            setHelpCenterActive(!isHelpCenterActive);
            activeNav !== 6 ? setActiveNav(index) : setActiveNav(null);
            clearTimeout();
          }, 500);
          break;

        case 7:
          setSearchActive(false);
          setNotificationActive(false);
          setHelpCenterActive(false);
          //popover notification
          setAnchorEl(event.currentTarget);
          setTimeout(() => {
            setProfileActive((prevOpen) => !prevOpen);
            activeNav !== 7 ? setActiveNav(index) : setActiveNav(null);
            clearTimeout();
          }, 600);

          break;

        default:
          // add condition for non-static navigation
          handleClose();
          break;
      }
    }
  };

  const handleClose = () => {
    setHelpCenterActive(false);
    setSearchActive(false);
    setActiveNav(null);
    setNotificationActive(false);
    setProfileActive(false);
  };

  return (
    <Fragment>
      {/* Navigations */}
      <List className={classes.list}>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          className={classes.nav}
        >
          <Grid item className={classes.grid}>
            {upperNavigation.map((items, index) => (
              <SidebarItem
                {...items}
                key={index}
                onItemClick={() => onItemClick(items.index)}
                isFirstLogin={user.first_login}
              />
            ))}
          </Grid>

          <Grid item className={classes.grid}>
            {lowerNavigation.map((items, index) => (
              <SidebarItem
                {...items}
                key={index}
                activeNav={activeNav}
                index={items.index}
                onItemClick={() => onItemClick(items.index)}
                isFirstLogin={user.first_login}
                count={count}
              />
            ))}
          </Grid>
        </Grid>
      </List>
      {/* Drawers & popovers */}
      <GlobalDrawer
        content={<Search onClose={handleClose} />}
        name="search"
        width={drawerWidth}
        isOpen={isSearchActive}
        className={classes.drawer}
        anchor="left"
        BackdropProps={{ invisible: true }}
        hideBackdrop={false}
        onClose={handleClose}
        PaperProps={{ sx: { marginLeft: '50px' } }}
      />

      <GlobalDrawer
        content={<HelpCenter onSelect={handleClose} user={user?.admin_role} />}
        name="help-center"
        width={drawerWidth}
        isOpen={isHelpCenterActive}
        className={classes.drawer}
        anchor="left"
        BackdropProps={{ invisible: true }}
        hideBackdrop={false}
        onClose={handleClose}
        PaperProps={{ sx: { marginLeft: '50px' } }}
      />

      <GlobalPopper
        isOpen={isNotificationActive}
        anchorEl={anchorEl}
        placement="right-end"
        content={<Notification handleClose={handleClose} />}
        onClose={handleClose}
        className={classes.popper}
      />

      <GlobalPopper
        isOpen={isProfileActive}
        anchorEl={anchorEl}
        placement="right-end"
        content={<Profile user={user} onClose={handleClose} />}
        onClose={handleClose}
        className={classes.popper}
      />
    </Fragment>
  );
};

SidebarList.propTypes = {
  count: PropTypes.any,
};

export default SidebarList;
