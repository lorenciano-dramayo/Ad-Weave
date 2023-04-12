import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Stack, Box, Typography, Divider, IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { filter_list } from 'pages/Project/views/LinkList/constant';

import { appColors } from 'theme/variables';
import { getData } from 'store/reducers/manualTaskCreation';
import FilterList from 'pages/Project/views/LinkList/Components/FilterList';
import { useDispatch, useSelector } from 'react-redux';

export default function Filters({
  _id,
  handleClose,
  channel,
  setChannel,
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
          _id={_id}
          categories={subTaskList}
          taskType={taskTypeList}
          selectedFilterOptions={selectedFilterOptions}
          setFilterOptions={setFilterOptions}
          setSelectedFilterOptions={setSelectedFilterOptions}
          setChannel={setChannel}
        />
      ))}
    </Stack>
  );
}

Filters.propTypes = {
  _id: PropTypes.any,
  handleClose: PropTypes.func,
  channel: PropTypes.any,
  categories: PropTypes.any,
  taskType: PropTypes.any,
  setChannel: PropTypes.any,
  selectedFilterOptions: PropTypes.any,
  setFilterOptions: PropTypes.any,
  setSelectedFilterOptions: PropTypes.any,
  options: PropTypes.any,
};
