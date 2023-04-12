import React, { useEffect, useState } from 'react';

import _ from 'lodash';

import InfiniteScroll from 'react-infinite-scroll-component';

import { useHistory, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import {
  getOptions,
  getDashboard,
  getFilteredDashboard,
  getDashboardResources,
  getPaginatedDashboard,
  getTasksCompleted,
  clearDashboard,
} from 'store/reducers/devdash';

import {
  Box,
  Card,
  Drawer,
  LinearProgress,
  Stack,
  styled,
  TextField,
  Typography,
  AvatarGroup,
  Tooltip,
  Avatar,
  CircularProgress,
  Divider,
  IconButton,
  Popover,
} from '@mui/material';

import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';

import { appColors } from 'theme/variables';
import { summary_devdash } from 'pages/Dashboard/constant';
import { channelIcons } from 'constants/widgets';
import { getHealthPercentage } from 'pages/Dashboard/helpers';
import { filter_list } from 'pages/Dashboard/constant';
import emptyImage from 'assets/images/fav-empty.svg';

import * as queryString from 'query-string';

import {
  main as MainContentSkeleton,
  drawer as DrawerContentSkeleton,
} from 'pages/Dashboard/views/DevDash/ContentSkeleton';
import OptionList from 'pages/Dashboard/Components/OptionList';
import { getItemByKey } from 'utils/dictionary';

const drawerWidth = 350;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

export default function DevDash() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [open] = useState(true);
  const urlParams = queryString.parse(history.location.search);
  // Popper state
  const [selectedOption, setSelectedOption] = useState('');
  const [defaultValue, setDefaultValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [popperHorizontal, setPopperHorizontal] = useState('left');
  // Filter state
  const [selectedFilterOptions, setSelectedFilterOptions] = useState([]);

  const isPopperOpen = Boolean(anchorEl);
  const id = isPopperOpen ? 'dashboard-popover' : undefined;

  const handleTaskOpen = (e, id, rel_type) => {
    e.preventDefault();
    history.push({
      pathname: `/${
        rel_type.toLowerCase().includes('task') ? rel_type : 'campaign'
      }/${id}`,
      search: history.location.search,
      state: {
        background: location,
        type: rel_type.toLowerCase().includes('task') ? rel_type : 'campaign',
        subtask: rel_type.toLowerCase().includes('subtask') ? true : false,
      },
    });
  };

  const {
    data: all_tasks,
    statistics,
    fetching,
    options: { priorities, users, statuses },
    resources: { data: dash_resources, fetching: dash_fetching },
    tasksCompleted,
  } = useSelector((state) => state.devdash);
  const {
    data: { team_id },
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(clearDashboard());
    dispatch(getOptions('users'));
    dispatch(getOptions('priorities'));
    dispatch(getOptions('statuses'));
    dispatch(getTasksCompleted({ teamId: team_id }));
    dispatch(getDashboardResources());
    dispatch(
      getDashboard({
        is_dashboard: true,
      })
    );
  }, []);

  useEffect(() => {
    if (!_.isEmpty(selectedFilterOptions)) {
      dispatchFilterDashboard(urlParams?.search ?? '');
    }
  }, [selectedFilterOptions]);

  const dispatchFilterDashboard = (query = '') => {
    dispatch(
      getFilteredDashboard({
        name: query,
        channel_id: (selectedFilterOptions?.channel ?? [])
          .map((s) => s.value)
          .filter((i) => i !== null),
        priority: (selectedFilterOptions?.priority ?? [])
          .map((s) => s.priorityId)
          .filter((i) => i !== null),
        assignees: selectedFilterOptions?.assignees?.map((a) => a.id) ?? [],
        status: (selectedFilterOptions?.status ?? [])
          .map((s) => s.value)
          .filter((i) => i !== null),
      })
    );
  };

  const dispatchPaginatedDashboard = (query = '', task) => {
    dispatch(
      getPaginatedDashboard('dashboard', task?.current_page + 1, {
        name: query,
        channel_id: _.isEmpty(selectedFilterOptions?.channel)
          ? []
          : [selectedFilterOptions?.channel?.value],
        priority: (selectedFilterOptions?.priority ?? [])
          .map((s) => s.priorityId)
          .filter((i) => i !== null),
        assignees: selectedFilterOptions?.assignees?.map((a) => a.id) ?? [],
        status: (selectedFilterOptions?.status ?? [])
          .map((s) => s.value)
          .filter((i) => i !== null),
      })
    );
  };

  const handleSearch = (e, query) => {
    e.preventDefault();

    const searchParams = new URLSearchParams(history.location.search);

    _.isEmpty(query)
      ? searchParams.delete('search')
      : searchParams.set('search', query);

    history.push({
      pathname: '/dashboard',
      search: searchParams.toString(),
    });

    dispatchFilterDashboard(query);
  };

  const handleSelect = async (data, type) => {
    const selectedFilterId = data?.value ?? data?.selectedId;

    switch (type) {
      case 'assignees': {
        const isOptionAlreadySelected = !_.isEmpty(
          getItemByKey(
            'id',
            data.selectedArr.id,
            selectedFilterOptions.assignees
          )
        );
        const selectedAssignees = isOptionAlreadySelected
          ? (selectedFilterOptions.assignees ?? []).filter(
              (a) => a.id != data.selectedArr.id
            )
          : [...(selectedFilterOptions.assignees ?? []), data.selectedArr];

        //handleClose();
        setSelectedFilterOptions((prev) => ({
          ...prev,
          assignees: selectedAssignees,
        }));
        // Set defaultValue for real time popper update
        setDefaultValue({
          selectedAssignees,
        });
        break;
      }

      case 'priority': {
        const isPriorityAlreadySelected = !_.isEmpty(
          getItemByKey(
            'priorityId',
            selectedFilterId,
            selectedFilterOptions.priority ?? []
          )
        );

        setSelectedFilterOptions((prev) => ({
          ...prev,
          priority: isPriorityAlreadySelected
            ? (selectedFilterOptions.priority ?? []).filter(
                (s) => s.priorityId !== selectedFilterId
              )
            : [...(selectedFilterOptions.priority ?? []), data],
        }));
        break;
      }

      case 'status': {
        const isStatusAlreadySelected = !_.isEmpty(
          getItemByKey(
            'value',
            selectedFilterId,
            selectedFilterOptions.status ?? []
          )
        );
        setSelectedFilterOptions((prev) => ({
          ...prev,
          status: isStatusAlreadySelected
            ? (selectedFilterOptions.status ?? []).filter(
                (s) => s.value !== selectedFilterId
              )
            : [...(selectedFilterOptions.status ?? []), data],
        }));
        break;
      }

      default: {
        const isFilterIdAlreadySelected = !_.isEmpty(
          getItemByKey(
            'value',
            selectedFilterId,
            selectedFilterOptions[type] ?? []
          )
        );
        setSelectedFilterOptions((prev) => ({
          ...prev,
          [type]: isFilterIdAlreadySelected
            ? (selectedFilterOptions[type] ?? []).filter(
                (s) => s.value !== selectedFilterId
              )
            : [...(selectedFilterOptions[type] ?? []), data],
        }));
        break;
      }
    }
  };

  const handleClick = (event, type, defaults) => {
    setSelectedOption(type);
    setDefaultValue(defaults);
    setAnchorEl(event.currentTarget);
    setPopperHorizontal('left');
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOption('');
  };

  const handleScrollPaginate = (task) => {
    dispatchPaginatedDashboard(urlParams?.search ?? '', task);
  };

  return (
    <Box
      sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#1e1344' }}
    >
      <Main
        open={open}
        id="dashboard-main"
        sx={{
          height: '100vh',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          pb={5}
        >
          <Typography variant="h5" color="#fff" fontWeight={800}>
            Overall Summary
          </Typography>
          <TextField
            size="small"
            sx={{
              width: 300,
              '.MuiInputBase-root': {
                backgroundColor: '#2f28488c',
                color: '#fff',
                fieldset: {
                  border: '1px solid #2f28488c',
                },
              },
            }}
            placeholder="Search"
            autoComplete={false}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch(e, e.target.value);
              }
            }}
          />
        </Stack>
        {fetching ? (
          <MainContentSkeleton />
        ) : (
          <>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              {summary_devdash.map((summary, index) => (
                <Card
                  sx={{
                    width: '25%',
                    backgroundColor: '#2f28488c',
                    padding: '1em 2em',
                    border: 0,
                    borderBottom: '8px solid',
                    borderColor: appColors.dashboard.health[summary.slug],
                  }}
                  variant="outlined"
                  key={index}
                >
                  <Typography variant="button" color="#9d9898">
                    {summary.name}
                  </Typography>
                  <Box pt={2} pb={8}>
                    <Typography variant="h3" fontWeight={700} color="#fff">
                      {statistics[summary.slug] ?? '0'}
                    </Typography>
                  </Box>
                </Card>
              ))}
            </Stack>
            <Stack mt={4} spacing={1}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
                pl={5}
              >
                <Box width="30%">
                  <Stack direction="row" alignItems="center">
                    <Typography variant="button" color="#9d9898">
                      Task Name
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{ color: '#9d9898', '*&:hover': { color: '#fff' } }}
                    >
                      <ImportExportIcon />
                    </IconButton>
                  </Stack>
                </Box>
                <Box width="10%">
                  <Stack direction="row" alignItems="center">
                    <Typography variant="button" color="#9d9898">
                      Status
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{ color: '#9d9898', '*&:hover': { color: '#fff' } }}
                      onClick={(e) =>
                        handleClick(e, 'status', {
                          selectedIds: selectedFilterOptions?.status?.map(
                            (s) => s.value
                          ),
                        })
                      }
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  </Stack>
                </Box>
                <Box width="10%">
                  <Stack direction="row" alignItems="center">
                    <Typography variant="button" color="#9d9898">
                      Channel
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{ color: '#9d9898', '*&:hover': { color: '#fff' } }}
                      onClick={(e) =>
                        handleClick(e, 'channel', {
                          selectedIds: selectedFilterOptions?.channel?.map(
                            (s) => s.value
                          ),
                        })
                      }
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  </Stack>
                </Box>
                <Box width="20%">
                  <Stack direction="row" alignItems="center">
                    <Typography variant="button" color="#9d9898">
                      Health
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{ color: '#9d9898', '*&:hover': { color: '#fff' } }}
                      onClick={(e) =>
                        handleClick(e, 'task_health', {
                          selectedIds: selectedFilterOptions?.task_health?.map(
                            (s) => s.value
                          ),
                        })
                      }
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  </Stack>
                </Box>
                <Box width="15%">
                  <Stack direction="row" alignItems="center">
                    <Typography variant="button" color="#9d9898">
                      Priority
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{ color: '#9d9898', '*&:hover': { color: '#fff' } }}
                      onClick={(e) =>
                        handleClick(e, 'priority', {
                          selectedIds: selectedFilterOptions?.priority?.map(
                            (s) => s.priorityId
                          ),
                        })
                      }
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  </Stack>
                </Box>
                <Box width="20%">
                  <Stack direction="row" alignItems="center">
                    <Typography variant="button" color="#9d9898">
                      Assignee
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{ color: '#9d9898', '*&:hover': { color: '#fff' } }}
                      onClick={(e) =>
                        handleClick(e, 'assignees', {
                          selectedAssignees:
                            selectedFilterOptions?.assignees?.map((a) => ({
                              ...a,
                              user_id: Number(a.user_id ?? a.id),
                              id: Number(a.user_id ?? a.id),
                            })),
                        })
                      }
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  </Stack>
                </Box>
              </Stack>

              {!fetching && _.isEmpty(all_tasks.data) ? (
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{ minHeight: '40vh' }}
                >
                  <img width={300} src={emptyImage} alt="empty-favorites" />
                  <Typography variant="h6" sx={{ color: '#888888' }}>
                    No Results Found!
                  </Typography>
                </Stack>
              ) : (
                <InfiniteScroll
                  dataLength={all_tasks?.data?.length}
                  style={{ overflow: 'unset !important' }}
                  hasMore={!_.isEmpty(all_tasks?.next_page_url)}
                  loader={
                    <Stack direction="row" justifyContent="center" mt={2}>
                      <CircularProgress
                        size={26}
                        color="secondary"
                        thickness={7}
                      />
                    </Stack>
                  }
                  scrollableTarget="dashboard-main"
                  next={() => handleScrollPaginate(all_tasks)}
                >
                  {all_tasks?.data?.map((task, index) => (
                    <Card
                      sx={{
                        backgroundColor: '#2f28488c',
                        padding: '1em 0',
                        '&:hover': {
                          boxShadow: '0px 0px 6px 0px rgb(174 174 174 / 40%)',
                        },
                        cursor: 'pointer',
                      }}
                      variant="outlined"
                      key={index}
                      onClick={(e) =>
                        handleTaskOpen(e, task?.id, task?.rel_type)
                      }
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        pl={5}
                        alignItems="center"
                        spacing={4}
                      >
                        {/* Task Name */}
                        <Box width="30%">
                          <Tooltip title={task?.name ?? ''} arrow>
                            <Typography
                              variant="body1"
                              color="#fff"
                              sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: '1',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                              fontWeight={800}
                            >
                              {task?.name}
                            </Typography>
                          </Tooltip>
                        </Box>

                        {/* Status */}
                        <Box width="10%">
                          <Typography
                            variant="body1"
                            fontWeight={600}
                            color={`${
                              appColors.status[
                                _.camelCase(task?.status?.replace(/_/g, ' '))
                              ]
                            }`}
                            textTransform="capitalize"
                          >
                            {task?.status?.replace(/_/g, ' ')}
                          </Typography>
                        </Box>

                        {/* Channel */}
                        <Box width="10%">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                          >
                            <Box
                              sx={{
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                              }}
                            >
                              {task?.channel?.toLowerCase().includes('google')
                                ? channelIcons.google
                                : task?.channel
                                    ?.toLowerCase()
                                    .includes('facebook')
                                ? channelIcons.facebook
                                : channelIcons.youtube}
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                              }}
                            >
                              {task?.channel
                                ?.toLowerCase()
                                .includes('display') ||
                              task?.channel
                                ?.toLowerCase()
                                .includes('static') ? (
                                <PhotoLibraryOutlinedIcon
                                  sx={{
                                    color: 'rgb(255 255 255 / 47%)',
                                    width: '2em',
                                    height: '2em',
                                  }}
                                />
                              ) : task?.channel
                                  ?.toLowerCase()
                                  .includes('video') ? (
                                <VideocamOutlinedIcon
                                  sx={{
                                    color: 'rgb(255 255 255 / 47%)',
                                    width: '2em',
                                    height: '2em',
                                  }}
                                />
                              ) : (
                                <VideocamOutlinedIcon
                                  sx={{
                                    color: 'rgb(255 255 255 / 47%)',
                                    width: '2em',
                                    height: '2em',
                                  }}
                                />
                              )}
                            </Box>
                          </Stack>
                        </Box>

                        {/* Health */}
                        <Box width="20%">
                          <LinearProgress
                            variant="determinate"
                            value={
                              getHealthPercentage(
                                task?.submitted_date,
                                task?.due_date
                              ) <= 0
                                ? 100
                                : getHealthPercentage(
                                    task?.submitted_date,
                                    task?.due_date
                                  ) > 100
                                ? 100
                                : getHealthPercentage(
                                    task?.submitted_date,
                                    task?.due_date
                                  )
                            }
                            sx={{
                              backgroundColor: 'rgb(85 85 85)',
                              '.MuiLinearProgress-bar': {
                                backgroundColor:
                                  task?.tracker_status?.toLowerCase() ===
                                  'overdue'
                                    ? appColors.dashboard.health.overdue
                                    : task?.tracker_status?.toLowerCase() ===
                                      'critical'
                                    ? appColors.dashboard.health.critical
                                    : appColors.dashboard.health.onTrack,
                              },
                            }}
                          />
                        </Box>

                        {/* Priority */}
                        <Box width="15%">
                          <Typography
                            variant="body1"
                            fontWeight={800}
                            color="#fff"
                          >
                            {task?.priority}
                          </Typography>
                        </Box>

                        {/* Assignee */}
                        <Box width="20%" display="flex">
                          {_.isEmpty(task?.assignees) ? (
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                            >
                              <Typography
                                variant="body1"
                                fontWeight={800}
                                color="#fff"
                              >
                                --
                              </Typography>
                            </Stack>
                          ) : (
                            <AvatarGroup
                              sx={{
                                '& .MuiAvatar-root': {
                                  width: 30,
                                  height: 30,
                                  fontSize: 15,
                                  marginLeft: 0,
                                  marginRight: '0.5em',
                                },
                              }}
                              max={4}
                            >
                              {task?.assignees?.map((user, index) => (
                                <Tooltip
                                  key={index}
                                  title={user?.name ?? ''}
                                  arrow
                                >
                                  {!_.isEmpty(user?.avatar) &&
                                  user?.avatar?.split('/').pop() !==
                                    'thumb_' ? (
                                    <Avatar
                                      sx={{ width: 30, height: 30 }}
                                      alt={user?.name}
                                      src={user?.avatar}
                                    />
                                  ) : (
                                    <Avatar sx={{ width: 30, height: 30 }}>
                                      {`${user?.name.split(' ')[0][0]}${
                                        !_.isEmpty(user?.name.split(' ')[1][0])
                                          ? user?.name.split(' ')[1][0]
                                          : ''
                                      }`}
                                    </Avatar>
                                  )}
                                </Tooltip>
                              ))}
                            </AvatarGroup>
                          )}
                        </Box>
                      </Stack>
                    </Card>
                  ))}
                </InfiniteScroll>
              )}
            </Stack>
          </>
        )}
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
        PaperProps={{ sx: { backgroundColor: '#2f28488c', zIndex: 1 } }}
      >
        {dash_fetching ? (
          <DrawerContentSkeleton />
        ) : (
          <Stack py={6} px={4.5}>
            <Stack>
              <Typography variant="h6" color="#fff">
                Report for
              </Typography>
              <Typography variant="caption" color="#9d9898">
                https://ad-weave.io
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              justifyContent="center"
              mt={4}
            >
              <Box>
                <CircularProgress
                  variant="determinate"
                  value={100}
                  sx={{ color: 'rgb(85 85 85)', position: 'absolute' }}
                  size={120}
                  thickness={3}
                />
                <CircularProgress
                  variant="determinate"
                  value={tasksCompleted.data.percentage ?? 0}
                  color="secondary"
                  size={120}
                  thickness={3}
                />
              </Box>
              <Stack>
                <Typography variant="button" color="#9d9898">
                  Tasks Completed
                </Typography>
                <Typography variant="h3" fontWeight={700} color="#fff">
                  {tasksCompleted.data.completed ?? 0}
                </Typography>
              </Stack>
            </Stack>
            <Stack mt={2}>
              <Typography variant="button" color="#9d9898">
                Recently Approved
              </Typography>
              {!_.isEmpty(statistics?.recentlyApproved) && (
                <Divider
                  sx={{
                    borderBottomWidth: 'initial',
                    borderColor: 'rgb(158 158 158 / 12%)',
                    margin: '0.5em 0',
                  }}
                />
              )}
              {_.isEmpty(statistics?.recentlyApproved) ? (
                <Typography variant="span" sx={{ color: '#888888' }}>
                  No Results Found!
                </Typography>
              ) : (
                statistics?.recentlyApproved.map((r, index) => (
                  <Box key={index}>
                    <Tooltip title={r.name ?? ''} arrow>
                      <Typography
                        variant="caption"
                        color="#fff"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: '1',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {r.name ?? ''}
                      </Typography>
                    </Tooltip>
                    {/* {!_.isEmpty(statistics?.recentlyApproved) && ( */}
                    <Divider
                      sx={{
                        borderBottomWidth: 'initial',
                        borderColor: 'rgb(158 158 158 / 12%)',
                        margin: '0.5em 0',
                      }}
                    />
                    {/* )} */}
                  </Box>
                ))
              )}
            </Stack>
            <Stack mt={2}>
              <Typography variant="button" color="#9d9898">
                Resources
              </Typography>
              {!dash_fetching && _.isEmpty(dash_resources) ? (
                <Typography variant="span" sx={{ color: '#888888' }}>
                  No Results Found!
                </Typography>
              ) : (
                dash_resources?.map((resource, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    spacing={3}
                    mt={2}
                    alignItems="center"
                  >
                    {!_.isEmpty(resource?.avatar) &&
                    resource?.avatar?.split('/').pop() !== 'thumb_' ? (
                      <Avatar
                        alt={resource.name}
                        src={resource.avatar}
                        sizes={50}
                        sx={{
                          width: 50,
                          height: 50,
                        }}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          border: '2px solid #25165b',
                          width: 50,
                          height: 50,
                        }}
                      >
                        {`${resource?.name.split(' ')[0][0]}${
                          !_.isEmpty(resource?.name.split(' ')[1][0])
                            ? resource?.name.split(' ')[1][0]
                            : ''
                        }`}
                      </Avatar>
                    )}

                    <Stack>
                      <Typography variant="button" color="#9d9898">
                        {resource?.name}
                      </Typography>

                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h5" color="#fff" fontWeight={700}>
                          {resource?.user_total ?? '0.0'}
                        </Typography>
                        <Box display="flex">
                          <ArrowLeftOutlinedIcon
                            sx={{
                              transform: 'rotate(90deg)',
                              color: appColors.dashboard.health.onTrack,
                            }}
                          />
                        </Box>
                        <Typography color="#9d9898" variant="button">
                          {resource?.percentage ?? '0'}%
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                ))
              )}
            </Stack>
          </Stack>
        )}
      </Drawer>

      {/* Popover */}
      <Popover
        id={id}
        open={isPopperOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: popperHorizontal,
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: popperHorizontal,
        }}
        PaperProps={{
          sx: {
            marginTop: '0.15em',
            boxShadow: '3px 5px 11px 0px #25165b59',
            minWidth: 0,
          },
        }}
      >
        <OptionList
          options={
            selectedOption === 'task_health'
              ? getItemByKey('slug', 'task_health', filter_list).options
              : selectedOption === 'channel'
              ? getItemByKey('slug', 'channel', filter_list).options
              : selectedOption === 'priority'
              ? priorities
              : selectedOption === 'assignees'
              ? users
              : selectedOption === 'status'
              ? statuses
              : []
          }
          type={selectedOption}
          defaultValue={defaultValue}
          handleSelect={handleSelect}
          handleClose={handleClose}
        />
      </Popover>
    </Box>
  );
}
