import React from 'react';
import { Link } from 'react-router-dom';
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

import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';

const StyledTypography = styled(Typography)`
  background-image: linear-gradient(90deg, #e0238c, #f22076 47.43%, #f96666);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`;

const Concept = ({ data, id, onPin }) => {
  const { fontSize, ref } = useFitText({
    maxFontSize: 150,
  });

  return (
    <Stack position="relative">
      {/* Favorite */}
      <Box position="absolute" top={0} right={0} mt={2} mr={2}>
        <IconButton
          onClick={() => onPin(data.uuid, data.rel_type, id, data.name)}
        >
          <StarOutlinedIcon sx={{ color: '#FFB946' }} />
        </IconButton>
      </Box>

      <Box
        p={2}
        component={Link}
        to={`/projects/${data.partner_uuid}/concept/${data.uuid}`}
        sx={{ textDecoration: 'none' }}
      >
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Box>
            <Button variant="contained" disableElevation size="small">
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
              height: 60,
              display: 'flex',
              alignItems: 'center',
            }}
            variant="h5"
            fontWeight={800}
          >
            {data.name}
          </StyledTypography>
        </Box>

        {/* Subscribers */}
        <Box mt={1} display="flex">
          <AvatarGroup
            sx={{
              '& .MuiAvatar-root': { width: 28, height: 28, fontSize: 15 },
            }}
          >
            {!_.isEmpty(data.subscribers) &&
              data.subscribers.map((subscriber, index) => (
                <Avatar
                  sx={{ width: 28, height: 28 }}
                  key={index}
                  alt={subscriber.name}
                  src={subscriber.avatar}
                />
              ))}
          </AvatarGroup>
        </Box>

        {/* Group */}
        <Stack mt={1}>
          <Box>
            <Chip
              label={data.partner_name}
              sx={{
                backgroundColor: '#f220761a',
                borderRadius: 5,
                color: '#f22076',
              }}
              size="small"
            />
          </Box>
        </Stack>

        {/* Tags */}
        <Stack
          my={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Chip
            label="Unspecified Markets"
            size="small"
            sx={{ borderRadius: 1, color: '#838383', fontSize: 10 }}
            variant="outlined"
          />
          <Stack direction="row" alignItems="center" spacing={1}>
            {data.channel.google_display === 1 ||
            data.channel.google_video === 1 ? (
              <IconButton sx={{ width: '0.8em' }} size="small">
                {channelIcons.google}
              </IconButton>
            ) : null}

            {data.channel.facebook_static === 1 ||
            data.channel.facebook_video === 1 ? (
              <IconButton sx={{ width: '0.8em' }} size="small">
                {channelIcons.facebook}
              </IconButton>
            ) : null}

            {data.channel.youtube_video === 1 && (
              <IconButton sx={{ width: '0.8em' }} size="small">
                {channelIcons.youtube}
              </IconButton>
            )}
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/*  Dates*/}
        <Stack direction="row" mt={1} justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="center">
            <DirectionsCarFilledOutlinedIcon sx={{ color: '#858282' }} />
            <Typography variant="caption" sx={{ color: '#858282' }}>
              {_.isEmpty(data.date_created) ? (
                'Unspecified'
              ) : (
                <Moment format="MM/DD/YY hh:mm:ss A">
                  {data.date_created}
                </Moment>
              )}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <RocketLaunchOutlinedIcon sx={{ color: '#858282' }} />
            <Typography variant="caption" sx={{ color: '#858282' }}>
              {_.isEmpty(data.deadline) ? (
                'Unspecified'
              ) : (
                <Moment format="MM/DD/YY hh:mm:ss A">{data.deadline}</Moment>
              )}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

Concept.propTypes = {
  data: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  onPin: PropTypes.func.isRequired,
};

export default Concept;
