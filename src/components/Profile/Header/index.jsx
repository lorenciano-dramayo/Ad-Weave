// MUI
import { styled } from '@mui/styles';
import { Box, Typography, Stack, IconButton, Avatar } from '@mui/material';
// App Components
// import ProfileAvatar from './Avatar';
// Icons
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// Utilities
import PropTypes from 'prop-types';

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  height: 'auto',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  background: 'linear-gradient(180deg, #25165B 0%, #DF3C76 100%)',
  padding: '3em 3em 5em',
});

const ProfileHeader = ({ picture, name, onLogoutClick }) => {
  return (
    <StyledBox>
      <IconButton
        size="small"
        onClick={onLogoutClick}
        sx={{ color: 'white', position: 'absolute', right: 20, top: 20 }}
      >
        <ExitToAppIcon />
      </IconButton>
      <Stack justifyContent="center" alignItems="center" spacing={2}>
        {/* <ProfileAvatar label={initials} /> */}
        {picture?.split('/').pop() !== 'thumb_' ? (
          <Avatar
            alt={name}
            src={picture}
            sx={{ width: 120, height: 120, border: '0.3em solid #fff' }}
          />
        ) : (
          <Avatar
            sx={{
              width: 120,
              height: 120,
              border: '0.1em solid #fff',
              fontSize: '3em',
            }}
          >
            {`${name.split(' ')[0][0]}${name.split(' ')[1][0]}`}
          </Avatar>
        )}
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
          {name.replace(/\b(\w)/g, (s) => s.toUpperCase())}
        </Typography>
      </Stack>
    </StyledBox>
  );
};

ProfileHeader.propTypes = {
  picture: PropTypes.string,
  name: PropTypes.string.isRequired,
  onLogoutClick: PropTypes.func,
};

export default ProfileHeader;
