// MUI
import { Stack } from '@mui/material';
// App Components
import CustomSkeletonLoader from 'components/Common/Skeleton';

const SkeletonLoader = () => {
  return (
    <Stack sx={{ padding: '45px 60px' }}>
      <Stack spacing={1} mb={6}>
        <CustomSkeletonLoader variant="rectangular" height={30} width={140} />
        <CustomSkeletonLoader
          variant="rectangular"
          height={50}
          width={'100%'}
        />
      </Stack>
      <Stack spacing={1} mb={6}>
        <CustomSkeletonLoader variant="rectangular" height={30} width={140} />
        <CustomSkeletonLoader
          variant="rectangular"
          height={50}
          width={'100%'}
        />
      </Stack>
      <Stack spacing={1} mb={6}>
        <CustomSkeletonLoader variant="rectangular" height={30} width={140} />
        <CustomSkeletonLoader
          variant="rectangular"
          height={50}
          width={'100%'}
        />
      </Stack>
    </Stack>
  );
};

export default SkeletonLoader;
