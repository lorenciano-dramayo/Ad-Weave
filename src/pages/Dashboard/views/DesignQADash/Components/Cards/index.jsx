import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import moment from 'moment';

import {
  Box,
  Card,
  Stack,
  Typography,
  Button,
  CardActions,
  AvatarGroup,
  Avatar,
  Divider,
  IconButton,
  styled,
  Tooltip,
  Chip,
} from '@mui/material';

import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';

import { appColors } from 'theme/variables';

import { channelIcons } from 'constants/widgets';
import Star from '@mui/icons-material/Star';

const StyledTypography = styled(Typography)`
  background-image: linear-gradient(90deg, #b233cf, #d721cf 48.44%, #e920a5);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  color: #29125f;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-right: 6em;
`;

const OverflowTypography = styled(Typography)`
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default function Cards({
  task,
  onTaskUpdate,
  handleClick,
  handleCopyLink,
  handleTaskOpen,
  range,
  ended,
}) {
  const [isHover, setHover] = useState(false);
  return (
    <Box position="relative">
      <Box
        className={
          task?.tracker_status?.toLowerCase() === 'on track'
            ? 'ribbon'
            : task?.tracker_status?.toLowerCase() === 'critical'
            ? 'ribbon yellow'
            : 'ribbon red'
        }
        onClick={(e) => handleTaskOpen(e, task?.id, task?.rel_type)}
        sx={{ cursor: 'pointer' }}
      >
        <Typography variant="caption">{task?.tracker_status}</Typography>
      </Box>
      <Card
        variant="outlined"
        sx={{
          border: '1px solid rgba(80,37,196,.1)',
          backgroundColor: '#ffffff80',
          '&:hover': {
            boxShadow: '0 0 0 4px rgb(80 37 196 / 5%)',
            backgroundColor: '#fff',
            border: '1px solid rgba(80,37,196,.5)',
          },
        }}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <Stack direction="row" spacing={2} sx={{ cursor: 'pointer' }}>
          <Box sx={{ textAlign: 'center' }} py={1}>
            <Tooltip placement="left" title="Copy link to clipboard." arrow>
              <Typography
                variant="body2"
                sx={{ padding: '0.5em 0', color: appColors.darkGray }}
                fontWeight={600}
                // onClick={(e) => handleTaskOpen(e, task?.id, task?.rel_type)}
                onClick={(e) => handleCopyLink(e, task?.id, task?.rel_type)}
              >
                #AW-{task?.id}
              </Typography>
            </Tooltip>
            <Button
              disableElevation
              variant="contained"
              sx={{
                borderRadius: '0 3px 3px 0',
                backgroundColor:
                  appColors.status[
                    _.camelCase(task?.status?.replace(/_/g, ' '))
                  ],
                '&:hover': {
                  backgroundColor:
                    appColors.status[
                      _.camelCase(task?.status?.replace(/_/g, ' '))
                    ],
                },
                textTransform: 'capitalize',
                width: '120px',
              }}
              onClick={(e) =>
                handleClick(e, 'status', {
                  type: 'status',
                  taskId: task?.id,
                  selectedId: task?.status_id,
                  isParent: task?.rel_type === 'task',
                })
              }
            >
              <Typography
                sx={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  textDecoration: 'none',
                  color: '#fff',
                  padding: '0.2em 0',
                }}
                fontWeight={600}
                variant="body2"
              >
                {task?.status?.replace(/_/g, ' ')}
              </Typography>
            </Button>
          </Box>
          <Box
            py={1}
            sx={{ width: '-webkit-fill-available' }}
            onClick={(e) => handleTaskOpen(e, task?.id, task?.rel_type)}
          >
            <StyledTypography
              fontWeight={800}
              variant="h6"
              sx={
                !isHover
                  ? {
                      WebkitTextFillColor: 'transparent',
                      MozTextFillColor: 'transparent',
                    }
                  : {
                      WebkitTextFillColor: 'inherit',
                      MozTextFillColor: 'inherit',
                    }
              }
              dangerouslySetInnerHTML={{
                __html:
                  task?.rel_type?.toLowerCase() === 'task'
                    ? `${task?.name?.split(' - ').slice(0, -1).join(' - ')} - ${
                        task?.channel
                      } `
                    : `${task?.name} - ${task?.channel}`,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(0,0,0,.5)',
                display: '-webkit-box',
                WebkitLineClamp: '1',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                paddingRight: '6em',
              }}
            >
              {_.isEmpty(task?.description)
                ? '--'
                : task?.description?.replace(/(<([^>]+)>)/gi, '')}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" mt={1}>
              <Tooltip title="Partner Group" arrow>
                <Box sx={{ display: 'flex' }}>
                  <Chip
                    sx={{
                      borderRadius: '4px',
                      border: '1px solid rgb(0 0 0 / 20%)',
                      color: 'rgb(0 0 0 / 42%)',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                    label={task?.partner_name}
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </Tooltip>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ borderColor: 'rgb(0 0 0 / 5%)' }}
              />
              <Tooltip title={task?.channel ?? ''} arrow>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Box
                    sx={{
                      width: '14.85px',
                      height: '14.85px',
                      display: 'flex',
                    }}
                  >
                    {task?.channel?.toLowerCase().includes('google')
                      ? channelIcons.google
                      : task?.channel?.toLowerCase().includes('facebook')
                      ? channelIcons.facebook
                      : channelIcons.youtube}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                    }}
                  >
                    {task?.channel?.toLowerCase().includes('display') ||
                    task?.channel?.toLowerCase().includes('static') ? (
                      <PhotoLibraryOutlinedIcon
                        sx={{ color: 'rgb(0 0 0 / 42%)' }}
                      />
                    ) : task?.channel?.toLowerCase().includes('video') ? (
                      <VideocamOutlinedIcon
                        sx={{ color: 'rgb(0 0 0 / 42%)' }}
                      />
                    ) : (
                      <VideocamOutlinedIcon
                        sx={{ color: 'rgb(0 0 0 / 42%)' }}
                      />
                    )}
                  </Box>
                </Stack>
              </Tooltip>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ borderColor: 'rgb(0 0 0 / 5%)' }}
              />
              <Tooltip title="Thread Count" arrow>
                <Stack direction="row" alignItems="center" spacing={1} pt={0.5}>
                  <CommentOutlinedIcon sx={{ color: 'rgb(0 0 0 / 30%)' }} />
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgb(0 0 0 / 40%)' }}
                  >
                    {task?.thead_count}
                  </Typography>
                </Stack>
              </Tooltip>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ borderColor: 'rgb(0 0 0 / 5%)' }}
              />
              <Tooltip
                title={
                  !_.isEmpty(task?.submitted_date)
                    ? moment(new Date(task?.submitted_date)).format('LLL')
                    : ''
                }
                arrow
              >
                <Stack direction="row" alignItems="center" spacing={1} pt={0.5}>
                  <FlightTakeoffRoundedIcon
                    sx={{ color: 'rgb(0 0 0 / 30%)' }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgb(0 0 0 / 40%)' }}
                  >
                    {_.isEmpty(task?.submitted_date)
                      ? 'Submitted date not specified.'
                      : `Submitted ${moment(new Date(task?.submitted_date))
                          .startOf('hour')
                          .fromNow()}`}
                  </Typography>
                </Stack>
              </Tooltip>
              {!_.isEmpty(task?.tags) && (
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ borderColor: 'rgb(0 0 0 / 5%)' }}
                />
              )}

              <Box sx={{ display: 'flex' }}>
                {_.isEmpty(task?.tags) &&
                  task?.tags?.map((data, index) => (
                    <Chip
                      key={index}
                      sx={{
                        borderRadius: '4px',
                        border: '1px dashed rgb(0 0 0 / 20%)',
                        color: 'rgb(0 0 0 / 42%)',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                      label={task?.partner_name}
                      variant="outlined"
                      size="small"
                    />
                  ))}
              </Box>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ borderColor: 'rgba(80,37,196,.1)' }} />
        <CardActions
          sx={{
            backgroundColor: '#f1edff3b',
            padding: 0,
            alignItems: 'flex-start',
            '&.MuiCardActions-root>:not(:first-of-type)': {
              marginLeft: 0,
              display: 'flex',
              justifyContent: 'space-evenly',
            },
          }}
        >
          <Stack sx={{ width: '4%' }}>
            <IconButton
              disableRipple
              disableFocusRipple
              disableTouchRipple
              onClick={() =>
                onTaskUpdate('favorite', {
                  is_parent: task?.rel_type === 'task' ? 1 : 0,
                  id: task?.id,
                  key: 'pin',
                  value: '',
                })
              }
              sx={{
                borderRadius: 0,
                padding: '1.6px 1.6px ',
                height: '1.9em',
                '&:hover': { backgroundColor: '#a28be021' },
              }}
            >
              {task?.is_pinned ? (
                <Star
                  sx={{
                    color: appColors.favorited,
                  }}
                />
              ) : (
                <StarOutlineOutlinedIcon />
              )}
            </IconButton>
          </Stack>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: 'rgba(80,37,196,.1)' }}
          />
          {/* <Stack px={0.2} mt={0.2} sx={{ width: '4%' }}>
            <IconButton
              onClick={(e) => handleClick(e, 'bulk_save')}
              sx={{
                height: '1.8em',
                '&:hover': { backgroundColor: '#a28be021' },
              }}
            >
              <PendingOutlinedIcon />
            </IconButton>
          </Stack> 
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: 'rgba(80,37,196,.1)' }}
          />
          */}
          <Stack
            sx={{
              width: '14.666%',
              cursor: 'pointer',
              height: '2.8em',
              '&:hover': { backgroundColor: '#a28be021' },
            }}
            px={1}
            justifyContent="flex-start"
            alignItems="flex-start"
            onClick={(e) =>
              handleClick(e, 'assignees', {
                taskId: task?.id,
                selectedAssignees: task?.assignees.map((a) => ({
                  ...a,
                  user_id: null,
                  id: Number(a.user_id ?? a.id),
                })),
                isParent: task?.rel_type === 'task',
              })
            }
          >
            <Typography variant="caption" fontWeight={700} color="secondary">
              Assignee
            </Typography>

            {_.isEmpty(task?.assignees) ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="caption" fontWeight={700}>
                  --
                </Typography>
              </Stack>
            ) : (
              <AvatarGroup
                sx={{
                  '& .MuiAvatar-root': {
                    width: 20,
                    height: 20,
                    fontSize: 12,
                    marginLeft: 0,
                  },
                }}
                max={5}
              >
                {!_.isEmpty(task?.assignees) &&
                  task?.assignees?.map((user, index) => (
                    <Tooltip key={index} title={user?.name ?? ''} arrow>
                      {!_.isEmpty(user?.avatar) &&
                      !_.isNull(user?.avatar) &&
                      user?.avatar?.split('/').pop() !== 'thumb_' ? (
                        <Avatar
                          sx={{ width: 12, height: 12 }}
                          alt={user?.name}
                          src={user?.avatar}
                        />
                      ) : (
                        <Avatar sx={{ width: 12, height: 12 }}>
                          {`${(user?.name ?? user?.username).split(' ')[0][0]}${
                            !_.isEmpty(
                              (user?.name ?? user?.username).split(' ')[1][0]
                            )
                              ? (user?.name ?? user?.username).split(' ')[1][0]
                              : ''
                          }`}
                        </Avatar>
                      )}
                    </Tooltip>
                  ))}
              </AvatarGroup>
            )}
          </Stack>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: 'rgba(80,37,196,.1)' }}
          />
          <Stack
            sx={{ width: '16.666%', height: '2.8em' }}
            px={1}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Typography
              variant="caption"
              fontWeight={700}
              color={appColors.darkGray}
            >
              Submitted By
            </Typography>
            {!_.isEmpty(task?.submitted_by) ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <AvatarGroup
                  sx={{
                    '& .MuiAvatar-root': {
                      width: 20,
                      height: 20,
                      fontSize: 12,
                    },
                  }}
                  max={5}
                >
                  {!_.isEmpty(task?.submitted_by?.avatar) &&
                  task?.submitted_by?.avatar?.split('/').pop() !== 'thumb_' ? (
                    <Avatar
                      sx={{ width: 12, height: 12 }}
                      alt={task?.submitted_by?.name}
                      src={task?.submitted_by?.avatar}
                    />
                  ) : (
                    <Avatar sx={{ width: 12, height: 12 }}>
                      {`${task?.submitted_by?.name.split(' ')[0][0]}${
                        !_.isEmpty(task?.submitted_by?.name.split(' ')[1][0])
                          ? task?.submitted_by?.name.split(' ')[1][0]
                          : ''
                      }`}
                    </Avatar>
                  )}
                </AvatarGroup>
                <Typography
                  variant="caption"
                  fontWeight={700}
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textTransform: 'capitalize',
                  }}
                >
                  {task?.submitted_by?.name?.toLowerCase().includes('ad-weave')
                    ? 'Ad-Weave Bot'
                    : task?.submitted_by?.name}
                </Typography>
              </Stack>
            ) : (
              <Stack direction="row" spacing={1} alignItems="center">
                <OverflowTypography variant="caption" fontWeight={700}>
                  --
                </OverflowTypography>
              </Stack>
            )}
          </Stack>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: 'rgba(80,37,196,.1)' }}
          />
          <Stack
            sx={{
              width: '14.666%',
              cursor: 'pointer',
              height: '2.8em',
              '&:hover': { backgroundColor: '#a28be021' },
            }}
            px={1}
            justifyContent="flex-start"
            alignItems="flex-start"
            onClick={(e) =>
              handleClick(e, 'priority', {
                taskId: task?.id,
                selectedId: task?.priority_id,
                relType: task?.rel_type,
                isParent: task?.rel_type === 'task',
              })
            }
          >
            <Typography variant="caption" fontWeight={700} color="secondary">
              Priority
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="caption" fontWeight={700}>
                {task?.priority}
              </Typography>
            </Stack>
          </Stack>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: 'rgba(80,37,196,.1)' }}
          />
          <Stack
            sx={{ width: '16.666%' }}
            px={1}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Typography
              variant="caption"
              fontWeight={700}
              color={appColors.darkGray}
            >
              Task Type
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <OverflowTypography variant="caption" fontWeight={700}>
                {task?.task_type}
              </OverflowTypography>
            </Stack>
          </Stack>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: 'rgba(80,37,196,.1)' }}
          />
          <Tooltip
            title={
              _.isEmpty(task?.due_date)
                ? ''
                : moment(new Date(task?.due_date)).format('LLL')
            }
            arrow
          >
            <Stack
              px={1}
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{
                width: '14.666%',
                cursor: 'pointer',
                height: '2.8em',
                '&:hover': { backgroundColor: '#a28be021' },
              }}
              onClick={(e) =>
                handleClick(e, 'due', {
                  type: 'due_date',
                  taskId: task?.id,
                  selectedDate: task?.due_date,
                  isParent: task?.rel_type === 'task',
                })
              }
            >
              <Typography variant="caption" fontWeight={700} color="secondary">
                Due
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="caption" fontWeight={700}>
                  {_.isEmpty(task?.due_date)
                    ? '--'
                    : moment(new Date(task?.due_date))
                        .startOf('hour')
                        .fromNow()}
                </Typography>
              </Stack>
            </Stack>
          </Tooltip>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: 'rgba(80,37,196,.1)' }}
          />
          <Tooltip
            title={
              _.isEmpty(task?.delivery_date)
                ? ''
                : moment(new Date(task?.delivery_date)).format('LLL')
            }
            arrow
          >
            <Stack
              px={1}
              justifyContent="flex-start"
              alignItems="flex-start"
              sx={{
                width: '14.666%',
                cursor: 'pointer',
                height: '2.8em',
                '&:hover': { backgroundColor: '#a28be021' },
              }}
              onClick={(e) =>
                handleClick(e, 'delivery', {
                  type: 'delivery_date',
                  taskId: task?.id,
                  selectedDate: task?.delivery_date,
                  isParent: task?.rel_type === 'task',
                })
              }
            >
              <Typography variant="caption" fontWeight={700} color="secondary">
                Delivery
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="caption" fontWeight={700}>
                  {_.isEmpty(task?.delivery_date)
                    ? '--'
                    : moment(new Date(task?.delivery_date))
                        .startOf('hour')
                        .fromNow()}
                </Typography>
              </Stack>
            </Stack>
          </Tooltip>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: 'rgba(80,37,196,.1)' }}
          />
          <Tooltip
            title={
              task?.rel_type?.toLowerCase() === 'task'
                ? 'Parent Task'
                : 'Subtask'
            }
            arrow
          >
            <Stack
              sx={{
                width: '4%',
                height: '42.49px',
              }}
            >
              <IconButton
                size="small"
                sx={{
                  '&:hover': { background: 'transparent' },
                  cursor: 'default',
                }}
                disableRipple
                disableFocusRipple
                disableTouchRipple
              >
                <CircleIcon
                  sx={{
                    color:
                      task?.rel_type?.toLowerCase() === 'task'
                        ? appColors.dashboard.error
                        : appColors.dashboard.secondary,
                  }}
                />
              </IconButton>
            </Stack>
          </Tooltip>
        </CardActions>
      </Card>
      {!range ? (
        <Divider
          sx={{ margin: '0.8em 0', borderColor: 'rgb(0, 0, 0, 0.05)' }}
        />
      ) : (
        <Divider sx={{ margin: '0.8em 0', opacity: 0 }} />
      )}

      {ended && (
        <Stack pt={3.5} justifyContent="center" direction="row" spacing={1}>
          <CircleIcon
            sx={{
              color: '#5025c47d',
              boxShadow: '0px 0px 5px 0px rgb(80 37 196 / 75%)',
              borderRadius: '50%',
            }}
          />
          <CircleIcon
            sx={{
              color: '#5025c47d',
              boxShadow: '0px 0px 5px 0px rgb(80 37 196 / 75%)',
              borderRadius: '50%',
            }}
          />
          <CircleIcon
            sx={{
              color: '#5025c47d',
              boxShadow: '0px 0px 5px 0px rgb(80 37 196 / 75%)',
              borderRadius: '50%',
            }}
          />
        </Stack>
      )}
    </Box>
  );
}

Cards.propTypes = {
  task: PropTypes.any,
  onTaskUpdate: PropTypes.func,
  handleClick: PropTypes.func,
  handleCopyLink: PropTypes.func,
  handleTaskOpen: PropTypes.func,
  range: PropTypes.any,
  ended: PropTypes.any,
};
