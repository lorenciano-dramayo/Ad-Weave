import { useState } from 'react';

import React from 'react';

import _ from 'lodash';

import PropTypes from 'prop-types';

import DateRange from 'pages/Dashboard/Components/DateRange';

import AutoComplete from 'pages/Dashboard/Components/AutoComplete';

// hooks
import { useOnMount } from 'pages/Dashboard/hooks';

import {
  Stack,
  Typography,
  Box,
  IconButton,
  Card,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';

import { appColors } from 'theme/variables';

let timer = null;
export default function Filters({
  onClose,
  filterOptions,
  handlePopper,
  dashData,
  getDashData,
  users,
  partners,
  teamId,
}) {
  const [channels, setChannels] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [watchers, setWatchers] = useState([]);

  useOnMount(() => {
    setChannels(
      Object.keys(dashData)?.includes('channel_id') ? dashData?.channel_id : []
    );

    setAssignees(
      Object.keys(dashData)?.includes('assignees') ? dashData?.assignees : []
    );

    setWatchers(
      Object.keys(dashData)?.includes('watchers') ? dashData?.watchers : []
    );
  });

  const handleFilterChange = (type, value) => {
    switch (type) {
      case 'channel':
        setChannels(
          channels.includes(value)
            ? _.filter(channels, (chan) => chan !== value)
            : [...channels, value]
        );

        clearTimeout(timer);
        timer = setTimeout(() => {
          getDashData({
            ...dashData,
            channel_id: channels.includes(value)
              ? _.filter(channels, (chan) => chan !== value)
              : [...channels, value],
          });
        }, 1000);
        break;
      case 'partner_group':
        clearTimeout(timer);
        timer = setTimeout(() => {
          getDashData({
            ...dashData,
            partner_group_id: [4, 5, 6, 3, 8, 14, 12].includes(teamId)
              ? []
              : _.map(value, (partnerGroup) => partnerGroup.id),
          });
        }, 1000);
        break;

      case 'assignees':
        clearTimeout(timer);
        timer = setTimeout(() => {
          getDashData({
            ...dashData,
            assignees: _.map(value, (assignees) => assignees.id),
          });
        }, 1000);
        break;

      case 'watchers':
        clearTimeout(timer);
        timer = setTimeout(() => {
          getDashData({
            ...dashData,
            watchers: _.map(value, (watchers) => watchers.id),
          });
        }, 1000);
        break;

      default:
        break;
    }
  };

  return (
    <Stack width={360}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        px={2}
        py={1}
        height={48}
        mb={1.5}
        boxShadow="inset 0 -1px 0 rgb(0 0 0 / 10%)"
      >
        <Box>
          <Typography
            fontWeight={800}
            sx={{
              color: 'rgba(0,0,0,.5)',
              fontSize: '12px',
              textTransform: 'uppercase',
            }}
          >
            All Filters
          </Typography>
        </Box>
        <Box position="absolute" left={12}>
          <IconButton
            disableFocusRipple
            disableRipple
            disableTouchRipple
            sx={{
              '&:hover': {
                backgroundColor: appColors.lightViolet,
                color: '#fff',
              },
            }}
            size="small"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Stack>

      {/* Body */}
      <Stack p={3}>
        {filterOptions?.map((list, index) =>
          list?.slug === 'channel' ? (
            <Box mb={3} key={index}>
              <Typography
                fontWeight={700}
                variant="h6"
                color="primary"
                fontSize={14}
                marginBottom="10px"
              >
                {list?.name}
              </Typography>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: '3px',
                  padding: '16px 24px',
                  border: '1px solid rgba(0,0,0,.1)',
                }}
              >
                <FormGroup>
                  {list?.options?.map((option, i) => (
                    <FormControlLabel
                      key={i}
                      sx={{ margin: 0 }}
                      control={
                        <Checkbox
                          value={option?.value}
                          disableFocusRipple
                          disableRipple
                          disableTouchRipple
                          sx={{
                            fontSize: '19px',
                            padding: 0,
                            marginRight: '9px',
                          }}
                          icon={
                            <CheckBoxOutlineBlankOutlinedIcon
                              sx={{ color: 'rgba(128,134,139,.25)' }}
                            />
                          }
                          checkedIcon={
                            <CheckBoxIcon sx={{ color: '#4420c4)' }} />
                          }
                          onChange={(e) =>
                            handleFilterChange('channel', e.target.value)
                          }
                          checked={channels?.includes(
                            option?.value?.toString()
                          )}
                        ></Checkbox>
                      }
                      label={option?.name}
                    />
                  ))}
                </FormGroup>
              </Card>
            </Box>
          ) : list?.slug === 'partner_group' ||
            list?.slug === 'watchers' ||
            list?.slug === 'assignees' ? (
            <Box key={index} mb={3}>
              <Typography
                fontWeight={700}
                variant="h6"
                color="primary"
                fontSize={14}
                marginBottom="10px"
              >
                {list?.name}
              </Typography>
              <AutoComplete
                data={list?.slug === 'partner_group' ? partners : users}
                type={list?.slug}
                handleFilterChange={handleFilterChange}
                defaultValue={
                  list?.slug === 'partner_group'
                    ? _.isEmpty(dashData?.partner_group_id)
                      ? []
                      : _.filter(partners, (partnerGroup) =>
                          dashData?.partner_group_id?.includes(partnerGroup?.id)
                        )
                    : list?.slug === 'assignees'
                    ? _.isEmpty(dashData?.assignees)
                      ? []
                      : _.filter(users, (assign) =>
                          dashData?.assignees?.includes(assign?.id)
                        )
                    : list?.slug === 'watchers'
                    ? _.isEmpty(dashData?.watchers)
                      ? []
                      : _.filter(users, (watcher) =>
                          dashData?.watchers?.includes(watcher?.id)
                        )
                    : []
                }
              />
            </Box>
          ) : (
            <Box
              key={index}
              mb={3}
              onClick={(e) => handlePopper(e, list?.slug)}
            >
              <Typography
                fontWeight={700}
                variant="h6"
                color="primary"
                fontSize={14}
                marginBottom="10px"
              >
                {list?.name}
              </Typography>
              <DateRange
                startDate={
                  _.isEmpty(dashData[list?.slug])
                    ? ''
                    : dashData[list?.slug][0].split(',')[0]
                }
                endDate={
                  _.isEmpty(dashData[list?.slug])
                    ? ''
                    : dashData[list?.slug][0].split(',')[1]
                }
              />
            </Box>
          )
        )}
      </Stack>
    </Stack>
  );
}

Filters.propTypes = {
  onClose: PropTypes.func.isRequired,
  filterOptions: PropTypes.any,
  handlePopper: PropTypes.func,
  dashData: PropTypes.any,
  getDashData: PropTypes.func,
  users: PropTypes.any,
  partners: PropTypes.any,
  teamId: PropTypes.any,
};
