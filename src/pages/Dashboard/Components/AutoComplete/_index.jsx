import { memo } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
import PropTypes from 'prop-types';

function AutoComplete({ options, defaultValue, onChange }) {
  return (
    <Autocomplete
      multiple
      options={options}
      disableCloseOnSelect
      defaultValue={defaultValue}
      getOptionLabel={(option) => option.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      renderInput={(params) => <TextField {...params} />}
      fullWidth
      size="small"
      onChange={(_, values) => onChange(values)}
    />
  );
}

export default memo(AutoComplete);

AutoComplete.propTypes = {
  defaultValue: PropTypes.any,
  options: PropTypes.any,
  onChange: PropTypes.any,
};
