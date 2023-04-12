import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// MUI Components
import { Checkbox, TextField, Autocomplete, styled } from "@mui/material";

// MUI Icons
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

// styles
const AutoComplete = styled(Autocomplete)`
  & .MuiOutlinedInput-root {
    height: auto !important;
  }
`;

const TypesSubs = ({ list, validDefault, types, setType }) => {
  const handleChange = (event, value) => {
    event.preventDefault();
    setType(value);
  };

  return (
    <AutoComplete
      multiple
      id="checkboxes-types-subtask"
      value={
        _.isEmpty(types)
          ? _.flatten(_.map(validDefault, (item) => _.filter(list, item)))
          : types
      }
      options={list}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      onChange={handleChange}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon />}
            checkedIcon={<CheckBoxIcon />}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          autoComplete="off"
          label="Types &amp; Sub Tasks"
          placeholder="Types &amp; Sub Tasks"
        />
      )}
    />
  );
};

TypesSubs.propTypes = {
  list: PropTypes.array.isRequired,
  validDefault: PropTypes.any,
  setType: PropTypes.any,
  types: PropTypes.any,
};

export default TypesSubs;
