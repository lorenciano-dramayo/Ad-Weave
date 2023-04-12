import { useState, React, useEffect } from 'react';
import _ from 'lodash';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import SkeletonLoader from 'components/Project/Header/skeleton';
import Fade from 'components/Common/Fade';
// D:\Project\SMT\ad-weave-v2\src\components\Project\Header\skeleton.jsx
// import { fetchDashboardFilter } from 'store/reducers/dashboard';
// import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Stack,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  styled,
  AvatarGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import { FixedSizeList } from 'react-window';

import { channelIcons } from 'constants/widgets';
import { applyPatches } from 'immer';
import { appColors } from 'theme/variables';

const ListItemTextStyled = styled(ListItemText)({
  '& .css-1mbv8a3-MuiTypography-root': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '338px',
  },
});

function withAvatar(props) {
  const { index, style } = props;

  return (
    <ListItem
      style={style}
      key={index}
      disablePadding
      secondaryAction={
        <Stack direction="row" spacing={2} alignItems="center">
          <Box display="flex" alignItems="center">
            <Button
              size="small"
              width="1.5em"
              sx={{
                backgroundColor: '#FFB648',
                color: '#fff',
                '&:hover': { backgroundColor: '#FFB648' },
              }}
            >
              On Track
            </Button>
          </Box>
          <Box width="1.5em" display="flex" alignItems="center">
            {channelIcons.google}
          </Box>
        </Stack>
      }
    >
      <ListItemButton
        sx={{ paddingTop: 0, paddingBottom: 0, height: 'inherit' }}
      >
        <ListItemText
          primary={`User ${index + 1}`}
          secondary="Studio Setup - Ad-Lib_AU_Awareness_Share Dealing_FY23_$2.50 Share"
        />
      </ListItemButton>
    </ListItem>
  );
}

function resources({ data, index, style }) {
  const { items } = data;

  const item = items[index];

  return (
    <ListItem
      style={style}
      key={index}
      disablePadding
      secondaryAction={
        item?.profile_picture?.split('/').pop() !== 'thumb_' ? (
          <Avatar
            sx={{ width: 30, height: 30 }}
            alt={`${item?.first_name?.split('')[0]}`}
            src={item?.profile_picture}
          />
        ) : (
          <Avatar sx={{ width: 30, height: 30, textTransform: 'uppercase' }}>
            {`${item?.first_name?.split('')[0]}${
              item?.last_name?.split('')[0]
            }`}
          </Avatar>
        )
      }
    >
      <ListItemButton
        disableRipple
        sx={{
          paddingTop: 0,
          paddingBottom: 0,
          height: 'inherit',
          borderBottom: '1px solid #ececec',
          cursor: 'default',
        }}
      >
        <ListItemText
          primary={
            <Typography
              fontWeight={700}
              color={'primary'}
              sx={{
                '&:hover': {
                  color: appColors.lightViolet,
                },
              }}
            >
              {item?.fullname}
            </Typography>
          }
          secondary={
            item?.team_name.toLowerCase() === 'production(h5)'
              ? 'H5 Developer'
              : item?.team_name.toLowerCase() === 'production(video)'
              ? 'Video Developer'
              : item?.team_name.toLowerCase() === 'design'
              ? 'Designer'
              : item?.team_name
          }
        />
      </ListItemButton>
    </ListItem>
  );
}

resources.propTypes = {
  data: PropTypes.any,
  index: PropTypes.any,
  style: PropTypes.any,
};

function openTickets({ data, index, style, filteredButtons, nameInput }) {
  const { items, clickFunc } = data;

  const item = items[index];

  let iconChannel;

  if (item?.channel === 'Youtube') {
    iconChannel = channelIcons.youtube;
  } else if (item?.channel?.toLowerCase().includes('google')) {
    iconChannel = channelIcons.google;
  } else if (item?.channel?.toLowerCase().includes('facebook')) {
    iconChannel = channelIcons.facebook;
  }

  return (
    <ListItem
      style={style}
      key={index}
      disablePadding
      secondaryAction={
        <Stack direction="row" spacing={2} alignItems="center">
          <Box width="1.5em" display="flex" alignItems="center">
            {iconChannel}
          </Box>

          <Box display="flex" alignItems="center">
            <Button
              size="small"
              width="1.5em"
              variant="contained"
              sx={{
                cursor: 'default',
                textTransform: 'capitalize',
                backgroundColor:
                  appColors.dashboard[
                    item?.tracker_status.replace(/_/g, ' ').toLowerCase() ===
                    'overdue'
                      ? 'default'
                      : item?.tracker_status
                          .replace(/_/g, ' ')
                          .toLowerCase() === 'critical'
                      ? 'success'
                      : 'warning'
                  ],
                '&:hover': {
                  backgroundColor:
                    appColors.dashboard[
                      item?.tracker_status.replace(/_/g, ' ').toLowerCase() ===
                      'overdue'
                        ? 'default'
                        : item?.tracker_status
                            .replace(/_/g, ' ')
                            .toLowerCase() === 'critical'
                        ? 'success'
                        : 'warning'
                    ],
                },
              }}
              disableElevation
              disableRipple
              disableFocusRipple
              disableTouchRipple
            >
              {item?.tracker_status.replace(/_/g, ' ')}
            </Button>
          </Box>
        </Stack>
      }
    >
      <ListItemButton
        disableRipple
        sx={{
          paddingTop: 0,
          paddingBottom: 0,
          height: 'inherit',
          borderBottom: '1px solid #ececec',
        }}
        onClick={() => clickFunc(item?.id, item?.level, item?.rel_type)}
      >
        <ListItemTextStyled
          primary={
            <Typography
              color={'primary'}
              fontWeight={700}
              sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                textDecoration: 'none',
                width: '18em',
                '&:hover': {
                  color: appColors.lightViolet,
                },
              }}
            >
              {item?.description}
            </Typography>
          }
          secondary={item?.concept}
        />
      </ListItemButton>
    </ListItem>
  );
}

openTickets.propTypes = {
  data: PropTypes.any,
  index: PropTypes.any,
  style: PropTypes.any,
  filteredButtons: PropTypes.any,
  nameInput: PropTypes.any,
};

function inProgress({ data, index, style, filteredButtons, nameInput }) {
  const { items, clickFunc } = data;

  const item = items[index];
  let iconChannel;

  if (item?.channel === 'Youtube') {
    iconChannel = channelIcons.youtube;
  } else if (item?.channel?.toLowerCase().includes('google')) {
    iconChannel = channelIcons.google;
  } else if (item?.channel?.toLowerCase().includes('facebook')) {
    iconChannel = channelIcons.facebook;
  }

  return (
    <ListItem
      style={style}
      key={index}
      disablePadding
      secondaryAction={
        <Stack direction="row" spacing={2} alignItems="center">
          <Box width="1.5em" display="flex" alignItems="center">
            {iconChannel}
          </Box>

          <Box display="flex" alignItems="center">
            <Button
              size="small"
              width="1.5em"
              variant="contained"
              sx={{
                cursor: 'default',
                textTransform: 'capitalize',
                backgroundColor:
                  appColors.dashboard[
                    item?.tracker_status.replace(/_/g, ' ').toLowerCase() ===
                    'overdue'
                      ? 'default'
                      : item?.tracker_status
                          .replace(/_/g, ' ')
                          .toLowerCase() === 'critical'
                      ? 'success'
                      : 'warning'
                  ],
                '&:hover': {
                  backgroundColor:
                    appColors.dashboard[
                      item?.tracker_status.replace(/_/g, ' ').toLowerCase() ===
                      'overdue'
                        ? 'default'
                        : item?.tracker_status
                            .replace(/_/g, ' ')
                            .toLowerCase() === 'critical'
                        ? 'success'
                        : 'warning'
                    ],
                },
              }}
              disableElevation
              disableRipple
              disableFocusRipple
              disableTouchRipple
            >
              {item?.tracker_status.replace(/_/g, ' ')}
            </Button>
          </Box>
        </Stack>
      }
    >
      <ListItemButton
        disableRipple
        sx={{
          paddingTop: 0,
          paddingBottom: 0,
          height: 'inherit',
          borderBottom: '1px solid #ececec',
        }}
        onClick={() => clickFunc(item?.id, item?.level, item?.rel_type)}
      >
        <ListItemTextStyled
          primary={
            _.isEmpty(item?.assignees) ? (
              <Typography
                fontWeight={700}
                color={'primary'}
                sx={{
                  '&:hover': {
                    color: appColors.lightViolet,
                  },
                }}
              >
                No Assignee
              </Typography>
            ) : (
              <AvatarGroup sx={{ justifyContent: 'left' }}>
                {item?.assignees?.map((data, index) => (
                  <Tooltip key={index} title={data?.name ?? ''} arrow>
                    <Avatar
                      alt={data?.name}
                      src={data?.avatar}
                      sx={{ width: 24, height: 24 }}
                    />
                  </Tooltip>
                ))}
              </AvatarGroup>
            )
          }
          secondary={
            <Box
              sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                textDecoration: 'none',
                width: '18em',
              }}
            >
              {item?.description}
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}

inProgress.propTypes = {
  data: PropTypes.any,
  index: PropTypes.any,
  style: PropTypes.any,
  filteredButtons: PropTypes.any,
  nameInput: PropTypes.any,
};

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'taskName', headerName: 'Task Name', width: 250 },
  { field: 'status', headerName: 'Status', width: 150 },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    width: 250,
    editable: true,
  },
  { field: 'dueDate', headerName: 'Due Date', width: 250, editable: true },
  { field: 'assigned', headerName: 'Assigned to', width: 250 },
  { field: 'tags', headerName: 'Tags', width: 250 },
  { field: 'priority', headerName: 'Priority', width: 250 },
];

const createItemData = _.memoize((items, clickFunc) => ({
  items,
  clickFunc,
}));

export default function VirtualList({
  data,
  name,
  nameInput,
  allData,
  filteredButtons,
  onClick,
}) {
  const allTaskData = allData?.all_tasks;

  const allTaskList = (allTaskData?.data ?? []).map((item) => ({
    id: item.id,
    taskName: item.name,
    status: item.status.replace(/_/g, ' '),
    dateCreated: item.date_created,
    dueDate: item.due_date,
    assigned: 'lorem',
    tags: 'lorem',
    priority:
      item.priority_description == null ? '--' : item.priority_description,
  }));

  let tableItem;

  const itemData = createItemData(data, onClick);

  if (nameInput == 'Resources') {
    tableItem = resources;
  } else if (nameInput == 'In Progress') {
    tableItem = inProgress;
  } else if (nameInput == 'Open Tickets') {
    tableItem = openTickets;
  } else if (nameInput == 'My Tasks') {
    tableItem = openTickets;
  }

  return data == null ? (
    <SkeletonLoader />
  ) : (
    <Fade in={data != null}>
      <Box
        sx={{
          width: '100%',
          height: 400,
          bgcolor: 'background.paper',
        }}
      >
        {nameInput === 'All Tasks' ? (
          <DataGrid
            rows={allTaskList}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[50]}
          />
        ) : (
          <FixedSizeList
            height={400}
            width="auto"
            itemSize={70}
            itemCount={data?.length}
            overscanCount={5}
            itemData={itemData}
          >
            {tableItem}
          </FixedSizeList>
        )}
      </Box>
    </Fade>
  );
}

VirtualList.propTypes = {
  data: PropTypes.any,
  allData: PropTypes.any,
  name: PropTypes.any,
  nameInput: PropTypes.any,
  filteredButtons: PropTypes.any,
  onClick: PropTypes.func,
};
