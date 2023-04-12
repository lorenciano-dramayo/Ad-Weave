import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

const Campaign = ({ data }) => {
  return (
    <Box>
      <Typography>{data.name}</Typography>
    </Box>
  );
};

Campaign.propTypes = {
  data: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  onPin: PropTypes.func.isRequired,
};

export default Campaign;
