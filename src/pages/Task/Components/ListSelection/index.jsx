import PropTypes from 'prop-types';

import _ from 'lodash';

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';

import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  Button,
} from '@mui/material';

import { digitFormatter } from 'utils/primitives';

import AssistantPhotoRoundedIcon from '@mui/icons-material/AssistantPhotoRounded';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';

import { appColors } from 'theme/variables';

import 'react-circular-progressbar/dist/styles.css';

export default function ListSelection({
  option,
  type,
  rel,
  isParent,
  isAssigned,
  selected,
  taskId,
  timer,
  timerState,
  handleSave,
  handleClose,
  handleThreadOptions,
  handlePlayPauseButtonClick,
  handleStopButtonClick,
}) {
  const handleListItemClick = (event, index) => {
    event.preventDefault();

    if (rel === 'campaign') {
      handleSave({
        id: taskId,
        type: rel,
        key: type,
        value: index,
      });
    } else {
      handleSave({
        is_parent: isParent,
        id: taskId,
        key: type,
        value: index,
      });
    }

    handleClose();
  };

  switch (type) {
    case 'priority':
      return (
        <Box>
          {_.isEmpty(option) ? (
            'No Options Available'
          ) : (
            <List component="nav" dense={true}>
              {option?.map((option, index) => (
                <ListItemButton
                  key={index}
                  onClick={(event) => handleListItemClick(event, option?.id)}
                  selected={option?.id === Number(selected)}
                  sx={{
                    '&.Mui-selected': { backgroundColor: '#5025c41a' },
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <AssistantPhotoRoundedIcon
                      sx={{
                        color: appColors.priority[option?.name.toLowerCase()],
                      }}
                    />
                    <ListItemText
                      primary={option?.name}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Stack>
                </ListItemButton>
              ))}
            </List>
          )}
        </Box>
      );

    case 'status':
      return (
        <Box>
          {_.isEmpty(option) ? (
            'No Options Available'
          ) : (
            <List component="nav" dense={true}>
              {option?.map((option, index) => (
                <ListItemButton
                  key={index}
                  onClick={(event) => handleListItemClick(event, option?.id)}
                  sx={{
                    padding: '0.5em 16px',
                    '&.Mui-selected': { backgroundColor: '#5025c41a' },
                  }}
                  selected={option?.id === Number(selected)}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <SquareRoundedIcon
                      sx={{
                        color:
                          appColors.status[
                            _.camelCase(
                              option?.name?.toLowerCase().replace(/_/g, ' ')
                            )
                          ],
                      }}
                    />
                    <ListItemText
                      primary={option?.name}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Stack>
                </ListItemButton>
              ))}
            </List>
          )}
        </Box>
      );

    case 'timelog':
      return (
        <Stack py={2} spacing={0.5} alignItems="center">
          <Box sx={{ width: 130, height: 130 }} mx={4}>
            <CircularProgressbarWithChildren
              value={timerState?.isOverdue ? 0 : timer.progress}
              styles={buildStyles({
                trailColor: '#fccccc',
                pathColor: '#25165B',
              })}
            >
              <Stack alignItems="center">
                <Typography fontWeight={700}>
                  {timerState?.isOverdue
                    ? '00:00:00'
                    : `${digitFormatter(
                        timer.days * 24 + timer.hours
                      )}:${digitFormatter(timer.minutes)}:${digitFormatter(
                        timer.seconds
                      )}`}
                </Typography>
                <Typography variant="caption">Time Left</Typography>
              </Stack>
            </CircularProgressbarWithChildren>
          </Box>
          <Box>
            <Typography fontWeight={700} color="secondary">
              {`${digitFormatter(timer.stopwatchHours)}:${digitFormatter(
                timer.stopwatchMinutes
              )}:${digitFormatter(timer.stopwatchSeconds)}`}
            </Typography>
          </Box>
          {isAssigned && (
            <>
              <Box width="100%" px={4}>
                <Button
                  sx={{ width: '100%' }}
                  size="small"
                  disableElevation
                  // disableRipple
                  variant="contained"
                  startIcon={<PlayCircleOutlineIcon />}
                  onClick={handlePlayPauseButtonClick}
                >
                  {timerState.isRunning
                    ? 'Pause Time'
                    : timerState.isPaused
                    ? 'Play Time'
                    : 'Start Time'}
                </Button>
              </Box>
              {(timerState.isRunning || timerState.isPaused) && (
                <Box width="100%" px={4}>
                  <Button
                    sx={{ width: '100%' }}
                    size="small"
                    disableElevation
                    // disableRipple
                    variant="outlined"
                    startIcon={<StopCircleOutlinedIcon />}
                    onClick={handleStopButtonClick}
                  >
                    Stop Time
                  </Button>
                </Box>
              )}
            </>
          )}
        </Stack>
      );
    default:
      return (
        <Box px={0.5}>
          {_.isEmpty(option) ? (
            'No Options Available'
          ) : (
            <List component="nav" dense={true}>
              {option?.map((option, index) => (
                <ListItemButton
                  key={index}
                  onClick={(e) => handleThreadOptions(e, option?.key, taskId)}
                  sx={{
                    '&.Mui-selected': { backgroundColor: '#5025c41a' },
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    {option?.icon}
                    <ListItemText
                      primary={option?.name}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Stack>
                </ListItemButton>
              ))}
            </List>
          )}
        </Box>
      );
  }
}

ListSelection.propTypes = {
  rel: PropTypes.any,
  option: PropTypes.any,
  type: PropTypes.string,
  selected: PropTypes.any,
  taskId: PropTypes.any,
  timer: PropTypes.any,
  timerState: PropTypes.any,
  isParent: PropTypes.any,
  isAssigned: PropTypes.any,
  handleSave: PropTypes.func,
  handleClose: PropTypes.func,
  handleThreadOptions: PropTypes.func,
  handlePlayPauseButtonClick: PropTypes.func,
  handleStopButtonClick: PropTypes.func,
};
