import { useContext } from 'react';

import _ from 'lodash';

import PropTypes from 'prop-types';

// Context
import TaskContext from 'pages/Task/Context';

import {
  Stack,
  Avatar,
  Typography,
  Box,
  IconButton,
  Button,
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const CommentHeader = ({
  user,
  createdDate,
  commentRelType,
  options,
  isEdited,
  status,
  threadId,
  thread,
  comment,
}) => {
  // context
  const { handleOpen } = useContext(TaskContext);

  switch (commentRelType) {
    case 'additional_info':
      return (
        <Stack px={1.5} py={1} direction="row" justifyContent="space-between">
          <Stack spacing={1.5} direction="row" alignItems="center">
            {!_.isEmpty(user?.avatar) &&
            user?.avatar?.split('/').pop() !== 'thumb_' ? (
              <Avatar
                sx={{ border: '3px solid #fff' }}
                alt={user?.name}
                src={user?.avatar}
              />
            ) : (
              <Avatar sx={{ border: '3px solid #fff' }}>
                {`${user?.name?.split(' ')[0][0]}${
                  !_.isEmpty(user?.name?.split(' ')[1][0])
                    ? user?.name?.split(' ')[1][0]
                    : ''
                }`}
              </Avatar>
            )}
            <Stack justifyContent="center">
              <Typography
                variant="body1"
                component="div"
                fontWeight={700}
                textTransform="capitalize"
              >
                {user?.name?.toLowerCase().includes('ad-weave')
                  ? 'Ad-Weave'
                  : user?.name}
              </Typography>
              <Stack
                direction="row"
                mt={'-0.5em'}
                spacing={0.5}
                alignItems="center"
              >
                <Typography variant="caption">{createdDate}</Typography>
                {isEdited && (
                  <FiberManualRecordIcon
                    size="small"
                    sx={{ width: '5px', height: '5px' }}
                  />
                )}
                {isEdited && <Typography variant="caption">Edited</Typography>}
              </Stack>
            </Stack>
          </Stack>

          <Box>
            <IconButton
              onClick={(e) => handleOpen(e, 'right', commentRelType, options)}
            >
              <MoreHorizIcon />
            </IconButton>
          </Box>
        </Stack>
      );

    case 'task':
    case 'subtask':
      return (
        <Stack px={1.5} py={1} direction="row" justifyContent="space-between">
          <Stack spacing={1.5} direction="row" alignItems="center">
            {!_.isEmpty(user?.avatar) &&
            user?.avatar?.split('/').pop() !== 'thumb_' ? (
              <Avatar
                sx={{ border: '3px solid #fff' }}
                alt={user?.name}
                src={user?.avatar}
              />
            ) : (
              <Avatar sx={{ border: '3px solid #fff' }}>
                {`${user?.name?.split(' ')[0][0]}${
                  !_.isEmpty(user?.name?.split(' ')[1][0])
                    ? user?.name?.split(' ')[1][0]
                    : ''
                }`}
              </Avatar>
            )}
            <Stack justifyContent="center">
              <Typography
                variant="body1"
                component="div"
                fontWeight={700}
                textTransform="capitalize"
              >
                {user?.name?.toLowerCase().includes('ad-weave')
                  ? 'Ad-Weave'
                  : user?.name}
              </Typography>
              <Stack
                direction="row"
                mt={'-0.5em'}
                spacing={0.5}
                alignItems="center"
              >
                <Typography variant="caption">{createdDate}</Typography>
                {isEdited && (
                  <FiberManualRecordIcon
                    size="small"
                    sx={{ width: '5px', height: '5px' }}
                  />
                )}
                {isEdited && <Typography variant="caption">Edited</Typography>}
              </Stack>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Box>
              {!_.isNull(status?.status) && (
                <Button
                  startIcon={
                    status?.status?.toLowerCase() === 'rejected' ? (
                      <CancelIcon />
                    ) : (
                      <CheckCircleIcon />
                    )
                  }
                  size="small"
                  color={
                    status?.status?.toLowerCase() === 'rejected'
                      ? 'error'
                      : 'success'
                  }
                  variant="text"
                  disableRipple
                  disableElevation
                >
                  {status?.status}
                </Button>
              )}
            </Box>
            <Box>
              {!_.isEmpty(options) && !_.isUndefined(options) && (
                <IconButton
                  onClick={(e) =>
                    handleOpen(
                      e,
                      'right',
                      commentRelType,
                      options,
                      threadId,
                      null,
                      null,
                      {
                        user: {
                          name: user?.name ?? '',
                          avatar: user?.avatar ?? '',
                        },
                        list: thread?.edit_history ?? [],
                      }
                    )
                  }
                >
                  <MoreHorizIcon />
                </IconButton>
              )}
            </Box>
          </Stack>
        </Stack>
      );

    default:
      return (
        <Stack px={1.5} py={1} direction="row" justifyContent="space-between">
          <Stack spacing={1.5} direction="row" alignItems="center">
            {!_.isEmpty(user?.avatar) &&
            user?.avatar?.split('/').pop() !== 'thumb_' ? (
              <Avatar
                sx={{ border: '3px solid #fff' }}
                alt={user?.name}
                src={user?.avatar}
              />
            ) : (
              <Avatar sx={{ border: '3px solid #fff' }}>
                {`${user?.name?.split(' ')[0][0]}${
                  !_.isEmpty(user?.name?.split(' ')[1][0])
                    ? user?.name?.split(' ')[1][0]
                    : ''
                }`}
              </Avatar>
            )}
            <Stack justifyContent="center">
              <Typography
                variant="body1"
                component="div"
                fontWeight={700}
                textTransform="capitalize"
              >
                {user?.name?.toLowerCase().includes('ad-weave')
                  ? 'Ad-Weave'
                  : user?.name}
              </Typography>
              <Stack
                direction="row"
                mt={'-0.5em'}
                spacing={0.5}
                alignItems="center"
              >
                <Typography variant="caption">{createdDate}</Typography>
                {isEdited && (
                  <FiberManualRecordIcon
                    size="small"
                    sx={{ width: '5px', height: '5px' }}
                  />
                )}
                {isEdited && <Typography variant="caption">Edited</Typography>}
              </Stack>
            </Stack>
          </Stack>

          {!_.isEmpty(options) && !_.isUndefined(options) && (
            <Stack direction="row" spacing={1}>
              <Box>
                <IconButton
                  onClick={(e) =>
                    handleOpen(e, 'right', commentRelType, options, threadId)
                  }
                >
                  <MoreHorizIcon />
                </IconButton>
              </Box>
            </Stack>
          )}
        </Stack>
      );
  }
};

CommentHeader.propTypes = {
  user: PropTypes.any,
  createdDate: PropTypes.any,
  commentRelType: PropTypes.any,
  options: PropTypes.array,
  status: PropTypes.any,
  isEdited: PropTypes.any,
  threadId: PropTypes.any,
  thread: PropTypes.any,
  comment: PropTypes.any,
};

export default CommentHeader;
