// React
import { Controller } from 'react-hook-form';
// MUI
import { makeStyles } from '@mui/styles';
import { Box, Typography, FormControl, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import DatePicker from '@mui/lab/DatePicker';
// Utilities
import PropTypes from 'prop-types';
//  Icons
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const useStyles = makeStyles(() => ({
  error: {
    margin: '0 !important',
    fontSize: '0.85rem',
    fontWeight: 300,
    color: '#323338',
  },
}));

const DatePickerField = ({
  name,
  control,
  className,
  encodedDate,
  errorMessage,
}) => {
  const classes = useStyles();
  return (
    <Box className={className}>
      <FormControl fullWidth>
        <Controller
          control={control}
          name={name}
          defaultValue={encodedDate === '' ? new Date() : encodedDate}
          render={({ field: { onChange, value } }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={value}
                onChange={onChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          )}
        />
      </FormControl>
      {errorMessage && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: '4px' }}>
          <ErrorOutlineIcon
            color="error"
            sx={{ fontSize: '1.25rem', mr: '4px' }}
          ></ErrorOutlineIcon>
          <Typography variant="p" className={classes.error}>
            {errorMessage}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

DatePickerField.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object,
  errorMessage: PropTypes.string,
  encodedDate: PropTypes.string,
  className: PropTypes.string,
};

export default DatePickerField;
