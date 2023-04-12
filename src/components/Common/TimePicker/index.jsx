// React
import { Controller } from 'react-hook-form';
// MUI
import { makeStyles } from '@mui/styles';
import { Box, Typography, FormControl, TextField } from '@mui/material';

import { DesktopTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
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

const TimePickerField = ({
  name,
  control,
  className,
  encodedTime,
  errorMessage,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Box className={className}>
      <FormControl fullWidth>
        <Controller
          control={control}
          name={name}
          defaultValue={
            encodedTime === null ? new Date() : new Date(encodedTime)
          }
          render={({ field: { onChange, value } }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopTimePicker
                name={name}
                value={value || ''}
                onChange={onChange}
                renderInput={(params) => <TextField {...params} />}
                {...props}
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

TimePickerField.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  errorMessage: PropTypes.string,
  encodedTime: PropTypes.string,
  className: PropTypes.string,
};

export default TimePickerField;
