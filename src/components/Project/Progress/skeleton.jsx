// MUI
import { Card, Divider, Stack } from '@mui/material';
import { styled } from '@mui/styles';
// App Components
import CustomSkeletonLoader from 'components/Common/Skeleton';
// Utilities
import { appColors } from 'theme/variables';

const StyledRowWrapper = styled(Stack)({
  height: 45,
  border: `1px solid ${appColors.lighterGray}`,
  borderRadius: 5,
  paddingLeft: '1rem',
});

const StyledCard = styled(Card)({
  width: '100%',
  borderWidth: '1px 1px 1px 8px',
  borderStyle: 'solid',
  boxShadow: 'rgb(0 0 0 / 15%) -5px 9px 4px -8px',
  borderColor:
    'rgba(224, 224, 224, 0.46) rgba(224, 224, 224, 0.46) rgba(224, 224, 224, 0.46) rgb(223 223 223)',
  borderImage: 'initial',
  padding: '1.5rem 2.3rem',
  borderRadius: 0,
});

const SkeletonLoader = () => {
  return (
    <Stack spacing={1.5}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomSkeletonLoader height={65} width={210} />
        <CustomSkeletonLoader height={40} width={80} />
      </Stack>

      <>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <CustomSkeletonLoader variant="circular" height={30} width={30} />
            <CustomSkeletonLoader height={40} width={200} />
          </Stack>
          <Stack width="-webkit-fill-available">
            <Divider />
          </Stack>
          <Stack>
            <CustomSkeletonLoader variant="circular" height={20} width={20} />
          </Stack>
        </Stack>
        <StyledCard>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <CustomSkeletonLoader variant="circular" height={46} width={46} />
              <CustomSkeletonLoader height={35} width={100} />
            </Stack>
            <Stack width="-webkit-fill-available">
              <Divider sx={{ borderWidth: 2 }} />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CustomSkeletonLoader variant="circular" height={46} width={46} />
              <CustomSkeletonLoader height={35} width={100} />
            </Stack>
            <Stack width="-webkit-fill-available">
              <Divider sx={{ borderWidth: 2 }} />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CustomSkeletonLoader variant="circular" height={46} width={46} />
              <CustomSkeletonLoader height={35} width={100} />
            </Stack>
            <Stack width="-webkit-fill-available">
              <Divider sx={{ borderWidth: 2 }} />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CustomSkeletonLoader variant="circular" height={46} width={46} />
              <CustomSkeletonLoader height={35} width={100} />
            </Stack>
          </Stack>
        </StyledCard>
        <Stack spacing={1}>
          <StyledRowWrapper direction="row" spacing={5} alignItems="center">
            <CustomSkeletonLoader height={20} width="15%" />
            <CustomSkeletonLoader height={20} width="10%" />
            <CustomSkeletonLoader height={20} width="10%" />
            <CustomSkeletonLoader height={20} width="10%" />
            <CustomSkeletonLoader height={20} width="10%" />
            <CustomSkeletonLoader height={20} width="12%" />
            <CustomSkeletonLoader height={20} width="12%" />
          </StyledRowWrapper>
          <StyledRowWrapper direction="row" spacing={5} alignItems="center">
            <CustomSkeletonLoader height={20} width="15%" />
            <CustomSkeletonLoader height={20} width="10%" />
            <CustomSkeletonLoader height={20} width="10%" />
            <CustomSkeletonLoader height={20} width="10%" />
            <CustomSkeletonLoader height={20} width="10%" />
            <CustomSkeletonLoader height={20} width="12%" />
            <CustomSkeletonLoader height={20} width="12%" />
          </StyledRowWrapper>
          <StyledRowWrapper direction="row" spacing={5} alignItems="center">
            <CustomSkeletonLoader height={20} width="15%" />
            <CustomSkeletonLoader height={20} width="10%" />
            <CustomSkeletonLoader height={20} width="10%" />
            <CustomSkeletonLoader height={20} width="10%" />
            <CustomSkeletonLoader height={20} width="10%" />
            <CustomSkeletonLoader height={20} width="12%" />
            <CustomSkeletonLoader height={20} width="12%" />
          </StyledRowWrapper>
          <StyledRowWrapper direction="row" spacing={5} alignItems="center">
            <CustomSkeletonLoader height={20} width="15%" />
            <CustomSkeletonLoader height={20} width="10%" />
            <CustomSkeletonLoader height={20} width="10%" />
            <CustomSkeletonLoader height={20} width="10%" />
            <CustomSkeletonLoader height={20} width="10%" />
            <CustomSkeletonLoader height={20} width="12%" />
            <CustomSkeletonLoader height={20} width="12%" />
          </StyledRowWrapper>
        </Stack>
      </>

      <>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginTop: '2em' }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <CustomSkeletonLoader variant="circular" height={30} width={30} />
            <CustomSkeletonLoader height={40} width={200} />
          </Stack>
          <Stack width="-webkit-fill-available">
            <Divider />
          </Stack>
          <Stack>
            <CustomSkeletonLoader variant="circular" height={20} width={20} />
          </Stack>
        </Stack>
      </>

      <>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginTop: '2em' }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <CustomSkeletonLoader variant="circular" height={30} width={30} />
            <CustomSkeletonLoader height={40} width={200} />
          </Stack>
          <Stack width="-webkit-fill-available">
            <Divider />
          </Stack>
          <Stack>
            <CustomSkeletonLoader variant="circular" height={20} width={20} />
          </Stack>
        </Stack>
      </>
      <>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginTop: '2em' }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <CustomSkeletonLoader variant="circular" height={30} width={30} />
            <CustomSkeletonLoader height={40} width={200} />
          </Stack>
          <Stack width="-webkit-fill-available">
            <Divider />
          </Stack>
          <Stack>
            <CustomSkeletonLoader variant="circular" height={20} width={20} />
          </Stack>
        </Stack>
      </>
      <>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginTop: '2em' }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <CustomSkeletonLoader variant="circular" height={30} width={30} />
            <CustomSkeletonLoader height={40} width={200} />
          </Stack>
          <Stack width="-webkit-fill-available">
            <Divider />
          </Stack>
          <Stack>
            <CustomSkeletonLoader variant="circular" height={20} width={20} />
          </Stack>
        </Stack>
      </>
    </Stack>
  );
};

export default SkeletonLoader;
