// MUI
import { Grid, Stack } from '@mui/material';
// App Components
import CustomSkeletonLoader from 'components/Common/Skeleton';

const SkeletonLoader = () => {
  return (
    <Stack>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <CustomSkeletonLoader height={70} width={330} />
        <Stack direction="row" spacing={1.5}>
          <CustomSkeletonLoader height={70} width={120} />
          <CustomSkeletonLoader height={70} width={90} />
        </Stack>
      </Stack>
      <Grid mt={2} container spacing={2}>
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <Grid item key={i} xs={12} md={3}>
              <CustomSkeletonLoader
                variant="rectangular"
                height={277}
                width="100%"
                sx={{ borderRadius: '25px' }}
              />
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
};

export default SkeletonLoader;
