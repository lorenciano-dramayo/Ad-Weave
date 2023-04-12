import { useEffect, useState } from 'react';
import _ from 'lodash';

import { useDispatch, useSelector } from 'react-redux';

import { useParams, useHistory, useLocation } from 'react-router-dom';

// Reducers
import {
  getData,
  fetchCampaignsList,
  fetchTimelogList,
  reset,
} from 'store/reducers/campaign';

import Timelog from 'pages/Campaign/views/Timelog';
import ActivityLog from 'pages/Campaign/views/ActivityLog';
import Task from 'pages/Campaign/views/Task';

// Predefined Variables
import { overview } from 'pages/Campaign/helpers/constant';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';

// Components
import Header from 'pages/Campaign/Components/Header';
import ResponsiveDrawer from 'components/Common/ResponsiveDrawer';
import ListAddSelection from 'pages/Task/Components/ListAddSelection';
import List from 'pages/Campaign/views/List';
import DateTimerPicker from 'pages/Task/Components/DateTimePicker';

// Views
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { appColors } from 'theme/variables';
import {
  Stack,
  Box,
  IconButton,
  Typography,
  Collapse,
  AvatarGroup,
  Avatar,
  styled,
  Divider,
  Tabs,
  Tab,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  OutlinedInput,
  Card,
  Tooltip,
} from '@mui/material';
import Error from './views/Error';

// Reducer
import {
  requestFetchRefLink_,
  requestAddRefLinkCampaign_,
  requestDestroyRefLinkCampaign_,
  fetchReferenceLinkCampaign_,
} from 'store/reducers/tasks';
import { updateCampaignByKey } from 'store/reducers/campaign';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import Popup from 'pages/Task/Components/Popup';
import VirtualListSelection from 'pages/Task/Components/VirtualListSelection';
// MUI Icons
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SkeletonLoader from 'pages/Campaign/Components/Skeleton';

import PropTypes from 'prop-types';

import { channelIcons } from 'constants/widgets';

import { transformCampaignTasks } from 'utils/dictionary';

const StyledInputField = styled(OutlinedInput)({
  fontSize: '0.9rem',
  borderRadius: '0.2rem',
  paddingRight: '12px',
  '&.Mui-focused fieldset': {
    border: '1px solid #5025c4 !important',
    boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
  },
});

const StyledAccordion = styled(Accordion)({
  boxShadow: 'none',
});

const StyledAccordionSummary = styled(AccordionSummary)({
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  padding: '0px',
});

const StyledAccordionDetails = styled(AccordionDetails)({
  padding: '10px 0px',
});

const Campaign = () => {
  const {
    overview: { creatives, assignees },
    options: { usersList },
  } = useSelector((state) => state.tasks);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { campaignId } = useParams();

  const [anchorEl, setAnchorEl] = useState(null);
  const [popupAnchorEl, setPopupAnchorEl] = useState(null);
  const [horizontal, setHorizontal] = useState('left');
  const [option, setOption] = useState([]);
  const [optionType, setOptionType] = useState(null);
  const [selected, setSelected] = useState(null);
  const [isParent, setIsParent] = useState(null);

  const { data_reference_campaign } = useSelector((state) => state.tasks);

  // States
  const [isCollapsed] = useState(true);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [, setCampaignTasks] = useState({});

  const [filteredRowsReferenceLink, setFilteredRowsReferenceLink] = useState(
    data_reference_campaign
  );
  const [referenceLinkInput01, setReferenceLinkInput01] = useState('');
  const [referenceLinkInput02, setReferenceLinkInput02] = useState('');

  // Redux
  const {
    list: campaign,
    isFetching,
    timelog,
    options: { tagsList, statusList },
    error,
  } = useSelector((state) => state.campaign);

  const { list: maintenanceTaskStatus } = useSelector(
    (state) => state.maintenanceTaskStatus
  );

  // Hooks
  useEffect(() => {
    setFilteredRowsReferenceLink(data_reference_campaign);
    dispatch(fetchCampaignsList(campaignId));
    dispatch(fetchTimelogList(campaignId));
    dispatch(getData('status'));
    dispatch(getData('tags', { relId: campaignId, relType: 'task' }));
    setOpen(true);
  }, [campaignId, data_reference_campaign]);

  useEffect(() => {
    if (_.isEmpty(campaign)) {
      return;
    }

    dispatch(getData('users'));

    setCampaignTasks(
      transformCampaignTasks(campaign.task, maintenanceTaskStatus)[0]
    );
  }, [campaign]);

  const handleOpen = (event, position, type, data, select) => {
    event.preventDefault();
    setPopupAnchorEl(event.currentTarget);
    setSelected(select);
    setHorizontal(position);
    setOptionType(type);
    setOption(data);
    setIsParent(1);
  };

  const handleSave = (data) => {
    if (!_.isEmpty(data?.selectedArr)) {
      !_.find(selected, { id: `${data?.selectedArr?.id}` })
        ? setSelected([
            ...selected,
            { ...data?.selectedArr, id: `${data?.selectedArr.id}` },
          ])
        : setSelected(
            _.filter(
              selected,
              (filterSelect) => filterSelect.id != data?.selectedArr?.id
            )
          );
    } else {
      setSelected(data.value);
    }

    dispatch(updateCampaignByKey(data));
  };

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const handleClose = () => {
    console.log('handleClose: ', handleClose);
    setOpen(false);

    setTimeout(() => dispatch(reset()), 500);

    if (
      !_.isUndefined(campaign.partner_id) &&
      !_.isUndefined(campaign.concept_id)
    ) {
      setTimeout(
        () =>
          history.replace(
            `/projects/${campaign.partner_id}/concept/${campaign.concept_id}`
          ),
        500
      );
    } else {
      setTimeout(
        () =>
          history.push({
            pathname: location.state.background.pathname,
            state: {
              background: location.state.background,
              type: 'campaign',
              subtask: null,
            },
          }),
        500
      );
    }
  };

  // Reference Link Functionality
  const handleGetDataRefLinkAccordionTrigger = () => {
    dispatch(requestFetchRefLink_(campaign.id));
    setFilteredRowsReferenceLink(data_reference_campaign);
  };

  const handleDeleteRefLink = (id) => {
    const itemRefLink = [];
    itemRefLink.push({
      ids: id,
      rel_id: campaign.id,
    });
    dispatch(requestDestroyRefLinkCampaign_(id, campaign.id));
    setFilteredRowsReferenceLink(data_reference_campaign);
  };

  const handleOnKeyUpRefLink = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      if (
        referenceLinkInput01.toString() == '' ||
        referenceLinkInput02.toString() == ''
      ) {
        alert('Please complete all fields.');
      } else {
        const itemRefLink = [];
        itemRefLink.push({
          rel_id: campaign.id,
          url: referenceLinkInput01,
          name: referenceLinkInput02,
          rel_type: '2',
        });

        dispatch(requestAddRefLinkCampaign_(itemRefLink[0]));

        setReferenceLinkInput01('');
        setReferenceLinkInput02('');
        dispatch(fetchReferenceLinkCampaign_(campaign.id));
        setFilteredRowsReferenceLink(data_reference_campaign);
      }
    }
  };

  return (
    <ResponsiveDrawer
      isOpen={open}
      handleClose={handleClose}
      content={
        <Stack py={2}>
          <Box ml={5} mb={1}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {isFetching ? (
            <Stack px={5}>
              <SkeletonLoader />
            </Stack>
          ) : _.isEmpty(campaign) && error ? (
            <Error onClose={handleClose} />
          ) : (
            <>
              <Header
                taskId={campaign.id}
                statusId={campaign.status_id}
                status={campaign.status}
                isPinned={campaign.is_pinned}
                name={campaign.name}
                channel={channelIcons[campaign.channel]}
                statusList={_.filter(statusList, (stats) =>
                  _.map(
                    stats?.related_to,
                    (types) => types.name === 'campaign'
                  ).includes(true)
                )}
              />

              <Stack
                px={5}
                pt={3}
                direction="row"
                justifyContent="space-between"
              >
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="Overview" disableRipple />
                  <Tab label="Timelog" disableRipple />
                  <Tab label="Activity Log" disableRipple />
                  <Tab label="Task" disableRipple />
                </Tabs>
                <Box display="flex">
                  <Tooltip title="Assignee" arrow>
                    <Box
                      onClick={(e) =>
                        handleOpen(
                          e,
                          'left',
                          'assignees',
                          usersList,
                          campaign.assignees,
                          'campaign'
                        )
                      }
                      sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {!_.isEmpty(campaign?.assignees) ? (
                        <AvatarGroup
                          max={3}
                          sx={{
                            '& .MuiAvatar-root': {
                              width: 24,
                              height: 24,
                              fontSize: 15,
                            },
                          }}
                        >
                          {campaign?.assignees?.map((data, index) => {
                            return data?.avatar?.split('/').pop() !==
                              'thumb_' || !_.isEmpty(data?.avatar) ? (
                              <Avatar
                                sx={{ width: 24, height: 24 }}
                                alt={data?.name?.toUpperCase()}
                                src={data?.avatar}
                                key={index}
                              />
                            ) : (
                              <Avatar
                                sx={{
                                  width: 24,
                                  height: 24,
                                  fontSize: '1em',
                                }}
                                key={index}
                              >
                                {`${data.name.toUpperCase().split(' ')[0][0]}${
                                  data.name.toUpperCase().split(' ')[1][0]
                                }`}
                              </Avatar>
                            );
                          })}
                        </AvatarGroup>
                      ) : (
                        <Avatar
                          sx={{
                            width: 30,
                            height: 30,
                            backgroundColor: '#ffffff',
                            border: '1px dashed #25165b',
                            color: '#25165b',
                          }}
                        >
                          <PersonAddAltIcon />
                        </Avatar>
                      )}
                    </Box>
                  </Tooltip>
                </Box>
              </Stack>
              <Divider />
              {value === 0 && (
                <>
                  <Collapse
                    in={isCollapsed}
                    timeout="auto"
                    orientation="vertical"
                    unmountOnExit
                  >
                    <Stack px={5} py={2}>
                      {overview.map((item, index) => {
                        return (
                          <Grid container key={index} spacing={3} mb={1}>
                            <Grid item md={4}>
                              <Typography color="primary" fontWeight={700}>
                                {item.name}
                              </Typography>
                            </Grid>
                            <Grid item md={8}>
                              <List
                                item={item}
                                data={campaign ?? []}
                                onPopupOpen={handleOpen}
                              />
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Stack>

                    {/* <Stack px={5} py={2}>
                      <StyledAccordion>
                        <StyledAccordionSummary
                          expandIcon={
                            <ExpandMoreIcon
                              onClick={(e) =>
                                handleGetDataRefLinkAccordionTrigger(e)
                              }
                            />
                          }
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography fontWeight={700} color="primary">
                            {' '}
                            Reference Links
                          </Typography>
                        </StyledAccordionSummary>

                        <StyledAccordionDetails>
                          {!_.isEmpty(filteredRowsReferenceLink) ? (
                            (filteredRowsReferenceLink ?? []).map(
                              (reference, index) => (
                                <Stack
                                  justifyContent="space-between"
                                  flexDirection="row"
                                  paddingRight="10px"
                                  display="flex"
                                  key={index}
                                >
                                  <Typography fontWeight={600} color="#DF3C76">
                                    {reference.name}
                                  </Typography>
                                  <IconButton
                                    size="small"
                                    sx={{
                                      padding: 0,
                                      '&:hover': { background: 'transparent' },
                                    }}
                                    onClick={(e) =>
                                      handleDeleteRefLink(
                                        e,
                                        reference.id,
                                        'value'
                                      )
                                    }
                                  >
                                    <CloseOutlinedIcon />
                                  </IconButton>
                                </Stack>
                              )
                            )
                          ) : (
                            <Card
                              variant="outlined"
                              sx={{ borderStyle: 'none' }}
                            >
                              <Stack alignItems="center" p={1}>
                                <Box>
                                  <IconButton
                                    size="large"
                                    color="error"
                                    disableRipple
                                    disableTouchRipple
                                    disableFocusRipple
                                    sx={{ backgroundColor: '#f2445c1a' }}
                                  >
                                    <LinkOffIcon />
                                  </IconButton>
                                </Box>
                                <Box>
                                  <Typography fontWeight={700} color="#999999">
                                    No reference link found.
                                  </Typography>
                                </Box>
                              </Stack>
                            </Card>
                          )}
                          <Grid sx={{ marginTop: '0px' }} container spacing={2}>
                            <Grid item xs={6}>
                              <StyledInputField
                                sx={{
                                  borderRadius: '0.1em',
                                  fieldset: {
                                    border: '1px dashed #ececec',
                                  },
                                }}
                                onChange={(event) =>
                                  setReferenceLinkInput01(event.target.value)
                                }
                                value={referenceLinkInput01}
                                fullWidth
                                name="search"
                                type="text"
                                placeholder="Link Name"
                                inputProps={{
                                  autoComplete: 'off',
                                }}
                                size="small"
                                required
                                onKeyUp={handleOnKeyUpRefLink}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <StyledInputField
                                sx={{
                                  borderRadius: '0.1em',
                                  fieldset: {
                                    border: '1px dashed #ececec',
                                  },
                                }}
                                onChange={(event) =>
                                  setReferenceLinkInput02(event.target.value)
                                }
                                value={referenceLinkInput02}
                                fullWidth
                                name="search"
                                type="text"
                                placeholder="Url"
                                inputProps={{
                                  autoComplete: 'off',
                                }}
                                size="small"
                                required
                                onKeyUp={handleOnKeyUpRefLink}
                              />
                            </Grid>
                          </Grid>
                        </StyledAccordionDetails>
                      </StyledAccordion>
                    </Stack> */}

                    <Stack px={5} py={2}>
                      <StyledAccordion>
                        <StyledAccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography fontWeight={700} color="primary">
                            {' '}
                            Templates
                          </Typography>
                        </StyledAccordionSummary>

                        <StyledAccordionDetails>
                          {!_.isEmpty(campaign?.template) ? (
                            campaign?.template?.map((item, index) => (
                              <Stack key={index} mb={1}>
                                <Card variant="outlined">
                                  <Stack p={1}>
                                    <Link
                                      sx={{
                                        textDecoration: 'none',
                                      }}
                                      target="_blank"
                                      href={`/concepts/${campaign.id}/templates/${item?._id}`}
                                    >
                                      <Typography
                                        fontWeight={700}
                                        color={appColors.lightViolet}
                                        component={Link}
                                        target="_blank"
                                        sx={{
                                          textDecoration: 'none',
                                          '&:hover': { color: '#25165B' },
                                        }}
                                      >
                                        {item?.versionName}
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        fontWeight={700}
                                        color="secondary"
                                      >
                                        {item?.size}
                                      </Typography>
                                    </Link>
                                  </Stack>
                                </Card>
                              </Stack>
                            ))
                          ) : (
                            <Card
                              variant="outlined"
                              sx={{ borderStyle: 'none' }}
                            >
                              <Stack alignItems="center" p={1}>
                                <Box>
                                  <IconButton
                                    size="large"
                                    color="error"
                                    disableRipple
                                    disableTouchRipple
                                    disableFocusRipple
                                    sx={{ backgroundColor: '#f2445c1a' }}
                                  >
                                    <DashboardIcon />
                                  </IconButton>
                                </Box>
                                <Box>
                                  <Typography fontWeight={700} color="#999999">
                                    No templates found.
                                  </Typography>
                                </Box>
                              </Stack>
                            </Card>
                          )}
                        </StyledAccordionDetails>
                      </StyledAccordion>
                    </Stack>
                  </Collapse>
                </>
              )}
              {value === 1 && (
                <Stack px={5} py={2}>
                  <Timelog timelogData={timelog} />
                </Stack>
              )}
              {value === 2 && (
                <Stack px={5} py={2}>
                  <ActivityLog campaignId={campaign.id} />
                </Stack>
              )}
              {value === 3 && (
                <Stack px={5} py={2}>
                  <Task campaignId={campaignId} />
                </Stack>
              )}
            </>
          )}
          <Popup
            anchorEl={popupAnchorEl}
            handleClose={() => setPopupAnchorEl(null)}
            horizontal={horizontal}
            content={
              ['assignees'].includes(optionType) ? (
                <VirtualListSelection
                  option={
                    optionType === 'watcher'
                      ? _.filter(
                          option,
                          (opt) =>
                            !_.map(assignees, (assignee) =>
                              Number(assignee.user_id ?? assignee.id)
                            ).includes(opt.id)
                        )
                      : option
                  }
                  type={optionType}
                  selected={selected}
                  taskId={campaign.id}
                  isParent={isParent}
                  handleSave={handleSave}
                />
              ) : ['launch_date', 'delivery_date'].includes(optionType) ? (
                <DateTimerPicker
                  taskId={campaign.id}
                  type={optionType}
                  isParent={1}
                  handleSave={handleSave}
                  handleClose={() => {}}
                />
              ) : ['tags'].includes(optionType) ? (
                <ListAddSelection
                  relType={'task'}
                  taskId={campaign.id}
                  type={optionType}
                  defaultData={tagsList}
                  handleSave={handleSave}
                />
              ) : null
            }
          />
        </Stack>
      }
    />
  );
};

Campaign.propTypes = {
  data: PropTypes.any,
  timelogData: PropTypes.any,
  handleClose: PropTypes.func,
};

export default Campaign;
