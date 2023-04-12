// MUI
import { styled } from '@mui/styles';
import { Box } from '@mui/material';
// Utilities
import PropTypes from 'prop-types';

const StyledH1 = styled('h1')({
  margin: 'auto',
  fontSize: '3em',
  color: '#25165B',
});

const Avatar = ({ label }) => {
  return (
    <Box
      display="flex"
      width="8em"
      height="8em"
      borderRadius="50%"
      backgroundColor="#bdbdbd"
      position="relative"
      border="0.4em solid #fff;"
      overflow="hidden"
      justifyContent="center"
    >
      <StyledH1>{label}</StyledH1>
    </Box>
  );
};

Avatar.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Avatar;
