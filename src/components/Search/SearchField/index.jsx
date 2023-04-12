//MUI Components
import { Box, Input } from '@mui/material';

const ariaLabel = { 'aria-label': 'description' };

// Utilities
import PropTypes from 'prop-types';

const SearchField = ({ placeholder, endAdornment, ...props }) => {
  return (
    <Box>
      <Input
        fullWidth
        placeholder={placeholder}
        inputProps={ariaLabel}
        endAdornment={endAdornment}
        {...props}
      />
    </Box>
  );
};

SearchField.propTypes = {
  placeholder: PropTypes.string,
  endAdornment: PropTypes.any,
};

export default SearchField;
