import PropTypes from 'prop-types';

import _ from 'lodash';

// MUI Component
import {
  Box,
  Stack,
  Typography,
  FormControl,
  Autocomplete,
  TextField,
  FormHelperText,
  styled,
} from '@mui/material';

//  Icons
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// Custom Styles
const StyledAutoComplete = styled(Autocomplete)`
  & .MuiOutlinedInput-root {
    height: auto !important;
    border-radius: 0.2em;
  }
  ,
  & .MuiAutocomplete-popupIndicator {
    display: none;
  }

  & .MuiAutocomplete-endAdornment {
    top: calc(50% - 12px);
    right: 15px !important;
  }

  & .MuiAutocomplete-clearIndicator {
    visibility: visible;
    background: #b2b2b2;
    font-size: 13px;
    color: #fff;
    width: 1em;
    height: 1em;
    &:hover {
      background: #949191 !important;
    }
  }
`;

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#5025c4',
      boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
    },
  },
});

const MaintenanceSelect = ({
  data,
  name,
  description,
  isRequired,
  onInputChange,
  defaultValue,
}) => {
  return (
    <Box mb={6}>
      <Typography variant="h5" mb={0.5}>
        {name}
      </Typography>
      <FormControl fullWidth>
        <StyledAutoComplete
          disableClearable={defaultValue === '' || defaultValue === null}
          value={defaultValue === null ? '' : defaultValue}
          defaultValue={defaultValue === null ? '' : defaultValue}
          size="large"
          id="free-solo-demo"
          freeSolo
          onChange={(event, newValue) => onInputChange(event, newValue, name)}
          disablePortal
          options={data.map((option) => option.name)}
          renderInput={(params) => (
            <StyledTextField placeholder="Select..." size="large" {...params} />
          )}
        />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            {isRequired && defaultValue === null && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: '4px' }}>
                <ErrorOutlineIcon
                  color="error"
                  sx={{ fontSize: '1em', mr: '4px' }}
                />
                <Typography variant="body2" color="error">
                  {`Please select ${name} from the list.`}
                </Typography>
              </Box>
            )}
          </Box>
          <Box>
            {!_.isEmpty(description) && (
              <FormHelperText sx={{ margin: 0 }} color="primary">
                *{description}
              </FormHelperText>
            )}
          </Box>
        </Stack>
      </FormControl>
    </Box>
  );
};

MaintenanceSelect.propTypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  isRequired: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.any,
};

export default MaintenanceSelect;
