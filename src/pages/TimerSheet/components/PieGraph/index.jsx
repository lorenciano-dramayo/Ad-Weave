import * as React from 'react';
import { Typography, Stack, Box } from '@mui/material';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { styled } from '@mui/material/styles';
import './style.css';

import PropTypes from 'prop-types';

const mockChartData = [
  { region: 'data1', val: 30 },
  { region: 'data2', val: 70 },
];

const StyledStack = styled(Stack)({
  display: ' -webkit-box;',
});

const StyledTypographyNum = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  letterSpacing: '-1px',
});

export default function PieGraph({ data }) {
  return (
    <Box className="pie__graphHeight">
      <Typography fontWeight={600} variant="h7">
        {data.title}
      </Typography>
      <StyledStack>
        <StyledTypographyNum variant="span">
          {data.data ?? '00:00'}
        </StyledTypographyNum>
        {/* <Chart data={data.chart ?? mockChartData}>
          <PieSeries
            valueField="val"
            argumentField="region"
            innerRadius={0.5}
          />

          <Animation />
        </Chart> */}
      </StyledStack>
    </Box>
  );
}

PieGraph.propTypes = {
  data: PropTypes.any,
};
