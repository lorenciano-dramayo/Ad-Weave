import { useState, React } from 'react';
import { Route, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import useRouteGuard from 'hooks/useRouteGuard';

// MUI Components
import { Box } from '@mui/material';

// Components
import Sidebar from 'components/Common/Sidebar';
import Affix from 'components/Affix';

// Pages
import Tasktimer from 'pages/Project/Tasktimer';

//styles
import { sidebarWidth } from 'theme/variables';
import { useStyles } from 'app/styles';

//Authenticated Width
const initialPageBodyWidth = 'calc(100% - 50px)';

const AuthenticatedRoutes = ({ component: Component, ...rest }) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();
  useRouteGuard();

  const toggleDialog = () => {
    setVisible(!visible);
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return pathname === '/team' ? (
          <Component {...props} />
        ) : (
          <Box width="100%" className={classes.overflowHiddenX} height="100vh">
            {visible && <Tasktimer />}
            <Sidebar />
            <Box
              width={initialPageBodyWidth}
              style={{ marginLeft: sidebarWidth }}
            >
              <Box>
                <Component {...props} />
              </Box>

              {/* Affix */}
              <Affix />
            </Box>
          </Box>
        );
      }}
    />
  );
};

AuthenticatedRoutes.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default AuthenticatedRoutes;
