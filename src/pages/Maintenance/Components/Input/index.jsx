import PropTypes from 'prop-types';

import { Box, FormControl, Typography, TextField, styled } from '@mui/material';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#5025c4',
      boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
    },
  },
});

const MaintenanceInput = ({ name }) => {
  return (
    <Box mb={1}>
      <Typography variant="body1">{name}</Typography>
      <FormControl fullWidth>
        <StyledTextField />
      </FormControl>
    </Box>
  );
};

MaintenanceInput.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MaintenanceInput;
