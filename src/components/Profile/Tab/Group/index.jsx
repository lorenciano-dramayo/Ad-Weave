// React
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
// MUI
import { makeStyles, styled } from '@mui/styles';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Stack,
  Grid,
  IconButton,
  Divider,
} from '@mui/material';
// App Components
import ProfileTabPanel from '../Panel';
import ProfileDetail from 'components/Profile/Detail';
// Reducers
import { fetchPartners } from 'store/reducers/partners';
import {
  fetchUserDetails,
  updateUserProfile,
  changePassword,
} from 'store/reducers/user';
// Icons
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
// Static data
import { timezones, daysList } from './datasource';
// Utilities
import { formatDate } from 'utils/date';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Overrides Tabs CSS
const useOverridedTabsClasses = makeStyles({
  indicator: {
    height: '4px',
    backgroundColor: 'white',
  },
});

// Overrides Tab CSS
const useOverridedTabClasses = makeStyles({
  root: {
    color: 'white !important',
    paddingLeft: '30px !important',
    paddingRight: '30px !important',
    fontSize: '0.95rem',
    textTransform: 'capitalize',
  },
});

const StyledTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: '1.2rem',
  marginBottom: '15',
});

const defaultIconSX = {
  fontSize: 22,
  color: '#92929D',
};

const TabGroup = ({ containerClass }) => {
  const methods = useForm();
  const dispatch = useDispatch();

  const [currentTab, setTab] = useState(0);
  const [isEditing, setEditing] = useState(false);
  const [inputErrors, setInputErrors] = useState({});

  const { handleSubmit } = methods;

  const { list: partnersList } = useSelector((state) => state.partners);
  const {
    isLoading,
    stateUserError,
    data: user,
  } = useSelector((state) => state.user);

  const overridedTabClasses = useOverridedTabClasses();
  const overridedTabsClasses = useOverridedTabsClasses();

  const tabsList = ['Overview', 'Department', 'Password'];

  const isLastTab = currentTab === tabsList?.length - 1;

  const partners = partnersList.map((partner) => ({
    value: partner.id,
    label: partner.name,
  }));

  const extractPartnersIds = (selectedPartnersByName) => {
    if (!_.isArray(partnersList) || !_.isArray(selectedPartnersByName))
      return null;
    const selectedPartners = _.filter(partnersList, (n) =>
      selectedPartnersByName.includes(n.name)
    );
    return _.map(selectedPartners, 'id');
  };

  const userPartnersNames = () => {
    if (!_.isArray(user.partners)) return null;
    return user.partners.map((partner) => partner.name);
  };

  const inputsAreValid = (input) => {
    let isValid = true;

    setInputErrors({});

    if (tabsList[currentTab] === 'Overview' || user.first_login) {
      if (input.mobile_number === '') {
        setInputErrors((prevState) => ({
          ...prevState,
          mobileNumber: 'This field is required.',
        }));
        isValid = false;
      }

      if (input.schedule_from === '' || input.schedule_to === '') {
        setInputErrors((prevState) => ({
          ...prevState,
          schedule: 'This field is required.',
        }));
        isValid = false;
      }

      if (input.time_from === null) {
        setInputErrors((prevState) => ({
          ...prevState,
          timeFrom: 'This field is required.',
        }));
        isValid = false;
      }

      if (input.time_to === null) {
        setInputErrors((prevState) => ({
          ...prevState,
          timeTo: 'This field is required.',
        }));
        isValid = false;
      }

      if (input.timezone === '') {
        setInputErrors((prevState) => ({
          ...prevState,
          timezone: 'This field is required.',
        }));
        isValid = false;
      }
    }

    if (tabsList[currentTab] === 'Password' || user.first_login) {
      // Password Validations
      // CUrrent Password
      if (input.current_password === '') {
        setInputErrors((prevState) => ({
          ...prevState,
          currentPassword: 'This field is required.',
        }));
        isValid = false;
      }

      // Password / New Password
      if (input.password === '') {
        setInputErrors((prevState) => ({
          ...prevState,
          password: 'This field is required.',
        }));
        isValid = false;
      } else if (input.password?.length > 0 && input.password?.length < 6) {
        setInputErrors((prevState) => ({
          ...prevState,
          password: 'Password must be atleast 6 characters.',
        }));
        isValid = false;
      }

      // Password Confirmation
      if (input.password_confirmation === '') {
        setInputErrors((prevState) => ({
          ...prevState,
          passwordConfirmation: 'This field is required.',
        }));
        isValid = false;
      } else if (
        user.first_login &&
        input.password !== input.password_confirmation
      ) {
        setInputErrors((prevState) => ({
          ...prevState,
          passwordConfirmation: 'Password do not match.',
        }));
        isValid = false;
      } else if (
        !user.first_login &&
        input.password !== input.password_confirmation
      ) {
        setInputErrors((prevState) => ({
          ...prevState,
          passwordConfirmation: 'Password do not match.',
        }));
        isValid = false;
      }
    }

    return isValid;
  };

  const handleTabChange = (e, newValue) => {
    if (user.first_login && newValue > currentTab) {
      return;
    } else if (!user.first_login) {
      setEditing(false);
    }

    setTab(newValue);
  };

  const handleFormSubmit = (data) => {
    if (user.first_login) {
      // Perform first login operations
      if (inputsAreValid(data)) {
        if (isLastTab) {
          performFirstLoginUpdate(data);
        } else {
          setTab(currentTab + 1);
        }
      }
    } else {
      // Perform returnee users operations
      if (inputsAreValid(data)) {
        performUpdateByTab(data);
      }
    }
  };

  const handleButtonClick = () => {
    if (!isEditing) {
      setEditing(true);
    } else {
      handleSubmit(handleFormSubmit)();
    }
  };

  const performFirstLoginUpdate = (data) => {
    let requestData = {
      ...data,
      id: user.id,
      partner_id: extractPartnersIds(data.partner_id).toString(),
      time_from: formatDate(data.time_from.toString(), 'YYYY-MM-DD HH:mm:ss'),
      time_to: formatDate(data.time_to.toString(), 'YYYY-MM-DD HH:mm:ss'),
      start_date: formatDate(data.start_date.toString(), 'MM-DD-YYYY'),
    };

    dispatch(
      updateUserProfile(requestData, (isSuccess) => {
        if (isSuccess) {
          setEditing(false);
        }
      })
    );
    setEditing(false);
    setInputErrors({});
  };

  const performUpdateByTab = ({
    mobile_number,
    partner_id,
    time_from,
    time_to,
    schedule_from,
    schedule_to,
    start_date,
    current_password,
    password,
    password_confirmation,
    timezone,
  }) => {
    let requestData = {
      tab: tabsList[currentTab].toLowerCase(),
      id: user.id,
    };

    if (tabsList[currentTab] === 'Overview') {
      requestData = {
        ...requestData,
        mobile_number,
        schedule_from,
        schedule_to,
        time_from: formatDate(time_from.toString(), 'YYYY-MM-DD HH:mm:ss'),
        time_to: formatDate(time_to.toString(), 'YYYY-MM-DD HH:mm:ss'),
        timezone,
        partner_id: extractPartnersIds(partner_id).toString(),
      };
      dispatch(
        updateUserProfile(requestData, () => {
          setEditing(false);
        })
      );
    } else if (tabsList[currentTab] === 'Department') {
      requestData = {
        ...requestData,
        start_date: formatDate(start_date.toString(), 'MM-DD-YYYY'),
      };
      dispatch(
        updateUserProfile(requestData, () => {
          setEditing(false);
        })
      );
    } else {
      requestData = {
        ...requestData,
        email: user.email,
        current_password,
        password,
        password_confirmation,
      };
      dispatch(
        changePassword(requestData, (isSuccess) => {
          setEditing(!isSuccess);
        })
      );
    }

    setEditing(false);
    requestData = {};
    setInputErrors({});
  };

  useEffect(() => {
    setEditing(user.first_login);
    dispatch(fetchUserDetails());
    dispatch(fetchPartners());
  }, []);

  return (
    <FormProvider {...methods}>
      <form autoComplete="off">
        <Box
          sx={{
            width: '100%',
          }}
          className={containerClass}
        >
          <Box>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              aria-label="tabs"
              classes={overridedTabsClasses}
              centered
            >
              {tabsList.map((tab, index) => {
                return (
                  <Tab
                    disableRipple
                    key={index}
                    classes={overridedTabClasses}
                    label={tab}
                    id={`tab-${index}`}
                    inputprops={{
                      'aria-controls': `tabpanel-${index}`,
                    }}
                  />
                );
              })}
            </Tabs>
          </Box>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6} md={8}>
              {/* Overview */}
              <ProfileTabPanel value={currentTab} index={0}>
                <Box mt={1}>
                  <Grid container>
                    <Grid item xs={11}>
                      <StyledTitle>Overview</StyledTitle>
                    </Grid>
                    <Grid item xs={1} display="flex" justifyContent="flex-end">
                      <IconButton
                        aria-label="save-button"
                        size="small"
                        type={'button'}
                        variant="contained"
                        color={
                          !isEditing || user.first_login
                            ? 'primary'
                            : 'secondary'
                        }
                        onClick={handleButtonClick}
                      >
                        {!isEditing || user.first_login ? (
                          <EditIcon fontSize="small" />
                        ) : (
                          <SaveIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Grid>
                  </Grid>

                  <Box sx={{ mb: 2, mt: 1 }}>
                    <Divider />
                  </Box>
                  <Stack>
                    <ProfileDetail
                      svgIcon={<PermIdentityOutlinedIcon sx={defaultIconSX} />}
                      title="Name"
                      content={`${user.fullname}`}
                    />
                    <ProfileDetail
                      svgIcon={<EmailOutlinedIcon sx={defaultIconSX} />}
                      title="Email"
                      content={user.email}
                    />
                    <ProfileDetail
                      title="Contact"
                      content={user.mobile_number}
                      variant="input"
                      type="number"
                      name="mobile_number"
                      placeholder="Add Contact"
                      errorMessage={inputErrors.mobileNumber}
                      disabled={isLoading}
                      isEditing={isEditing}
                      svgIcon={<LocalPhoneOutlinedIcon sx={defaultIconSX} />}
                    />
                    <ProfileDetail
                      title="Schedule"
                      variant="schedule"
                      content={`${user.schedule_from} to ${user.schedule_to}`}
                      list={daysList}
                      errorMessage={inputErrors.schedule}
                      disabled={isLoading}
                      isEditing={isEditing}
                      svgIcon={<DateRangeOutlinedIcon sx={defaultIconSX} />}
                    />
                    <ProfileDetail
                      title="Start Time"
                      content={formatDate(user.time_from, 'hh:mm a')}
                      encodedTime={user.time_from}
                      variant="time"
                      name="time_from"
                      errorMessage={inputErrors.timeFrom}
                      disabled={isLoading}
                      isEditing={isEditing}
                      svgIcon={<AccessTimeOutlinedIcon sx={defaultIconSX} />}
                    />
                    <ProfileDetail
                      title="End Time"
                      content={formatDate(user.time_to, 'hh:mm a')}
                      encodedTime={user.time_to}
                      variant="time"
                      name="time_to"
                      errorMessage={inputErrors.timeTo}
                      disabled={isLoading}
                      isEditing={isEditing}
                      svgIcon={<AccessTimeOutlinedIcon sx={defaultIconSX} />}
                    />
                    <ProfileDetail
                      title="Time Zone"
                      content={user.timezone}
                      variant="select"
                      name="timezone"
                      list={timezones}
                      errorMessage={inputErrors.timezone}
                      disabled={isLoading}
                      isEditing={isEditing}
                      svgIcon={<LanguageOutlinedIcon sx={defaultIconSX} />}
                    />
                    <ProfileDetail
                      title="Partner"
                      content={
                        userPartnersNames()
                          ? userPartnersNames().join(', ')
                          : 'No partner'
                      }
                      // contents={userPartnersIDs() || []}
                      contents={userPartnersNames() || []}
                      variant="multiselect"
                      name="partner_id"
                      list={partners}
                      disabled={isLoading}
                      isEditing={isEditing}
                      isRequired={false}
                      svgIcon={<GroupOutlinedIcon sx={defaultIconSX} />}
                    />
                  </Stack>
                </Box>
              </ProfileTabPanel>
              {/* Department */}
              <ProfileTabPanel value={currentTab} index={1}>
                <Box mt={1}>
                  <Grid container>
                    <Grid item xs={11}>
                      <StyledTitle>Department</StyledTitle>
                    </Grid>
                    <Grid item xs={1} display="flex" justifyContent="flex-end">
                      <IconButton
                        aria-label="save-button"
                        size="small"
                        type={'button'}
                        variant="contained"
                        color={
                          !isEditing || user.first_login
                            ? 'primary'
                            : 'secondary'
                        }
                        onClick={handleButtonClick}
                      >
                        {!isEditing || user.first_login ? (
                          <EditIcon fontSize="small" />
                        ) : (
                          <SaveIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Grid>
                  </Grid>

                  <Box sx={{ mb: 2, mt: 1 }}>
                    <Divider />
                  </Box>
                  <Stack>
                    <ProfileDetail
                      svgIcon={<GroupsOutlinedIcon sx={defaultIconSX} />}
                      title="Team"
                      content={user.team_name || 'No team'}
                      variant="select"
                      name="team"
                    />
                    <ProfileDetail
                      svgIcon={<EngineeringOutlinedIcon sx={defaultIconSX} />}
                      title="Role"
                      content={user.user_role || 'No role'}
                      variant="select"
                      name="role"
                    />
                    <ProfileDetail
                      svgIcon={<PermIdentityOutlinedIcon sx={defaultIconSX} />}
                      title="Manager"
                      content={user.manager || 'No manager'}
                      variant="select"
                      name="role"
                    />
                    <ProfileDetail
                      title="Start Date"
                      name="start_date"
                      encodedDate={user.start_date}
                      content={formatDate(user.start_date)}
                      variant="date"
                      disabled={isLoading}
                      isEditing={isEditing}
                      isRequired={false}
                      svgIcon={<DateRangeOutlinedIcon sx={defaultIconSX} />}
                    />
                  </Stack>
                </Box>
              </ProfileTabPanel>
              {/* Security */}
              <ProfileTabPanel value={currentTab} index={2}>
                <Box mt={1}>
                  <Grid container>
                    <Grid item xs={11}>
                      <StyledTitle>
                        {isEditing
                          ? user.first_login
                            ? 'Set Password'
                            : 'Change Password'
                          : 'Password'}
                      </StyledTitle>
                    </Grid>
                    <Grid item xs={1} display="flex" justifyContent="flex-end">
                      <IconButton
                        aria-label="save-button"
                        size="small"
                        type={'button'}
                        variant="contained"
                        color={
                          !isEditing || user.first_login
                            ? 'primary'
                            : 'secondary'
                        }
                        onClick={handleButtonClick}
                      >
                        {!isEditing || user.first_login ? (
                          <EditIcon fontSize="small" />
                        ) : (
                          <SaveIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Grid>
                  </Grid>

                  <Box sx={{ mb: 2, mt: 1 }}>
                    <Divider />
                  </Box>
                  <Stack>
                    {!user.first_login && isEditing && (
                      <ProfileDetail
                        title="Current Password"
                        variant="input"
                        type="password"
                        name="current_password"
                        titleWidth={180}
                        errorMessage={
                          stateUserError || inputErrors.currentPassword
                        }
                        isIconHidden={true}
                        isEditing={isEditing}
                      />
                    )}
                    <ProfileDetail
                      title={
                        isEditing
                          ? user.first_login
                            ? 'Password'
                            : 'New Password'
                          : 'Password'
                      }
                      content={isEditing ? '' : 'Password'}
                      variant="input"
                      type="password"
                      name="password"
                      titleWidth={180}
                      errorMessage={inputErrors.password}
                      isIconHidden={true}
                      isSecured={true}
                      isEditing={isEditing}
                    />
                    {isEditing && (
                      <ProfileDetail
                        title="Confirm Password"
                        variant="input"
                        type="password"
                        name="password_confirmation"
                        titleWidth={180}
                        errorMessage={inputErrors.passwordConfirmation}
                        isIconHidden={true}
                        isEditing={true}
                      />
                    )}
                  </Stack>
                </Box>
              </ProfileTabPanel>
            </Grid>
          </Grid>
        </Box>
      </form>
    </FormProvider>
  );
};

TabGroup.propTypes = {
  containerClass: PropTypes.string,
};

export default TabGroup;
