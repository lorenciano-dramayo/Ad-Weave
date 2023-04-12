import { useState, useEffect } from 'react';

import { TextField, Autocomplete, styled } from '@mui/material';

import PropTypes from 'prop-types';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': { backgroundColor: 'transparent' },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 0,
  },
});

export default function Input({
  data,
  placeholder,
  onSelectionChange,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      disablePortal
      freeSolo
      sx={{
        width: 'auto',
        '&.MuiListSubheader-root': {
          color: 'rgb(242 32 118)',
          lineHeight: '32px',
          backgroundColor: '#f0f0f0',
        },
        '& .MuiAutocomplete-inputRoot .Mui-disabled ': {
          '-webkit-text-fill-color': 'rgba(0, 0, 0, 0.8)',
        },
        flex: 1,
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      groupBy={(option) => option.task_type_name}
      getOptionLabel={(option) => option.name ?? ''}
      onChange={(_, value) => onSelectionChange(value)}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          size="small"
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            // endAdornment: (
            //   <Fragment>
            //     {loading ? (
            //       <CircularProgress color="inherit" size={20} />
            //     ) : null}
            //     {params.InputProps.endAdornment}
            //   </Fragment>
            // ),
          }}
        />
      )}
      {...props}
    />
  );
}

Input.propTypes = {
  data: PropTypes.any,
  placeholder: PropTypes.string,
  onSelectionChange: PropTypes.any,
};
