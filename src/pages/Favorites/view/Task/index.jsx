import React from 'react';

import Moment from 'react-moment';
import PropTypes from 'prop-types';

import useFitText from 'use-fit-text';

import _ from 'lodash';

import {
  Stack,
  IconButton,
  Box,
  Typography,
  Chip,
  AvatarGroup,
  Avatar,
  styled,
  Button,
  Divider,
} from '@mui/material';

// constant
import { channelIcons } from 'constants/widgets';
import { appColors } from 'theme/variables';

import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

const StyledTypography = styled(Typography)`
  background-image: linear-gradient(90deg, #e0238c, #f22076 47.43%, #f96666);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`;

const Task = ({ data, id, onPin }) => {
  const { fontSize, ref } = useFitText({
    maxFontSize: 125,
  });

  return (
    <Stack position="relative">
      {/* Favorite */}
      <Box position="absolute" top={0} right={0} mt={2} mr={2}>
        <IconButton
          onClick={() => onPin(data.id, data.rel_type, id, data.description)}
        >
          <StarOutlinedIcon sx={{ color: '#FFB946' }} />
        </IconButton>
      </Box>

      <Box p={2}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor:
                  appColors.status[
                    _.camelCase(data?.status?.replace(/_/g, ' '))
                  ],
                color: '#fff',
                textTransform: 'capitalize',
                '&:hover': {
                  backgroundColor:
                    appColors.status[
                      _.camelCase(data?.status?.replace(/_/g, ' '))
                    ],
                },
              }}
              disableElevation
              size="small"
            >
              {data.status.replace(/_/g, ' ')}
            </Button>
          </Box>
        </Stack>

        {/* Title */}
        <Box>
          <StyledTypography
            ref={ref}
            sx={{
              fontSize,
              height: 50,
              display: 'flex',
              alignItems: 'center',
            }}
            variant="h5"
            fontWeight={800}
          >
            {data.description}
          </StyledTypography>
        </Box>

        {/* Task Type */}
        <Stack
          mt={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Chip
            label={data.name.split('-')[0]}
            sx={{
              backgroundColor: '#37b40017',
              borderRadius: 5,
              color: '#37b400',
              maxWidth: '136px',
            }}
            size="small"
          />
          <Button
            startIcon={<AssistantPhotoIcon />}
            sx={{
              backgroundColor: '#6d6d6d',
              '&:hover': {
                backgroundColor: '#474343',
              },
            }}
            size="small"
            variant="contained"
            disableElevation
          >
            {data.priority_description === null
              ? 'Unspecified'
              : data.priority_description}
          </Button>
        </Stack>

        {/* Dates */}
        <Stack
          direction="column"
          mt={1}
          spacing={0.2}
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <EventOutlinedIcon sx={{ color: '#25165B' }} />
            <Typography
              variant="body2"
              sx={{ color: '#25165B' }}
              fontWeight={700}
            >
              {_.isEmpty(data.delivery_date) ? (
                'Unspecified delivery date'
              ) : (
                <Moment format="MM/DD/YY hh:mm:ss A">
                  {data.delivery_date}
                </Moment>
              )}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <LocalShippingOutlinedIcon sx={{ color: '#25165B' }} />
            <Typography
              variant="body2"
              sx={{ color: '#25165B' }}
              fontWeight={700}
            >
              {_.isEmpty(data.due_date) ? (
                'Unspecified due date'
              ) : (
                <Moment format="MM/DD/YY hh:mm:ss A">{data.due_date}</Moment>
              )}
            </Typography>
          </Stack>
        </Stack>

        {/* Tags */}
        <Stack
          my={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {data.tags.length > 0 ? (
            'hello'
          ) : (
            <Chip
              label="Unspecified Tags"
              size="small"
              sx={{ borderRadius: 1, color: '#838383', fontSize: 10 }}
              variant="outlined"
            />
          )}

          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton sx={{ width: '1.2em' }} size="small">
              {channelIcons[data.channel.toLowerCase()]}
            </IconButton>
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* Assignee & Watchers */}
        <Stack direction="row" mt={1} justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="center">
            <GroupOutlinedIcon sx={{ color: '#858282' }} />
            <AvatarGroup
              sx={{
                '& .MuiAvatar-root': { width: 28, height: 28, fontSize: 15 },
              }}
            >
              {data.assignees.length > 0 ? (
                data.assignees.map((assignee, index) => (
                  <Avatar
                    key={index}
                    sx={{ width: 15, height: 15 }}
                    alt={assignee.name}
                    src={assignee.avatar}
                  />
                ))
              ) : (
                <Typography variant="caption" sx={{ color: '#858282' }}>
                  No Assignee
                </Typography>
              )}
            </AvatarGroup>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <GroupsOutlinedIcon sx={{ color: '#858282' }} />
            <AvatarGroup
              sx={{
                '& .MuiAvatar-root': { width: 28, height: 28, fontSize: 15 },
              }}
            >
              {data.watchers.length > 0 ? (
                data.watchers.map((watcher, index) => (
                  <Avatar
                    key={index}
                    sx={{ width: 15, height: 15 }}
                    alt={watcher.name}
                    src={watcher.avatar}
                  />
                ))
              ) : (
                <Typography variant="caption" sx={{ color: '#858282' }}>
                  No Watchers
                </Typography>
              )}
            </AvatarGroup>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

Task.propTypes = {
  data: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  onPin: PropTypes.func.isRequired,
};

export default Task;
