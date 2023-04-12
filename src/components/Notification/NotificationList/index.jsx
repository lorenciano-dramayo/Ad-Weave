import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

//MUI Components
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  Badge,
  Stack,
} from '@mui/material';

const NotificationList = ({
  item,
  list,
  onClick,
  listItemClass,
  descriptionClass,
}) => {
  const location = useLocation();
  return (
    <div>
      <Typography variant="caption" fontWeight={700} color="secondary">
        <Moment format="dddd, MMMM D, YYYY">{item.date}</Moment>
      </Typography>
      <List>
        {list.map((obj, i) => (
          <ListItem
            key={i}
            disablePadding
            className={listItemClass}
            component={Link}
            to={{
              pathname: obj?.action.toLowerCase(),
              state: (obj?.rel_type?.toLowerCase() === 'task' ||
                obj?.rel_type?.toLowerCase() === 'subtask') && {
                background: location,
                type: obj?.rel_type?.toLowerCase(),
                subtask:
                  obj?.rel_type?.toLowerCase() === 'subtask' ? true : false,
              },
            }}
            onClick={() => onClick(obj?.id)}
          >
            <ListItemButton>
              {/* <ListItemAvatar>
                <Avatar alt={obj.create_by.toUpperCase()} src={obj.avatar} />
              </ListItemAvatar> */}
              <ListItemText
                primary={
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="space-between"
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          '-webkit-line-clamp': '1',
                          '-webkit-box-orient': 'vertical',
                        }}
                      >
                        {/* <span
                          style={{
                            fontWeight: 800,
                            textTransform: 'capitalize',
                            marginRight: '0.5em',
                          }}
                        >
                          {obj.create_by}
                        </span> */}
                        {obj.message.replace(/<(.|\n)*?>/g, '')}
                      </Typography>
                    </Stack>
                    <Box display="flex" alignItems="center">
                      <Typography variant="caption" sx={{ minWidth: '4.5em' }}>
                        <Moment format="hh:mm A">{obj.created}</Moment>
                      </Typography>
                      <Box ml={'9px'}>
                        {obj.status === 'unread' ? (
                          <Badge
                            sx={{ display: 'flex' }}
                            color="secondary"
                            badgeContent=" "
                            variant="dot"
                            overlap="circular"
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                            }}
                          />
                        ) : null}
                      </Box>
                    </Box>
                  </Stack>
                }
                secondary={
                  <Typography
                    variant="caption"
                    className={descriptionClass}
                    color="#202020"
                  >
                    {obj.rel_name}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

NotificationList.propTypes = {
  list: PropTypes.array,
  listItemClass: PropTypes.any,
  descriptionClass: PropTypes.any,
  item: PropTypes.object,
  onClick: PropTypes.func,
};

export default NotificationList;
