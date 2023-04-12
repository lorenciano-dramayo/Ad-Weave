// MUI
import { styled } from '@mui/styles';
import { Typography, Stack, Avatar, AvatarGroup } from '@mui/material';

// MUI Icons
// App Components
import FavoritesHeaderNavigation from './Navigation';
// Utilities
import { appColors } from 'theme/variables';
import PropTypes from 'prop-types';

const StyledTitle = styled(Typography)({
  fontWeight: 800,
});

const Favorites = ({ onTabChange }) => {
  return (
    <Stack spacing={0.8}>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack flexDirection="row" alignItems="center">
          <StyledTitle
            className="header__title--overlay"
            variant="h4"
            color="secondary"
            marginRight={2}
          >
            Favorites
          </StyledTitle>
        </Stack>
      </Stack>

      <Stack>
        <FavoritesHeaderNavigation
          onTabChange={onTabChange}
        ></FavoritesHeaderNavigation>
      </Stack>
    </Stack>
  );
};

Favorites.propTypes = {
  onTabChange: PropTypes.func,
};

export default Favorites;
