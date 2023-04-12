// MUI
import { Stack, Divider, Box, Card, Grid } from '@mui/material';
import { styled } from '@mui/styles';
// App Components
import CustomSkeletonLoader from 'components/Common/Skeleton';
// Utilities
import { appColors } from 'theme/variables';

const StyledRowWrapper = styled(Stack)({
  height: 45,
  borderBottom: `1px solid ${appColors.lighterGray}`,
  borderRadius: 5,
  paddingLeft: '1rem',
});

const StyledDivider = styled(Divider)({
  borderStyle: 'dashed',
});

const SkeletonLoader = () => {
  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p={2}
        sx={{ height: '65px' }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ height: '42px' }}
          alignItems="center"
        >
          <CustomSkeletonLoader height={'50px'} width={'10em'} />
          <StyledDivider orientation="vertical" variant="middle" flexItem />
          <CustomSkeletonLoader height={30} variant="circular" width={30} />
          <StyledDivider orientation="vertical" variant="middle" flexItem />
          <Stack direction="row" spacing={0.5}>
            <CustomSkeletonLoader height={30} variant="circular" width={30} />
            <CustomSkeletonLoader height={30} variant="circular" width={30} />
            <CustomSkeletonLoader height={30} variant="circular" width={30} />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{ height: '42px' }}
          alignItems="center"
        >
          <CustomSkeletonLoader height={'50px'} width={'8em'} />
          <StyledDivider orientation="vertical" variant="middle" flexItem />
          <Stack direction="row" spacing={0.5}>
            <CustomSkeletonLoader height={30} variant="circular" width={30} />
            <CustomSkeletonLoader height={30} variant="circular" width={30} />
            <CustomSkeletonLoader height={30} variant="circular" width={30} />
          </Stack>
          <StyledDivider orientation="vertical" variant="middle" flexItem />
          <CustomSkeletonLoader height={30} variant="circular" width={30} />
        </Stack>
      </Stack>
      <Divider />

      <Grid container>
        <Grid item xs={6} sx={{ borderRight: '1px solid #c6c6c6' }}>
          <Stack px={2} direction="row" spacing={1}>
            <CustomSkeletonLoader height={'60px'} width={'8em'} />
            <CustomSkeletonLoader height={'60px'} width={'8em'} />
            <CustomSkeletonLoader height={'60px'} width={'8em'} />
            <CustomSkeletonLoader height={'60px'} width={'8em'} />
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ borderLeft: '1px solid #c6c6c6' }}>
          <Stack px={2} direction="row" spacing={1}>
            <CustomSkeletonLoader height={'60px'} width={'8em'} />
            <CustomSkeletonLoader height={'60px'} width={'8em'} />
            <CustomSkeletonLoader height={'60px'} width={'8em'} />
          </Stack>
        </Grid>
      </Grid>
      <Divider />

      <Grid container sx={{ height: 'calc(100vh - 12.6em)' }}>
        <Grid
          item
          xs={6}
          sx={{
            borderRight: '1px solid #c6c6c6',
          }}
        >
          <Stack spacing={1} p={2}>
            {Array(11)
              .fill(0)
              .map((_, i) => (
                <StyledRowWrapper
                  key={i}
                  direction="row"
                  spacing={5}
                  alignItems="center"
                >
                  <CustomSkeletonLoader
                    height={20}
                    width="20%"
                    sx={{ borderRadius: 1 }}
                  />
                  <CustomSkeletonLoader
                    height={20}
                    width="30%"
                    sx={{ borderRadius: 1 }}
                  />
                </StyledRowWrapper>
              ))}

            <Divider sx={{ borderStyle: 'dashed', paddingTop: '1em' }} />

            <Stack
              pt={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Box>
                <CustomSkeletonLoader
                  height={20}
                  width={100}
                  sx={{ borderRadius: 1 }}
                />
              </Box>
              <Box
                borderBottom="1px solid #ececec"
                borderColor="#0000000a"
                width="100%"
              ></Box>
              <Box>
                <CustomSkeletonLoader
                  height={20}
                  variant="circular"
                  width={20}
                />
              </Box>
            </Stack>
            <Stack
              pt={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Box>
                <CustomSkeletonLoader
                  height={20}
                  width={100}
                  sx={{ borderRadius: 1 }}
                />
              </Box>
              <Box
                borderBottom="1px solid #ececec"
                borderColor="#0000000a"
                width="100%"
              ></Box>
              <Box>
                <CustomSkeletonLoader
                  height={20}
                  variant="circular"
                  width={20}
                />
              </Box>
            </Stack>
            <Stack
              pt={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Box>
                <CustomSkeletonLoader
                  height={20}
                  width={100}
                  sx={{ borderRadius: 1 }}
                />
              </Box>
              <Box
                borderBottom="1px solid #ececec"
                borderColor="#0000000a"
                width="100%"
              ></Box>
              <Box>
                <CustomSkeletonLoader
                  height={20}
                  variant="circular"
                  width={20}
                />
              </Box>
            </Stack>
            <Stack
              pt={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Box>
                <CustomSkeletonLoader
                  height={20}
                  width={100}
                  sx={{ borderRadius: 1 }}
                />
              </Box>
              <Box
                borderBottom="1px solid #ececec"
                borderColor="#0000000a"
                width="100%"
              ></Box>
              <Box>
                <CustomSkeletonLoader
                  height={20}
                  variant="circular"
                  width={20}
                />
              </Box>
            </Stack>
            <Stack
              pt={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Box>
                <CustomSkeletonLoader
                  height={20}
                  width={100}
                  sx={{ borderRadius: 1 }}
                />
              </Box>
              <Box
                borderBottom="1px solid #ececec"
                borderColor="#0000000a"
                width="100%"
              ></Box>
              <Box>
                <CustomSkeletonLoader
                  height={20}
                  variant="circular"
                  width={20}
                />
              </Box>
            </Stack>
            <Stack
              pt={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Box>
                <CustomSkeletonLoader
                  height={20}
                  width={100}
                  sx={{ borderRadius: 1 }}
                />
              </Box>
              <Box
                borderBottom="1px solid #ececec"
                borderColor="#0000000a"
                width="100%"
              ></Box>
              <Box>
                <CustomSkeletonLoader
                  height={20}
                  variant="circular"
                  width={20}
                />
              </Box>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ borderLeft: '1px solid #c6c6c6' }}>
          <Stack
            spacing={1}
            mt={2}
            p={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <CustomSkeletonLoader height={'30px'} width={'10em'} />
            <CustomSkeletonLoader height={20} variant="circular" width={20} />
          </Stack>
          <Stack px={2}>
            <Card elevation={2} sx={{ padding: '0.5em' }}>
              <Card variant="outlined">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ padding: '0.5em' }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CustomSkeletonLoader
                      height={40}
                      variant="circular"
                      width={40}
                    />
                    <Stack>
                      <CustomSkeletonLoader height={'30px'} width={'10em'} />
                      <CustomSkeletonLoader height={'15px'} width={'10em'} />
                    </Stack>
                  </Stack>

                  <CustomSkeletonLoader
                    height={30}
                    variant="circular"
                    width={30}
                  />
                </Stack>
                <Stack pt={1} sx={{ padding: '0.5em' }}>
                  <CustomSkeletonLoader height={30} width={'100%'} />
                  <CustomSkeletonLoader height={30} width={'100%'} />
                  <CustomSkeletonLoader height={30} width={'100%'} />
                  <CustomSkeletonLoader height={30} width={'100%'} />
                  <CustomSkeletonLoader height={30} width={'100%'} />
                  <CustomSkeletonLoader height={30} width={'100%'} />
                  <CustomSkeletonLoader height={30} width={'100%'} />
                  <CustomSkeletonLoader height={30} width={'100%'} />
                  <CustomSkeletonLoader height={30} width={'30%'} />
                </Stack>
                <Divider />
                <Grid container spacing={2} px={1}>
                  <Grid item xs={6}>
                    <CustomSkeletonLoader height={60} width={'100%'} />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomSkeletonLoader height={60} width={'100%'} />
                  </Grid>
                </Grid>
              </Card>
            </Card>
          </Stack>

          <Stack
            spacing={1}
            mt={2}
            p={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <CustomSkeletonLoader height={'30px'} width={'10em'} />
            <CustomSkeletonLoader height={20} variant="circular" width={20} />
          </Stack>
          <Stack px={2}>
            <Card elevation={2} sx={{ padding: '0.5em' }}>
              <Card variant="outlined">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ padding: '0.5em' }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CustomSkeletonLoader
                      height={40}
                      variant="circular"
                      width={40}
                    />
                    <Stack>
                      <CustomSkeletonLoader height={'30px'} width={'10em'} />
                      <CustomSkeletonLoader height={'15px'} width={'10em'} />
                    </Stack>
                  </Stack>

                  <CustomSkeletonLoader
                    height={30}
                    variant="circular"
                    width={30}
                  />
                </Stack>
                <Stack pt={1} sx={{ padding: '0.5em' }}>
                  <CustomSkeletonLoader height={30} width={'100%'} />
                  <CustomSkeletonLoader height={30} width={'100%'} />
                  <CustomSkeletonLoader height={30} width={'100%'} />
                  <CustomSkeletonLoader height={30} width={'100%'} />
                  <CustomSkeletonLoader height={30} width={'100%'} />
                  <CustomSkeletonLoader height={30} width={'100%'} />
                  <CustomSkeletonLoader height={30} width={'100%'} />
                  <CustomSkeletonLoader height={30} width={'100%'} />
                  <CustomSkeletonLoader height={30} width={'30%'} />
                </Stack>
                <Divider />
                <Grid container spacing={2} px={1}>
                  <Grid item xs={6}>
                    <CustomSkeletonLoader height={60} width={'100%'} />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomSkeletonLoader height={60} width={'100%'} />
                  </Grid>
                </Grid>
              </Card>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default SkeletonLoader;
