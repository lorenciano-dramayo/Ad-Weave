import React from 'react';

import { Stack } from '@mui/material';

// App Components
import CustomSkeletonLoader from 'components/Common/Skeleton';

const SkeletonList = () => (
  <Stack
    direction="row"
    sx={{
      height: 40,
      margin: '0.1em 0',
      padding: '0rem 0.75rem 0rem 0.75rem',
      backgroundColor: '#9f9f9f21',
      borderRadius: '4px',
    }}
    alignItems="center"
    spacing={1.5}
  >
    <CustomSkeletonLoader
      height={19}
      width={19}
      sx={{
        transform: 'scale(1)',
        borderRadius: '0.2em',
      }}
    />

    <CustomSkeletonLoader
      height={16}
      width={175}
      sx={{
        transform: 'scale(1)',
      }}
    />
  </Stack>
);

export default SkeletonList;
