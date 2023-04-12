import React, { createContext, useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTimesheet,
  getTimesheetChart,
  getTimesheetOption,
  getTimesheetStats,
} from 'store/reducers/timesheet';

import PropTypes from 'prop-types';

import { useHistory, useLocation } from 'react-router-dom';
import { formatDate } from 'utils/date';

// hooks
import { useOnMount } from 'hooks';

import { chart_filter_list } from '../constant';

// Global Component
import GlobalDrawer from 'components/Common/Drawer';
import GlobalPopover from 'components/Common/Popover';

// Local Component
import PopperOptions from 'pages/TimerSheet/components/Popper/Options';

const TimerSheetContext = createContext();

const selectedDatesInitial = [
  {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  },
];

export function TimerSheetProvider({ children }) {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const ref = useRef();

  const [defaultValue, setDefaultValue] = useState({});
  // popper
  const [chartFilterDropdownAnchorEl, setChartFilterDropdownAnchorEl] =
    useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popperType, setPopperType] = useState(null);

  // popper - selected data
  const [filterSelectedDates, setFilterSelectedDates] =
    useState(selectedDatesInitial);
  const [filterSelectedDropdown, setFilterSelectedDropdown] = useState(null);
  const [filterChartSelectedDropdown, setFilterChartSelectedDropdown] =
    useState(chart_filter_list[0]);
  const [filterChartSelectedDateRange, setFilterChartSelectedDateRange] =
    useState('');
  const [filterSelectedStaff, setFilterSelectedStaff] = useState('');
  const [filterSelectedPartner, setFilterSelectedPartner] = useState('');
  const [filterSelectedCampaign, setFilterSelectedCampaign] = useState('');
  const [filterSelectedDateRange, setFilterSelectedDateRange] = useState('');

  const {
    timesheet: { data: timesheetData, fetching: isTimeSheetFetching },
    chart: { data: chartData },
    optionTimeSheets: {
      data: optionTimeSheet,
      fetching: isOptionTimeSheetFetching,
    },
  } = useSelector((state) => state.timesheet);

  const {
    statistics: { data: statisticsData, fetching: isStatisticsFetching },
  } = useSelector((state) => state.timesheet);

  const [timesheetFilterData, setTimesheetFilterData] = useState(timesheetData);

  useOnMount(() => {
    dispatch(getTimesheetStats());
    dispatch(getTimesheetOption());
    dispatch(
      getTimesheetChart('', '', '', '', '', filterChartSelectedDropdown.slug)
    );
  });

  useEffect(() => {
    setTimesheetFilterData(timesheetData);
  }, [timesheetData]);

  // Watch table filter changes
  useEffect(() => {
    if (filterSelectedDateRange == '-,-') {
      setFilterSelectedDateRange('');
    }


    if (filterSelectedStaff || filterSelectedPartner || filterSelectedCampaign || filterSelectedDateRange) {
      dispatch(
        getTimesheet(
          '',
          filterSelectedStaff,
          filterSelectedPartner,
          filterSelectedCampaign,
          filterSelectedDateRange,
          ''
        )
      );
    }
  }, [
    filterSelectedStaff,
    filterSelectedPartner,
    filterSelectedCampaign,
    filterSelectedDateRange,
    filterChartSelectedDropdown,
  ]);

  // Watch chart filter changes
  useEffect(() => {
    dispatch(
      getTimesheetChart(
        '',
        '',
        '',
        '',
        filterChartSelectedDateRange,
        filterChartSelectedDropdown.slug
      )
    );
  }, [filterChartSelectedDateRange, filterChartSelectedDropdown]);

  const handleSearch = (query) => {
    if (!query) {
      return setTimesheetFilterData(timesheetData);
    }

    setTimesheetFilterData(
      timesheetData.filter((x) => {
        return x?.task?.name.toLowerCase().includes(query.toLowerCase());
      })
    );
  };

  const handleChangeFilterData = (value, type) => {
    const valueSearch = value.map((item) => item.id).join(',');
    if (type == 'staff') {
      var staff = valueSearch;
      setFilterSelectedStaff(staff);
    } else if (type == 'partners') {
      var partners = valueSearch;
      setFilterSelectedPartner(partners);
    } else if (type == 'campaign') {
      var campaign = valueSearch;
      setFilterSelectedCampaign(campaign);
    }
  };

  const handleFilter = () => {
    console.log("")
  };

  const handleDropdownChange = (e, selected, type) => {
    if (selected.slug?.includes('custom_date')) {
      // Open another popper upon clicking custom from filter's dropdown menu
      handlePopper(chartFilterDropdownAnchorEl, selected.slug);
      setFilterSelectedDropdown({ ...selected, slug: 'custom' });
      setFilterChartSelectedDropdown({ ...selected, slug: 'custom' });
    } else {
      setAnchorEl(null);
      setFilterSelectedDropdown(selected);
      setFilterChartSelectedDropdown(selected);
    }
  };

  const handleRedirect = (e, type, id) => {
    e.preventDefault();

    localStorage?.setItem(
      'redirect',
      `/${type.includes('task') ? type : 'campaign'}/${id}`
    );

    history.push({
      pathname: `/${type.includes('task') ? type : 'campaign'}/${id}`,
      search: history.location.search,
      state: {
        background: location,
        type: type.toLowerCase().includes('task') ? type : 'campaign',
        subtask: type.toLowerCase() === 'subtask' ? true : false,
      },
    });
  };

  const handleDateRangeChange = async (ranges, optionType) => {
    const dateFilterRange = [ranges.selection];
    const valueSearchStart = dateFilterRange
      .map((item) => formatDate(item.startDate, 'YYYY-MM-DD'))
      .join(',');
    const valueSearchEnd = dateFilterRange
      .map((item) => formatDate(item.endDate, 'YYYY-MM-DD'))
      .join(',');
    const dateFilter = valueSearchStart + ',' + valueSearchEnd;

    if (optionType.includes('custom_date')) {
      setFilterChartSelectedDateRange(dateFilter);
    } else {
      setFilterSelectedDateRange(dateFilter);
    }

    setFilterSelectedDates([ranges.selection]);
  };

  const handlePopper = (event, _type, _defaults) => {
    // _type.includes('date')
    setAnchorEl(_type === 'custom_date' ? event : event.currentTarget);
    setDefaultValue(_defaults);
    _type.includes('dropdown') &&
      setChartFilterDropdownAnchorEl(event.currentTarget);
    typeof _type !== 'object' && setPopperType(_type);

    // if (filterSelectedStaff == null ||
    //   filterSelectedPartner == null ||
    //   filterSelectedCampaign == null ||
    //   filterSelectedDateRange == null) {
    //   dispatch(
    //     getTimesheet()
    //   );
    // }
    // else {
    //   dispatch(
    //     getTimesheet(
    //       '',
    //       filterSelectedStaff,
    //       filterSelectedPartner,
    //       filterSelectedCampaign,
    //       filterSelectedDateRange,
    //       ''
    //     )
    //   );
    // }

  };

  return (
    <TimerSheetContext.Provider
      value={{
        timesheetFilterData,
        statisticsData,
        optionTimeSheet,
        isTimeSheetFetching,
        filterSelectedDates,
        filterSelectedDropdown,
        filterChartSelectedDropdown,
        chartData,
        filterSelectedStaff,
        filterSelectedPartner,
        filterSelectedCampaign,
        filterSelectedDateRange,
        handleFilter,
        handleSearch,
        handlePopper,
        handleRedirect,
        handleChangeFilterData,
        isOptionTimeSheetFetching,
      }}
    >
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
          <PopperOptions
            type={popperType || ''}
            status={[]}
            priority={[]}
            users={[]}
            sort={[]}
            dropdowns={chart_filter_list}
            defaults={defaultValue}
            selectedDates={filterSelectedDates}
            setDefaultValue={setDefaultValue}
            onClose={() => setAnchorEl(null)}
            onDropdownChange={handleDropdownChange}
            handleSort={null}
            handleTaskUpdate={null}
            handleDateRangeChange={handleDateRangeChange}
          />
        }
        handleClose={() => setAnchorEl(null)}
      />
      {children}
    </TimerSheetContext.Provider>
  );
}

TimerSheetProvider.propTypes = {
  children: PropTypes.any,
};

export default TimerSheetContext;
