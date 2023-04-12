import React, { useEffect, useContext } from 'react';

import { useDispatch, useSelector } from 'react-redux';

// reducer
import { getData } from 'store/reducers/manualTaskCreation';

import _ from 'lodash';

// Components
import DateTime from 'components/TaskCreation/Components/DateTime';
import Tags from 'components/TaskCreation/Components/Tags';

// Context
import TaskCreationContext from 'components/TaskCreation/Context';

import { Box, Stack, Button, Typography, styled, Card } from '@mui/material';

const StyledTypography = styled(Typography)`
  background-image: linear-gradient(90deg, #e0238c, #f22076 47.43%, #f96666);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`;

const StyledCard = styled(Card)`
  background: rgba(80, 37, 196, 0.05);
  border: 2px solid rgba(80, 37, 196, 0.1);
  border-radius: 4px;
  padding: 1em;
`;

const TaskDetails = () => {
  const dispatch = useDispatch();

  const {
    data: { aTags },
  } = useSelector((state) => state.manualTaskCreation);
  const {
    concept,
    channel,
    campaign,
    subTask,
    taskType,
    deliveryDate,
    setDeliveryDate,
    tags,
    setTags,
    isRefresh,
    setIsRefresh,
  } = useContext(TaskCreationContext);

  useEffect(() => {
    dispatch(getData('get_tags'));
  }, []);

  return (
    <Box
      padding="40px 60px"
      height="calc(100vh - 7.2em)"
      sx={{ overflowY: 'auto' }}
    >
      <Stack direction="row">
        <Typography variant="h4" color="primary" fontWeight={800}>
          {!_.isEmpty(subTask?.name)
            ? subTask?.name
            : !_.isEmpty(taskType?.name)
            ? taskType?.name
            : ''}
          {_.isEmpty(concept?.name)
            ? ' - Untitled'
            : _.isEmpty(campaign?.name)
            ? ` - ${concept?.name} - `
            : ` - ${campaign?.name} - `}
          <StyledTypography
            variant="caption"
            fontSize={'1.9732142857142858rem'}
            lineHeight={1.3}
            fontWeight={800}
          >
            {_.isEmpty(channel?.name) ? '' : `${channel?.name}`}
          </StyledTypography>
        </Typography>
      </Stack>
      <Box mb={2}>
        <Typography>Please fill the required fields below.</Typography>
      </Box>

      <Box mb={6}>
        <Typography variant="h5" mb={0.5}>
          Delivery Date
        </Typography>

        <DateTime
          setDeliveryDate={setDeliveryDate}
          deliveryDate={deliveryDate}
        />
      </Box>

      <Box mb={6}>
        <Typography variant="h5" mb={0.5}>
          Tags
        </Typography>
        <Tags setTags={setTags} tags={tags} data={aTags} />
      </Box>

      <Box>
        <Typography variant="h5" mb={0.5}>
          Is this a Refresh?
        </Typography>
        <StyledCard variant="outlined">
          <Stack spacing={2}>
            <Typography sx={{ color: '#663fb9' }}>
              *Please ask your PM to specify whether the task is a refresh.
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Button
                variant={isRefresh === 1 ? 'contained' : 'outlined'}
                color={isRefresh === 1 ? 'secondary' : 'primary'}
                onClick={() => setIsRefresh(1)}
              >
                Yes
              </Button>
              <Button
                variant={isRefresh === 0 ? 'contained' : 'outlined'}
                color={isRefresh === 0 ? 'secondary' : 'primary'}
                onClick={() => setIsRefresh(0)}
              >
                No
              </Button>
            </Stack>
          </Stack>
        </StyledCard>
      </Box>
    </Box>
  );
};

export default TaskDetails;
