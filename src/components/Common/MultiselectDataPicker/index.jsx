// React
import { useState } from 'react';
import { Controller } from 'react-hook-form';
// MUI
import {
  ListItemText,
  FormControl,
  Select,
  Checkbox,
  MenuItem,
} from '@mui/material';
// Utilities
import PropTypes from 'prop-types';

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
    },
  },
};

const MultiselectDataPicker = ({ name, contents, control, list = [] }) => {
  const [options, setOptions] = useState(contents);

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setOptions(value);
  };

  return (
    <FormControl fullWidth>
      <Controller
        control={control}
        name={name}
        defaultValue={contents}
        render={({ field: { onChange, value } }) => (
          <Select
            multiple
            value={value || []}
            onChange={(e) => {
              onChange(e);
              handleChange(e);
            }}
            renderValue={(selected) => {
              return selected.join(', ');
            }}
            MenuProps={MenuProps}
          >
            {list.map((option) => (
              <MenuItem key={option.value} value={option.label}>
                <Checkbox checked={options.indexOf(option.label) > -1} />
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

MultiselectDataPicker.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object,
  contents: PropTypes.arrayOf(PropTypes.string),
  list: PropTypes.arrayOf(PropTypes.object),
};

export default MultiselectDataPicker;
