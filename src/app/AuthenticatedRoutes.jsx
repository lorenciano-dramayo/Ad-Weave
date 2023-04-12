import { memo } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import useRouteGuard from 'hooks/useRouteGuard';

import { useSelector } from 'react-redux';

// MUI Components
import { Box } from '@mui/material';

// Components
import Sidebar from 'components/Common/Sidebar';

//styles
import { sidebarWidth } from 'theme/variables';
import { useStyles } from 'app/styles';

//Authenticated Width
const initialPageBodyWidth = 'calc(100% - 50px)';

const AuthenticatedRoutes = ({ component: Component, ...rest }) => {
  const classes = useStyles();
  const { data: user } = useSelector((state) => state.user);
  // const { pathname } = useLocation();
  useRouteGuard();

  return (
    <Box width="100%" className={classes.overflowHiddenX} height="100vh">
      {!user?.first_login && <Sidebar />}

      <Route
        {...rest}
        render={(props) => {
          // return pathname === '/team' ? (
          //   <Component {...props} />
          // ) : (
          return (
            <Box
              width={!user?.first_login ? initialPageBodyWidth : '100%'}
              style={{ marginLeft: !user?.first_login ? sidebarWidth : 0 }}
            >
              <Box>
                <Component {...props} />
              </Box>
            </Box>
          );
        }}
      />
    </Box>
  );
};

AuthenticatedRoutes.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default memo(AuthenticatedRoutes);
