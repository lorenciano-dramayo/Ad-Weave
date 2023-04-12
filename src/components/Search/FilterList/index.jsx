import { Grid, Button } from '@mui/material';

// constant
import { filterList } from 'constants/searchItems';

// Utilities
import PropTypes from 'prop-types';

const FilterList = ({ buttonClass, clickable }) => {
  return (
    <Grid container>
      {filterList.map((list, index) => (
        <Grid item xs={12} key={index}>
          <Button
            className={buttonClass}
            variant="text"
            startIcon={<list.icon sx={{ color: '#FFBE0F' }} />}
            onClick={() => clickable(list.label)}
          >
            {list.label}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

FilterList.propTypes = {
  buttonClass: PropTypes.any,
  clickable: PropTypes.func,
};

export default FilterList;
