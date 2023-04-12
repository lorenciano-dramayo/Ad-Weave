// React
import { memo, useEffect } from 'react';

import { useStopwatch } from 'react-timer-hook';

// MUI Components
import { Box, Stack, Typography } from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';

import { digitFormatter, timeDifference } from '../../../helper';

import _ from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';

function TimerControl({ timer, canStopTimer, onStart, onStop }) {
  const stopWatchConfigs = {
    autoStart: false,
    // Add offset
    offsetTimestamp:
      !_.isEmpty(timer) &&
      !_.isNull(timer) &&
      new Date(
        moment()
          .add(
            timeDifference(
              new Date(timer?.timeline[timer?.timeline?.length - 1]?.time_in),
              true
            ),
            's'
          )
          .format()
      ),
  };

  const { seconds, minutes, hours, isRunning, start, reset } =
    useStopwatch(stopWatchConfigs);

  const handleTimerControlButtonClick = () => {
    if (isRunning) {
      reset(null, false);
      onStop();
    } else {
      start();
      onStart();
    }
  };

  // Hooks
  useEffect(() => {
    if (!_.isEmpty(timer) && !_.isNull(timer)) {
      reset(stopWatchConfigs.offsetTimestamp, stopWatchConfigs.autoStart);
      start();
    }
  }, [timer]);

  return (
    <>
      {/* Countdown timer */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }} width={85}>
        <Typography variant="h6" fontWeight={700} color="primary">
          {`${digitFormatter(hours)}:${digitFormatter(
            minutes
          )}:${digitFormatter(seconds)}`}
        </Typography>
      </Box>

      {/* Controls */}
      <Stack direction="row" alignItems="center">
        <LoadingButton
          size="large"
          variant="contained"
          color="secondary"
          onClick={handleTimerControlButtonClick}
          disabled={isRunning && (!canStopTimer ?? false)}
        >
          {isRunning ? 'Stop' : 'Start'}
        </LoadingButton>
      </Stack>
    </>
  );
}

TimerControl.propTypes = {
  timer: PropTypes.any,
  canStopTimer: PropTypes.any,
  onStart: PropTypes.any,
  onStop: PropTypes.any,
};

export default memo(TimerControl);
