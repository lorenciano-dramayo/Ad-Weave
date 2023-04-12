// MUI
import { Divider, Stack } from '@mui/material';
// App Components
import CustomSkeletonLoader from 'components/Common/Skeleton';

const SidebarSkeleton = () => {
  return (
    <>
      <Stack pl={3} pr={3} pt={2} pb={2} spacing={2}>
        <CustomSkeletonLoader
          sx={{ transform: 'scale(1)', borderRadius: '0.2em' }}
          height={15}
          width={53}
        />
        <Stack direction="row" justifyContent="space-between">
          <CustomSkeletonLoader
            sx={{ transform: 'scale(1)', borderRadius: '0.2em' }}
            height={15}
            width={200}
          />
          <CustomSkeletonLoader
            sx={{ transform: 'scale(1)', borderRadius: '0.5em' }}
            height={16}
            width={25}
          />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <CustomSkeletonLoader
            sx={{ transform: 'scale(1)', borderRadius: '0.2em' }}
            height={15}
            width={150}
          />
          <CustomSkeletonLoader
            sx={{ transform: 'scale(1)', borderRadius: '0.5em' }}
            height={16}
            width={40}
          />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <CustomSkeletonLoader
            sx={{ transform: 'scale(1)', borderRadius: '0.2em' }}
            height={15}
            width={180}
          />
          <CustomSkeletonLoader
            sx={{ transform: 'scale(1)', borderRadius: '0.5em' }}
            height={16}
            width={16}
          />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <CustomSkeletonLoader
            sx={{ transform: 'scale(1)', borderRadius: '0.2em' }}
            height={15}
            width={150}
          />
          <CustomSkeletonLoader
            sx={{ transform: 'scale(1)', borderRadius: '0.5em' }}
            height={16}
            width={20}
          />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <CustomSkeletonLoader
            sx={{ transform: 'scale(1)', borderRadius: '0.2em' }}
            height={15}
            width={200}
          />
          <CustomSkeletonLoader
            sx={{ transform: 'scale(1)', borderRadius: '0.5em' }}
            height={16}
            width={30}
          />
        </Stack>
      </Stack>

      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.05)' }} />

      <Stack pl={3} pr={3} pt={2} pb={2} spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <CustomSkeletonLoader
            sx={{ transform: 'scale(1)', borderRadius: '0.2em' }}
            height={15}
            width={200}
          />
          <CustomSkeletonLoader
            sx={{ transform: 'scale(1)', borderRadius: '0.5em' }}
            height={15}
            width={15}
          />
        </Stack>
      </Stack>
      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.05)' }} />

      <Stack pl={3} pr={3} pt={2} pb={2} spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <CustomSkeletonLoader
            sx={{ transform: 'scale(1)', borderRadius: '0.2em' }}
            height={15}
            width={200}
          />
          <CustomSkeletonLoader
            sx={{ transform: 'scale(1)', borderRadius: '0.5em' }}
            height={15}
            width={15}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default SidebarSkeleton;
