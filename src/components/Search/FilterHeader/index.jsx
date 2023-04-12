import { Grid, Button } from '@mui/material';

// constant
import { filterHeaders } from 'constants/searchItems';

// Utilities
import PropTypes from 'prop-types';

const FilterHeader = ({ buttonClass }) => {
  return (
    <Grid container>
      {filterHeaders.map((header, index) => (
        <Grid item xs={4} key={index}>
          <Button
            sx={{ padding: '0 0 0 2px' }}
            className={buttonClass}
            disableRipple
            variant="text"
            startIcon={<header.icon color="secondary" />}
          >
            {header.label}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

FilterHeader.propTypes = {
  buttonClass: PropTypes.any,
};

export default FilterHeader;
