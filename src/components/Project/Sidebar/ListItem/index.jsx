// React
import { useState } from 'react';

import { useHistory } from 'react-router-dom';

// MUI
import { styled } from '@mui/styles';

import {
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Tooltip,
  CircularProgress,
} from '@mui/material';

// Utilities
import PropTypes from 'prop-types';

// Styled Components
const StyledListItem = styled(ListItem)({
  '&.Mui-selected': {
    borderRadius: '4px !important',
  },
  '&.Mui-selected *': {
    color: 'white',
  },
});

const StyledListItemButton = styled(ListItemButton)({
  padding: '0rem 0.75rem 0rem 0.75rem',
});

const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: 27,
});

const StyledDot = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: 7,
  height: 7,
  borderRadius: 3.5,
  backgroundColor: theme.palette.secondary.main,
}));

const ProjectSidebarListItem = ({
  icon,
  title,
  isSelected,
  isNewlyCreated,
  conceptId,
  partnerId,
  isFetchingOverview,
}) => {
  const history = useHistory();
  const [isNewlyCreatedIndicatorShown, setIsNewlyCreatedIndicatorShown] =
    useState(isNewlyCreated);

  const handleClick = (e) => {
    e.preventDefault();
    setIsNewlyCreatedIndicatorShown(false);
    history.push(`/projects/${partnerId}/concept/${conceptId}`);
  };

  return (
    <Tooltip
      placement="right"
      disableHoverListener={title.split('').length < 20}
      title={title ?? ''}
      arrow
    >
      <StyledListItem
        selected={isSelected}
        sx={{ padding: 0, margin: isFetchingOverview ? '0.1em 0' : 'auto' }}
        onClick={(e) => handleClick(e)}
      >
        {isNewlyCreatedIndicatorShown && <StyledDot />}
        <StyledListItemButton disableRipple>
          <StyledListItemIcon>
            {isFetchingOverview ? (
              <CircularProgress size={15} />
            ) : (
              <img src={icon} alt="icon" />
            )}
          </StyledListItemIcon>
          <ListItemText
            primary={
              title.split('').length < 20 ? title : `${title.substr(0, 19)} ...`
            }
          />
        </StyledListItemButton>
      </StyledListItem>
    </Tooltip>
  );
};

ProjectSidebarListItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  isSelected: PropTypes.bool,
  isNewlyCreated: PropTypes.bool,
  partnerId: PropTypes.string,
  conceptId: PropTypes.string,
  isFetchingOverview: PropTypes.bool,
};

export default ProjectSidebarListItem;
