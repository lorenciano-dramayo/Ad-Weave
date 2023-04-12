// React
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
// MUI
import { styled } from '@mui/styles';
import {
  Box,
  Typography,
  Stack,
  Popover,
  Divider,
  FormControlLabel,
  Avatar,
} from '@mui/material';
// App Components
import InputField from 'components/Common/InputField';
import SelectionPopoverCheckbox from './Checkbox';
// Utilities
import _ from 'lodash';
import { appColors } from 'theme/variables';
import PropTypes from 'prop-types';

// Styled Components
const StyledInputField = styled(InputField)({
  fontSize: '0.9rem',
  borderRadius: '2px',
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  '-webkit-line-clamp': 1,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontWeight: 700,
});

const SelectionPopover = ({
  datasource,
  searchPlaceholder,
  booleanKey,
  maxHeight,
  emptyResultsPlaceholder = 'No results',
  isLoading,
  onSelectionChange,
  onClickEnter,
  ...props
}) => {
  const methods = useForm();

  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Hooks
  useEffect(() => {
    if (!_.isUndefined(datasource)) {
      const sortedDatasource = _.orderBy(datasource, [booleanKey], ['desc']);
      setList(sortedDatasource);
    }
  }, [datasource]);

  // Another way of handling input changes
  // useEffect(() => {
  //   if (_.isEmpty(searchQuery)) {
  //     return setList(datasource);
  //   }

  //   setList(
  //     _.filter(list, function (item) {
  //       return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  //     })
  //   );
  // }, [searchQuery]);

  // Handlers
  const handleInputFieldChange = (query) => {
    if (_.isEmpty(query)) {
      return setList(datasource);
    }

    setList(
      _.filter(list, function (item) {
        return item.name.toLowerCase().includes(query.toLowerCase());
      })
    );
  };

  const handleOnKeyUp = (e) => {
    if (!onClickEnter) {
      return;
    }

    if (e.key.toLowerCase() === 'enter') {
      setSearchQuery('');
      handleInputFieldChange('');
      onClickEnter(e.target.value);
    }
  };

  return (
    <Popover
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: {
          overflow: 'hidden',
          marginTop: '2px',
          width: '20em',
        },
      }}
      {...props}
    >
      <Stack>
        {
          <Stack>
            <FormProvider {...methods}>
              <Stack sx={{ padding: '12px 17px' }}>
                <StyledInputField
                  name="search"
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  disabled={isLoading}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleInputFieldChange(e.target.value);
                  }}
                  onKeyUp={handleOnKeyUp}
                />
              </Stack>
            </FormProvider>
            <Divider />
            {isLoading ? (
              <Typography
                sx={{
                  color: appColors.gray,
                  textAlign: 'center',
                  padding: '10px 0 10px 0',
                }}
              >
                {'Fetching...'}
              </Typography>
            ) : (
              <Stack
                spacing={1}
                sx={{
                  overflowX: 'hidden',
                  overflowY: 'auto',
                  padding: '12px 17px',
                  maxHeight: maxHeight ?? 400,
                }}
              >
                {_.isEmpty(list) ? (
                  <Typography
                    sx={{ color: appColors.gray, textAlign: 'center' }}
                  >
                    {emptyResultsPlaceholder}
                  </Typography>
                ) : (
                  list.map((item, index) => {
                    return (
                      <Box key={index}>
                        <FormControlLabel
                          sx={{
                            '& .MuiFormControlLabel-label': {
                              width: '16em',
                            },
                          }}
                          label={
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              sx={{
                                pr: 0.5,
                              }}
                            >
                              <StyledTypography>{item.name}</StyledTypography>
                              {item.avatar && (
                                <Avatar
                                  alt={item.name}
                                  src={item.avatar}
                                  sx={{ width: 24, height: 24 }}
                                />
                              )}
                            </Stack>
                          }
                          control={
                            <SelectionPopoverCheckbox
                              isChecked={item[booleanKey] ?? false}
                              onChange={() => onSelectionChange(item)}
                            />
                          }
                        />
                      </Box>
                    );
                  })
                )}
              </Stack>
            )}
          </Stack>
        }
      </Stack>
    </Popover>
  );
};

SelectionPopover.propTypes = {
  datasource: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchPlaceholder: PropTypes.string,
  emptyResultsPlaceholder: PropTypes.string,
  booleanKey: PropTypes.string,
  maxHeight: PropTypes.number,
  isLoading: PropTypes.bool,
  onSelectionChange: PropTypes.func,
  onClickEnter: PropTypes.func,
};

export default SelectionPopover;
