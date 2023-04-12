// React
import { useSelector, useDispatch } from 'react-redux';
// MUI
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';
// App hooks
import useRouteGuard from 'hooks/useRouteGuard';
// App Components
import ProfileHeader from 'components/Profile/Header';
import ProfileTabGroup from 'components/Profile/Tab/Group';
// Reducers
import { logout } from 'store/reducers/auth';
// Utilities
import _ from 'lodash';

const useStyles = makeStyles({
  tabGroup: {
    marginTop: '-47px',
  },
});

const Profile = () => {
  useRouteGuard();

  const { data: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  const extractInitials = () => {
    if (_.isEmpty(user)) return '';

    return user.fullname
      .match(/\b(\w)/g)
      .join('')
      .toUpperCase();
  };

  return (
    <Container
      disableGutters={true}
      maxWidth={false}
      sx={{ mb: 4, backgroundColor: 'white' }}
    >
      <ProfileHeader
        name={user?.fullname || ''}
        initials={extractInitials()}
        onLogoutClick={handleLogoutClick}
      />
      <ProfileTabGroup containerClass={classes.tabGroup} />
    </Container>
  );
};

export default Profile;
