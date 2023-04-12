import React, { useEffect, useState, useRef } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import Fade from 'components/Common/Fade';

import PropTypes from 'prop-types';

import _ from 'lodash';

import { useDispatch, useSelector } from 'react-redux';

import * as queryString from 'query-string';

import {
  getQueueCount,
  getQueueFilters,
  getPaginatedDashboard,
  getOptions,
  getDashboardResources,
  updateTaskByKey,
  clearDashboard,
} from 'store/reducers/qadash';

import {
  Stack,
  Box,
  Typography,
  Button,
  Card,
  Divider,
  IconButton,
  CircularProgress,
  Popover,
  Chip,
  Alert,
  Tooltip,
  Avatar,
  styled,
  TextField,
  Backdrop,
} from '@mui/material';

//constant options
import {
  queues_options,
  sort_options as default_sort_options,
  more_options,
  profile,
  dashboard_statistics,
  dashboard_themes,
} from 'pages/Dashboard/constant';

// MUI Icons
import SortIcon from '@mui/icons-material/Sort';
import TuneIcon from '@mui/icons-material/Tune';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import CloseIcon from '@mui/icons-material/Close';

// local components
import GlobalDrawer from 'components/Common/Drawer';
import Header from 'pages/Dashboard/views/DesignQADash/Components/Header';
import OptionList from 'pages/Dashboard/Components/OptionList';
import Cards from 'pages/Dashboard/views/DesignQADash/Components/Cards';
import ContentSkeleton from 'pages/Dashboard/views/DesignQADash/Skeleton/ContentSkeleton';
import SidebarSkeleton from 'pages/Dashboard/views/DesignQADash/Skeleton/SidebarSkeleton';
import NavList from 'pages/Dashboard/views/DesignQADash/NavList';
import Filters from 'pages/Dashboard/views/DesignQADash/Filters';
import Settings from 'pages/Dashboard/views/DesignQADash/Settings';

import { appColors } from 'theme/variables';
import { useHistory, useLocation } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';

const StyledTextField = styled(TextField)({
  backgroundColor: 'transparent',
  borderRadius: 0,
  border: 0,
  width: 200,
  '.MuiOutlinedInput-root': {
    height: 'auto',
    backgroundColor: '#fff',
  },
  '.MuiOutlinedInput-input': {
    padding: '8.5px 14px 8.5px 0px',
  },
  '& fieldset': {
    border: '0px solid transparent !important',
    backgroundColor: 'transparent',
  },
  '&.Mui-focused fieldset': {
    border: '0px solid transparent !important',
  },
});

const StyledStack = styled(Stack)({
  border: '1px solid #c7c7c7',
  borderRadius: '5px',
  backgroundColor: '#fff',
});

export default function DesignQADash({ statusList, taskTypeList }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  // React states
  const urlParams = queryString.parse(history.location.search);
  const [selectedOption, setSelectedOption] = useState('');
  const [defaultValue, setDefaultValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [popperHorizontal, setPopperHorizontal] = useState('left');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [resourcesDrawerOpen, setResourcesDrawerOpen] = useState(false);
  const [channel, setChannel] = useState([]);
  const [others, setOthers] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [selectedFilterOptions, setSelectedFilterOptions] = useState({});
  const [filter, setFilter] = useState(false);
  const [sortOptions, setSortOptions] = useState(default_sort_options);
  const [isBackdrop, setBackdrop] = useState(false);
  const [drawerType, setDrawerType] = useState(null);

  const {
    data: all_tasks,
    count: queueCount,
    options: { priorities, teams, users, partner },
    fetching,
    resources: { data: dash_resources, fetching: dash_fetching },
  } = useSelector((state) => state.qadash);
  const { data: user } = useSelector((state) => state.user);

  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      dispatch(clearDashboard());
      dispatch(getOptions('users'));
      dispatch(getOptions('teams'));
      dispatch(getOptions('partners'));
      dispatch(getOptions('priorities'));
      dispatch(getDashboardResources());
      dispatch(getQueueCount({ queues: true }));
      if (
        _.isEmpty(urlParams?.statuses) &&
        _.isEmpty(urlParams?.taskTypes) &&
        _.isEmpty(urlParams?.search)
      ) {
        history.push({
          pathname: location.pathname,
          search: `?queue=${_.isEmpty(urlParams?.queue) ? 'all_task' : urlParams?.queue
            }`,
        });
      } else {
        dispatch(
          getQueueFilters(
            {
              queues:
                urlParams?.queue === 'all_task' ? false : urlParams?.queue,
              status: _.map(
                _.filter(statusList, (stats) =>
                  urlParams?.statuses?.includes(stats?.name?.toLowerCase())
                ),
                (data) => data?.id
              ),
              name: _.isEmpty(urlParams?.search) ? '' : urlParams?.search,
              task_type: _.map(
                _.filter(taskTypeList, (stats) =>
                  urlParams?.taskTypes?.includes(stats?.name?.toLowerCase())
                ),
                (data) => data?.id
              ),
            },
            sortOptions.map((s) => s.sortType).filter((s) => !_.isEmpty(s))
          )
        );
      }

      mounted.current = true;
    } else {
      // do componentDidUpdate logic
    }
  });

  const handleOnTaskUpdate = (data) => {
    dispatch(updateTaskByKey(data));
  };

  const filterQueues = (_queue, _status, _taskTypes) => {
    dispatch(
      getQueueFilters({
        queues: _queue === 'all_task' ? false : _queue,
        status: _.map(
          _.filter(statusList, (stats) =>
            _status?.includes(stats?.name?.toLowerCase())
          ),
          (data) => data?.id
        ),
        name: _.isEmpty(urlParams?.search) ? '' : urlParams?.search,
        task_type: _.map(
          _.filter(taskTypeList, (stats) =>
            _taskTypes?.includes(stats?.name?.toLowerCase())
          ),
          (data) => data?.id
        ),
        channel_id: channel,
      })
    );
  };

  const handleHeaderSearch = (e, search) => {
    e.preventDefault();

    const searchParams = new URLSearchParams(history.location.search);

    _.isEmpty(search)
      ? searchParams.delete('search')
      : searchParams.set('search', search);

    history.push({
      pathname: '/dashboard',
      search: searchParams.toString(),
    });

    dispatch(
      getQueueFilters(
        {
          queues: urlParams?.queue === 'all_task' ? false : urlParams?.queue,
          status: _.map(
            _.filter(statusList, (stats) =>
              urlParams?.statuses?.includes(stats?.name?.toLowerCase())
            ),
            (data) => data?.id
          ),
          name: search,
          task_type: _.map(
            _.filter(taskTypeList, (stats) =>
              urlParams?.taskTypes?.includes(stats?.name?.toLowerCase())
            ),
            (data) => data?.id
          ),
        },
        sortOptions.map((s) => s.sortType).filter((s) => !_.isEmpty(s))
      )
    );
  };

  const handleScrollPaginate = (_task) => {
    if (
      _.isEmpty(urlParams?.statuses) &&
      _.isEmpty(urlParams?.taskTypes) &&
      _.isEmpty(urlParams.queue)
    ) {
      history.push({
        pathname: '/dashboard',
        search: `?queue=all_task`,
      });

      dispatch(
        getPaginatedDashboard(
          'dashboard',
          _task?.current_page + 1,
          {
            is_dashboard: true,
          },
          sortOptions.map((s) => s.sortType).filter((s) => !_.isEmpty(s))
        )
      );
    } else {
      dispatch(
        getPaginatedDashboard(
          'filter',
          _task?.current_page + 1,
          {
            queues: urlParams?.queue === 'all_task' ? false : urlParams?.queue,
            status: _.map(
              _.filter(statusList, (stats) =>
                urlParams?.statuses?.includes(stats?.name?.toLowerCase())
              ),
              (data) => data?.id
            ),
            name: urlParams?.search,
            task_type: _.map(
              _.filter(taskTypeList, (stats) =>
                urlParams?.taskTypes?.includes(stats?.name?.toLowerCase())
              ),
              (data) => data?.id
            ),
          },
          sortOptions.map((s) => s.sortType).filter((s) => !_.isEmpty(s))
        )
      );
    }
  };

  const handleClick = (event, type, defaults) => {
    setSelectedOption(type);
    setDefaultValue(defaults);
    setAnchorEl(event.currentTarget);
    setPopperHorizontal('left');
  };

  const handleSelect = async (data, type) => {
    switch (type) {
      case 'sort':
        await setSortOptions((prev) =>
          prev.map((p) => {
            if (p.sortKey === data.sortKey) {
              if (p.sortType === '') {
                return {
                  ...p,
                  sortType: p.sortKey,
                };
              } else if (p.sortType?.charAt(0) === '-') {
                return {
                  ...p,
                  sortType: '',
                };
              } else {
                return {
                  ...p,
                  sortType: `-${p.sortKey}`,
                };
              }
            } else {
              return p;
            }
          })
        );
        break;

      case 'priority':
        dispatch(
          updateTaskByKey(
            data.relType === 'campaign'
              ? {
                id: data.taskId,
                type: data.relType,
                status: data.priorityId,
              }
              : {
                is_parent: data.isParent,
                id: data.taskId,
                key: type,
                value: data.priorityId,
              }
          )
        );
        break;

      case 'assignees':
        // Update assignees default value (selected assignees)
        setDefaultValue((prev) => {
          if (!_.isEmpty(data?.selectedArr)) {
            !_.find(prev.selectedAssignees, { id: data?.selectedArr?.id })
              ? setDefaultValue({
                ...prev,
                selectedAssignees: [
                  ...prev.selectedAssignees,
                  data?.selectedArr,
                ],
              })
              : setDefaultValue({
                ...prev,
                selectedAssignees: _.filter(
                  prev.selectedAssignees,
                  (filterSelect) => filterSelect.id !== data?.selectedArr?.id
                ),
              });
          } else {
            setDefaultValue(prev);
          }
        });
        dispatch(updateTaskByKey(data));
        break;

      case 'dev_dash':
        break;

      case 'resources':
        setResourcesDrawerOpen(true);
        setPopperHorizontal('right');
        setAnchorEl(null);
        setSelectedOption('');
        setDrawerType('resources');
        break;

      case 'profile':
        history.push({
          pathname: '/profile',
        });
        break;

      case 'signout':
        history.push({
          pathname: '/logout',
        });
        break;

      case 'help':
        history.push({
          pathname: '/support',
        });
        break;

      default:
        dispatch(updateTaskByKey(data));
        break;
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOption('');
  };

  const handleTaskOpen = (e, id, rel_type) => {
    e.preventDefault();
    history.push({
      pathname: `${history.location.pathname}/m/${rel_type.toLowerCase().includes('task') ? rel_type : 'campaign'
        }/${id}`,
      search: history.location.search,
      state: {
        background: location,
        type: rel_type.toLowerCase().includes('task') ? rel_type : 'campaign',
        subtask: rel_type.toLowerCase().includes('subtask') ? true : false,
      },
    });
  };

  const extraFilters = (channel, options, sortOptions, others) => {
    dispatch(
      getQueueFilters(
        {
          queues:
            urlParams?.queue === 'all_task'
              ? false
              : _.isEmpty(urlParams)
                ? false
                : urlParams?.queue,
          status: _.map(
            _.filter(statusList, (stats) =>
              urlParams?.statuses?.includes(stats?.name?.toLowerCase())
            ),
            (data) => data?.id
          ),
          name: _.isEmpty(urlParams?.search) ? '' : urlParams?.search,
          task_type: _.map(
            _.filter(taskTypeList, (stats) =>
              urlParams?.taskTypes?.includes(stats?.name?.toLowerCase())
            ),
            (data) => data?.id
          ),
          due_date: filterOptions.due_date ?? [],
          created_at: filterOptions.date_created ?? [],
          date_submitted: filterOptions.date_submitted ?? [],
          delivery_date: filterOptions.delivery_date ?? [],
          channel_id: channel,
          team_id: filterOptions.team ?? [],
          priority: filterOptions.priority ?? [],
          partner_group_id: filterOptions.partner_group ?? [],
          watchers: filterOptions.watchers ?? [],
          assignees: filterOptions.assignees ?? [],
          subtask: others?.subtask ? `${others?.subtask ?? ''}` : '',
          favorites: others?.favorites ?? null,
          refresh: others?.refresh ?? null,
          reopen: others?.reopen ?? null,
        },
        sortOptions.map((s) => s.sortType).filter((s) => !_.isEmpty(s))
      )
    );
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setResourcesDrawerOpen(false);
    setFilter(false);
    setSettingsOpen(false);
  };

  const handleReset = () => {
    history.push({
      pathname: '/dashboard',
      search: `?queue=${urlParams?.queue}`,
    });

    dispatch(
      getQueueFilters({
        queues: _.isEmpty(urlParams?.queue) ? false : urlParams?.queue,
      })
    );
  };

  const handleFilterDelete = (key, data) => {
    const searchParams = new URLSearchParams(history.location.search);

    switch (key) {
      case 'search':
        searchParams.delete(key);
        break;
      default:
        _.isEmpty(_.filter(urlParams[key].split(','), (str) => str !== data))
          ? searchParams.delete(key)
          : searchParams.set(
            key,
            _.filter(urlParams[key].split(','), (str) => str !== data)
          );
        break;
    }

    history.push({
      pathname: '/dashboard',
      search: searchParams.toString(),
    });

    dispatch(
      getQueueFilters({
        queues: urlParams?.queue === 'all_task' ? false : urlParams?.queue,
        status: _.map(
          _.filter(statusList, (stats) =>
            key === 'statuses'
              ? _.filter(
                urlParams[key].split(','),
                (str) => str !== data
              )?.includes(stats?.name?.toLowerCase())
              : urlParams?.statuses?.includes(stats?.name?.toLowerCase())
          ),
          (data) => data?.id
        ),
        name:
          key === 'search'
            ? ''
            : _.isEmpty(urlParams?.search)
              ? ''
              : urlParams?.search,
        task_type: _.map(
          _.filter(taskTypeList, (stats) =>
            key === 'taskTypes'
              ? _.filter(
                urlParams[key].split(','),
                (str) => str !== data
              )?.includes(stats?.name?.toLowerCase())
              : urlParams?.taskTypes?.includes(stats?.name?.toLowerCase())
          ),
          (data) => data?.id
        ),
      })
    );
  };

  useEffect(() => {
    filter && extraFilters(channel, filterOptions, sortOptions, others);
  }, [channel, filterOptions, others]);

  useEffect(() => {
    extraFilters(channel, filterOptions, sortOptions);
  }, [sortOptions]);

  const open = Boolean(anchorEl);
  const id = open ? 'dashboard-popover' : undefined;

  return (
    <Stack sx={{ backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      {/* Header */}
      <Header
        user={user}
        handleClick={handleClick}
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
        setDrawerType={setDrawerType}
      />
      <Backdrop
        open={isBackdrop}
        sx={{ zIndex: 3, backgroundColor: 'rgb(37 22 90 / 57%)' }}
      />
      <Stack
        direction="row"
        justifyContent="flex-start"
        sx={{ minHeight: 'calc(100vh - 58px)' }}
      >
        {/* Side Nav */}
        <Stack
          sx={{
            width: 300,
            borderRight: '1px solid #ececec',
            backgroundColor: '#fff',
            zIndex: 2,
          }}
        >
          <Card
            variant="outlined"
            sx={{
              border: 0,
              borderRadius: 0,
              position: 'fixed',
              width: 'inherit',
              background: 'transparent',
              overflow: 'auto',
              height: 'calc(100vh - 4em)',
            }}
          >
            {fetching ? (
              <SidebarSkeleton />
            ) : (
              <>
                <NavList
                  title="Queues"
                  options={queues_options}
                  queueCount={queueCount}
                  filterQueues={filterQueues}
                />
                <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.05)' }} />
                <NavList
                  title="statuses"
                  options={statusList}
                  filterQueues={filterQueues}
                />

                <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.05)' }} />
                <NavList
                  title="task types"
                  options={taskTypeList}
                  user={user}
                  filterQueues={filterQueues}
                />
                {/* <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.05)' }} />
            <NavList
              title="teams"
              options={[]}
              user={user}
              filterQueues={() => { }}
            /> */}
              </>
            )}
          </Card>
        </Stack>
        {/* parent  */}

        <Stack
          sx={{
            width: 'calc(100vw - 350px)',
            height: 'calc(100vh - 4em)',
            overflow: 'auto',
          }}
          pb={3}
          px={4}
          id="dashboard-main"
          className="scroll-shadows"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            pt={4}
          >
            <Box>
              <Typography variant="h4" fontWeight={800} color="primary">
                {
                  _.filter(
                    queues_options,
                    (options) => options?.slug === urlParams?.queue
                  )[0]?.name
                }
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            pt={3}
            pb={1}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <StyledStack
                direction="row"
                sx={
                  isBackdrop && {
                    boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
                    border: `1px solid ${appColors.lightViolet}`,
                    zIndex: 4,
                  }
                }
              >
                <IconButton
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  sx={{ color: isBackdrop && `${appColors.lightViolet}` }}
                >
                  <SearchIcon />
                </IconButton>
                <StyledTextField
                  disabled={fetching}
                  placeholder="Search Task..."
                  defaultValue={
                    _.isEmpty(urlParams?.search) ? '' : urlParams?.search
                  }
                  size="small"
                  onFocus={() => setBackdrop(true)}
                  onBlur={() => setBackdrop(false)}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      setBackdrop(false);
                      handleHeaderSearch(e, e.target.value);
                    }
                  }}
                />
              </StyledStack>

              <Button
                startIcon={<TuneIcon />}
                sx={{
                  height: '-webkit-fill-available',
                  paddingRight: '1.5em',
                  backgroundColor: filter ? appColors.lightViolet : 'inherit',
                  borderColor: appColors.lightViolet,
                  color: filter ? '#fff' : appColors.lightViolet,
                  textTransform: 'capitalize',
                  fontWeight: 700,
                  '&:hover': {
                    backgroundColor: appColors.lightViolet,
                    color: '#fff',
                  },
                }}
                variant="outlined"
                onClick={() => {
                  setDrawerOpen(true);
                  setFilter(true);
                  setDrawerType('filter');
                }}
                disabled={fetching}
              >
                Filters
              </Button>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                startIcon={<SortIcon />}
                endIcon={
                  selectedOption !== 'sort' ? (
                    <ExpandMoreOutlinedIcon />
                  ) : (
                    <ExpandLessOutlinedIcon />
                  )
                }
                sx={{
                  height: '-webkit-fill-available',
                  textTransform: 'capitalize',
                  fontWeight: 700,
                  border: '1px solid #a90d4d',
                }}
                variant="contained"
                color="secondary"
                disableElevation
                onClick={(e) => {
                  handleClick(e, 'sort');
                  setPopperHorizontal('right');
                }}
                disabled={fetching}
              >
                Sort by
              </Button>
              <Box>
                {user?.admin_role?.toLowerCase().includes('admin') ||
                  [2, 1].includes(user?.team_id) ? (
                  <IconButton
                    onClick={(e) => {
                      handleClick(e, 'more');
                      setPopperHorizontal('right');
                    }}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                ) : (
                  <Tooltip title="Resources" arrow>
                    <IconButton
                      color="primary"
                      disabled={fetching}
                      onClick={(e) => {
                        handleSelect(e, 'resources');
                        setDrawerType('resources');
                      }}
                    >
                      <SupervisorAccountOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Stack>
          </Stack>

          <Stack direction="row" display="inline-block" mt={1}>
            {!_.isEmpty(urlParams) &&
              Object.keys(urlParams).map(
                (keys) =>
                  keys !== 'queue' &&
                  urlParams[keys].split(',').map((data, index) => (
                    <Chip
                      key={index}
                      label={keys === 'search' ? `'${data}'` : data}
                      size="small"
                      onDelete={() => handleFilterDelete(keys, data)}
                      color="primary"
                      sx={{
                        borderRadius: '0.3em',
                        textTransform:
                          keys !== 'search' ? 'capitalize' : 'normal',
                        marginRight: '0.5em',
                      }}
                    />
                  ))
              )}

            {Object.keys(urlParams).length > 1 && (
              <Button
                variant="text"
                startIcon={<HighlightOffIcon />}
                size="small"
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: 700,
                  color: appColors.lightViolet,
                  '.MuiButton-startIcon': {
                    marginRight: '4px',
                    '.MuiSvgIcon-root': { fontSize: '12px' },
                  },
                  '&:hover': { background: 'transparent' },
                }}
                disableRipple
                disableElevation
                disableFocusRipple
                disableTouchRipple
                onClick={handleReset}
              >
                Reset
              </Button>
            )}
          </Stack>

          {fetching ? (
            <Stack mt={2}>
              <ContentSkeleton />
            </Stack>
          ) : (
            <Stack mt={2}>
              {all_tasks?.data && (
                <InfiniteScroll
                  dataLength={all_tasks?.data?.length}
                  style={{ overflow: 'unset !important' }}
                  hasMore={!_.isEmpty(all_tasks?.next_page_url)}
                  loader={
                    <Stack direction="row" justifyContent="center">
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
                  {_.isEmpty(all_tasks?.data) ? (
                    <Alert
                      variant="filled"
                      severity="warning"
                      sx={{
                        backgroundColor: '#ed6c0229',
                        border: '2px solid #ed6c0273',
                        '.MuiAlert-icon': {
                          paddingTop: '13px',
                          color: '#25165a',
                          fontWeight: 700,
                        },
                      }}
                    >
                      <Typography sx={{ color: '#25165a', fontWeight: 700 }}>
                        There are no tasks found for your search &amp; filters.
                      </Typography>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: '#ed6c02',
                          color: '#ed6c02',
                          '&:hover': { borderColor: '#ed6c02' },
                        }}
                        onClick={handleReset}
                      >
                        Reset
                      </Button>
                    </Alert>
                  ) : (
                    all_tasks?.data?.map((task, index) => (
                      <Fade in={!fetching} key={index}>
                        <Cards
                          task={task}
                          onTaskUpdate={handleOnTaskUpdate}
                          handleClick={handleClick}
                          handleTaskOpen={handleTaskOpen}
                          ended={all_tasks?.total === index + 1}
                        />
                      </Fade>
                    ))
                  )}
                </InfiniteScroll>
              )}
            </Stack>
          )}
        </Stack>
      </Stack>

      <Popover
        id={id}
        open={open}
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
            marginTop: selectedOption === 'profile' ? '0.57em' : '0.15em',
            boxShadow: '3px 5px 11px 0px #25165b59',
            minWidth: 0,
          },
        }}
      >
        <OptionList
          options={
            selectedOption === 'sort'
              ? sortOptions
              : selectedOption === 'more'
                ? more_options
                : selectedOption === 'status'
                  ? statusList
                  : selectedOption === 'bulk_save'
                    ? null
                    : selectedOption === 'priority'
                      ? priorities
                      : selectedOption === 'assignees'
                        ? users
                        : selectedOption === 'profile'
                          ? profile
                          : []
          }
          type={selectedOption}
          defaultValue={defaultValue}
          handleSelect={handleSelect}
          handleClose={handleClose}
          user={user}
        />
      </Popover>

      <GlobalDrawer
        content={
          drawerType === 'filter' ? (
            <Filters
              handleClose={() => {
                setDrawerOpen(false);
                setFilter(false);
              }}
              channel={channel}
              others={others}
              options={{
                priorities: priorities?.data.map((d) => ({
                  id: d.id,
                  title: d.name,
                })),
                teams: teams?.data.map((d) => ({
                  id: d.id,
                  title: d.name,
                })),
                users: users?.data.map((d) => ({
                  id: d.id,
                  title: d.fullname,
                })),
                partners: partner?.data.map((d) => ({
                  id: d.id,
                  title: d.name,
                })),
              }}
              selectedFilterOptions={selectedFilterOptions}
              setSelectedFilterOptions={setSelectedFilterOptions}
              setFilterOptions={setFilterOptions}
              setChannel={setChannel}
              setOthers={setOthers}
            />
          ) : drawerType === 'settings' ? (
            <Box
              sx={{
                paddingLeft: '350px',
                paddingTop: '57px',
              }}
            >
              <Settings
                statistics={dashboard_statistics}
                themes={dashboard_themes}
              />
            </Box>
          ) : (
            <Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                py={1}
                pr={1}
                pl={2}
              >
                <Box>
                  <Typography
                    fontWeight={800}
                    variant="body2"
                    color={appColors.gray}
                    sx={{ textTransform: 'uppercase' }}
                  >
                    Resources
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
                    onClick={handleDrawerClose}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Stack>
              <Divider />
              <Box px={3} pb={5}>
                {!dash_fetching &&
                  !_.isEmpty(dash_resources) &&
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
                          alt={resource.fullname}
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
                          {`${resource?.name.split(' ')[0][0]}${!_.isEmpty(resource?.name.split(' ')[1][0])
                            ? resource?.name.split(' ')[1][0]
                            : ''
                            }`}
                        </Avatar>
                      )}

                      <Stack>
                        <Stack spacing={-0.6}>
                          <Typography
                            variant="button"
                            color="#9d9898"
                            sx={{
                              textTransform: 'capitalize',
                              fontSize: '0.75em',
                            }}
                          >
                            {resource?.team ?? ''}
                          </Typography>
                          <Typography variant="button" color="#737272">
                            {resource?.name ?? ''}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography
                            variant="h5"
                            color="#25165b"
                            fontWeight={700}
                          >
                            {resource?.user_total ?? 0}
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
                            {resource?.percentage ?? 0}%
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  ))}
              </Box>
            </Stack>
          )
        }
        transitionDuration={{ enter: 350, exit: 300 }}
        name={
          drawerType === 'filter'
            ? 'search'
            : drawerType === 'settings'
              ? 'settings'
              : 'resources'
        }
        width={
          drawerType === 'filter'
            ? 400
            : drawerType === 'settings'
              ? 'inherit'
              : 350
        }
        height={drawerType === 'settings' ? 300 : 'inherit'}
        isOpen={
          drawerType === 'filter'
            ? drawerOpen
            : drawerType === 'settings'
              ? settingsOpen
              : resourcesDrawerOpen
        }
        sx={{ zIndex: drawerType === 'settings' && 1 }}
        anchor={drawerType === 'settings' ? 'top' : 'right'}
        BackdropProps={{
          invisible: true,
        }}
        onClose={handleDrawerClose}
      />
    </Stack>
  );
}

DesignQADash.propTypes = {
  statusList: PropTypes.any,
  taskTypeList: PropTypes.any,
};
