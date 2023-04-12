import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import Swal from 'sweetalert2';

import { useFileUpload } from 'use-file-upload';

import moment from 'moment';

// Reducers
import { fetchPartners } from 'store/reducers/partners';
import { fetchTimezone, fetchTeams } from 'store/reducers/profile';
import { updateUserProfile, updateProfilePicture } from 'store/reducers/user';

//MUI Components
import {
  Box,
  Container,
  Stack,
  Typography,
  styled,
  Tab,
  Tabs,
  Breadcrumbs,
  Link,
} from '@mui/material';

// Mui Icons
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import GroupsIcon from '@mui/icons-material/Groups';

// App hooks
import useRouteGuard from 'hooks/useRouteGuard';

// App Components
import General from 'pages/Profile/pages/General';
import Department from 'pages/Profile/pages/Department';
import ChangePassword from 'pages/Profile/pages/ChangePassword';

// constant
import { days, roles } from 'pages/Profile/constant';

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

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" href="/">
    Ad-Weave
  </Link>,
  <Typography key="3" color="text.primary">
    User Profile
  </Typography>,
];

// Toast notification
const Toast = Swal.mixin({
  toast: true,
  icon: 'success',
  width: 370,
  position: 'top-right',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const Profile = () => {
  useRouteGuard();
  const dispatch = useDispatch();

  const { data: user } = useSelector((state) => state.user);
  const { list: partnersList } = useSelector((state) => state.partners);
  const {
    timezone: { data: timzeonData },
    team: { data: teamList },
  } = useSelector((state) => state.profile);

  const [tab, setTab] = useState(0);

  const [, selectFiles] = useFileUpload();
  const [phone, setPhone] = useState(user?.mobile_number);
  const [startDay, setStartDay] = useState(user?.schedule_from);
  const [endDay, setEndDay] = useState(user?.schedule_to);
  const [startTime, setStartTime] = useState(user?.time_from);
  const [endTime, setEndTime] = useState(user?.time_to);
  const [uTimezone, setTimeZone] = useState(user?.timezone);
  const [upartners, setPartners] = useState(user?.partners);
  const [team, setTeam] = useState(user?.team_id);
  // const [startDate, setStartDate] = useState(user?.start_date);
  const [role, setRole] = useState(user?.user_role);
  // const [manager, setManager] = useState(user?.manager_id);
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmPassword] = useState('');

  useEffect(() => {
    dispatch(fetchPartners());
    dispatch(fetchTimezone());
    dispatch(fetchTeams());
  }, []);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleProfilePicUpload = (file) => {
    const form = new FormData();

    form.append('id', user?.id);
    form.append('files', file.file);

    dispatch(updateProfilePicture(form));
  };

  const handleSaveChanges = () => {
    dispatch(
      updateUserProfile({
        id: user?.id,
        mobile_number: phone,
        schedule_from: startDay,
        schedule_to: endDay,
        time_from: moment(startTime).format('YYYY-MM-DD HH:mm:ss'),
        time_to: moment(endTime).format('YYYY-MM-DD HH:mm:ss'),
        timezone: uTimezone,
        partner_id: _.map(upartners, (partner) => partner?.id).toString(),
        team_id: team,
        role: _.filter(roles, (r) => r.name === role)[0].id,
        password: password,
        password_confirmation: password_confirmation,
      })
    );

    Toast.fire({
      title: 'Account updated successfully!',
    });
  };

  const handleSavePassword = () => {
    dispatch(
      updateUserProfile({
        id: user?.id,
        password: password,
        password_confirmation: password_confirmation,
      })
    );

    Toast.fire({
      title: 'Password updated!',
    });
  };

  const handleSaveProfile = () => {
    dispatch(
      updateUserProfile({
        id: user?.id,
        team_id: team,
        role: _.filter(roles, (r) => r.name === role)[0].id,
      })
    );

    Toast.fire({
      title: 'Account updated successfully!',
    });
  };

  const handleSaveGeneral = () => {
    dispatch(
      updateUserProfile({
        id: user?.id,
        mobile_number: phone,
        schedule_from: startDay,
        schedule_to: endDay,
        time_from: moment(startTime).format('YYYY-MM-DD HH:mm:ss'),
        time_to: moment(endTime).format('YYYY-MM-DD HH:mm:ss'),
        timezone: uTimezone,
        partner_id: _.map(upartners, (partner) => partner?.id).toString(),
        team_id: team,
        role: _.filter(roles, (r) => r.name === role)[0].id,
      })
    );

    Toast.fire({
      title: 'Account updated successfully!',
    });
  };

  return (
    <Container maxWidth="lg">
      <Stack my={4}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Account Settings
          </Typography>
        </Box>
        <Box mb={3}>
          {!user?.first_login ? (
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          ) : (
            <Typography>
              To start, please fill-in all the required fields.
            </Typography>
          )}
        </Box>
        <Box sx={{ bgcolor: '#fff' }}>
          <AntTabs value={tab} onChange={handleChange} aria-label="user-tab">
            <AntTab
              label="General"
              icon={<AccountBoxIcon sx={{ fontSize: 20 }} />}
              iconPosition="start"
            />
            <AntTab
              label="Department"
              icon={<GroupsIcon sx={{ fontSize: 20 }} />}
              iconPosition="start"
              disabled={
                user?.first_login &&
                (_.isEmpty(startDay) ||
                  _.isEmpty(endDay) ||
                  _.isNull(startTime) ||
                  _.isNull(endTime) ||
                  _.isEmpty(uTimezone))
              }
            />
            <AntTab
              label="Change Password"
              icon={<VpnKeyRoundedIcon sx={{ fontSize: 20 }} />}
              iconPosition="start"
              disabled={
                user?.first_login &&
                (_.isEmpty(startDay) ||
                  _.isEmpty(endDay) ||
                  _.isNull(startTime) ||
                  _.isNull(endTime) ||
                  _.isEmpty(uTimezone))
              }
            />
          </AntTabs>
          <Box sx={{ p: 2 }} />
        </Box>
        {tab === 0 ? (
          <General
            setTab={setTab}
            user={user}
            partners={partnersList}
            timezone={timzeonData}
            days={days}
            selectFiles={selectFiles}
            phone={phone}
            setPhone={setPhone}
            startDay={startDay}
            setStartDay={setStartDay}
            endDay={endDay}
            setEndDay={setEndDay}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            uTimezone={uTimezone}
            setTimeZone={setTimeZone}
            upartners={upartners}
            setPartners={setPartners}
            handleProfilePicUpload={handleProfilePicUpload}
            handleSaveChanges={handleSaveProfile}
            handleSaveGeneral={handleSaveGeneral}
          />
        ) : tab === 1 ? (
          <Department
            setTab={setTab}
            user={user}
            teamList={teamList}
            team={team}
            setTeam={setTeam}
            roles={roles}
            role={role}
            setRole={setRole}
            handleSaveChanges={handleSaveProfile}
          />
        ) : (
          <ChangePassword
            user={user}
            password={password}
            setPassword={setPassword}
            password_confirmation={password_confirmation}
            setConfirmPassword={setConfirmPassword}
            handleSaveChanges={handleSaveChanges}
            handleSavePassword={handleSavePassword}
          />
        )}
      </Stack>
    </Container>
  );
};

export default Profile;
