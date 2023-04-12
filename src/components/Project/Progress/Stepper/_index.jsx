import React, { Fragment } from 'react';
// MUI
import { styled } from '@mui/styles';
import { Typography, Stack, Box } from '@mui/material';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
// MUI Icons
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
// Utilities
import { appColors } from 'theme/variables';
import PropTypes from 'prop-types';
import Color from 'color';
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

const StyledProgressLinear = styled(LinearProgress)(({ theme }) => ({
  width: '6%',
  height: 3,
  borderRadius: 2.5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: Color(theme.palette.secondary.main).alpha(0.5).string(),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 2.5,
    backgroundColor: theme.palette.primary.main,
  },
}));

// Progress Header Item
const HeaderItem = ({ color, number, title }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2.5}>
      <StyledProgressIconWrapper
        color={color}
        className="active-stepper-google"
      >
        {number > 1 ? (
          <Typography color="white" variant="span">
            {number}
          </Typography>
        ) : (
          <GavelOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
        )}
      </StyledProgressIconWrapper>
      <StyledHeaderTitle variant="p">{title}</StyledHeaderTitle>
    </Stack>
  );
};

const ProjectProgressStepper = ({ color, title, overview }) => {
  const social_video_progress = overview.social_video_progress[0];
  const social_static_progress = overview.social_static_progress[0];
  const display_progress = overview.display_progress[0];

  return (
    <Stack>
      <StyledHeaderWrapper color={color}>
        {title?.toLowerCase().includes('video') ||
        title?.toLowerCase().includes('youtube') ? (
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Fragment>
              <HeaderItem number={1} color={color} title="Concept Design" />
              <StyledProgressLinear
                variant="determinate"
                value={
                  Number(social_video_progress?.stepper_level) === 1
                    ? Number(social_video_progress?.stepper_progress)
                    : 100
                }
              />
              <HeaderItem number={2} title="Concept Build" />
            </Fragment>
          </Stack>
        ) : (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {title.toLowerCase().includes('google display') ? (
              <Fragment>
                <HeaderItem number={1} color={color} title="Concept Design" />
                <StyledProgressLinear
                  variant="determinate"
                  value={
                    Number(display_progress?.stepper_level) === 1
                      ? Number(display_progress?.stepper_progress)
                      : 100
                  }
                />
                <HeaderItem number={2} title="Concept Build" />
                <StyledProgressLinear
                  variant="determinate"
                  value={
                    Number(display_progress?.stepper_level) === 2
                      ? Number(display_progress?.stepper_progress)
                      : Number(display_progress?.stepper_level) === 1
                      ? 0
                      : 100
                  }
                />
                <HeaderItem number={3} title="Design QA" />
                <StyledProgressLinear
                  variant="determinate"
                  value={
                    Number(display_progress?.stepper_level) === 3
                      ? Number(display_progress?.stepper_progress)
                      : 0
                  }
                />
                <HeaderItem number={4} title="Concept QA" />
              </Fragment>
            ) : (
              <Fragment>
                <HeaderItem number={1} color={color} title="Concept Design" />
                <StyledProgressLinear
                  variant="determinate"
                  value={
                    Number(social_static_progress?.stepper_level) === 1
                      ? Number(social_static_progress?.stepper_progress)
                      : 100
                  }
                />
                <HeaderItem number={2} title="Concept Build" />
                <StyledProgressLinear
                  variant="determinate"
                  value={
                    Number(social_static_progress?.stepper_level) === 2
                      ? Number(social_static_progress?.stepper_progress)
                      : Number(social_static_progress?.stepper_level) === 1
                      ? 0
                      : 100
                  }
                />
                <HeaderItem number={3} title="Design QA" />
                <StyledProgressLinear
                  variant="determinate"
                  value={
                    Number(social_static_progress?.stepper_level) === 3
                      ? Number(social_static_progress?.stepper_progress)
                      : 0
                  }
                />
                <HeaderItem number={4} title="Concept QA" />
              </Fragment>
            )}
          </Stack>
        )}
      </StyledHeaderWrapper>
    </Stack>
  );
};

HeaderItem.propTypes = {
  color: PropTypes.string,
  number: PropTypes.number.isRequired,
  title: PropTypes.string,
};

ProjectProgressStepper.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string.isRequired,
  overview: PropTypes.object.isRequired,
};

export default ProjectProgressStepper;
