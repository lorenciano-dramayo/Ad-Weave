// MUI
import { Stack } from '@mui/material';
// App Components
import CustomSkeletonLoader from 'components/Common/Skeleton';

const SkeletonLoader = () => {
  return (
    <Stack spacing={-1.5}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <CustomSkeletonLoader height={45} width="40%" />
        <Stack direction="row" alignItems="center" spacing={1}>
          <CustomSkeletonLoader variant="circular" height={40} width={40} />
          <CustomSkeletonLoader variant="circular" height={40} width={40} />
          <CustomSkeletonLoader variant="circular" height={40} width={40} />
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <CustomSkeletonLoader height={45} width="10%" />
        <CustomSkeletonLoader height={45} width="10%" />
        <CustomSkeletonLoader height={45} width="10%" />
        <CustomSkeletonLoader variant="circular" height={30} width={30} />
      </Stack>
    </Stack>
  );
};

export default SkeletonLoader;
