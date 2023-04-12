import { useContext } from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { Grid, Button, Stack, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Animation, EventTracker } from '@devexpress/dx-react-chart';
import './style.css';
import { confidence as chartDummyData } from './data';

import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

import TimerSheetContext from 'pages/TimerSheet/Context';
import PropTypes from 'prop-types';

import _ from 'lodash';
import { formatDate } from 'utils/date';
import appTheme from 'theme';

const valueAxisTickFormat = () => (tick) => `${tick}h`;

const generatedChartData = (data) =>
  _.isEmpty(data)
    ? []
    : data.map((c) => ({
        date: formatDate(c.created_at, 'ddd, MMM DD, yyyy'),
        totalTime: parseFloat(c.total_decmial ?? '0.0'),
      }));

export default function LineGraph() {
  const { chartData, filterChartSelectedDropdown, handlePopper } =
    useContext(TimerSheetContext);

  return (
    <Stack spacing={3} sx={{ padding: '40px 35px 20px 35px !important' }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" fontWeight={700} color="primary">
          Chart
        </Typography>
        <Box>
          <Button
            startIcon={
              <CategoryOutlinedIcon sx={{ fontSize: '14px !important' }} />
            }
            sx={{
              height: '-webkit-fill-available',
              textTransform: 'capitalize',
              padding: '4.446px 12px',
              borderRadius: '3px',
            }}
            variant="contained"
            color="secondary"
            disableElevation
            onClick={(e) => handlePopper(e, 'dropdown')}
            size="small"
          >
            {_.isNull(filterChartSelectedDropdown) ? (
              <Typography fontWeight={800} color="white" fontSize="1em">
                {'Filter by'}
              </Typography>
            ) : (
              <Stack direction="row" alignItems="center" spacing={0.8}>
                <Typography fontSize="1em" color="white" fontWeight={800}>
                  {'Filter by: '}
                </Typography>
                <Box>{`${filterChartSelectedDropdown.name}`}</Box>
              </Stack>
            )}
          </Button>
        </Box>
      </Stack>
      <Chart data={generatedChartData(chartData)}>
        {/* X Axis */}
        <ArgumentAxis />

        {/* Y Axis */}
        <ValueAxis tickFormat={valueAxisTickFormat} />

        <LineSeries
          name="Total time"
          valueField="totalTime"
          argumentField="date"
          color={appTheme.palette.secondary.main}
        />
        <EventTracker />
        {/* <Animation /> */}
      </Chart>
    </Stack>
  );
}

LineGraph.propTypes = {};
