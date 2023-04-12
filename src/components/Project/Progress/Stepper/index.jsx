import React, { Fragment } from 'react';
// MUI
import { styled } from '@mui/styles';
import { Typography, Stack, Box, Tooltip } from '@mui/material';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
// MUI Icons
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import DoneAllIcon from '@mui/icons-material/DoneAll';
// Utilities
import { appColors } from 'theme/variables';
import PropTypes from 'prop-types';
import _ from 'lodash';

const StyledHeaderWrapper = styled(Box)(({ color }) => ({
  width: '100%',
  border: '1px solid #e0e0e075',
  padding: '1.5rem 2.3rem 1.5rem 2.3rem',
  borderLeft: `8px solid ${color}`,
  boxShadow: '-5px 9px 4px -8px rgb(0 0 0 / 15%)',
}));

const StyledProgressIconWrapper = styled(Box)(({ color }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '2.9rem',
  height: '2.9rem',
  backgroundColor: color || appColors.gray,
  borderRadius: '1.5rem',
}));

const StyledHeaderTitle = styled(Typography)({
  fontSize: '1.1rem',
  fontWeight: 500,
  color: appColors.black,
});

const StyledProgressLinear = styled(LinearProgress)(() => ({
  width: '6%',
  height: 3,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: appColors.gray,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 2.5,
    backgroundColor: appColors.gray,
  },
}));

// Progress Header Item
const HeaderItem = ({ color, number, title, status, type }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2.5}>
      <Tooltip title={_.capitalize(status?.replace(/_/g, ' '))} arrow>
        <StyledProgressIconWrapper
          color={color}
          className={
            !['complete', 'notStarted', null, undefined, ''].includes(
              _.camelCase(status?.replace(/_/g, ' ').toLowerCase())
            ) && `active-stepper-${type}`
          }
        >
          {_.camelCase(status) === 'complete' ? (
            <DoneAllIcon fontSize="small" sx={{ color: 'white' }} />
          ) : ['complete', 'notStarted', null, undefined, ''].includes(
              _.camelCase(status?.replace(/_/g, ' ').toLowerCase())
            ) ? (
            <Typography color="white" variant="span">
              {number}
            </Typography>
          ) : (
            <GavelOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
          )}
        </StyledProgressIconWrapper>
      </Tooltip>
      <StyledHeaderTitle variant="p">{title}</StyledHeaderTitle>
    </Stack>
  );
};

const ProjectProgressStepper = ({ color, title, overview }) => {
  const display_progress = overview.display_progress;
  const google_video_progress = overview.google_video;

  const social_static_progress = overview.social_static_progress;
  const social_video_progress = overview.social_video_progress;

  const youtube_progress = overview.youtube_video;

  switch (title.toLowerCase()) {
    case 'google display':
      return (
        <Stack>
          <StyledHeaderWrapper color={color}>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Fragment>
                <HeaderItem
                  number={1}
                  color={
                    ['notStarted', null, undefined, ''].includes(
                      _.camelCase(
                        display_progress[0]?.status
                          ?.replace(/_/g, ' ')
                          .toLowerCase()
                      )
                    )
                      ? appColors.gray
                      : appColors.status[
                          _.camelCase(display_progress[0]?.status)
                        ]
                  }
                  title="Concept Design"
                  status={display_progress[0]?.status}
                  type="google"
                />
                <StyledProgressLinear
                  variant="determinate"
                  value={
                    Number(display_progress[0]?.stepper_level) === 1
                      ? Number(display_progress[0]?.stepper_progress)
                      : 100
                  }
                />
                <HeaderItem
                  number={2}
                  color={
                    ['notStarted', null, undefined, ''].includes(
                      _.camelCase(
                        display_progress[1]?.status
                          ?.replace(/_/g, ' ')
                          .toLowerCase()
                      )
                    )
                      ? appColors.gray
                      : appColors.status[
                          _.camelCase(display_progress[1]?.status)
                        ]
                  }
                  title="Concept Build"
                  status={display_progress[1]?.status}
                  type="google"
                />
                <StyledProgressLinear
                  variant="determinate"
                  value={
                    Number(display_progress[1]?.stepper_level) === 2
                      ? Number(display_progress[1]?.stepper_progress)
                      : Number(display_progress[1]?.stepper_level) === 1
                      ? 0
                      : 100
                  }
                />
                <HeaderItem
                  number={3}
                  color={
                    ['notStarted', null, undefined, ''].includes(
                      _.camelCase(
                        display_progress[2]?.status
                          ?.replace(/_/g, ' ')
                          .toLowerCase()
                      )
                    )
                      ? appColors.gray
                      : appColors.status[
                          _.camelCase(display_progress[2]?.status)
                        ]
                  }
                  title="Design QA"
                  status={display_progress[2]?.status}
                  type="google"
                />
                <StyledProgressLinear
                  variant="determinate"
                  value={
                    Number(display_progress[2]?.stepper_level) === 3
                      ? Number(display_progress[2]?.stepper_progress)
                      : 0
                  }
                />
                <HeaderItem
                  number={4}
                  color={
                    ['notStarted', null, undefined, ''].includes(
                      _.camelCase(
                        display_progress[3]?.status
                          ?.replace(/_/g, ' ')
                          .toLowerCase()
                      )
                    )
                      ? appColors.gray
                      : appColors.status[
                          _.camelCase(display_progress[3]?.status)
                        ]
                  }
                  title="Concept QA"
                  status={display_progress[3]?.status}
                  type="google"
                />
              </Fragment>
            </Stack>
          </StyledHeaderWrapper>
        </Stack>
      );
    case 'social static progress':
      return (
        <Stack>
          <StyledHeaderWrapper color={color}>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Fragment>
                <HeaderItem
                  number={1}
                  color={
                    ['notStarted', null, undefined, ''].includes(
                      _.camelCase(
                        social_static_progress[0]?.status
                          ?.replace(/_/g, ' ')
                          .toLowerCase()
                      )
                    )
                      ? appColors.gray
                      : appColors.status[
                          _.camelCase(social_static_progress[0]?.status)
                        ]
                  }
                  title="Concept Design"
                  status={social_static_progress[0]?.status}
                  type="facebook"
                />
                <StyledProgressLinear
                  variant="determinate"
                  value={
                    Number(social_static_progress[0]?.stepper_level) === 1
                      ? Number(social_static_progress[0]?.stepper_progress)
                      : 100
                  }
                />
                <HeaderItem
                  number={2}
                  color={
                    ['notStarted', null, undefined, ''].includes(
                      _.camelCase(
                        social_static_progress[1]?.status
                          ?.replace(/_/g, ' ')
                          .toLowerCase()
                      )
                    )
                      ? appColors.gray
                      : appColors.status[
                          _.camelCase(social_static_progress[1]?.status)
                        ]
                  }
                  title="Concept Build"
                  status={social_static_progress[1]?.status}
                  type="facebook"
                />
                <StyledProgressLinear
                  variant="determinate"
                  value={
                    Number(social_static_progress[1]?.stepper_level) === 2
                      ? Number(social_static_progress[1]?.stepper_progress)
                      : Number(social_static_progress[1]?.stepper_level) === 1
                      ? 0
                      : 100
                  }
                />
                <HeaderItem
                  number={3}
                  color={
                    ['notStarted', null, undefined, ''].includes(
                      _.camelCase(
                        social_static_progress[2]?.status
                          ?.replace(/_/g, ' ')
                          .toLowerCase()
                      )
                    )
                      ? appColors.gray
                      : appColors.status[
                          _.camelCase(social_static_progress[2]?.status)
                        ]
                  }
                  title="Design QA"
                  status={social_static_progress[2]?.status}
                  type="facebook"
                />
                <StyledProgressLinear
                  variant="determinate"
                  value={
                    Number(social_static_progress[2]?.stepper_level) === 3
                      ? Number(social_static_progress[2]?.stepper_progress)
                      : 0
                  }
                />
                <HeaderItem number={4} title="Concept QA" />
              </Fragment>
            </Stack>
          </StyledHeaderWrapper>
        </Stack>
      );

    case 'google video':
      return (
        <Stack>
          <StyledHeaderWrapper color={color}>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Fragment>
                <HeaderItem
                  number={1}
                  color={
                    ['notStarted', null, undefined, ''].includes(
                      _.camelCase(
                        google_video_progress[0]?.status
                          ?.replace(/_/g, ' ')
                          .toLowerCase()
                      )
                    )
                      ? appColors.gray
                      : appColors.status[
                          _.camelCase(google_video_progress[0]?.status)
                        ]
                  }
                  title="Concept Design"
                  status={google_video_progress[0]?.status}
                  type="google"
                />
                <StyledProgressLinear
                  variant="determinate"
                  value={
                    Number(google_video_progress[0]?.stepper_level) === 1
                      ? Number(google_video_progress[0]?.stepper_progress)
                      : 100
                  }
                />
                <HeaderItem
                  number={2}
                  color={
                    ['notStarted', null, undefined, ''].includes(
                      _.camelCase(
                        google_video_progress[1]?.status
                          ?.replace(/_/g, ' ')
                          .toLowerCase()
                      )
                    )
                      ? appColors.gray
                      : appColors.status[
                          _.camelCase(google_video_progress[1]?.status)
                        ]
                  }
                  title="Concept Build"
                  status={google_video_progress[1]?.status}
                  type="google"
                />
              </Fragment>
            </Stack>
          </StyledHeaderWrapper>
        </Stack>
      );
    case 'social video progress':
      return (
        <Stack>
          <StyledHeaderWrapper color={color}>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Fragment>
                <HeaderItem
                  number={1}
                  color={
                    ['notStarted', null, undefined, ''].includes(
                      _.camelCase(
                        social_video_progress[0]?.status
                          ?.replace(/_/g, ' ')
                          .toLowerCase()
                      )
                    )
                      ? appColors.gray
                      : appColors.status[
                          _.camelCase(social_video_progress[0]?.status)
                        ]
                  }
                  title="Concept Design"
                  status={social_video_progress[0]?.status}
                  type="facebook"
                />
                <StyledProgressLinear
                  variant="determinate"
                  value={
                    Number(social_video_progress[0]?.stepper_level) === 1
                      ? Number(social_video_progress[0]?.stepper_progress)
                      : 100
                  }
                />
                <HeaderItem
                  number={2}
                  color={
                    ['notStarted', null, undefined, ''].includes(
                      _.camelCase(
                        social_video_progress[1]?.status
                          ?.replace(/_/g, ' ')
                          .toLowerCase()
                      )
                    )
                      ? appColors.gray
                      : appColors.status[
                          _.camelCase(social_video_progress[1]?.status)
                        ]
                  }
                  title="Concept Build"
                  status={social_video_progress[1]?.status}
                  type="facebook"
                />
              </Fragment>
            </Stack>
          </StyledHeaderWrapper>
        </Stack>
      );
    case 'youtube progress':
      return (
        <Stack>
          <StyledHeaderWrapper color={color}>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Fragment>
                <HeaderItem
                  number={1}
                  color={
                    ['notStarted', null, undefined, ''].includes(
                      _.camelCase(
                        youtube_progress[0]?.status
                          ?.replace(/_/g, ' ')
                          .toLowerCase()
                      )
                    )
                      ? appColors.gray
                      : appColors.status[
                          _.camelCase(youtube_progress[0]?.status)
                        ]
                  }
                  title="Concept Design"
                  status={youtube_progress[0]?.status}
                  type="youtube"
                />
                <StyledProgressLinear
                  variant="determinate"
                  value={
                    Number(youtube_progress[0]?.stepper_level) === 1
                      ? Number(youtube_progress[0]?.stepper_progress)
                      : 100
                  }
                />
                <HeaderItem
                  number={2}
                  color={
                    ['notStarted', null, undefined, ''].includes(
                      _.camelCase(
                        youtube_progress[1]?.status
                          ?.replace(/_/g, ' ')
                          .toLowerCase()
                      )
                    )
                      ? appColors.gray
                      : appColors.status[
                          _.camelCase(youtube_progress[1]?.status)
                        ]
                  }
                  title="Concept Build"
                  status={youtube_progress[1]?.status}
                  type="youtube"
                />
              </Fragment>
            </Stack>
          </StyledHeaderWrapper>
        </Stack>
      );
  }
};

HeaderItem.propTypes = {
  color: PropTypes.string,
  number: PropTypes.number,
  title: PropTypes.string,
  status: PropTypes.string,
  type: PropTypes.string,
};

ProjectProgressStepper.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  overview: PropTypes.object,
};

export default ProjectProgressStepper;
