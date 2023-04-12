import _ from 'lodash';

import PropTypes from 'prop-types';

import { digitFormatter } from 'utils/primitives';

// MUI Components
import {
  Stack,
  Box,
  Button,
  Typography,
  IconButton,
  Divider,
  AvatarGroup,
  Avatar,
  styled,
  Tooltip,
} from '@mui/material';

// MUI Icons
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteIcon from '@mui/icons-material/Star';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

// Colors
import { appColors } from 'theme/variables';

const StyledDivider = styled(Divider)({
  borderStyle: 'dashed',
});

const Header = ({
  taskId,
  relType,
  status,
  statusId,
  assigneesList,
  priority,
  priorityList,
  priorityId,
  statusList,
  usersList,
  watcherList,
  timer,
  isPinned,
  isParent,
  isAssigned,
  handleOpen,
  handlePin,
}) => {
  return (
    <Stack p={2} direction="row" justifyContent="space-between">
      <Stack spacing={2} direction="row">
        <Button
          size="small"
          sx={{
            minWidth: '10em',
            backgroundColor:
              appColors.status[_.camelCase(status?.replace(/_/g, ' '))],
            color: '#fff',
            textTransform: 'capitalize',
            '&:hover': {
              backgroundColor:
                appColors.status[_.camelCase(status?.replace(/_/g, ' '))],
            },
          }}
          onClick={(e) =>
            handleOpen(e, 'left', 'status', statusList, statusId, relType)
          }
        >
          {status?.replace(/_/g, ' ')}
        </Button>
        <StyledDivider orientation="vertical" variant="middle" flexItem />
        <Box display="flex" alignItems="center">
          <Tooltip title="Priority" arrow>
            <IconButton
              size="small"
              onClick={(e) =>
                handleOpen(
                  e,
                  'left',
                  'priority',
                  priorityList,
                  priorityId,
                  relType
                )
              }
            >
              <AssistantPhotoIcon
                sx={{
                  color:
                    appColors.priority[_.camelCase(priority?.toLowerCase())],
                  width: '1.5em',
                  height: '1.5em',
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
        <StyledDivider orientation="vertical" variant="middle" flexItem />
        <Box display="flex">
          <Tooltip title="Assignees" arrow>
            <Box
              onClick={(e) =>
                handleOpen(
                  e,
                  'left',
                  'assignees',
                  usersList,
                  assigneesList,
                  relType
                )
              }
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {!_.isEmpty(assigneesList) ? (
                <AvatarGroup
                  max={3}
                  sx={{
                    '& .MuiAvatar-root': {
                      width: 24,
                      height: 24,
                      fontSize: 15,
                    },
                  }}
                >
                  {assigneesList?.map((data, index) => {
                    return data?.avatar?.split('/').pop() !== 'thumb_' ||
                      !_.isEmpty(data?.avatar) ? (
                      <Avatar
                        sx={{ width: 24, height: 24 }}
                        alt={data?.name?.toUpperCase()}
                        src={data?.avatar}
                        key={index}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          fontSize: '1em',
                        }}
                        key={index}
                      >
                        {`${data?.name?.toUpperCase().split(' ')[0][0]}${
                          data?.name?.toUpperCase().split(' ')[1][0]
                        }`}
                      </Avatar>
                    );
                  })}
                </AvatarGroup>
              ) : (
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    backgroundColor: '#ffffff',
                    border: '1px dashed #25165b',
                    color: '#25165b',
                  }}
                >
                  <PersonAddAltIcon />
                </Avatar>
              )}
            </Box>
          </Tooltip>
        </Box>
      </Stack>
      <Stack spacing={2} direction="row">
        <Stack direction="row" alignItems="center">
          <Typography fontWeight={600} color="primary">
            {isAssigned
              ? `${digitFormatter(timer.stopwatchHours)}:${digitFormatter(
                  timer.stopwatchMinutes
                )}:${digitFormatter(timer.stopwatchSeconds)}`
              : '00:00:00'}
          </Typography>
          <Box display="flex" alignItems="center">
            <Tooltip title="Timelog" arrow>
              <IconButton
                size="small"
                onClick={(e) => handleOpen(e, 'right', 'timelog', null)}
              >
                <WatchLaterOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
        <StyledDivider orientation="vertical" variant="middle" flexItem />
        <Box
          onClick={(e) =>
            handleOpen(e, 'right', 'watcher', usersList, watcherList, relType)
          }
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Tooltip title="Watchers" arrow>
            {!_.isEmpty(watcherList) ? (
              <AvatarGroup
                max={3}
                sx={{
                  '& .MuiAvatar-root': {
                    width: 24,
                    height: 24,
                    fontSize: 11,
                    marginLeft: '-6px',
                  },
                  cursor: 'pointer',
                }}
              >
                {watcherList?.map((data, index) => {
                  return data?.avatar?.split('/').pop() !== 'thumb_' ||
                    !_.isEmpty(data?.avatar) ? (
                    <Avatar
                      sx={{ width: 24, height: 24 }}
                      alt={data?.username.toUpperCase()}
                      src={data?.avatar}
                      key={index}
                    />
                  ) : (
                    <Avatar
                      sx={{
                        width: 24,
                        height: 24,
                        fontSize: '1em',
                      }}
                      key={index}
                    >
                      {`${data.username.toUpperCase().split(' ')[0][0]}${
                        data.username.toUpperCase().split(' ')[1][0]
                      }`}
                    </Avatar>
                  );
                })}
              </AvatarGroup>
            ) : (
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  backgroundColor: '#ffffff',
                  border: '1px dashed #25165b',
                  color: '#25165b',
                }}
              >
                <GroupAddIcon />
              </Avatar>
            )}
          </Tooltip>
        </Box>
        <StyledDivider orientation="vertical" variant="middle" flexItem />
        <Box display="flex" alignItems="center">
          <Tooltip title="Add to Favorite" arrow>
            <IconButton
              size="small"
              sx={{
                fontSize: 22,
                cursor: 'pointer',
                color: appColors.favorited,
              }}
              onClick={() => handlePin(taskId, relType, isParent)}
            >
              {!isPinned ? <StarBorderIcon /> : <FavoriteIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
    </Stack>
  );
};

Header.propTypes = {
  taskId: PropTypes.any,
  relType: PropTypes.any,
  status: PropTypes.any,
  statusId: PropTypes.any,
  priority: PropTypes.any,
  priorityId: PropTypes.any,
  assigneesList: PropTypes.any,
  priorityList: PropTypes.any,
  usersList: PropTypes.any,
  watcherList: PropTypes.any,
  statusList: PropTypes.any,
  timer: PropTypes.any,
  isAssigned: PropTypes.bool,
  isParent: PropTypes.bool,
  isPinned: PropTypes.bool,
  handleOpen: PropTypes.func,
  handlePin: PropTypes.func,
};

export default Header;
