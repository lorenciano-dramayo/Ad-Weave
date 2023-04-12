import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { useHistory, useLocation } from 'react-router-dom';
import * as queryString from 'query-string';
import { logout } from 'store/reducers/auth';

import InfiniteScroll from 'react-infinite-scroll-component';

// Redux
import { useSelector, useDispatch } from 'react-redux';

import {
  getQueueCount,
  getQueueFilters,
  getPaginatedDashboard,
  getOptions,
  getDashboardResources,
  updateTaskByKey,
  clearDashboard,
} from 'store/reducers/qadash';

// MUI
import {
  Stack,
  Typography,
  Box,
  Divider,
  IconButton,
  Button,
  Tooltip,
  CircularProgress,
  Chip,
  Alert,
  Avatar,
  Popover,
  Grid,
  Collapse,
} from '@mui/material';

// MUI Icons
import SortIcon from '@mui/icons-material/Sort';
import TuneIcon from '@mui/icons-material/Tune';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

// Components
import Cards from 'pages/Dashboard/views/DesignQADash/Components/Cards';
import Sidebar from 'pages/Dashboard/views/DesignQADash/Components/Sidebar';
import Header from 'pages/Dashboard/views/DesignQADash/Components/Header';
import NavList from 'pages/Dashboard/views/DesignQADash/Components/NavList';
import ContentSkeleton from 'pages/Dashboard/views/DesignQADash/Components/Skeleton/ContentSkeleton';
import Fade from 'components/Common/Fade';
import GlobalDrawer from 'components/Common/Drawer';
import OptionList from 'pages/Dashboard/Components/OptionList';
import Filters from 'pages/Dashboard/views/DesignQADash/Components/Filters';
import Settings from 'pages/Dashboard/views/DesignQADash/Components/Settings';

// helper
import {
  Default,
  StyledStack,
  StyledTextField,
} from 'pages/Dashboard/views/DesignQADash/helpers';

// constant
import {
  queues_options,
  sort_options as default_sort_options,
  more_options,
  profile,
  dashboard_statistics,
  dashboard_themes,
} from 'pages/Dashboard/constant';

// colors
import { appColors } from 'theme/variables';

const DesignQADash = ({ statusList, taskTypeList }) => {
  const mounted = useRef();
  // location
  const location = useLocation();
  const history = useHistory();
  // queryString
  const urlParams = queryString.parse(history.location.search);

  // React states
  const [dashTheme, setDashTheme] = useState('card_view');
  const [openSide, setOpenSide] = useState(true);
  const [openCounter, setOpenCounter] = useState(false);
  const [showResourcesBtn, setShowResourcesBtn] = useState(false);
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

  // redux
  const dispatch = useDispatch();

  const {
    data: all_tasks,
    count: queueCount,
    options: { priorities, teams, users, partner },
    fetching,
    resources: { data: dash_resources, fetching: dash_fetching },
  } = useSelector((state) => state.qadash);
  const { data: user } = useSelector((state) => state.user);

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
        dispatch(logout());
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
      pathname: `/${rel_type.toLowerCase().includes('task') ? rel_type : 'campaign'
        }/${id}`,
      search: history.location.search,
      state: {
        background: location,
        type: rel_type.toLowerCase().includes('task') ? rel_type : 'campaign',
        subtask: rel_type.toLowerCase() === 'subtask' ? true : false,
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

  const handleSettings = (type) => {
    switch (type) {
      case 'task_status':
        setOpenCounter(!openCounter);
        break;

      case 'resources':
        setShowResourcesBtn(!showResourcesBtn);
        break;

      case 'side_navigation':
        setOpenSide(!openSide);
        break;

      default:
        setDashTheme(type);
        break;
    }
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
    <Box overflow="hidden" height="100vh">
      <Header
        user={user}
        handleClick={handleClick}
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
        setDrawerType={setDrawerType}
      />
      <Box display="flex">
        <Sidebar
          isOpen={openSide}
          content={
            <Box mt={7}>
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
            </Box>
          }
        />
        <Default open={openSide} id="dashboard-main" className="scroll-shadows">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={4}
            mb={2}
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

          <Collapse in={openCounter}>
            <Grid container justifyContent="center">
              {_.filter(statusList, (stats) =>
                _.map(
                  stats?.related_to,
                  (types) => types.name === 'task'
                ).includes(true)
              )?.map((status, index) => (
                <Grid item key={index} pb={2} pr={2}>
                  <Stack
                    sx={{
                      border: '1px solid',
                      borderColor:
                        appColors.status[
                        _.camelCase(status?.name?.replace(/_/g, ' '))
                        ],
                      padding: '0.5em 2em',
                      borderRadius: '0.4em',
                      minWidth: '200px',
                      boxShadow: 'inset 0 0 4px 4px rgb(80 37 196 / 10%)',
                    }}
                  >
                    <Typography
                      variant="button"
                      pt={1}
                      sx={{
                        color:
                          appColors.status[
                          _.camelCase(status?.name?.replace(/_/g, ' '))
                          ],
                      }}
                    >
                      {status?.name}
                    </Typography>

                    <Typography
                      fontWeight={800}
                      variant="h3"
                      sx={{
                        color:
                          appColors.status[
                          _.camelCase(status?.name?.replace(/_/g, ' '))
                          ],
                      }}
                    >
                      0000
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Collapse>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
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
                  sx={{
                    padding: '0 8px',
                    color: isBackdrop && `${appColors.lightViolet}`,
                  }}
                >
                  <SearchIcon />
                </IconButton>
                <StyledTextField
                  disabled={fetching}
                  placeholder="Search"
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
                  padding: '4.446px 12px',
                  borderRadius: '3px',
                  backgroundColor: filter ? appColors.lightViolet : 'inherit',
                  borderColor: appColors.lightViolet,
                  color: filter ? '#fff' : appColors.lightViolet,
                  textTransform: 'capitalize',
                  fontWeight: 800,
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
                size="small"
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
                  fontWeight: 800,
                  border: '1px solid',
                  padding: '4.446px 12px',
                  borderRadius: '3px',
                }}
                variant="contained"
                color="secondary"
                disableElevation
                onClick={(e) => {
                  handleClick(e, 'sort');
                  setPopperHorizontal('right');
                }}
                disabled={fetching}
                size="small"
              >
                Sort by
              </Button>
              {showResourcesBtn && (
                <Box>
                  <Tooltip title="Resources" arrow>
                    <span>
                      <IconButton
                        color="primary"
                        disabled={fetching}
                        onClick={(e) => {
                          handleSelect(e, 'resources');
                          setDrawerType('resources');
                        }}
                        size="small"
                        sx={{
                          fontSize: '1.46rem',
                          border: '1px solid',
                          backgroundColor: '#5025c4',
                          color: '#fff',
                          padding: '4px 7px',
                          borderRadius: '3px',
                          '&:hover': {
                            border: '1px solid #5025c4',
                            color: '#5025c4',
                          },
                        }}
                      >
                        <SupervisorAccountOutlinedIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Box>
              )}
            </Stack>
          </Stack>

          <Stack direction="row">
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
            <Stack>
              <ContentSkeleton />
            </Stack>
          ) : (
            <Stack>
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
        </Default>
      </Box>
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
            marginTop: selectedOption === 'profile' ? '0.28em' : '0.15em',
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
                paddingRight: '350px',
                paddingTop: '57px',
              }}
            >
              <Settings
                statistics={dashboard_statistics}
                themes={dashboard_themes}
                handleSettings={handleSettings}
                openCounter={openCounter}
                openSide={openSide}
                showResourcesBtn={showResourcesBtn}
                dashTheme={dashTheme}
              />
            </Box>
          ) : (
            <Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                py={1.5}
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
                            {resource?.user_totaltime_decimal ?? 0}
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
    </Box>
  );
};

export default DesignQADash;

DesignQADash.propTypes = {
  statusList: PropTypes.any,
  taskTypeList: PropTypes.any,
};
