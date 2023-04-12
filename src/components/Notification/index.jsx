import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import {
  getNotification,
  getPaginatedNotifications,
  getNotificationAllRead,
  setNotificationToRead,
} from 'store/reducers/notifications';

import InfiniteScroll from 'react-infinite-scroll-component';

//MUI Components
import {
  Box,
  Container,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Stack,
  Typography,
  Backdrop,
  CircularProgress,
  Divider,
} from '@mui/material';

// Components
import NotificationList from 'components/Notification/NotificationList';
import NotificationFilters from 'components/Notification/NotificationFilters';

import _ from 'lodash';

//styles
import { useStyles } from './styles';

// group by date
const grouping = (data) => {
  const groups = _.groupBy(data, (element) => element.created.substring(0, 10));
  return _.map(groups, (items, date) => ({
    date: date,
    lists: items,
  }));
};

const Notification = ({ handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const history = useHistory();

  const {
    list: notifications,
    isLoading,
    count,
  } = useSelector((state) => state.notifications);

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    dispatch(getNotification());
  }, []);

  const handleFilterChange = (e, value) => {
    e.preventDefault();

    setFilter(value);
    dispatch(getNotification(value));
  };

  const handleNotificationReadAll = () => {
    dispatch(getNotificationAllRead());
    setFilter('all');
  };

  const handleReadNotification = (id) => {
    localStorage?.removeItem('isURL');
  
  dispatch(setNotificationToRead(id));
  }
  
  

  const handlePaginateNotification = (_filter, _notification) => {
    dispatch(
      getPaginatedNotifications(_filter, _notification?.current_page + 1)
    );
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Card square className={classes.wrapper}>
        <CardHeader
          disableTypography={true}
          title="Notifications"
          className={classes.header}
        />
        <Backdrop
          sx={{
            position: 'absolute',
            backgroundColor: 'hsla(0,0%,100%,.8)',
            zIndex: 2,
          }}
          open={isLoading}
        >
          <CircularProgress color="secondary" />
        </Backdrop>
        <CardContent className={classes.content}>
          {count?.all === 0 ? (
            <Stack p={2}>
              <Stack
                sx={{
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                  boxShadow: '0 0 0 1px rgb(0 0 0 / 12%)',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '5px',
                    borderBottom: '1px solid #e4e4e4',
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: '12px',
                      lineHeight: '18px',
                      color: '#999',
                    }}
                  >
                    Why so empty?
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '10px',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#3f464b',
                      margin: 0,
                      fontSize: '12px',
                      lineHeight: '18px',
                      textAlign: 'left',
                    }}
                  >
                    In the near future, this space will be filled with
                    notifications about new task, updates in concept and
                    campaigns, and more. An indicator in the notification bell
                    will let you know when it&apos;s time to check back.
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          ) : (
            <Grid container direction="column" spacing={1}>
              <Grid item xs={12}>
                <NotificationFilters
                  count={count}
                  navClass={classes.contentWrapper}
                  dataFilter={filter}
                  onChange={handleFilterChange}
                  onClick={handleNotificationReadAll}
                />
              </Grid>
              {_.isEmpty(notifications?.data) ? (
                <>
                  <Divider sx={{ borderColor: '#ececec', marginTop: '8px' }} />
                  <Stack
                    sx={{
                      padding: '8px 17px',
                      border: '1px solid #d3d3d375',
                      margin: '12px 24px 0',
                      backgroundColor: '#5025c40d',
                      fontWeight: 700,
                      fontSize: '13px',
                      borderRadius: '3px',
                    }}
                  >
                    Notification not found.
                  </Stack>
                </>
              ) : (
                <Grid item xs={12}>
                  <Box
                    id="notification-main"
                    className={`scroll-shadows ${classes.box}`}
                  >
                    <InfiniteScroll
                      dataLength={notifications?.data?.length}
                      style={{ overflow: 'unset !important' }}
                      hasMore={!_.isEmpty(notifications?.next_page_url)}
                      loader={
                        <Stack
                          direction="row"
                          justifyContent="center"
                          sx={{ margin: '0 0 0.5em' }}
                        >
                          <CircularProgress
                            size={20}
                            color="secondary"
                            thickness={7}
                          />
                        </Stack>
                      }
                      scrollableTarget="notification-main"
                      next={() =>
                        handlePaginateNotification(filter, notifications)
                      }
                    >
                      {grouping(notifications?.data).map((item, index) => (
                        <NotificationList
                          item={item}
                          key={index}
                          list={item.lists}
                          onClick={handleReadNotification}
                          listItemClass={classes.notificationList}
                          descriptionClass={classes.multiLineEllipsis}
                        />
                      ))}
                    </InfiniteScroll>
                  </Box>
                </Grid>
              )}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

Notification.propTypes = {
  handleClose: PropTypes.func,
};

export default Notification;
