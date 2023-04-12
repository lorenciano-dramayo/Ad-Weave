import * as React from 'react';
import PropTypes from 'prop-types';
import { TextField, styled } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    height: 'auto',
    borderRadius: '0.2em',
    '&.Mui-focused fieldset': {
      borderColor: '#5025c4',
      boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
    },
  },
});
DateTime.propTypes = {
  setDeliveryDate: PropTypes.func,
  deliveryDate: PropTypes.any,
};
export default function DateTime({ setDeliveryDate, deliveryDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
        renderInput={(props) => <StyledTextField size="large" {...props} />}
        value={deliveryDate}
        onChange={(newValue) => {
          setDeliveryDate(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
