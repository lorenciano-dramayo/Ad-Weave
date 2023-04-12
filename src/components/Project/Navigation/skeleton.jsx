// MUI
import { Stack, Divider } from '@mui/material';
// App Components
import CustomSkeletonLoader from 'components/Common/Skeleton';

const SkeletonLoader = () => {
  return (
    <Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1}>
          <CustomSkeletonLoader height={60} width={140} />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <CustomSkeletonLoader  height={60} width={140} />
          <CustomSkeletonLoader  height={60} width={140} />
        </Stack>
      </Stack>
      <Divider />
    </Stack>
  );
};

export default SkeletonLoader;
