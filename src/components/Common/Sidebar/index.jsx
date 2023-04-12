import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { useDispatch, useSelector } from 'react-redux';

import { getNotificationCount } from 'store/reducers/notifications';

//MUI Components
import { Box, Paper } from '@mui/material';

//Pages
import SidebarList from 'components/Common/Sidebar/SidebarList';

// images
import logo from 'assets/images/logo-small.png';

//styles
import { useStyles } from './styles';

const Sidebar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const mounted = useRef();

  const [, setTabHasFocus] = useState(true);
  const { count } = useSelector((state) => state.notifications);

  useEffect(() => {
    let notifCount = null;
    if (!mounted.current) {
      dispatch(getNotificationCount('unread'));
      dispatch(getNotificationCount('read'));
      dispatch(getNotificationCount());
      const handleFocus = () => {
        notifCount = setInterval(() => {
          if (!_.isEmpty(localStorage.getItem('token'))) {
            dispatch(getNotificationCount('unread'));
            dispatch(getNotificationCount('read'));
            dispatch(getNotificationCount());
          }
        }, 5000);
        setTabHasFocus(true);
      };

      const handleBlur = () => {
        clearInterval(notifCount);
        setTabHasFocus(false);
      };

      mounted.current = true;

      window.addEventListener('focus', handleFocus);
      window.addEventListener('blur', handleBlur);

      return () => {
        window.removeEventListener('focus', handleFocus);
        window.removeEventListener('blur', handleBlur);
      };
    }
  }, []);
  return (
    <Box height="100vh" className={classes.sidebarContainer}>
      <Paper className={classes.sidebar} elevation={0}>
        {/* sidebar logo */}
        <Box className={classes.logoContainer}>
          <Link to="/dashboard?queue=all_task">
            <img src={logo} className={classes.logoSize} alt="Ad-Weave" />
          </Link>
        </Box>
        {/* navigation tabs */}
        <SidebarList count={count?.unread} />
      </Paper>
    </Box>
  );
};

export default Sidebar;
