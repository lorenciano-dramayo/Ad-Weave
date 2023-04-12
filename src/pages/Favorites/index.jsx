import React from 'react';

import _ from 'lodash';

// Redux
import { useDispatch, useSelector } from 'react-redux';

import { useOnMount } from 'pages/Favorites/hooks';

// Reducers
import { fetchAllFavorites, pinFavorites } from 'store/reducers/favorites';

import Loader from 'pages/Dashboard/Components/Loader';

// Local Components
import Options from 'pages/Favorites/Components/Options';

import { appColors } from 'theme/variables';

import {
  Box,
  Stack,
  Typography,
  Grid,
  Card,
  styled,
  Chip,
  Button,
} from '@mui/material';

const StyledTypography = styled(Typography)`
  margin-bottom: 10px;
  color: #29125f;
  word-break: break-word;
  z-index: 3;
  background-image: linear-gradient(90deg, #e0238c, #f22076 47.43%, #f96666);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  height: 60px;
  display: flex;
  align-items: center;
`;

export default function Favorites() {
  const dispatch = useDispatch();
  const { list: favorite, fetching } = useSelector((state) => state.favorites);

  useOnMount(() => {
    dispatch(fetchAllFavorites());
  });

  return (
    <Box height="100vh">
      {fetching && <Loader />}

      <Stack px={10}>
        {/* Title */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mt={4}
          mb={2}
        >
          <Box>
            <Typography variant="h4" fontWeight={800} color="primary">
              Favorites
            </Typography>
          </Box>
        </Stack>

        {/* Options */}
        <Options />

        {/* Cards */}

        <Grid container spacing={2}>
          {favorite?.map((data) => (
            <Grid item md={3} sx={2} sm={1} key={data?.id}>
              <Card
                variant="outlined"
                sx={{
                  width: '100%',
                  padding: '1em',
                  ':hover': {
                    boxShadow: '0 0 0 4px rgb(80 37 196 / 5%)',
                    backgroundColor: '#fff',
                    border: '1px solid rgba(80,37,196,.5)',
                    cursor: 'pointer',
                  },
                }}
              >
                <Stack>
                  <StyledTypography fontWeight={800} variant={'h5'}>
                    {
                      data[
                        data?.type === 'subtask' || data?.type === 'task'
                          ? 'task'
                          : data?.type
                      ]?.name
                    }
                  </StyledTypography>
                  <Box>
                    <Chip
                      label={data?.type}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderRadius: '3px',
                        textTransform: 'capitalize',
                      }}
                    />
                  </Box>
                  <Box mt={1}>
                    <Button
                      variant="contained"
                      disableElevation
                      disableRipple
                      disableFocusRipple
                      disableTouchRipple
                      sx={{
                        textTransform: 'capitalize',
                        borderRadius: '3px',
                        width: '120px',
                        backgroundColor:
                          appColors.status[
                            _.camelCase(
                              data[
                                data?.type === 'subtask' ||
                                data?.type === 'task'
                                  ? 'task'
                                  : data?.type
                              ]?.status?.replace(/_/g, ' ')
                            )
                          ],
                        ':hover': {
                          backgroundColor:
                            appColors.status[
                              _.camelCase(
                                data[
                                  data?.type === 'subtask' ||
                                  data?.type === 'task'
                                    ? 'task'
                                    : data?.type
                                ]?.status?.replace(/_/g, ' ')
                              )
                            ],
                        },
                      }}
                    >
                      {data[
                        data?.type === 'subtask' || data?.type === 'task'
                          ? 'task'
                          : data?.type
                      ]?.status?.replace(/_/g, ' ')}
                    </Button>
                  </Box>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
