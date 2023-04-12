import React from 'react';

import _ from 'lodash';

import moment from 'moment';

import PropTypes from 'prop-types';

// date range
import { DateRange } from 'react-date-range';

// date picker
import DatePicker from 'react-datepicker';

// date range theme and color
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

// date picker theme
import 'react-datepicker/dist/react-datepicker.css';

// virtual selectors
import VirtualListSelection from 'pages/Task/Components/VirtualListSelection';

import Color from 'color';
import theme from 'theme';

import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  IconButton,
} from '@mui/material';

import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import AssistantPhotoRoundedIcon from '@mui/icons-material/AssistantPhotoRounded';
import TextRotateUpIcon from '@mui/icons-material/TextRotateUp';
import TextRotateVerticalIcon from '@mui/icons-material/TextRotateVertical';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';

import { appColors } from 'theme/variables';

let timer = null;
export default function OptionList({
  type,
  status,
  priority,
  users,
  sort,
  defaults,
  handleTaskUpdate,
  handleClose,
  setDefaultValue,
  handleSort,
  handleDateRangeChange,
  selectedDates,
}) {
  switch (type) {
    case 'date':
    case 'due_date':
    case 'date_created':
    case 'date_submitted':
    case 'delivery_date':
      return (
        <DateRange
          ranges={selectedDates}
          rangeColors={[
            Color(theme.palette.secondary.main).alpha(0.8).string(),
          ]}
          months={2}
          direction="horizontal"
          onChange={(ranges) => handleDateRangeChange(ranges, type)}
        />
      );
    case 'status':
      return (
        <List dense sx={{ minWidth: '120px', padding: '4px 0' }}>
          {_.filter(status, (stats) =>
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
                selected={stats.id === Number(defaults?.selectedId)}
                onClick={() => {
                  handleTaskUpdate(type, {
                    is_parent: defaults.isParent,
                    id: defaults.taskId,
                    key: type,
                    value: stats?.id,
                  });

                  handleClose();
                }}
              >
                <ListItemText
                  sx={{
                    '.MuiTypography-root': {
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      textTransform: 'capitalize',
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

    case 'priority':
      return (
        <List component="nav" dense={true} sx={{ width: '10.5em' }}>
          {priority?.map((data, index) => (
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
                key={index}
                selected={Number(defaults?.selectedId) === Number(data?.id)}
                sx={{
                  '&.Mui-selected': { backgroundColor: '#5025c41a' },
                }}
                onClick={() => {
                  handleTaskUpdate(type, {
                    is_parent: defaults.isParent,
                    id: defaults.taskId,
                    key: type,
                    value: data?.id,
                  });

                  handleClose();
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
            </ListItem>
          ))}
        </List>
      );

    case 'due':
    case 'delivery':
      return (
        <DatePicker
          selected={
            _.isNull(defaults?.selectedDate)
              ? new Date()
              : new Date(defaults?.selectedDate)
          }
          inline
          dateFormat={'MM/DD/YYYY HH:mm A'}
          showTimeSelect
          onChange={(date) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
              handleTaskUpdate(type, {
                id: defaults?.taskId,
                is_parent: defaults?.isParent,
                value: moment(date).format('MM/DD/YYYY HH:mm A'),
                key: type === 'due' ? 'due_date' : 'delivery_date',
              });
            }, 1000);

            setDefaultValue({
              ...defaults,
              selectedDate: date,
            });
          }}
        />
      );
    case 'sort':
      return (
        <List dense sx={{ width: '112px', padding: '0.2em 0' }}>
          {sort?.map((data, index) => (
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
                    <></>
                  ) : data.sortType?.charAt(0) === '-' ? (
                    <TextRotateVerticalIcon color="secondary" />
                  ) : (
                    <TextRotateUpIcon color="secondary" />
                  )}
                </IconButton>
              }
              onClick={() => handleSort(data, type)}
              disablePadding
            >
              <ListItemButton sx={{ width: 151, paddingLeft: '12px' }}>
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
    default:
      return (
        <VirtualListSelection
          option={users}
          type={type}
          selected={defaults?.selectedAssignees}
          taskId={defaults?.taskId}
          isParent={defaults?.isParent}
          handleSave={(data) => handleTaskUpdate(type, data)}
        />
      );
  }
}

OptionList.propTypes = {
  type: PropTypes.string.isRequired,
  status: PropTypes.any,
  priority: PropTypes.any,
  users: PropTypes.any,
  sort: PropTypes.any,
  defaults: PropTypes.any,
  setDefaultValue: PropTypes.any,
  handleTaskUpdate: PropTypes.any,
  handleClose: PropTypes.any,
  handleSort: PropTypes.any,
  handleDateRangeChange: PropTypes.any,
  selectedDates: PropTypes.any,
};
