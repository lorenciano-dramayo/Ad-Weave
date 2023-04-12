import PropTypes from 'prop-types';

import { Card, styled, Stack } from '@mui/material';

const StyledCard = styled(Card)({
  border: '1px solid #5025c44f !important',
  boxShadow: 'rgb(80 37 196 / 10%) 0px 0px 10px 4px !important',
});

export default function Header({ children }) {
  return (
    <Stack>
      <StyledCard>{children}</StyledCard>
    </Stack>
  );
}

Header.propTypes = {
  children: PropTypes.any,
};
