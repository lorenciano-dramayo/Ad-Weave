import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Reducers
import { fetchPartners } from 'store/reducers/partners';
import { fetchTimezone } from 'store/reducers/profile';

//MUI Components
import {
  Box,
  Container,
  Stack,
  Typography,
  styled,
  Tab,
  Tabs,
} from '@mui/material';

// Mui Icons
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import GroupsIcon from '@mui/icons-material/Groups';

// App hooks
import useRouteGuard from 'hooks/useRouteGuard';

// App Components
import General from 'pages/Profile/pages/General';

// constant
import { days } from 'pages/Profile/constant';

import ProfileHeader from 'components/Profile/Header';
import ProfileTabGroup from 'components/Profile/Tab/Group';

// Reducers
import { logout } from 'store/reducers/auth';
import axios from 'axios';

const AntTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#F22076',
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    padding: '12px 0 12px 0',
    textTransform: 'none',
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightBold,
    marginRight: theme.spacing(4),
    color: 'rgba(0, 0, 0, 0.85)',
    minHeight: 'auto',
    '&:hover': {
      color: '#F22076',
      opacity: 1,
    },
    '&.Mui-selected': {
      color: '#F22076',
      fontWeight: 700,
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  })
);

const Profile = () => {
  useRouteGuard();
  const dispatch = useDispatch();

  const { data: user } = useSelector((state) => state.user);
  const { list: partnersList } = useSelector((state) => state.partners);
  const {
    timezone: { data: timzeonData },
  } = useSelector((state) => state.profile);

  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch(fetchPartners());
    dispatch(fetchTimezone());
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <Container maxWidth="lg">
      <Stack my={10}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Account
          </Typography>
        </Box>
        <Box sx={{ bgcolor: '#fff' }}>
          <AntTabs value={value} onChange={handleChange} aria-label="user-tab">
            <AntTab
              label="General"
              icon={<AccountBoxIcon sx={{ fontSize: 20 }} />}
              iconPosition="start"
            />
            <AntTab
              label="Department"
              icon={<GroupsIcon sx={{ fontSize: 20 }} />}
              iconPosition="start"
            />
            <AntTab
              label="Change Password"
              icon={<VpnKeyRoundedIcon sx={{ fontSize: 20 }} />}
              iconPosition="start"
            />
          </AntTabs>
          <Box sx={{ p: 2 }} />
        </Box>
        {value === 0 ? (
          <General
            value={value}
            user={user}
            partners={partnersList}
            timezone={timzeonData}
            days={days}
          />
        ) : value === 1 ? (
          'Department'
        ) : (
          'Password'
        )}
      </Stack>
    </Container>
  );
};

export default Profile;
