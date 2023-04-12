// React
import { useState, useEffect, memo } from 'react';

// MUI
import { Stack, Typography, IconButton, Collapse } from '@mui/material';
import { styled } from '@mui/styles';

// App Components
import ProjectProgressStepper from './Stepper';
import CollapsibleTableTask from 'components/Common/CollapsibleTable/task';

// MUI Icons
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// Assets
import DisplayProgress from 'assets/icons/concept/progress/display.svg';
import DisplayVideoProgress from 'assets/icons/concept/progress/google_video.svg';
import MetaStaticProgress from 'assets/icons/concept/progress/meta_static.png';
import MetaVideoProgress from 'assets/icons/concept/progress/meta_video.png';
import YoutubeProgress from 'assets/icons/concept/progress/youtube.svg';

// Utilities
import PropTypes from 'prop-types';
import { appColors } from 'theme/variables';

// Styled Components
const StyledProgressTitle = styled(Typography)({
  fontSize: '1.3rem',
  fontWeight: 600,
  color: '#25165B',
});

const StyledAccordionButton = styled(IconButton)({
  color: `${appColors.darkGray}`,
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

const StyledHorizontalDivider = styled('div')({
  flex: 1,
  height: 1,
  backgroundColor: appColors.lightGray,
});

const ProjectProgressTask = ({
  header,
  dataset,
  overview,
  onStatusChange,
  isCampaign,
  ...props
}) => {
  const [isCollapsed, setIsCollapsed] = useState(props.isCollapsed);

  const headerIcon = () => {
    switch (header.title.toLowerCase()) {
      case 'google display':
        return <img src={DisplayProgress} alt="display_progress" />;
      case 'google video':
        return (
          <img
            src={DisplayVideoProgress}
            alt="display_video_progress"
            style={{ width: 25, height: 25 }}
          />
        );
      case 'social static progress':
        return (
          <img
            src={MetaStaticProgress}
            alt="social_static_progress"
            style={{ width: 25, height: 25 }}
          />
        );
      case 'social video progress':
        return (
          <img
            src={MetaVideoProgress}
            alt="social_video_progress"
            style={{ width: 25, height: 25 }}
          />
        );
      case 'youtube progress':
        return (
          <img
            src={YoutubeProgress}
            alt="youtube_progress"
            style={{ width: 22, height: 22 }}
          />
        );
      default:
        break;
    }
  };

  useEffect(() => {
    setIsCollapsed(props.isCollapsed);
  }, [props.isCollapsed]);

  return isCampaign ? (
    <CollapsibleTableTask
      config={{ ...header }}
      dataset={dataset}
      tableProps={{ sx: { tableLayout: 'fixed' } }}
      onStatusChange={onStatusChange}
      isEditable
      onClickRow={() => { }}
    />
  ) : (
    <Stack my={4} spacing={2}>
      <Stack direction="row" alignItems="center" spacing={2} display="flex">
        <Stack direction="row" alignItems="center" spacing={1.5}>
          {headerIcon()}
          <StyledProgressTitle variant="p">{header.title}</StyledProgressTitle>
        </Stack>
        <StyledHorizontalDivider />
        <StyledAccordionButton onClick={() => setIsCollapsed(!isCollapsed)}>
          <KeyboardArrowDownOutlinedIcon
            sx={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </StyledAccordionButton>
      </Stack>
      <Collapse
        in={isCollapsed}
        timeout="auto"
        orientation="vertical"
        unmountOnExit
      >
        <ProjectProgressStepper {...header} overview={overview} />
        <CollapsibleTableTask
          config={{ ...header }}
          dataset={dataset}
          tableProps={{ sx: { tableLayout: 'fixed' } }}
          onStatusChange={onStatusChange}
          onClickRow={() => { }}
          isEditable
        />
      </Collapse>
    </Stack>
  );
};

ProjectProgressTask.propTypes = {
  header: PropTypes.object.isRequired,
  overview: PropTypes.object.isRequired,
  dataset: PropTypes.object.isRequired,
  isCampaign: PropTypes.bool,
  isCollapsed: PropTypes.bool,
  onStatusChange: PropTypes.func,
};

export default memo(ProjectProgressTask);
