import { useEffect } from 'react';

import _ from 'lodash';

import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';

import { getTaskActivityLogCampaign } from 'store/reducers/tasks';

import PropTypes from 'prop-types';

import {
  Box,
  Stack,
  Avatar,
  Typography,
  Card,
  IconButton,
  styled,
} from '@mui/material';

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';

import InfoIcon from '@mui/icons-material/Info';
import FlagIcon from '@mui/icons-material/Flag';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const StyledTimelineItem = styled(TimelineItem)({
  '&:before': {
    display: 'none',
  },
});

const ActivityLog = (data) => {
  const dispatch = useDispatch();

  const { activityLogCampaign } = useSelector((state) => state.tasks);
  const { data: user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getTaskActivityLogCampaign(data.campaignId));
  }, []);

  return (
    <Box>
      <Timeline>
        {activityLogCampaign?.length > 0 ? (
          activityLogCampaign?.map((data, index) => (
            <StyledTimelineItem key={index}>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="secondary" variant="outlined">
                  {data.type.includes('date') ? (
                    <CalendarMonthIcon color="secondary" />
                  ) : data.type === 'priority' ? (
                    <FlagIcon color="secondary" />
                  ) : (
                    <InfoIcon color="secondary" />
                  )}
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box>
                    {!_.isEmpty(data?.user?.avatar) &&
                    data?.user?.avatar?.split('/').pop() !== 'thumb_' ? (
                      <Avatar alt={data?.user?.name} src={data?.user?.avatar} />
                    ) : (
                      <Avatar>
                        {`${data?.user?.name.split(' ')[0][0]}${
                          data?.user?.name.split(' ')[1][0]
                        }`}
                      </Avatar>
                    )}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" component="span">
                      <Typography
                        fontWeight={700}
                        color="primary"
                        component="span"
                      >
                        {user?.id === data?.user?.user_id
                          ? 'You'
                          : data?.user?.name}
                      </Typography>
                      {` updated the `}
                      <Typography
                        component="span"
                        fontWeight={700}
                        textTransform="capitalize"
                        color="secondary"
                      >
                        {`${data.type.replace(/_/g, ' ')}`}
                      </Typography>
                      {` from `}
                      <Typography
                        component="span"
                        textTransform="capitalize"
                        color="error"
                      >
                        {data?.type?.includes('date')
                          ? moment(data.from).format('LLL')
                          : `${data?.from?.replace(/_/g, ' ')}`}
                      </Typography>
                      {` to `}
                      <Typography
                        component="span"
                        textTransform="capitalize"
                        sx={{ color: '#4caf50' }}
                      >
                        {data?.type?.includes('date')
                          ? moment(data.to).format('LLL')
                          : `${data?.to?.replace(/_/g, ' ')}`}
                      </Typography>
                    </Typography>
                    <Typography variant="caption" component="div">
                      {moment(data.date_updated).calendar()}
                    </Typography>
                  </Box>
                </Stack>
              </TimelineContent>
            </StyledTimelineItem>
          ))
        ) : (
          <Card variant="outlined" sx={{ borderStyle: 'dashed' }}>
            <Stack alignItems="center" p={3}>
              <Box>
                <IconButton
                  size="large"
                  color="error"
                  disableRipple
                  disableTouchRipple
                  disableFocusRipple
                  sx={{ backgroundColor: '#f2445c1a' }}
                >
                  <ListAltIcon />
                </IconButton>
              </Box>
              <Box>
                <Typography fontWeight={700} color="#999999">
                  No activity log found for this campaign.
                </Typography>
              </Box>
            </Stack>
          </Card>
        )}
      </Timeline>
    </Box>
  );
};

ActivityLog.propTypes = {
  data: PropTypes.any,
};

export default ActivityLog;
