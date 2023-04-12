import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { TextField, styled } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

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

Tags.propTypes = {
  setTags: PropTypes.func,
  tags: PropTypes.any,
  data: PropTypes.any,
};

export default function Tags({ tags, setTags, data }) {
  return (
    <Autocomplete
      multiple
      fullWidth
      value={tags}
      sx={{
        '& .MuiAutocomplete-tag': {
          backgroundColor: '#25165B',
          color: '#FFFFFF',
          borderRadius: '7px',
          '& .MuiChip-deleteIcon': {
            color: 'rgb(255 255 255 / 75%)',
          },
        },
      }}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setTags({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setTags({
            title: newValue.inputValue,
          });
        } else {
          setTags(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some(
          (option) => inputValue === option.title
        );
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={data}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically

        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option

        return option.title;
      }}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.title}
        </li>
      )}
      freeSolo
      renderInput={(params) => (
        <StyledTextField
          placeholder={_.isEmpty(tags) ? 'Add a Tag' : ''}
          {...params}
        />
      )}
    />
  );
}
