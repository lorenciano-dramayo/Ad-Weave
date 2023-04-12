import React from 'react';
import PropTypes from 'prop-types';

import { Stack, Box, Typography, Divider, IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { filter_list } from 'pages/Dashboard/constant';

import { appColors } from 'theme/variables';

import FilterList from 'pages/Dashboard/Components/FilterList';

export default function Filters({
  handleClose,
  channel,
  options,
  others,
  setChannel,
  setOthers,
  selectedFilterOptions,
  setFilterOptions,
  setSelectedFilterOptions,
}) {
  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pl={2}
        py={1}
        pr={1}
      >
        <Box>
          <Typography
            fontWeight={800}
            variant="body2"
            color={appColors.gray}
            sx={{ textTransform: 'uppercase' }}
          >
            Extra Filters
          </Typography>
        </Box>
        <Box>
          <IconButton
            sx={{
              '&:hover': {
                backgroundColor: appColors.lightViolet,
                color: '#fff',
              },
            }}
            size="small"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Stack>
      <Divider />

      {filter_list.map((filter, index) => (
        <FilterList
          key={index}
          filter={filter}
          channel={channel}
          options={options}
          others={others}
          selectedFilterOptions={selectedFilterOptions}
          setFilterOptions={setFilterOptions}
          setSelectedFilterOptions={setSelectedFilterOptions}
          setChannel={setChannel}
          setOthers={setOthers}
        />
      ))}
    </Stack>
  );
}

Filters.propTypes = {
  handleClose: PropTypes.func,
  channel: PropTypes.any,
  options: PropTypes.any,
  others: PropTypes.any,
  setChannel: PropTypes.any,
  selectedFilterOptions: PropTypes.any,
  setFilterOptions: PropTypes.any,
  setSelectedFilterOptions: PropTypes.any,
  setOthers: PropTypes.any,
};
