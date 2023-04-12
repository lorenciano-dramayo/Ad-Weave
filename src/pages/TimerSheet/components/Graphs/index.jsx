import React, { useContext } from 'react';

import { Grid, Paper, Divider, Button, Typography } from '@mui/material';

import LineGraph from 'pages/TimerSheet/components/LineGraph';
import PieGraph from 'pages/TimerSheet/components/PieGraph';
import TimerSheetContext from 'pages/TimerSheet/Context';

export default function Graphs() {
  const { statisticsData } = useContext(TimerSheetContext);
  return (
    <>
      <Paper className="line__graphHeight">
        <Grid container spacing={7} px={4} py={4}>
          <Grid item>
            <PieGraph
              data={{
                title: 'Total Logged Time',
                data: statisticsData.user_total,
              }}
            />
          </Grid>
          <Grid item>
            <PieGraph
              data={{
                title: 'Last Month Logged Time',
                data: statisticsData.last_month,
              }}
            />
          </Grid>
          <Grid item>
            <PieGraph
              data={{
                title: 'This Month Logged Time',
                data: statisticsData.this_month,
              }}
            />
          </Grid>
          <Grid item>
            <PieGraph
              data={{
                title: 'Last Week Logged Time',
                data: statisticsData.last_week,
              }}
            />
          </Grid>
          <Grid item>
            <PieGraph
              data={{
                title: 'This Week Logged Time',
                data: statisticsData.this_week,
              }}
            />
          </Grid>
        </Grid>
        <Divider />
        <LineGraph />
      </Paper>
    </>
  );
}
