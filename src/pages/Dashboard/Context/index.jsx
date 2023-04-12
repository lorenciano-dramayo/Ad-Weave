import React, { createContext, useState, useEffect } from 'react';

import _ from 'lodash';

import { useHistory, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';

import { formatDate } from 'utils/date';

import { useDispatch, useSelector } from 'react-redux';

// constant
import {
  sort_options as default_sort_options,
  filter_list,
} from 'pages/Dashboard/constant';

// Global Component
import GlobalDrawer from 'components/Common/Drawer';
import GlobalPopover from 'components/Common/Popover';

// Local Component
import OptionList from 'pages/Dashboard/Components/OptionList';

// local components
import Filters from 'pages/Dashboard/Components/Filters';

// hooks
import { useOnMount } from 'pages/Dashboard/hooks';

// reducers
import {
  getStatuses,
  getTaskType,
  getOptions,
  getQueueFilters,
  getPaginatedDashboard,
  initDashboard,
  updateTaskByKey,
} from 'store/reducers/dashboard';

const DashboardContext = createContext();

const selectedDatesInitial = [
  {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  },
];

const defaultFilter = {
  queues: 'all_task',
  status: [1, 19],
  subtask: true,
  favorites: false,
  channel_id: ['1', '2', '3', '4', '5'],
  tracker_status: ['on_track', 'critical', 'overdue'],
};

let timer = null;

export function DashboardProvider({ children }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // react state
  const [openSide, setOpenSide] = useState(true);
  const [sortOptions, setSortOptions] = useState(default_sort_options);
  const [defaultValue, setDefaultValue] = useState({});
  const [data, setData] = useState({});

  // popper
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popperType, setPopperType] = useState(null);

  // drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState(null);

  // date range
  const [selectedDates, setSelectedDates] = useState(selectedDatesInitial);

  // reducers values
  const { data: user } = useSelector((state) => state.user);
  const {
    data: dash,
    count: { data: queueCount, fetching: queueCountFetching },
    options: {
      statuses: { data: statusList, fetching: statusFetching },
      taskTypes: { data: taskTypeList, fetching: taskTypeListFetching },
      teams: { data: teamsList, fetching: teamsListFetching },
      priorities: { data: prioritiesList, fetching: prioritiesFetching },
      partner: { data: partnerList, fetching: partnerFetching },
      users: { data: userList },
    },
    fetching: dashboardFetching,
  } = useSelector((state) => state.dashboard);

  useOnMount(() => {
    document.title = 'Dashboard | Ad-Weave';

    // save default settings for dashboard
    _.isEmpty(localStorage.getItem('dashboard'))
      ? localStorage.setItem(
          'dashboard',
          JSON.stringify({
            ...defaultFilter,
            partner_group_id: [4, 5, 6, 3, 8, 14, 12].includes(user?.team_id)
              ? []
              : _.map(user?.partners, (partnerGroup) => partnerGroup.id),
          })
        )
      : setData(JSON.parse(localStorage.getItem('dashboard')));

    // Local storage
    if (!_.isEmpty(localStorage.getItem('redirect'))) {
      history.push({
        pathname: localStorage.getItem('redirect'),
        state: {
          background: location,
          type: localStorage.getItem('redirect').includes('task')
            ? localStorage.getItem('redirect').includes('subtask')
              ? 'subtask'
              : 'task'
            : 'campaign',
          subtask: localStorage.getItem('redirect').includes('subtask')
            ? true
            : false,
        },
      });
    }

    dispatch(initDashboard());
    dispatch(getStatuses());
    dispatch(getTaskType());
    dispatch(getOptions('users'));
    dispatch(getOptions('teams'));
    dispatch(getOptions('partners'));
    dispatch(getOptions('priorities'));
  });

  const getDashData = (dataType = data) => {
    dispatch(
      getQueueFilters(
        dataType,
        sortOptions.map((s) => s.sortType).filter((s) => !_.isEmpty(s))
      )
    );

    setData(dataType);
    localStorage.setItem('dashboard', JSON.stringify(dataType));
  };

  useEffect(() => {
    clearTimeout(timer);
    if (popperType !== null) {
      timer = setTimeout(() => {
        getDashData(JSON.parse(localStorage.getItem('dashboard')));
      }, 1000);
    }
  }, [sortOptions]);

  const handleScrollPaginate = (_task) => {
    dispatch(
      getPaginatedDashboard(
        'filter',
        _task?.current_page + 1,
        data,
        sortOptions.map((s) => s.sortType).filter((s) => !_.isEmpty(s))
      )
    );
  };

  const handleDrawer = (_type) => {
    typeof _type !== 'object' && setDrawerType(_type);
    setDrawerOpen((prev) => !prev);
  };

  const handlePopper = (event, _type, _defaults) => {
    _type.includes('date') &&
      setSelectedDates(
        _.isEmpty(data[_type])
          ? selectedDatesInitial
          : [
              {
                startDate: new Date(data[_type][0]?.split(',')[0]),
                endDate: new Date(data[_type][0]?.split(',')[1]),
                key: 'selection',
              },
            ]
      );

    setAnchorEl(event.currentTarget);
    setDefaultValue(_defaults);
    typeof _type !== 'object' && setPopperType(_type);
  };

  const handleDateRangeChange = async (ranges, optionType) => {
    setSelectedDates([ranges.selection]);

    getDashData({
      ...data,
      [optionType]: [
        `${formatDate(ranges.selection.startDate, 'YYYY-MM-DD')},${formatDate(
          ranges.selection.endDate,
          'YYYY-MM-DD'
        )}`,
      ],
    });
  };

  const handleReset = () => {
    return {
      ...defaultFilter,
      partner_group_id: [4, 5, 6, 3, 8, 14, 12].includes(user?.team_id)
        ? []
        : _.map(user?.partners, (partnerGroup) => partnerGroup.id),
    };
  };

  const handleTaskUpdate = (type, obj) => {
    switch (type) {
      case 'favorite':
        dispatch(updateTaskByKey(obj));
        break;
      case 'assignees':
        setDefaultValue((prev) => {
          if (!_.isEmpty(obj?.selectedArr)) {
            !_.find(prev.selectedAssignees, { id: obj?.selectedArr?.id })
              ? setDefaultValue({
                  ...prev,
                  selectedAssignees: [
                    ...prev.selectedAssignees,
                    obj?.selectedArr,
                  ],
                })
              : setDefaultValue({
                  ...prev,
                  selectedAssignees: _.filter(
                    prev.selectedAssignees,
                    (filterSelect) => filterSelect.id !== obj?.selectedArr?.id
                  ),
                });
          } else {
            setDefaultValue(prev);
          }
        });
        dispatch(updateTaskByKey(obj));
        break;

      default:
        dispatch(updateTaskByKey(obj));
        break;
    }
  };

  const handleSort = async (data, type) => {
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
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        dash,
        data,
        queueCount,
        queueCountFetching,
        statusList,
        statusFetching,
        taskTypeList,
        taskTypeListFetching,
        prioritiesList,
        prioritiesFetching,
        partnerList,
        partnerFetching,
        teamsList,
        teamsListFetching,
        drawerOpen,
        dashboardFetching,
        openSide,
        sortOptions,
        getDashData,
        setOpenSide,
        setSortOptions,
        setData,
        handleScrollPaginate,
        handleDrawer,
        handlePopper,
        handleReset,
        handleTaskUpdate,
      }}
    >
      <GlobalDrawer
        isOpen={drawerOpen}
        transitionDuration={{ enter: 200, exit: 300 }}
        name={
          drawerType === 'filter'
            ? 'search'
            : drawerType === 'settings'
            ? 'settings'
            : 'resources'
        }
        sx={{ zIndex: drawerType === 'settings' && 1 }}
        anchor={drawerType === 'settings' ? 'top' : 'right'}
        BackdropProps={{
          invisible: true,
        }}
        onClose={handleDrawer}
        content={
          drawerType === 'filter' ? (
            <Filters
              onClose={handleDrawer}
              filterOptions={filter_list}
              handlePopper={handlePopper}
              dashData={data}
              getDashData={getDashData}
              users={userList}
              partners={partnerList}
              teamId={user?.team_id}
            />
          ) : (
            <></>
          )
        }
      />
      <GlobalPopover
        id={`${popperType}-popover`}
        isOpen={Boolean(anchorEl)}
        anchorEl={anchorEl}
        popperHorizontal="left"
        PaperProps={{
          sx: {
            width: 'max-content',
          },
        }}
        content={
          <OptionList
            type={popperType || ''}
            status={statusList}
            priority={prioritiesList}
            users={userList}
            sort={sortOptions}
            defaults={defaultValue}
            setDefaultValue={setDefaultValue}
            handleTaskUpdate={handleTaskUpdate}
            handleClose={() => setAnchorEl(null)}
            handleSort={handleSort}
            handleDateRangeChange={handleDateRangeChange}
            selectedDates={selectedDates}
          />
        }
        handleClose={() => setAnchorEl(null)}
      />
      {children}
    </DashboardContext.Provider>
  );
}

DashboardProvider.propTypes = {
  children: PropTypes.any,
};

export default DashboardContext;
