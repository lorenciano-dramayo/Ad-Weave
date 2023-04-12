import React from 'react';

import _ from 'lodash';

import PropTypes from 'prop-types';

import moment from 'moment';

// MUI Components
import { Stack, Box } from '@mui/material';

// MUI Icons
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';

export default function DateRange({ startDate, endDate }) {
  return (
    <div>
      <Stack
        direction="row"
        border
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        sx={{
          fontSize: '16px',
          lineHeight: '22px',
          fontWeight: 400,
          color: 'rgba(0,0,0,.65)',
          padding: '0 24px',
          border: '1px solid #d9d9d9',
          width: '100%',
          height: '48px',
          borderRadius: '4px',
          ':hover': {
            border: '1px solid rgba(80,37,196,.5)',
            boxShadow: '0 0 0 4px rgb(80 37 196 / 5%)',
          },
        }}
      >
        <Box width="94.93px" textAlign="center">
          {_.isEmpty(startDate) ? 'Mm Dd, YYYY' : moment(startDate).format('ll')}
        </Box>
        <EastOutlinedIcon />
        <Box width="94.93px" textAlign="center">
          {_.isEmpty(endDate) ? 'Mm Dd, YYYY' : moment(endDate).format('ll')}
        </Box>
        <DateRangeOutlinedIcon />
      </Stack>
    </div>
  );
}

DateRange.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};
