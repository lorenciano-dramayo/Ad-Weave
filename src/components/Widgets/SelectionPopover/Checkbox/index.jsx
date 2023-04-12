// React
import { useEffect, useState } from 'react';
// MUI
import { Checkbox } from '@mui/material';
// Utilities
import _ from 'lodash';
import PropTypes from 'prop-types';

const SelectionPopoverCheckbox = ({ isChecked, onChange, ...props }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    onChange(event.target.checked);
    setChecked(event.target.checked);
  };

  useEffect(() => {
    if (!_.isUndefined(isChecked)) {
      setChecked(isChecked);
    }
  }, [isChecked]);

  return (
    <Checkbox
      {...props}
      sx={{
        color: '#df3c76',
        '& .MuiSvgIcon-root': { fontSize: 20 },
        '&.Mui-checked': {
          color: '#df3c76',
        },
      }}
      inputProps={{ 'aria-label': 'controlled' }}
      checked={checked}
      onChange={handleChange}
    />
  );
};

SelectionPopoverCheckbox.propTypes = {
  onChange: PropTypes.func,
  isChecked: PropTypes.bool.isRequired,
};

export default SelectionPopoverCheckbox;
