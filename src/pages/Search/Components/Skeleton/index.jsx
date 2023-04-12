// MUI
import { Stack } from '@mui/material';
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

const SkeletonLoader = () => {
  return (
    <Stack spacing={1.5}>
      <Stack spacing={1}>
        {Array(6)
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
                width="5%"
                sx={{ borderRadius: 2 }}
              />
              <CustomSkeletonLoader
                height={20}
                width="10%"
                sx={{ borderRadius: 2 }}
              />
              <CustomSkeletonLoader
                height={20}
                width="15%"
                sx={{ borderRadius: 2 }}
              />
              <CustomSkeletonLoader
                height={20}
                width="10%"
                sx={{ borderRadius: 2 }}
              />
              <CustomSkeletonLoader
                height={20}
                width="15%"
                sx={{ borderRadius: 2 }}
              />
            </StyledRowWrapper>
          ))}
      </Stack>
    </Stack>
  );
};

export default SkeletonLoader;
