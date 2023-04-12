// React
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
// MUI
import { makeStyles } from '@mui/styles';
import { Box, OutlinedInput, Typography } from '@mui/material';
//  Icons
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// Utilities
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: 500,
  },
  labelContainer: {
    marginBottom: '0.8rem',
  },
  dense: {
    fontSize: '1rem',
    height: '48px',
  },
  required: {
    color: theme.palette.error.main,
  },
  error: {
    margin: '0 !important',
    fontSize: '0.85rem',
    fontWeight: 300,
    color: '#323338',
  },
}));

const InputField = ({
  name,
  className,
  label,
  labelClass,
  isDense,
  required,
  errorMessage,
  containerClass,
  content = '',
  ...props
}) => {
  const classes = useStyles();

  const { register } = useFormContext();
  const { ref, ...inputProps } = register(name, { required });

  const [value, setValue] = useState(content);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Box className={containerClass}>
      {label && (
        <div className={classes.labelContainer}>
          <label
            htmlFor={`${name}-input`}
            className={clsx(classes.label, labelClass)}
          >
            {label}
            {required && <span className={classes.required}>*</span>}
          </label>
        </div>
      )}
      <Box display="flex" flexDirection="column">
        <OutlinedInput
          id={`${name}-input`}
          name={name}
          value={value || ''}
          inputRef={ref}
          inputProps={{ autoComplete: 'false', ...inputProps }}
          className={clsx(className, {
            [classes.dense]: isDense,
          })}
          onChange={handleChange}
          {...props}
        />
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
    </Box>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  labelClass: PropTypes.string,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isDense: PropTypes.bool,
  content: PropTypes.string,
  errorMessage: PropTypes.string,
  containerClass: PropTypes.string,
};

export default InputField;
