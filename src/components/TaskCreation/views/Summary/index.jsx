import { useContext } from 'react';

import { Link } from 'react-router-dom';

import _ from 'lodash';

import moment from 'moment';

import TaskCreationContext from 'components/TaskCreation/Context';

// MUI Components
import {
  Box,
  Stack,
  Typography,
  Divider,
  IconButton,
  Chip,
} from '@mui/material';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

// styles
import { useStyles } from 'components/TaskCreation/views/Summary/styles';

// constants
import { channelIcons } from 'constants/widgets';

const Summary = () => {
  const {
    team,
    taskType,
    partner,
    concept,
    channel,
    campaign,
    subTask,
    asset,
    referenceLinks,
    isRefresh,
    additionalInformation,
    tags,
    deliveryDate,
  } = useContext(TaskCreationContext);
  const classes = useStyles();

  return (
    <Stack className={classes.root}>
      <Box>
        {!_.isEmpty(team?.name) ||
        !_.isEmpty(taskType?.name) ||
        !_.isEmpty(subTask?.name) ? (
          <>
            <Stack spacing={-1}>
              <Typography sx={{ color: '#ffffffbf' }}>Name</Typography>
              <Typography
                variant="h5"
                className={classes.title}
                lineHeight={1.2}
              >
                {!_.isEmpty(subTask?.name)
                  ? subTask?.name
                  : !_.isEmpty(taskType?.name)
                  ? taskType?.name
                  : ''}
                {_.isEmpty(concept?.name)
                  ? ' - Untitled'
                  : _.isEmpty(campaign?.name)
                  ? ` - ${concept?.name}`
                  : ` - ${campaign?.name}`}
                {_.isEmpty(channel?.name) ? '' : ` - ${channel?.name}`}
              </Typography>
            </Stack>
            <Typography sx={{ color: '#ffc156' }} fontWeight={700} my={1}>
              Task Configuration
            </Typography>
          </>
        ) : null}

        {!_.isEmpty(team?.name) && (
          <Stack>
            <Typography variant="button" sx={{ color: '#919191bf' }}>
              Team
            </Typography>
            <Typography sx={{ color: '#fff' }} fontWeight={700}>
              {team?.name}
            </Typography>
          </Stack>
        )}

        {!_.isEmpty(taskType?.name) && (
          <Stack>
            <Typography variant="button" sx={{ color: '#919191bf' }}>
              Task Type
            </Typography>
            <Typography sx={{ color: '#fff' }} fontWeight={700}>
              {taskType?.name}
            </Typography>
          </Stack>
        )}

        {!_.isEmpty(subTask?.name) && (
          <Stack>
            <Typography variant="button" sx={{ color: '#919191bf' }}>
              Sub Task
            </Typography>
            <Typography sx={{ color: '#fff' }} fontWeight={700}>
              {subTask?.name}
            </Typography>
          </Stack>
        )}

        {!_.isEmpty(partner?.name) && (
          <Stack mt={2}>
            <Typography sx={{ color: '#ffc156' }} fontWeight={700} my={1}>
              Classification
            </Typography>

            {!_.isEmpty(partner?.name) && (
              <Stack>
                <Typography variant="button" sx={{ color: '#919191bf' }}>
                  Partner
                </Typography>
                <Typography sx={{ color: '#fff' }} fontWeight={700}>
                  {partner?.name}
                </Typography>
              </Stack>
            )}

            {!_.isEmpty(concept?.name) && (
              <Stack>
                <Typography variant="button" sx={{ color: '#919191bf' }}>
                  Concept
                </Typography>
                <Typography sx={{ color: '#fff' }} fontWeight={700}>
                  {concept?.name}
                </Typography>
              </Stack>
            )}

            {!_.isEmpty(campaign?.name) && (
              <Stack>
                <Typography variant="button" sx={{ color: '#919191bf' }}>
                  Campaign
                </Typography>
                <Typography sx={{ color: '#fff' }} fontWeight={700}>
                  {campaign?.name}
                </Typography>
              </Stack>
            )}

            {!_.isEmpty(channel?.name) && (
              <Stack>
                <Typography variant="button" sx={{ color: '#919191bf' }}>
                  Channel
                </Typography>

                <Box mt={1}>
                  {channel?.name?.toLowerCase() !== 'youtube' ? (
                    channel?.name?.split(' ')[0].toLowerCase() === 'google' ? (
                      <Box width="2em" height="2em">
                        {channelIcons.google}
                      </Box>
                    ) : (
                      <Box width="2em" height="2em">
                        {channelIcons.facebook}
                      </Box>
                    )
                  ) : (
                    <Box width="2em" height="2em">
                      {channelIcons.youtube}
                    </Box>
                  )}
                </Box>
              </Stack>
            )}
          </Stack>
        )}

        {!_.isNull(deliveryDate) || !_.isEmpty(tags) || !_.isNull(isRefresh) ? (
          <Stack mt={2}>
            <Typography sx={{ color: '#ffc156' }} fontWeight={700} my={1}>
              Details
            </Typography>

            {!_.isNull(deliveryDate) && (
              <Stack>
                <Typography variant="button" sx={{ color: '#919191bf' }}>
                  Delivery Date
                </Typography>
                <Typography sx={{ color: '#fff' }} fontWeight={700}>
                  {moment(deliveryDate).format('MM/DD/YYYY h:mm A')}
                </Typography>
              </Stack>
            )}

            {!_.isEmpty(tags) && (
              <Stack>
                <Typography variant="button" sx={{ color: '#919191bf' }}>
                  Tags
                </Typography>
                <Stack display="block" mt={1}>
                  {_.map(tags, (data, index) => (
                    <Chip
                      key={index}
                      color="secondary"
                      sx={{ marginBottom: '0.5em', marginRight: '0.5em' }}
                      label={
                        _.isUndefined(data.id)
                          ? _.isUndefined(data.inputValue)
                            ? data
                            : data.inputValue
                          : data.title
                      }
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Stack>
            )}

            {!_.isNull(isRefresh) && (
              <Stack>
                <Typography variant="button" sx={{ color: '#919191bf' }}>
                  Refresh
                </Typography>
                <Typography sx={{ color: '#fff' }} fontWeight={700}>
                  {isRefresh === 0 ? 'No' : 'Yes'}
                </Typography>
              </Stack>
            )}
          </Stack>
        ) : null}

        {!_.isEmpty(asset) || !_.isEmpty(referenceLinks) ? (
          <Stack mt={2}>
            <Typography sx={{ color: '#ffc156' }} fontWeight={700} my={1}>
              References
            </Typography>
            {!_.isEmpty(asset) && (
              <Stack>
                <Typography variant="button" sx={{ color: '#919191bf' }}>
                  Assets
                </Typography>
                {asset.map((data, index) => (
                  <Box key={index}>
                    <Stack direction="row" justifyContent="space-between">
                      <Box>
                        <Typography fontWeight={700} sx={{ color: '#fff' }}>
                          {data?.file?.name.split('').length > 40
                            ? `${data?.file?.name.slice(0, 40)} ...`
                            : data?.file?.name}
                        </Typography>
                      </Box>
                    </Stack>
                    {asset.length - 1 !== index && (
                      <Divider sx={{ borderColor: '#7655c142' }} />
                    )}
                  </Box>
                ))}
              </Stack>
            )}

            {!_.isEmpty(referenceLinks) && (
              <Stack>
                <Typography variant="button" sx={{ color: '#919191bf' }}>
                  Links
                </Typography>
                {!_.isEmpty(referenceLinks) &&
                  referenceLinks.map((data, index) => (
                    <Box key={index}>
                      <Stack direction="row" justifyContent="space-between">
                        <Box>
                          <Typography fontWeight={700} sx={{ color: '#fff' }}>
                            {data?.name.split('').length > 40
                              ? `${data?.name.slice(0, 40)} ...`
                              : data?.name}
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton
                            component={Link}
                            to={{
                              pathname: _.isEmpty(data.url)
                                ? data.name
                                : data.url,
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                            color="secondary"
                          >
                            <InsertLinkIcon />
                          </IconButton>
                        </Box>
                      </Stack>
                      {referenceLinks.length - 1 !== index && (
                        <Divider sx={{ borderColor: '#7655c142' }} />
                      )}
                    </Box>
                  ))}
              </Stack>
            )}
          </Stack>
        ) : null}

        {additionalInformation !== '<p></p>\n' ? (
          <Stack mt={2}>
            <Typography sx={{ color: '#ffc156' }} fontWeight={700} my={1}>
              Additional Information
            </Typography>

            <Box
              color="#fff"
              dangerouslySetInnerHTML={{ __html: additionalInformation }}
            />
          </Stack>
        ) : null}

        {/* {console.log({
          team: team?.id,
          taskType: taskType?.id,
          subTask: subTask?.id,
          partner: partner?.id,
          concept: concept?.id,
          campaign: campaign?.id,
          channel: channel?.name,
          files: _.map(asset, (data) =>
            _.pickBy(data, (value, key) => key === 'file')
          ),
          links: _.map(referenceLinks, (data) => {
            return {
              name: data.name,
              url: _.isEmpty(data.url) ? data.name : data.url,
            };
          }),
          additionalInfo: additionalInformation,
          isRefresh: isRefresh,
          deliveryDate: moment(deliveryDate).format('MM/DD/YYYY h:mm A'),
          tags: _.map(tags, (data) =>
            _.isUndefined(data.id)
              ? _.isUndefined(data.inputValue)
                ? data
                : data.inputValue
              : data.title
          ),
        })} */}
      </Box>
    </Stack>
  );
};

export default Summary;
