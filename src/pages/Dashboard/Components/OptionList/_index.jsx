import React from 'react';

import _ from 'lodash';

import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
  IconButton,
  Avatar,
  ListItemIcon,
} from '@mui/material';

import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AssistantPhotoRoundedIcon from '@mui/icons-material/AssistantPhotoRounded';
import DehazeIcon from '@mui/icons-material/Dehaze';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';

import DateTimerPicker from 'pages/Task/Components/DateTimePicker';
import VirtualListSelection from 'pages/Task/Components/VirtualListSelection';

import { appColors } from 'theme/variables';

export default function OptionList({
  options,
  type,
  defaultValue,
  handleSelect,
  handleClose,
  user,
}) {
  switch (type) {
    case 'more':
      return (
        <List dense sx={{ padding: '0.2em 0' }}>
          {options?.map((data, index) => (
            <ListItem key={index} sx={{ padding: 0 }}>
              <ListItemButton
                sx={{ width: 111 }}
                onClick={() => handleSelect({}, data.slug)}
              >
                <ListItemText
                  sx={{ '.MuiTypography-root': { fontWeight: 700 } }}
                >
                  {data?.name}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      );

    case 'sort':
      return (
        <List dense sx={{ padding: '0.2em 0' }}>
          {options?.map((data, index) => (
            <ListItem
              key={index}
              sx={{ padding: 0 }}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="sort"
                  size="small"
                  sx={{ padding: 0 }}
                >
                  {data.sortType === '' ? (
                    <DehazeIcon />
                  ) : data.sortType?.charAt(0) === '-' ? (
                    <ArrowDownwardIcon color="secondary" />
                  ) : (
                    <ArrowUpwardIcon color="secondary" />
                  )}
                </IconButton>
              }
              onClick={() => handleSelect(data, type)}
              disablePadding
            >
              <ListItemButton sx={{ width: 151 }}>
                <ListItemText
                  sx={{ '.MuiTypography-root': { fontWeight: 700 } }}
                >
                  {data?.name}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      );

    case 'status':
      return (
        <List dense sx={{ padding: '0.2em 0' }}>
          {_.filter(options, (stats) =>
            _.map(stats?.related_to, (types) => types.name === 'task').includes(
              true
            )
          ).map((stats, index) => (
            <ListItem
              key={index}
              sx={{
                padding: 0,
                '.Mui-selected': {
                  backgroundColor: '#9871ff42',
                  '&:hover': {
                    backgroundColor: '#f220763b',
                  },
                },
              }}
            >
              <ListItemButton
                selected={stats.id === Number(defaultValue?.selectedId)}
                onClick={(e) => {
                  handleSelect(
                    {
                      is_parent: defaultValue.isParent,
                      id: defaultValue.taskId,
                      key: type,
                      value: stats?.id,
                    },
                    type
                  );
                  handleClose(e);
                }}
              >
                <ListItemText
                  sx={{
                    '.MuiTypography-root': {
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                    },
                  }}
                >
                  <SquareRoundedIcon
                    sx={{
                      color:
                        appColors.status[
                          _.camelCase(
                            stats?.name?.toLowerCase().replace(/_/g, ' ')
                          )
                        ],
                      marginRight: '1em',
                    }}
                  />
                  {stats?.name}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      );

    case 'bulk_save':
      return (
        <Stack pb={1} pt={0.5}>
          <Box px={2}>
            <Typography fontWeight={800} color="primary">
              Edit Task
            </Typography>
          </Box>
          <Divider />
          <Stack px={2}>
            <Box>
              <Typography
                variant="caption"
                textTransform="uppercase"
                fontWeight={700}
                color="secondary"
              >
                Status
              </Typography>
              <TextField id="filled-basic" variant="outlined" size="small" />
            </Box>
            <Box>
              <Typography
                variant="caption"
                textTransform="uppercase"
                fontWeight={700}
                color="secondary"
              >
                Assignee
              </Typography>
              <TextField id="filled-basic" variant="outlined" size="small" />
            </Box>
            <Box>
              <Typography
                variant="caption"
                textTransform="uppercase"
                fontWeight={700}
                color="secondary"
              >
                Priority
              </Typography>
              <TextField id="filled-basic" variant="outlined" size="small" />
            </Box>
            <Box>
              <Typography
                variant="caption"
                textTransform="uppercase"
                fontWeight={700}
                color="secondary"
              >
                Due Date
              </Typography>
              <TextField id="filled-basic" variant="outlined" size="small" />
            </Box>
            <Box>
              <Typography
                variant="caption"
                textTransform="uppercase"
                fontWeight={700}
                color="secondary"
              >
                Delivery Date
              </Typography>
              <TextField id="filled-basic" variant="outlined" size="small" />
            </Box>
            <Stack direction="row" spacing={1} justifyContent="flex-end" pt={1}>
              <Button variant="outlined" onClick={handleClose} size="small">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                disableElevation
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </Stack>
      );
    case 'priority':
      return (
        <Box>
          {_.isEmpty(options.data) ? (
            'No Options Available'
          ) : (
            <List component="nav" dense={true}>
              {options?.data?.map((data, index) => (
                <ListItemButton
                  key={index}
                  onClick={(e) => {
                    handleSelect(
                      {
                        isParent: defaultValue.isParent,
                        taskId: defaultValue.taskId,
                        key: type,
                        priorityId: data?.id,
                      },
                      type
                    );
                    handleClose(e);
                  }}
                  selected={defaultValue?.selectedIds?.includes(
                    Number(data?.id)
                  )}
                  sx={{
                    '&.Mui-selected': { backgroundColor: '#5025c41a' },
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <AssistantPhotoRoundedIcon
                      sx={{
                        color: appColors.priority[data?.name.toLowerCase()],
                      }}
                    />
                    <ListItemText
                      primary={data?.name}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Stack>
                </ListItemButton>
              ))}
            </List>
          )}
        </Box>
      );
    case 'date':
      return (
        <DateTimerPicker
          type={defaultValue.type}
          taskId={defaultValue.taskId}
          defaultValue={defaultValue.selectedDate}
          isParent={defaultValue.isParent}
          handleSave={(data) => handleSelect(data, type)}
          handleClose={handleClose}
        />
      );
    case 'assignees':
      return (
        <VirtualListSelection
          option={options.data}
          type={type}
          selected={defaultValue.selectedAssignees}
          taskId={defaultValue.taskId}
          isParent={defaultValue.isParent}
          handleSave={(data) => handleSelect(data, type)}
        />
      );
    case 'channel':
      return (
        <Box>
          {_.isEmpty(options) ? (
            'No Options Available'
          ) : (
            <List component="nav" dense={true}>
              {options?.map((data, index) => (
                <ListItemButton
                  key={index}
                  onClick={(e) => {
                    handleSelect(data, type);
                    handleClose(e);
                  }}
                  selected={defaultValue?.selectedIds?.includes(
                    Number(data?.value)
                  )}
                  sx={{
                    '&.Mui-selected': { backgroundColor: '#5025c41a' },
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <ListItemText
                      primary={data?.name}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Stack>
                </ListItemButton>
              ))}
            </List>
          )}
        </Box>
      );
    case 'task_health':
      return (
        <Box>
          {_.isEmpty(options) ? (
            'No Options Available'
          ) : (
            <List component="nav" dense={true}>
              {options?.map((data, index) => (
                <ListItemButton
                  key={index}
                  onClick={(e) => {
                    handleSelect(data, type);
                    handleClose(e);
                  }}
                  selected={defaultValue?.selectedIds?.includes(data?.value)}
                  sx={{
                    '&.Mui-selected': { backgroundColor: '#5025c41a' },
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    {/* <AssistantPhotoRoundedIcon
                      sx={{
                        color: appColors.priority[data?.name.toLowerCase()],
                      }}
                    /> */}
                    <ListItemText
                      primary={data?.name}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Stack>
                </ListItemButton>
              ))}
            </List>
          )}
        </Box>
      );

    case 'profile':
      return (
        <Stack sx={{ width: '200px' }} py={1}>
          <Stack direction="row" alignItems="center" spacing={2} px={2} pb={1}>
            <Box>
              {!_.isEmpty(user?.profile_picture) &&
              user?.profile_picture?.split('/').pop() !== 'thumb_' ? (
                <Avatar alt={user?.fullname} src={user?.profile_picture} />
              ) : (
                <Avatar>
                  {`${user?.fullname.split(' ')[0][0]}${
                    !_.isEmpty(user?.fullname.split(' ')[1][0])
                      ? user?.fullname.split(' ')[1][0]
                      : ''
                  }`}
                </Avatar>
              )}
            </Box>
            <Stack justifyContent="center">
              <Box>
                <Typography
                  fontWeight={700}
                  variant="body1"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {user?.fullname}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                  variant="body2"
                >
                  {user?.team_name}
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Divider sx={{ borderColor: 'rgb(0 0 0 / 5%)' }} />
          <List dense sx={{ padding: 0 }}>
            {options?.map((data, index) => (
              <ListItem key={index} sx={{ padding: 0 }}>
                <ListItemButton onClick={() => handleSelect({}, data.slug)}>
                  <ListItemIcon sx={{ minWidth: '28px' }}>
                    {data?.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{ '.MuiTypography-root': { fontWeight: 700 } }}
                  >
                    {data?.name}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ borderColor: 'rgb(0 0 0 / 5%)' }} />

            <ListItem sx={{ padding: 0 }}>
              <ListItemButton onClick={() => handleSelect({}, 'help')}>
                <ListItemIcon sx={{ minWidth: '28px' }}>
                  <HelpOutlineOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ '.MuiTypography-root': { fontWeight: 700 } }}
                >
                  Help
                </ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem sx={{ padding: 0 }}>
              <ListItemButton onClick={() => handleSelect({}, 'send_feedback')}>
                <ListItemIcon sx={{ minWidth: '28px' }}>
                  <FeedbackOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ '.MuiTypography-root': { fontWeight: 700 } }}
                >
                  Send Feedback
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
      );
    default:
      return null;
  }
}

OptionList.propTypes = {
  options: PropTypes.any,
  type: PropTypes.string,
  defaultValue: PropTypes.any,
  handleSelect: PropTypes.func,
  handleClose: PropTypes.func,
  user: PropTypes.any,
};
