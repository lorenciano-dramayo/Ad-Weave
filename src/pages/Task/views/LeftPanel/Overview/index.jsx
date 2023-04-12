import { Fragment, useContext } from 'react';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import moment from 'moment';

import { useHistory, useLocation } from 'react-router-dom';

import _ from 'lodash';

import { useSelector } from 'react-redux';

// MUI Components
import { Grid, Stack, Divider, Typography, Chip, Box } from '@mui/material';

// Context
import TaskContext from 'pages/Task/Context';

// MUI icons
import TagIcon from '@mui/icons-material/Tag';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';

// local components
import CollapsiblePanels from 'pages/Task/Components/CollapsiblePanels';

// Static Icons
import { channelIcons } from 'constants/widgets';

import {
  overview,
  other_overview_info,
  other_overview_info_for_concept_design,
} from 'pages/Task/constant';

// color
import { appColors } from 'theme/variables';

function Overview({ onCloseDialog }) {
  const history = useHistory();
  const location = useLocation();

  const {
    overview: data,
    creatives,
    task_subtask,
    options: {
      priorityList,
      usersList,
      statusList,
      desktopDisplayList,
      mobileDisplayList,
    },
  } = useSelector((state) => state.tasks);

  const { handleOpen } = useContext(TaskContext);

  const isDesignQaTask = data?.task_type?.toLowerCase() === 'design qa';

  const isQaTask = data?.team?.name?.toLowerCase() === 'qa';

  const displayDesktop = _.filter(
    desktopDisplayList,
    (data) => data?.is_selected == true
  );
  const displayMobile = _.filter(
    mobileDisplayList,
    (data) => data?.is_selected == true
  );

  const handleRedirect = (rel_type, id) => {
    history.push({
      pathname: `/${
        rel_type.toLowerCase().includes('task') ? 'task' : 'campaign'
      }/${id}`,
      search: history.location.search,
      state: {
        background: location,
        type: rel_type.toLowerCase().includes('task') ? rel_type : 'campaign',
        subtask: rel_type.toLowerCase().includes('subtask') ? true : false,
      },
    });
  };

  return (
    <Fragment>
      <Stack>
        <Box>
          {_.filter(overview, (i) =>
            isDesignQaTask || isQaTask ? i : i.key != 'revision_round'
          ).map((fields, index) => {
            switch (fields.key) {
              case 'campaign_name':
                return (
                  !_.isEmpty(data[fields.key]) && (
                    <Fragment key={index}>
                      <Grid container sx={{ padding: '0.2em 0' }}>
                        <Grid item xs={4}>
                          <Typography fontWeight={700}>
                            {fields.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          {data[fields.key]}
                        </Grid>
                      </Grid>
                      <Divider sx={{ borderColor: '#0000000a' }} />
                    </Fragment>
                  )
                );

              case 'channel':
                return (
                  <Fragment key={index}>
                    <Grid container sx={{ padding: '0.2em 0' }}>
                      <Grid item xs={4}>
                        <Typography fontWeight={700}>{fields.name}</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Box>
                          {!_.isEmpty(data[fields.key]) ? (
                            <Chip
                              icon={
                                channelIcons[
                                  `${data[fields.key].toLowerCase()}`
                                ]
                              }
                              label={
                                data[fields.key].toLowerCase() === 'facebook'
                                  ? 'Meta'
                                  : data[fields.key]
                              }
                              size="small"
                              variant="outlined"
                              sx={{
                                marginRight: '0.5em',
                                borderRadius: '0.3em',
                                borderColor:
                                  appColors.social[
                                    `${data[fields.key].toLowerCase()}`
                                  ],
                                color:
                                  appColors.social[
                                    `${data[fields.key].toLowerCase()}`
                                  ],
                                '& .MuiChip-iconSmall': {
                                  width: '0.7em',
                                  marginLeft: '5px',
                                },
                              }}
                            />
                          ) : (
                            <Chip
                              label="No channel selected"
                              size="small"
                              variant="outlined"
                              sx={{
                                marginRight: '0.5em',
                                borderStyle: 'dashed',
                                borderRadius: '0.3em',
                              }}
                            />
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider sx={{ borderColor: '#0000000a' }} />
                  </Fragment>
                );

              case 'name':
                return (
                  data.rel_type !== 'task' && (
                    <Fragment key={index}>
                      <Grid container sx={{ padding: '0.2em 0' }}>
                        <Grid item xs={4}>
                          <Typography fontWeight={700}>
                            {fields.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          {data[fields.key]}
                        </Grid>
                      </Grid>
                      <Divider sx={{ borderColor: '#0000000a' }} />
                    </Fragment>
                  )
                );

              case 'tags':
                return (
                  <Fragment key={index}>
                    <Grid container sx={{ padding: '0.2em 0' }}>
                      <Grid item xs={4}>
                        <Typography fontWeight={700}>{fields.name}</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Box width="fit-content">
                          {!_.isEmpty(data[fields.key])
                            ? data[fields.key].map((e, i) => (
                                <Chip
                                  color="secondary"
                                  key={i}
                                  label={e.title}
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    marginRight: '0.5em',
                                    cursor: 'pointer',
                                  }}
                                />
                              ))
                            : null}
                          <Chip
                            icon={<TagIcon />}
                            label="Add tags"
                            size="small"
                            variant="outlined"
                            color="secondary"
                            sx={{
                              marginRight: '0.5em',
                              cursor: 'pointer',
                              borderStyle: 'dashed',
                              '& .MuiChip-iconSmall': {
                                width: '0.7em',
                                marginLeft: '5px',
                              },
                            }}
                            onClick={(e) =>
                              handleOpen(
                                e,
                                'left',
                                fields.key,
                                null,
                                null,
                                'task'
                              )
                            }
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider sx={{ borderColor: '#0000000a' }} />
                  </Fragment>
                );

              case 'triggers':
                return (
                  <Fragment key={index}>
                    <Grid container sx={{ padding: '0.2em 0' }}>
                      <Grid item xs={4}>
                        <Typography fontWeight={700}>{fields.name}</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Box
                          onClick={(e) =>
                            handleOpen(
                              e,
                              'left',
                              fields.key,
                              null,
                              null,
                              'task'
                            )
                          }
                          width="fit-content"
                        >
                          {!_.isEmpty(data[fields.key])
                            ? data[fields.key].map((e, i) => (
                                <Chip
                                  color="secondary"
                                  key={i}
                                  label={e.name}
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    marginRight: '0.5em',
                                    cursor: 'pointer',
                                  }}
                                />
                              ))
                            : null}
                          <Chip
                            icon={<DesignServicesOutlinedIcon />}
                            label="Add triggers"
                            size="small"
                            variant="outlined"
                            color="secondary"
                            sx={{
                              marginRight: '0.5em',
                              cursor: 'pointer',
                              borderStyle: 'dashed',
                              '& .MuiChip-iconSmall': {
                                width: '0.7em',
                                marginLeft: '5px',
                              },
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider sx={{ borderColor: '#0000000a' }} />
                  </Fragment>
                );

              case 'desktop_displays':
                return (
                  <Fragment key={index}>
                    <Grid container sx={{ padding: '0.2em 0' }}>
                      <Grid item xs={4}>
                        <Typography fontWeight={700}>{fields.name}</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Box
                          onClick={(e) =>
                            handleOpen(
                              e,
                              'left',
                              fields.key,
                              null,
                              null,
                              'task'
                            )
                          }
                          width="fit-content"
                        >
                          {!_.isEmpty(displayDesktop) ? (
                            displayDesktop.map((e, i) => (
                              <Chip
                                color="secondary"
                                key={i}
                                label={e.size}
                                size="small"
                                variant="outlined"
                                sx={{ marginRight: '0.5em', cursor: 'pointer' }}
                              />
                            ))
                          ) : (
                            <Chip
                              icon={<ComputerOutlinedIcon />}
                              label="Add desktop sizes"
                              size="small"
                              variant="outlined"
                              color="secondary"
                              sx={{
                                marginRight: '0.5em',
                                cursor: 'pointer',
                                borderStyle: 'dashed',
                                '& .MuiChip-iconSmall': {
                                  width: '0.7em',
                                  marginLeft: '5px',
                                },
                              }}
                            />
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider sx={{ borderColor: '#0000000a' }} />
                  </Fragment>
                );

              case 'mobile_displays':
                return (
                  <Fragment key={index}>
                    <Grid container sx={{ padding: '0.2em 0' }}>
                      <Grid item xs={4}>
                        <Typography fontWeight={700}>{fields.name}</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Box
                          onClick={(e) =>
                            handleOpen(
                              e,
                              'left',
                              fields.key,
                              null,
                              null,
                              'task'
                            )
                          }
                          width="fit-content"
                        >
                          {!_.isEmpty(displayMobile) ? (
                            displayMobile.map((e, i) => (
                              <Chip
                                color="secondary"
                                key={i}
                                label={e.size}
                                size="small"
                                variant="outlined"
                                sx={{ marginRight: '0.5em', cursor: 'pointer' }}
                              />
                            ))
                          ) : (
                            <Chip
                              icon={<PhoneIphoneOutlinedIcon />}
                              label="Add mobile sizes"
                              size="small"
                              variant="outlined"
                              color="secondary"
                              sx={{
                                marginRight: '0.5em',
                                cursor: 'pointer',
                                borderStyle: 'dashed',
                                '& .MuiChip-iconSmall': {
                                  width: '0.7em',
                                  marginLeft: '5px',
                                },
                              }}
                            />
                          )}
                        </Box>
                      </Grid>
                    </Grid>

                    <Divider sx={{ borderStyle: 'dashed', marginTop: '1em' }} />
                  </Fragment>
                );

              case 'refresh':
                return (
                  <Fragment key={index}>
                    <Grid container sx={{ padding: '0.2em 0' }}>
                      <Grid item xs={4}>
                        <Typography fontWeight={700}>{fields.name}</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        {data[fields.key] ? 'Yes' : 'No'}
                      </Grid>
                    </Grid>
                    <Divider sx={{ borderColor: '#0000000a' }} />
                  </Fragment>
                );

              case 'delivery_date':
              case 'due_date':
              case 'date_started':
              case 'date_ended':
                return (
                  <Fragment key={index}>
                    <Grid container sx={{ padding: '0.2em 0' }}>
                      <Grid item xs={4}>
                        <Typography fontWeight={700}>{fields.name}</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Box
                          onClick={(e) =>
                            handleOpen(e, 'left', fields.key, null)
                          }
                          width="fit-content"
                        >
                          <Typography
                            color="secondary"
                            sx={{ cursor: 'pointer' }}
                          >
                            {!_.isEmpty(data[fields.key])
                              ? moment(data[fields.key]).format(
                                  'MM/DD/YYYY hh:mm A'
                                )
                              : `${fields.name} not set.`}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider sx={{ borderColor: '#0000000a' }} />
                  </Fragment>
                );

              case 'date_created':
                return (
                  <Fragment key={index}>
                    <Grid container sx={{ padding: '0.2em 0' }}>
                      <Grid item xs={4}>
                        <Typography fontWeight={700}>{fields.name}</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        {moment(data[fields.key]).format('MM/DD/YYYY hh:mm A')}
                      </Grid>
                    </Grid>
                    <Divider sx={{ borderColor: '#0000000a' }} />
                  </Fragment>
                );

              case 'team':
                return (
                  <Fragment key={index}>
                    <Grid container sx={{ padding: '0.2em 0' }}>
                      <Grid item xs={4}>
                        <Typography fontWeight={700}>{fields.name}</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        {data[fields.key]?.name}
                      </Grid>
                    </Grid>
                    <Divider sx={{ borderColor: '#0000000a' }} />
                  </Fragment>
                );

              case 'task_type':
                return (
                  <Fragment key={index}>
                    <Grid container sx={{ padding: '0.2em 0' }}>
                      <Grid item xs={4}>
                        <Typography fontWeight={700}>{fields.name}</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          sx={{
                            ':hover': {
                              color: data?.rel_type === 'subtask' && '#F22076',
                              cursor: data?.rel_type === 'subtask' && 'pointer',
                            },
                          }}
                          onClick={() =>
                            data?.rel_type === 'subtask' &&
                            handleRedirect(data?.rel_type, data?.task_id)
                          }
                        >
                          {data[fields.key]}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider sx={{ borderColor: '#0000000a' }} />
                  </Fragment>
                );

              case 'concept':
                return (
                  <Fragment key={index}>
                    <Grid container sx={{ padding: '0.2em 0' }}>
                      <Grid item xs={4}>
                        <Typography fontWeight={700}>{fields.name}</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          sx={{
                            ':hover': { color: '#F22076' },
                            textDecoration: 'none',
                          }}
                          component={Link}
                          to={`/projects/${data?.partner_id}/concept/${data?.concept_id}`}
                          target="_blank"
                        >
                          {data[fields.key]}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider sx={{ borderColor: '#0000000a' }} />
                  </Fragment>
                );
              default:
                return (
                  <Fragment key={index}>
                    <Grid container sx={{ padding: '0.2em 0' }}>
                      <Grid item xs={4}>
                        <Typography fontWeight={700}>{fields.name}</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        {data[fields.key]}
                      </Grid>
                    </Grid>
                    <Divider sx={{ borderColor: '#0000000a' }} />
                  </Fragment>
                );
            }
          })}
        </Box>
        {(data.task_type.toLowerCase().includes('concept design')
          ? other_overview_info_for_concept_design
          : other_overview_info
        ).map(
          (other_info, index) =>
            data.rel_type !== other_info.key && (
              <CollapsiblePanels
                overview={overview}
                data={data}
                key={index}
                name={other_info.name}
                dataFields={data}
                subTask={task_subtask}
                creatives={creatives}
                priorityList={priorityList}
                usersList={usersList}
                statusList={statusList}
                handleOpen={handleOpen}
                onCloseDialog={onCloseDialog}
              />
            )
        )}
      </Stack>
    </Fragment>
  );
}

Overview.propTypes = {
  onCloseDialog: PropTypes.any,
};

export default Overview;
