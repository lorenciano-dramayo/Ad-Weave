import { useSelector, useDispatch } from 'react-redux';

//MUI Components
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';

// App hooks
import useRouteGuard from 'hooks/useRouteGuard';

// App Components
import ProfileHeader from 'components/Profile/Header';
import ProfileTabGroup from 'components/Profile/Tab/Group';

// Reducers
import { logout } from 'store/reducers/auth';

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

  return (
    <Container disableGutters={true} maxWidth={false}>
      <ProfileHeader
        name={user?.fullname || ''}
        picture={user?.profile_picture}
        onLogoutClick={handleLogoutClick}
      />

      <ProfileTabGroup containerClass={classes.tabGroup} />
    </Container>
  );
};

export default Profile;
