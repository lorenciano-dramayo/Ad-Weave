import React, { useState, useEffect } from 'react';

import _ from 'lodash';

import PropTypes from 'prop-types';

// hooks
import { useOnMount } from 'pages/Dashboard/hooks';

import {
  Stack,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Badge,
  IconButton,
  Collapse,
  ListItemIcon,
} from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import GrassRoundedIcon from '@mui/icons-material/GrassRounded';
import AssistantPhotoRoundedIcon from '@mui/icons-material/AssistantPhotoRounded';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';

import { appColors } from 'theme/variables';

let timer = null;
export default function NavList({
  title,
  options,
  user,
  queueCount,
  getDashData,
  dashData,
}) {
  const [isCollapse, setCollpase] = useState(false);
  const [queue, setQueue] = useState('');
  const [status, setStatus] = useState([]);
  const [taskTypes, setTaskTypes] = useState([]);
  const [teams, setTeam] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [health, setHealth] = useState([]);

  useOnMount(() => {
    setQueue(_.isEmpty(dashData?.queues) ? [] : dashData.queues);

    setStatus(_.isEmpty(dashData?.status) ? [] : dashData?.status);

    setTaskTypes(_.isEmpty(dashData?.task_type) ? [] : dashData?.task_type);

    setTeam(_.isEmpty(dashData?.team_id) ? [] : dashData?.team_id);

    setPriorities(_.isEmpty(dashData?.priority) ? [] : dashData?.priority);
    setHealth(
      _.isEmpty(dashData?.tracker_status) ? [] : dashData?.tracker_status
    );
  });

  useEffect(() => {
    setQueue(_.isEmpty(dashData?.queues) ? [] : dashData.queues);

    setStatus(_.isEmpty(dashData?.status) ? [] : dashData?.status);

    setTaskTypes(_.isEmpty(dashData?.task_type) ? [] : dashData?.task_type);

    setTeam(_.isEmpty(dashData?.team_id) ? [] : dashData?.team_id);

    setPriorities(_.isEmpty(dashData?.priority) ? [] : dashData?.priority);
    setHealth(
      _.isEmpty(dashData?.tracker_status) ? [] : dashData?.tracker_status
    );
  }, [dashData]);

  const queueFilters = (type, value) => {
    switch (type) {
      case 'queue':
        setQueue(value);
        getDashData({ ...dashData, queues: value });
        break;

      case 'status':
        setStatus(
          status.includes(value)
            ? _.filter(status, (stat) => stat !== value)
            : [...status, value]
        );

        clearTimeout(timer);
        timer = setTimeout(() => {
          getDashData({
            ...dashData,
            status: status.includes(value)
              ? _.filter(status, (stat) => stat !== value)
              : [...status, value],
          });
        }, 1000);
        break;

      case 'taskType':
        setTaskTypes(
          taskTypes.includes(value)
            ? _.filter(taskTypes, (stat) => stat !== value)
            : [...taskTypes, value]
        );
        clearTimeout(timer);
        timer = setTimeout(() => {
          getDashData({
            ...dashData,
            task_type: taskTypes.includes(value)
              ? _.filter(taskTypes, (stat) => stat !== value)
              : [...taskTypes, value],
          });
        }, 1000);
        break;

      case 'teams':
        setTeam(
          teams.includes(value)
            ? _.filter(teams, (stat) => stat !== value)
            : [...teams, value]
        );

        clearTimeout(timer);
        timer = setTimeout(() => {
          getDashData({
            ...dashData,
            team_id: teams.includes(value)
              ? _.filter(teams, (stat) => stat !== value)
              : [...teams, value],
          });
        }, 1000);
        break;

      case 'priority':
        setPriorities(
          priorities.includes(value)
            ? _.filter(priorities, (prio) => prio !== value)
            : [...priorities, value]
        );

        clearTimeout(timer);
        timer = setTimeout(() => {
          getDashData({
            ...dashData,
            priority: priorities.includes(value)
              ? _.filter(priorities, (prio) => prio !== value)
              : [...priorities, value],
          });
        }, 1000);
        break;
      case 'health':
        setHealth(
          health.includes(value)
            ? _.filter(health, (prio) => prio !== value)
            : [...health, value]
        );

        clearTimeout(timer);
        timer = setTimeout(() => {
          getDashData({
            ...dashData,
            tracker_status: health.includes(value)
              ? _.filter(health, (prio) => prio !== value)
              : [...health, value],
          });
        }, 1000);
        break;
    }
  };

  switch (title.toLowerCase().replace(/ /g, '_')) {
    case 'statuses':
      return (
        <Stack pr={2} py={1}>
          <Stack
            pl={3}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" spacing={2.5}>
              <Typography
                fontWeight={800}
                variant="button"
                color={appColors.lightViolet}
                lineHeight="inherit"
                fontSize="12px"
              >
                {title}
              </Typography>
              <Badge
                color="primary"
                badgeContent={status.length}
                sx={{
                  marginRight: '0.5em',
                  marginTop: '-0.2em',
                  '.MuiBadge-badge': {
                    fontSize: '0.5em',
                    fontWeight: 800,
                    height: '1.7em',
                  },
                }}
              />
            </Stack>
            <Box>
              <IconButton
                sx={{ marginTop: '-0.2em' }}
                size="small"
                onClick={() => setCollpase(!isCollapse)}
              >
                {!isCollapse ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </IconButton>
            </Box>
          </Stack>
          <Collapse in={isCollapse}>
            <Box>
              <List component="nav" dense sx={{ padding: 0 }}>
                {_.filter(options, (stats) =>
                  _.map(
                    stats?.related_to,
                    (types) => types.name === 'task'
                  ).includes(true)
                ).map((stats, index) => (
                  <ListItem
                    sx={{ padding: 0 }}
                    key={index}
                    secondaryAction={
                      status.includes(stats?.id) && (
                        <CheckIcon color="secondary" />
                      )
                    }
                  >
                    <ListItemButton
                      sx={{
                        paddingLeft: '23px',
                        borderRadius: '0 0.3em 0.3em 0',
                        marginBottom: '0.15em',
                      }}
                      onClick={() => queueFilters('status', stats?.id)}
                      selected={status.includes(stats?.id)}
                    >
                      <ListItemIcon sx={{ minWidth: 0 }}>
                        <SquareRoundedIcon
                          sx={{
                            color:
                              appColors.status[
                                _.camelCase(
                                  stats?.name?.toLowerCase().replace(/_/g, ' ')
                                )
                              ],
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          '.MuiTypography-root': {
                            fontWeight: 700,
                            paddingLeft: '1em',
                            textTransform: 'capitalize',
                          },
                        }}
                      >
                        {stats?.name}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Collapse>
        </Stack>
      );

    case 'task_types':
      return (
        <Stack pr={2} py={1}>
          <Stack
            pl={3}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" spacing={2.5}>
              <Typography
                fontWeight={800}
                variant="button"
                color={appColors.lightViolet}
                lineHeight="inherit"
                fontSize="12px"
              >
                {title}
              </Typography>
              <Badge
                color="primary"
                badgeContent={taskTypes.length}
                sx={{
                  marginRight: '0.5em',
                  marginTop: '-0.2em',
                  '.MuiBadge-badge': {
                    fontSize: '0.5em',
                    fontWeight: 800,
                    height: '1.7em',
                  },
                }}
              />
            </Stack>

            <Box>
              <IconButton
                sx={{ marginTop: '-0.2em' }}
                size="small"
                onClick={() => setCollpase(!isCollapse)}
              >
                {!isCollapse ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </IconButton>
            </Box>
          </Stack>
          <Collapse in={isCollapse}>
            <Box>
              <List component="nav" dense sx={{ padding: 0 }}>
                {options.map((taskType) => (
                  <ListItem
                    sx={{
                      padding: 0,
                    }}
                    key={taskType?.id}
                    secondaryAction={
                      taskTypes.includes(taskType?.id) && (
                        <CheckIcon color="secondary" />
                      )
                    }
                  >
                    <ListItemButton
                      sx={{
                        paddingLeft: '23px',
                        borderRadius: '0 0.3em 0.3em 0',
                        marginBottom: '0.15em',
                      }}
                      onClick={() => queueFilters('taskType', taskType?.id)}
                      selected={taskTypes.includes(taskType?.id)}
                    >
                      <ListItemIcon sx={{ minWidth: 0 }}>
                        <GrassRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          '.MuiTypography-root': {
                            fontWeight: 700,
                            paddingLeft: '1em',
                            display: '-webkit-box',
                            WebkitLineClamp: '1',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          },
                        }}
                      >
                        {taskType?.name}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Collapse>
        </Stack>
      );

    case 'teams':
      return [3, 4, 5, 7, 9, 10, 11].includes(user?.team_id) &&
        user?.admin_role?.toLowerCase().includes('member') ? (
        <></>
      ) : (
        <Stack pr={2} py={1}>
          <Stack
            pl={3}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" spacing={2.5}>
              <Typography
                fontWeight={800}
                variant="button"
                color={appColors.lightViolet}
                lineHeight="inherit"
                fontSize="12px"
              >
                {title}
              </Typography>
              <Badge
                color="primary"
                badgeContent={teams.length}
                sx={{
                  marginRight: '0.5em',
                  marginTop: '-0.2em',
                  '.MuiBadge-badge': {
                    fontSize: '0.5em',
                    fontWeight: 800,
                    height: '1.7em',
                  },
                }}
              />
            </Stack>

            <Box>
              <IconButton
                sx={{ marginTop: '-0.2em' }}
                size="small"
                onClick={() => setCollpase(!isCollapse)}
              >
                {!isCollapse ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </IconButton>
            </Box>
          </Stack>
          <Collapse in={isCollapse}>
            <Box>
              <List component="nav" dense sx={{ padding: 0 }}>
                {_.filter(
                  _.filter(options, (dataList) => !_.isEmpty(dataList?.name)),
                  (dataAuth) =>
                    [3, 4, 5, 7, 9, 10, 11].includes(user?.team_id) &&
                    !user?.admin_role?.toLowerCase().includes('admin')
                      ? dataAuth?.id === user?.team_id
                      : dataAuth
                ).map((team, index) => (
                  <ListItem
                    sx={{ padding: 0 }}
                    key={index}
                    secondaryAction={
                      teams.includes(team?.id) && (
                        <CheckIcon color="secondary" />
                      )
                    }
                  >
                    <ListItemButton
                      sx={{
                        paddingLeft: '23px',
                        borderRadius: '0 0.3em 0.3em 0',
                        marginBottom: '0.15em',
                      }}
                      onClick={() => queueFilters('teams', team?.id)}
                      selected={teams.includes(team?.id)}
                    >
                      <ListItemIcon sx={{ minWidth: 0 }}>
                        <GroupRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          '.MuiTypography-root': {
                            fontWeight: 700,
                            paddingLeft: '1em',
                          },
                        }}
                      >
                        {team?.name}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Collapse>
        </Stack>
      );

    case 'priority':
      return (
        <Stack pr={2} py={1}>
          <Stack
            pl={3}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" spacing={2.5}>
              <Typography
                fontWeight={800}
                variant="button"
                color={appColors.lightViolet}
                lineHeight="inherit"
                fontSize="12px"
              >
                {title}
              </Typography>
              <Badge
                color="primary"
                badgeContent={priorities.length}
                sx={{
                  marginRight: '0.5em',
                  marginTop: '-0.2em',
                  '.MuiBadge-badge': {
                    fontSize: '0.5em',
                    fontWeight: 800,
                    height: '1.7em',
                  },
                }}
              />
            </Stack>
            <Box>
              <IconButton
                sx={{ marginTop: '-0.2em' }}
                size="small"
                onClick={() => setCollpase(!isCollapse)}
              >
                {!isCollapse ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </IconButton>
            </Box>
          </Stack>
          <Collapse in={isCollapse}>
            <Box>
              <List component="nav" dense sx={{ padding: 0 }}>
                {options.map((prio, index) => (
                  <ListItem
                    sx={{ padding: 0 }}
                    key={index}
                    secondaryAction={
                      priorities.includes(prio?.id) && (
                        <CheckIcon color="secondary" />
                      )
                    }
                  >
                    <ListItemButton
                      sx={{
                        paddingLeft: '23px',
                        borderRadius: '0 0.3em 0.3em 0',
                        marginBottom: '0.15em',
                      }}
                      onClick={() => queueFilters('priority', prio?.id)}
                      selected={priorities.includes(prio?.id)}
                    >
                      <ListItemIcon sx={{ minWidth: 0 }}>
                        <AssistantPhotoRoundedIcon
                          sx={{
                            color:
                              appColors.priority[
                                _.camelCase(prio?.name?.toLowerCase())
                              ],
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          '.MuiTypography-root': {
                            fontWeight: 700,
                            paddingLeft: '1em',
                            textTransform: 'capitalize',
                          },
                        }}
                      >
                        {prio?.name}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Collapse>
        </Stack>
      );

    case 'health':
      return (
        <Stack pr={2} py={1}>
          <Stack
            pl={3}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" spacing={2.5}>
              <Typography
                fontWeight={800}
                variant="button"
                color={appColors.lightViolet}
                lineHeight="inherit"
                fontSize="12px"
              >
                {title}
              </Typography>
              <Badge
                color="primary"
                badgeContent={health.length}
                sx={{
                  marginRight: '0.5em',
                  marginTop: '-0.2em',
                  '.MuiBadge-badge': {
                    fontSize: '0.5em',
                    fontWeight: 800,
                    height: '1.7em',
                  },
                }}
              />
            </Stack>
            <Box>
              <IconButton
                sx={{ marginTop: '-0.2em' }}
                size="small"
                onClick={() => setCollpase(!isCollapse)}
              >
                {!isCollapse ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </IconButton>
            </Box>
          </Stack>
          <Collapse in={isCollapse}>
            <Box>
              <List component="nav" dense sx={{ padding: 0 }}>
                {options.map((heal, index) => (
                  <ListItem
                    sx={{ padding: 0 }}
                    key={index}
                    secondaryAction={
                      health.includes(heal?.value) && (
                        <CheckIcon color="secondary" />
                      )
                    }
                  >
                    <ListItemButton
                      sx={{
                        paddingLeft: '23px',
                        borderRadius: '0 0.3em 0.3em 0',
                        marginBottom: '0.15em',
                      }}
                      onClick={() => queueFilters('health', heal?.value)}
                      selected={health.includes(heal?.value)}
                    >
                      <ListItemIcon sx={{ minWidth: 0 }}>
                        <MonitorHeartOutlinedIcon
                          sx={{
                            color:
                              appColors.dashboard.health[
                                _.camelCase(heal?.name?.toLowerCase())
                              ],
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          '.MuiTypography-root': {
                            fontWeight: 700,
                            paddingLeft: '1em',
                            textTransform: 'capitalize',
                          },
                        }}
                      >
                        {heal?.name}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Collapse>
        </Stack>
      );

    default:
      return (
        <Stack pr={2} py={1}>
          <Box pl={3}>
            <Typography
              fontWeight={800}
              variant="button"
              color={appColors.lightViolet}
              fontSize="12px"
            >
              {title}
            </Typography>
          </Box>
          <Box>
            <List component="nav" dense sx={{ padding: 0 }}>
              {options.map((option, index) => (
                <ListItem
                  sx={{ padding: 0 }}
                  secondaryAction={
                    <Badge
                      color={queue === option?.slug ? 'primary' : 'secondary'}
                      badgeContent={queueCount[option?.slug]}
                      max={100000}
                      sx={{
                        marginRight: '0.5em',
                        marginTop: '-0.2em',
                      }}
                      showZero
                    />
                  }
                  key={index}
                >
                  <ListItemButton
                    sx={{
                      paddingLeft: '23px',
                      borderRadius: '0 0.3em 0.3em 0',
                      '&.Mui-selected': {
                        background: '#f220763d',
                        '&:hover': {
                          background: '#5025c41f',
                        },
                      },
                    }}
                    selected={queue === option?.slug}
                    onClick={() => queueFilters('queue', option?.slug)}
                  >
                    <ListItemIcon sx={{ minWidth: 0 }}>
                      {option?.icon}
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        '.MuiTypography-root': {
                          fontWeight: 700,
                          paddingLeft: '1em',
                        },
                      }}
                    >
                      {option?.name}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      );
  }
}

NavList.propTypes = {
  title: PropTypes.string,
  options: PropTypes.any,
  user: PropTypes.any,
  queueCount: PropTypes.any,
  getDashData: PropTypes.func,
  dashData: PropTypes.any,
};
