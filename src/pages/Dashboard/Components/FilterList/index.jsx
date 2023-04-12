import React, { useState } from 'react';
import _ from 'lodash';

import { DateRange } from 'react-date-range';

import {
  Box,
  Typography,
  Card,
  Stack,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';

import PropTypes from 'prop-types';

import { appColors } from 'theme/variables';

import AutoComplete from 'pages/Dashboard/Components/AutoComplete';

import Color from 'color';
import theme from 'theme';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { formatDate } from 'utils/date';

const selectedDatesInitial = [
  {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  },
];

export default function FilterList({
  filter,
  channel,
  options,
  others,
  setChannel,
  setOthers,
  selectedFilterOptions,
  setFilterOptions,
  setSelectedFilterOptions,
}) {
  const [selectedDates, setSelectedDates] = useState(selectedDatesInitial);

  const handleSelect = async (slug, e) => {
    switch (slug) {
      case 'channel':
        e.target.checked
          ? await setChannel((prev) => [...prev, e.target.value])
          : await setChannel(_.filter(channel, (ch) => ch !== e.target.value));
        break;
      case 'others':
        e.target.checked
          ? await setOthers((prev) => ({ ...prev, [e.target.value]: true }))
          : await setOthers((prev) => ({ ...prev, [e.target.value]: false }));
        break;

      default:
        break;
    }
  };

  const handleOptionsSelect = async (values, optionType) => {
    await setFilterOptions((prev) => ({
      ...prev,
      [optionType]: [...values.map((v) => v.id)],
    }));
    await setSelectedFilterOptions((prev) => ({
      ...prev,
      [optionType]: values,
    }));
  };

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
  };

  switch (filter?.slug) {
    case 'channel':
    case 'task_health':
    case 'others':
      return (
        <Box p={2}>
          <Typography fontWeight={700} color={appColors.lightViolet}>
            {filter?.name}
          </Typography>
          <Card variant="outlined">
            <Stack p={2}>
              <FormGroup>
                {filter?.options?.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option?.value}
                    control={
                      <Checkbox
                        onChange={(e) => handleSelect(filter?.slug, e)}
                        checked={
                          filter?.slug === 'channel'
                            ? channel?.includes(option.value.toString())
                            : others[option.value.toString() ?? ''] ?? false
                        }
                      />
                    }
                    label={option?.name}
                    labelPlacement="end"
                  />
                ))}
              </FormGroup>
            </Stack>
          </Card>
        </Box>
      );

    case 'partner_group':
      return (
        <Box p={2}>
          <Typography fontWeight={700} color={appColors.lightViolet}>
            {filter?.name}
          </Typography>
          <Stack>
            <AutoComplete
              options={options.partners ?? []}
              defaultValue={selectedFilterOptions.partner_group ?? []}
              onChange={(values) =>
                handleOptionsSelect(values, 'partner_group')
              }
            />
          </Stack>
        </Box>
      );
    case 'priority':
      return (
        <Box p={2}>
          <Typography fontWeight={700} color={appColors.lightViolet}>
            {filter?.name}
          </Typography>
          <Stack>
            <AutoComplete
              options={options.priorities ?? []}
              defaultValue={selectedFilterOptions.priority ?? []}
              onChange={(values) => handleOptionsSelect(values, 'priority')}
            />
          </Stack>
        </Box>
      );
    case 'team':
      return (
        <Box p={2}>
          <Typography fontWeight={700} color={appColors.lightViolet}>
            {filter?.name}
          </Typography>
          <Stack>
            <AutoComplete
              options={options.teams ?? []}
              defaultValue={selectedFilterOptions.team ?? []}
              onChange={(values) => handleOptionsSelect(values, 'team')}
            />
          </Stack>
        </Box>
      );
    case 'watchers':
      return (
        <Box p={2}>
          <Typography fontWeight={700} color={appColors.lightViolet}>
            {filter?.name}
          </Typography>
          <Stack>
            <AutoComplete
              options={options.users ?? []}
              defaultValue={selectedFilterOptions.watchers ?? []}
              onChange={(values) => handleOptionsSelect(values, 'watchers')}
            />
          </Stack>
        </Box>
      );
    case 'assignees':
      return (
        <Box p={2}>
          <Typography fontWeight={700} color={appColors.lightViolet}>
            {filter?.name}
          </Typography>
          <Stack>
            <AutoComplete
              options={options.users ?? []}
              defaultValue={selectedFilterOptions.assignees ?? []}
              onChange={(values) => handleOptionsSelect(values, 'assignees')}
            />
          </Stack>
        </Box>
      );

    case 'due_date':
    case 'date_created':
    case 'date_submitted':
    case 'delivery_date':
      return (
        <Box p={2}>
          <Typography fontWeight={700} color={appColors.lightViolet}>
            {filter?.name}
          </Typography>
          <Card variant="outlined">
            <Stack p={2}>
              <DateRange
                ranges={selectedFilterOptions[filter?.slug] ?? selectedDates}
                rangeColors={[
                  Color(theme.palette.secondary.main).alpha(0.8).string(),
                ]}
                onChange={(ranges) =>
                  handleDateRangeChange(ranges, filter?.slug)
                }
                months={2}
                direction="vertical"
              />
            </Stack>
          </Card>
        </Box>
      );
    default:
      return (
        <Box p={2}>
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
  channel: PropTypes.any,
  options: PropTypes.any,
  others: PropTypes.any,
  selectedFilterOptions: PropTypes.any,
  setOthers: PropTypes.any,
  setChannel: PropTypes.any,
  setFilterOptions: PropTypes.any,
  setSelectedFilterOptions: PropTypes.any,
};
