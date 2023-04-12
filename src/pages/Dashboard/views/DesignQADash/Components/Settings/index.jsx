import React from 'react';
import PropTypes from 'prop-types';

import {
  Stack,
  Box,
  Typography,
  Divider,
  Grid,
  Paper,
  Avatar,
  Skeleton,
  styled,
} from '@mui/material';

import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';

const StyledDivider = styled(Divider)`
  border-color: rgb(0 0 0 / 5%);
`;

const StyledPaper = styled(Paper)({
  ':hover': {
    border: '1px solid rgba(80,37,196,.5)',
    boxShadow: '0 0 0 4px rgb(80 37 196 / 5%)',
  },
  display: 'flex',
  alignItems: 'start',
  cursor: 'pointer',
});

export default function Settings({
  statistics,
  themes,
  handleSettings,
  openCounter,
  openSide,
  showResourcesBtn,
  dashTheme,
}) {
  return (
    <Stack px={4} pt={2} pb={4}>
      <Stack pb={1}>
        <Typography variant="h4" fontWeight={800} color="primary">
          Dashboard Settings
        </Typography>
        <Typography
          variant="body2"
          fontWeight={700}
          sx={{ color: 'rgb(0 0 0 / 60%)' }}
        >
          Add additional widget and modify theme to your dashboard.
        </Typography>
      </Stack>
      <StyledDivider />
      <Stack pb={2}>
        <Box my={1}>
          <Typography variant="button" color="secondary" fontWeight={800}>
            Statistics
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {statistics?.map((data, index) => (
            <Grid item key={index} onClick={() => handleSettings(data?.slug)}>
              {data?.slug === 'task_status' && openCounter ? (
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  sx={{ marginBottom: '-17px', marginRight: '5px' }}
                >
                  <CheckCircleTwoToneIcon color="success" />
                </Stack>
              ) : data?.slug === 'resources' && showResourcesBtn ? (
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  sx={{ marginBottom: '-17px', marginRight: '5px' }}
                >
                  <CheckCircleTwoToneIcon color="success" />
                </Stack>
              ) : data?.slug === 'side_navigation' && openSide ? (
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  sx={{ marginBottom: '-17px', marginRight: '5px' }}
                >
                  <CheckCircleTwoToneIcon color="success" />
                </Stack>
              ) : (
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  sx={{ marginBottom: '-17px', marginRight: '5px', opacity: 0 }}
                >
                  <CheckCircleTwoToneIcon color="success" />
                </Stack>
              )}
              <StyledPaper
                sx={{
                  height: 100,
                  width: 180,
                  padding: '0 16px',
                }}
                variant="outlined"
              >
                {data?.slug === 'task_status' ? (
                  <Stack>
                    <Typography
                      marginTop={1.5}
                      fontWeight={800}
                      color="#c4c4c4"
                    >
                      {data?.name}
                    </Typography>
                    <Typography
                      variant="h2"
                      fontWeight={800}
                      marginTop={-2}
                      color="#c4c4c4"
                    >
                      ###
                    </Typography>
                  </Stack>
                ) : data?.slug === 'resources' ? (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar sx={{ width: 50, height: 50 }} />
                    <Stack>
                      <Typography
                        marginTop={1.5}
                        fontWeight={800}
                        color="#c4c4c4"
                      >
                        {data?.name}
                      </Typography>
                      <Typography
                        variant="h2"
                        fontWeight={800}
                        marginTop={-2}
                        color="#c4c4c4"
                      >
                        ##
                      </Typography>
                    </Stack>
                  </Stack>
                ) : (
                  <Stack sx={{ width: '100%' }}>
                    <Typography
                      marginTop={1.5}
                      fontWeight={800}
                      color="#c4c4c4"
                    >
                      {data?.name}
                    </Typography>
                    <Stack spacing={0.5}>
                      <Stack direction="row" justifyContent="space-between">
                        <Skeleton
                          animation={false}
                          variant="rounded"
                          width={70}
                          height={10}
                        />
                        <Skeleton
                          animation={false}
                          variant="circular"
                          width={10}
                          height={10}
                        />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Skeleton
                          animation={false}
                          variant="rounded"
                          width={80}
                          height={10}
                        />
                        <Skeleton
                          animation={false}
                          variant="circular"
                          width={10}
                          height={10}
                        />
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Skeleton
                          animation={false}
                          variant="rounded"
                          width={80}
                          height={10}
                        />
                        <Skeleton
                          animation={false}
                          variant="circular"
                          width={10}
                          height={10}
                        />
                      </Stack>
                    </Stack>
                  </Stack>
                )}
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Stack>
      <StyledDivider />
      <Stack>
        <Box my={1}>
          <Typography variant="button" color="secondary" fontWeight={800}>
            Themes
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {themes?.map((data, index) => (
            <Grid item key={index} onClick={() => handleSettings(data?.slug)}>
              <Stack
                direction="row"
                justifyContent="flex-end"
                sx={{ marginBottom: '-17px', marginRight: '5px' }}
              >
                <CheckCircleTwoToneIcon
                  color="success"
                  sx={{ opacity: data?.slug === dashTheme ? 1 : 0 }}
                />
              </Stack>
              <StyledPaper
                sx={{
                  height: 140,
                  width: 140,
                  padding: '16px 16px',
                  justifyContent: 'center',
                }}
                variant="outlined"
              >
                {data?.slug === 'card_view' ? (
                  <Stack spacing={0.5}>
                    <Stack>
                      <Typography fontWeight={800} color="#c4c4c4">
                        {data?.name}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Stack direction="row" spacing={0.4}>
                        <Skeleton
                          animation={false}
                          variant="rounded"
                          width={30}
                          height={10}
                        />
                        <Skeleton
                          animation={false}
                          variant="rounded"
                          width={10}
                          height={10}
                        />
                      </Stack>
                      <Stack direction="row" spacing={0.4}>
                        <Skeleton
                          animation={false}
                          variant="rounded"
                          width={15}
                          height={10}
                        />
                        <Skeleton
                          animation={false}
                          variant="rounded"
                          width={10}
                          height={10}
                        />
                      </Stack>
                    </Stack>
                    <Skeleton
                      animation={false}
                      variant="rounded"
                      width={100}
                      height={20}
                    />
                    <Skeleton
                      animation={false}
                      variant="rounded"
                      width={100}
                      height={20}
                    />
                  </Stack>
                ) : data?.slug === 'table_view' ? (
                  <Stack spacing={0.5}>
                    <Stack>
                      <Typography fontWeight={800} color="#c4c4c4">
                        {data?.name}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Stack direction="row" spacing={0.4}>
                        <Skeleton
                          animation={false}
                          variant="rounded"
                          width={30}
                          height={10}
                        />
                        <Skeleton
                          animation={false}
                          variant="rounded"
                          width={10}
                          height={10}
                        />
                      </Stack>
                      <Stack direction="row" spacing={0.4}>
                        <Skeleton
                          animation={false}
                          variant="rounded"
                          width={15}
                          height={10}
                        />
                        <Skeleton
                          animation={false}
                          variant="rounded"
                          width={10}
                          height={10}
                        />
                      </Stack>
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={5}
                      />
                    </Stack>
                  </Stack>
                ) : (
                  <Stack spacing={0.5}>
                    <Stack>
                      <Typography fontWeight={800} color="#c4c4c4">
                        {data?.name}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <Stack spacing={0.3}>
                        <Skeleton
                          animation={false}
                          variant="rounded"
                          width={22}
                          height={5}
                        />
                        <Stack direction="row" spacing={0.2}>
                          <Skeleton
                            animation={false}
                            variant="rounded"
                            width={20}
                            height={10}
                          />
                          <Skeleton
                            animation={false}
                            variant="rounded"
                            width={20}
                            height={10}
                          />
                          <Skeleton
                            animation={false}
                            variant="rounded"
                            width={20}
                            height={10}
                          />
                        </Stack>
                        <Skeleton
                          animation={false}
                          variant="rounded"
                          width={63.2}
                          height={8}
                        />
                        <Skeleton
                          animation={false}
                          variant="rounded"
                          width={63.2}
                          height={8}
                        />
                        <Skeleton
                          animation={false}
                          variant="rounded"
                          width={63.2}
                          height={8}
                        />
                        <Skeleton
                          animation={false}
                          variant="rounded"
                          width={63.2}
                          height={8}
                        />
                      </Stack>
                      <Skeleton
                        animation={false}
                        variant="rounded"
                        width={22}
                        height={60}
                      />
                    </Stack>
                  </Stack>
                )}
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}

Settings.propTypes = {
  statistics: PropTypes.any,
  themes: PropTypes.any,
  handleSettings: PropTypes.func,
  openCounter: PropTypes.any,
  openSide: PropTypes.any,
  showResourcesBtn: PropTypes.any,
  dashTheme: PropTypes.any,
};
