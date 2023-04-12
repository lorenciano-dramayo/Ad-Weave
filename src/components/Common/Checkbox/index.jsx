import {
  Box,
  Checkbox as MuiCheckbox,
  colors,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  checkbox: {
    color: colors.grey[400],
    '& .MuiSvgIcon-root': {
      fontSize: '1.25rem',
    },
  },
  checkboxLabel: {
    fontSize: '1rem',
  },
}));

const Checkbox = ({ label, className, ...props }) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <MuiCheckbox className={clsx(classes.checkbox, className)} {...props} />
      <Typography className={classes.checkboxLabel}>{label}</Typography>
    </Box>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
};

export default Checkbox;
