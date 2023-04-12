// React
import { memo } from 'react';

// MUI Components
import { Box, Stack, Typography, Divider } from '@mui/material';

import PropTypes from 'prop-types';
import { formatDate } from 'utils/date';

function List({ weekTitle, datasource, children }) {
  const { start_date } = datasource;

  const prettifyDate = (date) => {
    if (formatDate(new Date(), 'YYYY-MM-DD') === date) {
      return 'Today';
    } else if (
      formatDate(
        new Date(new Date().setDate(new Date().getDate() - 1)),
        'YYYY-MM-DD'
      ) === date
    ) {
      return 'Yesterday';
    } else {
      return formatDate(date, 'ddd, MMM DD');
    }
  };

  return (
    <Stack>
      {weekTitle && (
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography fontWeight={500}>{weekTitle}</Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Typography fontSize="0.9em" color="#a8a8a8" fontWeight={500}>
              Week total:
            </Typography>
            <Typography variant="h6" color="primary" fontWeight={700}>
              00:00:00
            </Typography>
          </Stack>
        </Stack>
      )}
      <Stack
        mt={2}
        sx={{
          border: '1px solid #5025c47a',
          boxShadow: 'rgb(37 22 91 / 28%) 0px 8px 7px -3px',
        }}
      >
        {/* Panel List Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            padding: '0.4em 1em',
            background: '#5025c41a',
          }}
        >
          <Box>{prettifyDate(start_date)}</Box>
          <Stack direction="row" spacing={1}>
            <Typography fontSize="0.9em" color="#a8a8a8" fontWeight={500}>
              Total:
            </Typography>
            <Typography variant="h6" color="primary" fontWeight={700}>
              {datasource.total_time ?? '00:00:00'}
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ background: '#5025c47a' }} />

        {/* Panel List Item */}
        {children}
      </Stack>
    </Stack>
  );
}

List.propTypes = {
  weekTitle: PropTypes.string,
  datasource: PropTypes.any,
  children: PropTypes.any,
};

export default memo(List);
