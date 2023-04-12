import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Stack, Box, Typography, Divider, IconButton, Button } from '@mui/material';
import _ from 'lodash';
import CloseIcon from '@mui/icons-material/Close';

import { filter_list } from 'pages/TimerSheet/constant';

import { appColors } from 'theme/variables';
import { getData } from 'store/reducers/manualTaskCreation';
import FilterList from 'pages/TimerSheet/components/FilterList';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTimesheet,
} from 'store/reducers/timesheet';
export default function Filters({
  handleClose,
  options,
  selectedFilterOptions,
  setFilterOptions,
  setSelectedFilterOptions,
}) {
  const dispatch = useDispatch();
  const {
    data: { taskTypeList, subTaskList },
  } = useSelector((state) => state.manualTaskCreation);
  useEffect(() => {
    dispatch(getData('get_task_type'));
    dispatch(getData('get_task_category'));
  }, []);

  const handleOnClickClearFilter = () => {
    dispatch(getTimesheet('', '', '', '', '', ''));
  };

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
          options={options}
          selectedFilterOptions={selectedFilterOptions}
          setFilterOptions={setFilterOptions}
          setSelectedFilterOptions={setSelectedFilterOptions}
        />
      ))}


      <Button
        size="medium"
        onClick={handleOnClickClearFilter}
        sx={{
          margin: '10px 15px',
          borderRadius: '7px',
          color: 'white',
          background: '#F22076',
          textTransform: 'none',
          padding: '10px 15px',

        }}
      >
        Clear Filter
      </Button>


    </Stack>
  );
}


Filters.propTypes = {
  handleClose: PropTypes.func,
  selectedFilterOptions: PropTypes.any,
  setFilterOptions: PropTypes.any,
  setSelectedFilterOptions: PropTypes.any,
  options: PropTypes.any,
};
