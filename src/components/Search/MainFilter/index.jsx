import { Grid, Button } from '@mui/material';

// constant
import { mainFilters } from 'constants/searchItems';

// Utilities
import PropTypes from 'prop-types';

const MainFilter = ({ containerClass, buttonClass, active, clickable }) => {
  return (
    <Grid container spacing={3} className={containerClass}>
      <Grid item>
        <Grid container>
          {mainFilters.map((filter, index) => (
            <Grid item key={index}>
              <Button
                color="secondary"
                variant={active === filter ? 'contained' : 'text'}
                className={buttonClass}
                onClick={() => clickable(filter)}
              >
                {filter}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {/* <Grid item>
        <Button color="secondary" variant="contained">
          {dateFilter}
        </Button>
      </Grid> */}
    </Grid>
  );
};

MainFilter.propTypes = {
  containerClass: PropTypes.any,
  buttonClass: PropTypes.any,
  active: PropTypes.string,
  clickable: PropTypes.func,
};

export default MainFilter;
