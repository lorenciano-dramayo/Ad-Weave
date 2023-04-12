import React, { useState, useEffect, useContext } from 'react';
import _ from 'lodash';

import {
  Box,
  Button,
  Typography,
  Card,
  Stack,
  TextField,
  Autocomplete,
} from '@mui/material';
import PropTypes from 'prop-types';
import { appColors } from 'theme/variables';
import { useDispatch } from 'react-redux';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { formatDate } from 'utils/date';
import DateRange from 'pages/Dashboard/Components/DateRange';

import TimerSheetContext from 'pages/TimerSheet/Context';


const selectedDatesInitial = [
  {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  },
];

import moment from 'moment';

export default function FilterList({
  filter,
  options,
  setFilterOptions,
  selectedFilterOptions,
  setSelectedFilterOptions,
}) {
  // Do not use this state. Use the one from TimerSheetContext
  const [selectedDates, setSelectedDates] = useState(selectedDatesInitial);

  const [staffListData, setStaffListData] = useState('');
  const [campaignListData, setCampaignListData] = useState('');
  const [partnerListData, setPartnerListData] = useState('');
  const dispatch = useDispatch();

  const { filterSelectedDates, handlePopper, handleChangeFilterData } = useContext(TimerSheetContext);

  const handleDateRangeChange = async (ranges, optionType) => {
    setSelectedDates([ranges.selection]);
    await setFilterOptions((prev) => ({
      ...prev,
      [optionType]: [
        formatDate(ranges.selection.startDate, 'YYYY-MM-DD'),
        formatDate(ranges.selection.endDate, 'YYYY-MM-DD'),
      ],
    }));
    await setSelectedFilterOptions((prev) => ({
      ...prev,
      [optionType]: [ranges.selection],
    }));

    const itemDateSearch = [];

    itemDateSearch.push({
      dateStart: formatDate(ranges.selection.startDate, 'YYYY-MM-DD'),
      dateEnd: formatDate(ranges.selection.endDate, 'YYYY-MM-DD'),
    });

  };

  useEffect(() => {

    const itemStaff = options?.staff.map((item, index) => ({
      key: index,
      id: item.id,
      label: item.user,
    }));

    setStaffListData(itemStaff);

    const itemPartners = options?.customer.map((item, index) => ({
      key: index,
      id: item.uuid,
      label: item.name,
    }));

    setPartnerListData(itemPartners);

    const itemCampaign = options?.campaign.map((item, index) => ({
      key: index,
      id: item.uuid,
      label: item.name,
    }));

    setCampaignListData(itemCampaign);

  }, []);




  switch (filter?.slug) {
    case 'staff':
      return (
        <Box pl={2} pr={2} pb={1}>
          <Typography fontWeight={700} color={appColors.lightViolet}>
            {filter?.name}
          </Typography>
          <Stack>
            <Autocomplete
              sx={{
                '& .MuiOutlinedInput-input ': {
                  padding: '1px 0px !important'
                },
              }}
              multiple
              options={staffListData}
              onChange={(event, value) =>
                handleChangeFilterData(value, 'staff')
              }
              getOptionLabel={(option) => option.label || ''}
              renderOption={(props, option, index) => {
                return (
                  <li {...props} key={option.key}>
                    {option.label}
                  </li>
                );
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </Box>
      );

    case 'partners':
      return (
        <Box pl={2} pr={2} pb={1}>
          <Typography fontWeight={700} color={appColors.lightViolet}>
            {filter?.name}
          </Typography>
          <Stack>
            <Autocomplete
              sx={{
                '& .MuiOutlinedInput-input ': {
                  padding: '1px 0px !important'
                },
              }}
              multiple
              options={partnerListData}
              onChange={(event, value) =>
                handleChangeFilterData(value, 'partners')
              }
              getOptionLabel={(option) => option.label || ''}
              renderOption={(props, option, index) => {
                return (
                  <li {...props} key={option.key}>
                    {option.label}
                  </li>
                );
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </Box>
      );

    case 'campaign':
      return (
        <Box pl={2} pr={2} pb={1}>
          <Typography fontWeight={700} color={appColors.lightViolet}>
            {filter?.name}
          </Typography>
          <Stack>
            <Autocomplete
              sx={{
                '& .MuiOutlinedInput-input ': {
                  padding: '1px 0px !important'
                },
              }}
              multiple
              options={campaignListData}
              onChange={(event, value) =>
                handleChangeFilterData(value, 'campaign')
              }
              getOptionLabel={(option) => option.label || ''}
              renderOption={(props, option, index) => {
                return (
                  <li {...props} key={option.key}>
                    {option.label}
                  </li>
                );
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </Box>
      );
    case 'date':
      return (
        <>
          <Box pl={2} pr={2} pb={1} onClick={(e) => handlePopper(e, filter?.slug)}>
            <Typography fontWeight={700} color={appColors.lightViolet}>
              {filter?.name}
            </Typography>
            <Stack>
              <DateRange
                startDate={
                  _.isNull(filterSelectedDates[0].startDate)
                    ? ''
                    : moment(filterSelectedDates[0].startDate).format('ll')
                }
                endDate={
                  _.isNull(filterSelectedDates[0].endDate)
                    ? ''
                    : moment(filterSelectedDates[0].endDate).format('ll')
                }
              />
            </Stack>
          </Box>

        </>
      );


    default:
      return (
        <Box pl={2} pr={2} pb={1}>
          <Typography fontWeight={700} color={appColors.lightViolet}>
            {filter?.name}
          </Typography>
          <Card variant="outlined">
            <Stack p={2}></Stack>
          </Card>
        </Box>
      );


  }
}

FilterList.propTypes = {
  filter: PropTypes.any,
  options: PropTypes.any,
  selectedFilterOptions: PropTypes.any,
  setFilterOptions: PropTypes.any,
  setSelectedFilterOptions: PropTypes.any,
};
