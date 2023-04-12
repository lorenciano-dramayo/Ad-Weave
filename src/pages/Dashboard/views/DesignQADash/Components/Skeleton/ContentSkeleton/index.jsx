// MUI
import { Card, Divider, Box, Stack } from '@mui/material';
import { styled } from '@mui/styles';
// App Components
import CustomSkeletonLoader from 'components/Common/Skeleton';

const StyledCard = styled(Card)({
  width: '100%',
  borderRadius: '0.3em',
  marginTop: '0 !important',
});

const ContentSkeleton = () => {
  return (
    <>
      {[...Array(3).keys()].map((data) => (
        <Stack marginTop="0 !important" key={data}>
          <StyledCard variant="outlined">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box display="flex" flexDirection="column" alignItems="center">
                <CustomSkeletonLoader
                  height={20}
                  width={50}
                  sx={{ marginTop: '8px' }}
                />
                <CustomSkeletonLoader
                  height={50}
                  width={100}
                  sx={{ borderRadius: '0 0.2em 0.2em 0', marginTop: '-5px' }}
                />
              </Box>
              <Box>
                <CustomSkeletonLoader height={30} width={500} />
                <CustomSkeletonLoader height={20} width={600} />
                <Stack direction="row" spacing={2} alignItems="center">
                  <CustomSkeletonLoader height={40} width={100} />
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{ borderColor: 'transparent' }}
                  />
                  <CustomSkeletonLoader
                    variant="circular"
                    height={25}
                    width={25}
                  />
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{ borderColor: 'transparent' }}
                  />
                  <CustomSkeletonLoader
                    variant="circular"
                    height={25}
                    width={25}
                  />
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{ borderColor: 'transparent' }}
                  />
                  <CustomSkeletonLoader height={40} width={140} />
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{ borderColor: 'transparent' }}
                  />
                  <Stack direction="row" spacing={1}>
                    <CustomSkeletonLoader height={40} width={60} />
                    <CustomSkeletonLoader height={40} width={60} />
                    <CustomSkeletonLoader height={40} width={60} />
                    <CustomSkeletonLoader height={40} width={60} />
                  </Stack>
                </Stack>
              </Box>
            </Stack>
            <Divider />
            <Stack direction="row">
              <Stack
                px={0.2}
                py={0.5}
                mt={0.2}
                sx={{ width: '4%' }}
                alignItems="center"
                justifyContent="center"
              >
                <CustomSkeletonLoader
                  variant="circular"
                  height={30}
                  width={30}
                />
              </Stack>
              <Divider orientation="vertical" flexItem />
              {/* <Stack
                px={0.2}
                py={0.5}
                mt={0.2}
                sx={{ width: '4%' }}
                alignItems="center"
                justifyContent="center"
              >
                <CustomSkeletonLoader
                  variant="circular"
                  height={30}
                  width={30}
                />
              </Stack>
              <Divider orientation="vertical" flexItem /> */}
              <Stack
                sx={{ width: '16.666%' }}
                px={1}
                justifyContent="flex-start"
                alignItems="flex-start"
                py={0.5}
              >
                <CustomSkeletonLoader height={10} width={50} />
                <Stack direction="row" spacing={0.3}>
                  <CustomSkeletonLoader
                    variant="circular"
                    height={20}
                    width={20}
                  />
                  <CustomSkeletonLoader
                    variant="circular"
                    height={20}
                    width={20}
                  />
                  <CustomSkeletonLoader
                    variant="circular"
                    height={20}
                    width={20}
                  />
                  <CustomSkeletonLoader
                    variant="circular"
                    height={20}
                    width={20}
                  />
                  <CustomSkeletonLoader
                    variant="circular"
                    height={20}
                    width={20}
                  />
                  <CustomSkeletonLoader
                    variant="circular"
                    height={20}
                    width={20}
                  />
                </Stack>
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack
                sx={{ width: '16.666%' }}
                px={1}
                justifyContent="flex-start"
                alignItems="flex-start"
                py={0.5}
              >
                <CustomSkeletonLoader height={10} width={50} />
                <Stack direction="row" spacing={1}>
                  <CustomSkeletonLoader
                    variant="circular"
                    height={20}
                    width={20}
                  />
                  <CustomSkeletonLoader height={20} width={90} />
                </Stack>
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack
                sx={{ width: '14.666%' }}
                px={1}
                justifyContent="flex-start"
                alignItems="flex-start"
                py={0.5}
              >
                <CustomSkeletonLoader height={10} width={50} />
                <CustomSkeletonLoader height={20} width={90} />
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack
                sx={{ width: '14.666%' }}
                px={1}
                justifyContent="flex-start"
                alignItems="flex-start"
                py={0.5}
              >
                <CustomSkeletonLoader height={10} width={50} />
                <CustomSkeletonLoader height={20} width={90} />
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack
                sx={{ width: '14.666%' }}
                px={1}
                justifyContent="flex-start"
                alignItems="flex-start"
                py={0.5}
              >
                <CustomSkeletonLoader height={10} width={50} />
                <CustomSkeletonLoader height={20} width={90} />
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack
                sx={{ width: '14.666%' }}
                px={1}
                justifyContent="flex-start"
                alignItems="flex-start"
                py={0.5}
              >
                <CustomSkeletonLoader height={10} width={50} />
                <CustomSkeletonLoader height={20} width={90} />
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack
                px={0.2}
                py={0.5}
                mt={0.2}
                sx={{ width: '4%' }}
                alignItems="center"
                justifyContent="center"
              >
                <CustomSkeletonLoader
                  variant="circular"
                  height={20}
                  width={20}
                />
              </Stack>
            </Stack>
          </StyledCard>

          <Divider
            sx={{ margin: '0.8em 0', borderColor: 'rgb(0, 0, 0, 0.05)' }}
          />
        </Stack>
      ))}
    </>
  );
};

export default ContentSkeleton;
