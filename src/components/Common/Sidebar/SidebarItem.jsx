import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

//MUI Components
import { withStyles } from '@mui/styles';
import {
  Avatar,
  ListItem,
  ListItemIcon,
  Tooltip,
  Zoom,
  Badge,
} from '@mui/material';

//styles
import { useStyles } from './styles';

const StyledTooltip = withStyles({
  tooltipPlacementRight: {
    left: '0.5em',
  },
})(Tooltip);

const SidebarItem = ({
  icon: IconComponent,
  label,
  link,
  onItemClick,
  index,
  activeNav,
  count,
}) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { data: user } = useSelector((state) => state.user);

  return (
    <div
      key={label}
      className={IconComponent !== null ? classes.items : classes.avatarItems}
    >
      <ListItem
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        disableRipple={link === null}
        button
        onClick={onItemClick(index)}
        component={link !== null && link !== pathname ? Link : null}
        to={link !== null ? (pathname.includes(link) ? '#' : link) : '#'}
        className={
          IconComponent !== null
            ? clsx(link !== null ? classes.sidebarItem : classes.staticItem, {
                [classes.active]:
                  link !== null ? pathname.includes(link) : activeNav === index,
              })
            : clsx(classes.sidebarItemAvatar, {
                [classes.activeAvatar]: pathname === link,
              })
        }
      >
        <StyledTooltip
          title={label.toLowerCase() === 'profile' ? '' : label}
          placement="right"
          arrow
          TransitionComponent={Zoom}
        >
          {IconComponent !== null ? (
            <ListItemIcon
              className={clsx(
                link !== null
                  ? classes.iconContainer
                  : classes.staticIconContainer
              )}
              sx={{
                '.MuiBadge-badge': {
                  width: '20px',
                  left: '1px',
                },
              }}
            >
              <Badge
                color={activeNav === index ? 'primary' : 'secondary'}
                invisible={label !== 'Notifications'}
                overlap="circular"
                badgeContent={count}
                max={9}
              >
                <IconComponent className={classes.icon} />
              </Badge>
            </ListItemIcon>
          ) : user.profile_picture?.split('/').pop() !== 'thumb_' ? (
            <Avatar
              className={classes.avatar}
              alt={user.fullname}
              src={user.profile_picture}
            />
          ) : (
            <Avatar className={classes.avatar}>
              {`${user.fullname.split(' ')[0][0]}${
                user.fullname.split(' ')[1][0]
              }`}
            </Avatar>
          )}
        </StyledTooltip>
      </ListItem>
    </div>
  );
};

SidebarItem.propTypes = {
  icon: PropTypes.elementType,
  label: PropTypes.string,
  link: PropTypes.string,
  onItemClick: PropTypes.func,
  isFirstLogin: PropTypes.bool,
  index: PropTypes.number,
  activeNav: PropTypes.number,
  count: PropTypes.any,
};

export default SidebarItem;
