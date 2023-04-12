import { Box, MenuItem, Select as MuiSelect } from '@mui/material';
import { useController } from 'react-hook-form';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  selectRoot: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.palette.grey[400],
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
      borderWidth: '1px',
    },
    '& > div:focus': {
      background: 'none',
    },
  },
  select: {
    paddingLeft: '14px',
    paddingRight: '14px',
  },
  dense: {
    fontSize: '1rem',
    height: '48px',
  },
  label: {
    fontSize: '1rem',
    lineHeight: '2.5em',
  },
  required: {
    color: theme.palette.error.dark,
  },
  error: {
    borderColor: theme.palette.error.dark,
  },
  errorMessage: {
    color: theme.palette.error.dark,
    fontSize: '0.85rem',
  },
  menu: {
    marginTop: '10px',
  },
  menuList: {
    '& li:hover': {
      backgroundColor: `${theme.palette.primary.main}3D`,
    },
    '& li.Mui-selected:not(.Mui-disabled), & li.Mui-selected:hover': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
    },
  },
}));

const SelectField = ({
  name,
  label,
  placeholder,
  className,
  labelClass,
  containerClass,
  options,
  isDense,
  required,
  control,
  defaultValue = '',
  hasError,
  errorMessage,
  menuProps,
  ...props
}) => {
  const classes = useStyles();
  const {
    field: { ref, ...inputProps },
  } = useController({ name, control, rules: { required }, defaultValue });

  const MenuProps = {
    classes: {
      paper: classes.menu,
      list: classes.menuList,
    },
    elevation: 0,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    ...menuProps,
  };

  return (
    <Box marginY={2} className={containerClass}>
      {label && (
        <label
          htmlFor={`${name}-input`}
          className={clsx(classes.label, labelClass)}
        >
          {label}
          {required && <span className={classes.required}>*</span>}
        </label>
      )}
      <MuiSelect
        name={name}
        id={`${name}-input`}
        fullWidth
        disableUnderline
        displayEmpty
        defaultValue={defaultValue}
        className={clsx(classes.selectRoot, className, {
          [classes.dense]: isDense,
          [classes.error]: hasError,
        })}
        classes={{ select: classes.select }}
        MenuProps={MenuProps}
        inputRef={ref}
        inputProps={{ ...inputProps }}
        {...props}
      >
        <MenuItem value="" disabled>
          <span className={classes.placeholder}>{placeholder}</span>
        </MenuItem>
        {options &&
          options.map((option) => {
            return (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            );
          })}
      </MuiSelect>
      {errorMessage && (
        <span className={classes.errorMessage}>{errorMessage}</span>
      )}
    </Box>
  );
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  labelClass: PropTypes.string,
  containerClass: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ),
  isDense: PropTypes.bool,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  control: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  menuProps: PropTypes.any,
};

export default SelectField;
