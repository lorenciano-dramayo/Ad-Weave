// MUI
import { Stack } from '@mui/material';
// App Components
import CustomSkeletonLoader from 'components/Common/Skeleton';

export const main = () => {
  return (
    <Stack padding={0} marginTop={-10}>
      <Stack padding={0} direction="row" spacing={4}>
        {[...Array(4).keys()].map((data) => (
          <CustomSkeletonLoader
            key={data}
            width="25%"
            height={350}
            sx={{ borderRadius: '15px' }}
          />
        ))}
      </Stack>
      <Stack
        padding={0}
        alignItems="center"
        justifyContent="space-between"
        spacing={-3}
        marginTop={-4}
      >
        {[...Array(5).keys()].map((data) => (
          <CustomSkeletonLoader
            key={data}
            height="100px"
            width="100%"
            sx={{ borderRadius: '15px' }}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export const drawer = () => {
  return (
    <Stack padding={4} spacing={2}>
      <Stack justifyContent="center" flex={1}>
        <CustomSkeletonLoader
          height="50px"
          width="100%"
          sx={{ borderRadius: '5px', bgcolor: 'grey.1000' }}
        />
        <CustomSkeletonLoader
          height="20px"
          width="40%"
          sx={{ borderRadius: '5px', bgcolor: 'grey.1000' }}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <CustomSkeletonLoader height="130px" width="130px" variant="circular" />
        <Stack justifyContent="center" flex={1}>
          <CustomSkeletonLoader
            height="30px"
            width="100%"
            sx={{ borderRadius: '5px', bgcolor: 'grey.1000' }}
          />
          <CustomSkeletonLoader
            height="50px"
            width="30%"
            sx={{ borderRadius: '5px', bgcolor: 'grey.1000' }}
          />
        </Stack>
      </Stack>
      <Stack alignItems="center" justifyContent="space-between" spacing={-2}>
        {[...Array(10).keys()].map((data) => (
          <CustomSkeletonLoader
            key={data}
            height="80px"
            width="100%"
            sx={{ borderRadius: '15px', bgcolor: 'grey.1000' }}
          />
        ))}
      </Stack>
    </Stack>
  );
};
