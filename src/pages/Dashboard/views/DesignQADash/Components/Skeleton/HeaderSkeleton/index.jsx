// MUI
import { Stack } from '@mui/material';
// App Components
import CustomSkeletonLoader from 'components/Common/Skeleton';

const HeaderSkeleton = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      py={1}
    >
      <CustomSkeletonLoader height={50} width={210} />
      <Stack direction="row" spacing={1} alignItems="center">
        <CustomSkeletonLoader height={50} width={90} />
        <CustomSkeletonLoader height={50} width={90} />
        <CustomSkeletonLoader variant="circular" height={30} width={30} />
        {/* <CustomSkeletonLoader height={50} width={40} />
          <CustomSkeletonLoader height={50} width={80} />
          <CustomSkeletonLoader variant="circular" height={30} width={30} />
          <CustomSkeletonLoader variant="circular" height={30} width={30} /> */}
      </Stack>
    </Stack>
  );
};

export default HeaderSkeleton;
