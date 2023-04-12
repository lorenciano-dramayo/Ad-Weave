import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import _ from 'lodash';

import PropTypes from 'prop-types';

import SubtaskList from 'pages/Task/Components/SubtaskList';

// Reducer
import {
  requestAddSubtask_,
  startTimer,
  playTimer,
  pauseTimer,
  stopTimer,
  requestDestroySubtask_,
} from 'store/reducers/tasks';

import {
  Box,
  Stack,
  Typography,
  Card,
  IconButton,
  Autocomplete,
  TextField,
} from '@mui/material';

import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';

// Colors
import { appColors } from 'theme/variables';

export default function Subtasks({
  subTask,
  priorityList,
  usersList,
  statusList,
  handleOpen,
  task_id,
  data,
  onCloseDialog,
}) {
  const dispatch = useDispatch();
  const {
    overview: {
      rel_type,
      status_id,
      status,
      priority_description,
      priority_id,
      assignees,
    },
    isLoading,
  } = useSelector((state) => state.tasks);
  const [referenceLinkInput01, setReferenceLinkInput01] = useState('');
  const Swal = require('sweetalert2');
  const handlePlayPauseButtonClick = (id, type, activeTimeLogId, option) => {
    switch (option) {
      case 'start':
        dispatch(startTimer(id, { rel_id: id, rel_type: type }));
        break;
      case 'pause':
        dispatch(pauseTimer(id, { id: activeTimeLogId }));
        break;
      default:
        dispatch(playTimer(id, { id: activeTimeLogId }));
        break;
    }
  };

  const handleDeleteSubtask = (id) => {
    Swal.fire({
      title: 'Do you want to delete this subtask?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const itemRevision = [];
        itemRevision.push({
          task_id: task_id,
          id: id,
        });
        dispatch(requestDestroySubtask_(itemRevision[0]));

        Swal.fire('Saved!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };

  const handleOnKeyUpRefLink = (e) => {
    const {
      target: { value },
    } = e;
    const itemSubCategory = data?.task_sub_categories?.filter(
      (item) => item.name == value
    );

    if (e.key.toLowerCase() === 'enter') {
      setReferenceLinkInput01('');
      dispatch(
        requestAddSubtask_({
          category_id: itemSubCategory[0].id,
          task_id: task_id,
        })
      );
    }

    // dispatch(requestFetchSubTask_(task_id));
  };

  const handleStopButtonClick = (id, activeTimeLogId) => {
    dispatch(stopTimer(id, { id: activeTimeLogId }));
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          <Box>
            <Typography variant="overline" fontWeight={800}>
              {subTask?.length} {subTask?.length < 2 ? 'Subtask' : 'Subtasks'}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="overline"
              fontWeight={700}
              sx={{
                color: appColors.gray,
                cursor: 'pointer',
                '&:hover': { color: appColors.lightViolet },
              }}
            >
              Priority
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Box>
            <Typography
              variant="overline"
              fontWeight={700}
              sx={{
                color: appColors.gray,
                cursor: 'pointer',
                '&:hover': { color: appColors.lightViolet },
              }}
            >
              All
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="overline"
              fontWeight={700}
              sx={{
                color: appColors.gray,
                cursor: 'pointer',
                '&:hover': { color: appColors.lightViolet },
              }}
            >
              Mine
            </Typography>
          </Box>
        </Stack>
      </Stack>
      {!_.isEmpty(subTask) ? (
        subTask?.map((sub_category, index) => (
          <SubtaskList
            key={index}
            sub_category={sub_category}
            handlePlayPauseButtonClick={handlePlayPauseButtonClick}
            handleStopButtonClick={handleStopButtonClick}
            priorityList={priorityList}
            usersList={usersList}
            statusList={_.filter(statusList, (stats) =>
              _.map(
                stats?.related_to,
                (types) => types.name === 'task'
              ).includes(true)
            )}
            status={status}
            assigneesList={assignees}
            rel_type={rel_type}
            status_id={status_id}
            handleOpen={handleOpen}
            handleDeleteSubtask={handleDeleteSubtask}
            onCloseDialog={onCloseDialog}
          />
        ))
      ) : (
        <Card variant="outlined" sx={{ borderStyle: 'none' }}>
          <Stack alignItems="center" p={1}>
            <Box>
              <IconButton
                size="large"
                color="error"
                disableRipple
                disableTouchRipple
                disableFocusRipple
                sx={{ backgroundColor: '#f2445c1a' }}
              >
                <AssignmentLateIcon />
              </IconButton>
            </Box>
            <Box>
              <Typography fontWeight={700} color="#999999">
                No Subtask found.
              </Typography>
            </Box>
          </Stack>
        </Card>
      )}
      <Box mt={2}>
        {/* <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={taskSubCategories?.map((option) => option?.label)}
          renderInput={(params) => (
            <TextField
              sx={{
                borderRadius: '0.1em',
                fieldset: {
                  border: '1px dashed #ececec',
                },
              }}
              onKeyUp={(e) => handleOnKeyUpRefLink(e)}
              fullWidth
              name="search"
              type="text"
              placeholder="Add a Subtask"
              {...params}
              label="Add a Subtask"
              value={referenceLinkInput01}
              size="small"
              required
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        /> */}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={
            data?.task_sub_categories?.map((option) => option?.name) || []
          }
          sx={{ width: 300 }}
          value={referenceLinkInput01}
          renderInput={(params) => (
            <TextField
              {...params}
              onKeyUp={(e) => handleOnKeyUpRefLink(e)}
              sx={{
                borderRadius: '0.1em',
                fieldset: {
                  border: '1px dashed #ececec',
                },
              }}
              fullWidth
              size="small"
              placeholder="Add a Subtask"
              label="Add a Subtask"
            />
          )}
          disabled={isLoading}
        />
      </Box>
    </Box>
  );
}

Subtasks.propTypes = {
  subTask: PropTypes.any,
  data: PropTypes.any,
  task_id: PropTypes.any,
  priorityList: PropTypes.any,
  usersList: PropTypes.any,
  statusList: PropTypes.any,
  status: PropTypes.any,
  assigneesList: PropTypes.any,
  handleOpen: PropTypes.func,
  handleDeleteSubtask: PropTypes.func,
  onCloseDialog: PropTypes.func,
};
