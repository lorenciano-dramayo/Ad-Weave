// React
import { Controller } from 'react-hook-form';
// MUI
import { makeStyles } from '@mui/styles';
import { Box, Typography, MenuItem, FormControl, Select } from '@mui/material';
//  Icons
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// Utilities
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  error: {
    margin: '0 !important',
    fontSize: '0.85rem',
    fontWeight: 300,
    color: '#323338',
  },
}));

const DataPickerField = ({
  name,
  control,
  content,
  className,
  errorMessage,
  list = [],
}) => {
  const classes = useStyles();
  return (
    <Box className={className}>
      <FormControl fullWidth>
        <Controller
          control={control}
          name={name}
          defaultValue={content}
          render={({ field: { onChange, value } }) => (
            <Select onChange={onChange} value={value} sx={{ height: 45 }}>
              {list.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      {errorMessage && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: '4px',
          }}
        >
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

DataPickerField.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object,
  errorMessage: PropTypes.string,
  content: PropTypes.string,
  className: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.object),
};

export default DataPickerField;
