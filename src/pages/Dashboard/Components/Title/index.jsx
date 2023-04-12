import React from 'react';

import _ from 'lodash';

import PropTypes from 'prop-types';

// MUI Components
import { Box, Stack, Typography } from '@mui/material';

export default function Title({ queues_options, dataDash }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mt={4}
      mb={2}
    >
      <Box>
        <Typography variant="h4" fontWeight={800} color="primary">
          {
            _.filter(
              queues_options,
              (options) => options?.slug === dataDash?.queues
            )[0]?.name
          }
        </Typography>
      </Box>
    </Stack>
  );
}

Title.propTypes = {
  queues_options: PropTypes.any,
  dataDash: PropTypes.any,
};
