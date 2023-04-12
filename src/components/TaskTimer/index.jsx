import { useEffect, useState, Fragment, forwardRef } from 'react';

import PropTypes from 'prop-types';

import { Window } from '@progress/kendo-react-dialogs';

import ListItem from './Components/ListItem';

import { useDispatch, useSelector } from 'react-redux';

import InfiniteScroll from 'react-infinite-scroll-component';

import {
  fetchCategoriesWithRequiredFields,
  fetchCategories,
  fetchUserTimeLogs,
  fetchActiveTimer,
  fetchPartners,
  fetchCampaigns,
  fetchConcepts,
  startTimerById,
  stopTimerById,
  updateTimer,
  deleteTimer,
} from 'store/reducers/timer';

import { formatDate } from 'utils/date';

// Components
import Header from 'components/TaskTimer/Components/Header';
import List from './Components/List';
import ActiveTimer from './Components/ActiveTimer';

import emptyImage from 'assets/images/fav-empty.svg';

// MUI Components
import {
  styled,
  Card,
  IconButton,
  Box,
  Stack,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  Zoom,
  Alert,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Swal from 'sweetalert2';
import _ from 'lodash';

import { getItemByKey } from 'utils/dictionary';

const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

const StyledWindow = styled(Window)({
  position: 'absolute',
  backgroundColor: '#fff',
  border: '1px solid #5025c44f !important',
  boxShadow: 'rgb(80 37 196 / 10%) 0px 0px 10px 4px !important',
  '& .k-window-titlebar': {
    width: 'inherit',
    position: 'fixed',
    padding: '7px 6px 7px 15px',
    backgroundColor: '#25165b',
    display: 'flex',
    justifyContent: 'space-between',
    color: '#fff',
    fontWeight: 700,
    zIndex: 1,
  },
  '& .k-window-content': {
    padding: '2em',
  },
  overflowY: 'auto',
});

// Toast notification
const Toast = Swal.mixin({
  toast: true,
  icon: 'success',
  width: 370,
  position: 'top-right',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const TaskTimer = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const [selectedTaskCategory, setSelectedTaskCategory] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [requiredFields, setRequiredFields] = useState(null);

  // Redux states
  const {
    data: { id: userId, admin_role, team_name },
  } = useSelector((state) => state.user);
  const {
    partners,
    campaigns,
    concepts,
    logs,
    list,
    categories,
    isFetching: isLogsFetching,
    isFetchingWithPagination: isPaginatedLogsFetching,
    active: activeTimer,
  } = useSelector((state) => state.timer);

  // Hooks
  useEffect(() => {
    dispatch(fetchPartners());
    dispatch(fetchCampaigns());
    dispatch(fetchConcepts());
    dispatch(fetchCategories());
    dispatch(fetchCategoriesWithRequiredFields());
    dispatch(fetchActiveTimer());
    dispatch(fetchUserTimeLogs(userId, { page: 1, limit: 3 }, () => {}));
  }, []);

  useEffect(() => {
    if (
      !_.isNull(activeTimer?.category?.id ?? null) &&
      !_.isEmpty(categories)
    ) {
      setSelectedTaskCategory(activeTimer?.category);
      setSelectedPartner(
        activeTimer?.partner
          ? {
              uuid: activeTimer?.partner?.id,
              name: activeTimer?.partner?.name,
            }
          : null
      );
      setSelectedConcept(activeTimer?.concept ?? null);
      setSelectedCampaign(activeTimer?.campaign ?? null);
      setRequiredFields(getRequiredFields(activeTimer?.category?.id ?? 0));
    }
  }, [activeTimer, categories]);

  // Handlers
  const handleScrollPaginate = () => {
    const pagination = { page: logs?.current_page + 1, limit: 3 };
    dispatch(fetchUserTimeLogs(userId, pagination, () => {}));
  };

  // const handleWindowClose = () => {
  //   setVisible(null);
  //   setWindowStage('DEFAULT');

  //   if (!_.isEmpty(activeTimer)) {
  //     setSelectedTaskCategory(activeTimer?.category ?? null);
  //     setRequiredFields(getRequiredFields(activeTimer?.category?.id ?? 0));
  //   }
  // };

  const handleNewTimerPresetsSelectionChange = (data) => {
    if (!_.isUndefined(data)) {
      setRequiredFields(getRequiredFields(data?.id));
      setSelectedTaskCategory(data);
    }
  };

  const handleExistingLogPresetsSelectionChange = (log, task) => {
    if (!_.isUndefined(task)) {
      const { task_timer_id: id } = log;
      const { id: task_category_id, task_type_id } = task;
      const paginationOnCompletion = {
        page: 1,
        limit: logs?.data?.length ?? 1,
      };
      dispatch(
        updateTimer(
          userId,
          { id, task_type_id, task_category_id },
          paginationOnCompletion
        )
      );
    }
  };

  const handleExistingPartnersSelectionChange = (log, partner) => {
    if (!_.isUndefined(partner)) {
      const { task_timer_id: id } = log;
      const { uuid } = partner;
      const paginationOnCompletion = {
        page: 1,
        limit: logs?.data?.length ?? 1,
      };
      dispatch(
        updateTimer(
          userId,
          { id, partner_group_id: uuid },
          paginationOnCompletion
        )
      );
    }
  };

  const handleExistingCampaignsSelectionChange = (log, campaign) => {
    if (!_.isUndefined(campaign)) {
      const { task_timer_id: id } = log;
      const { uuid } = campaign;
      const paginationOnCompletion = {
        page: 1,
        limit: logs?.data?.length ?? 1,
      };
      dispatch(
        updateTimer(userId, { id, campaign_id: uuid }, paginationOnCompletion)
      );
    }
  };

  const handleExistingConceptsSelectionChange = (log, concept) => {
    if (!_.isUndefined(concept)) {
      const { task_timer_id: id } = log;
      const { uuid } = concept;
      const paginationOnCompletion = {
        page: 1,
        limit: logs?.data?.length ?? 1,
      };
      dispatch(
        updateTimer(userId, { id, concept_id: uuid }, paginationOnCompletion)
      );
    }
  };

  const handleStartTimer = () => {
    dispatch(
      startTimerById({
        task_type_id: selectedTaskCategory?.task_type_id ?? null,
        task_category_id: selectedTaskCategory?.id ?? null,
        partner_group_id: selectedPartner?.uuid ?? null,
        campaign_id: selectedCampaign?.uuid ?? null,
        concept_id: selectedConcept?.uuid ?? null,
      })
    );
  };

  const handleStopTimer = (activeTimer) => {
    if (canStopTimer) {
      const { task_timer_id } = activeTimer;
      const paginationOnCompletion = {
        page: 1,
        limit: logs?.data?.length < 1 ? 1 : logs?.data?.length ?? 1,
      };
      dispatch(
        stopTimerById(
          userId,
          {
            id: task_timer_id,
            task_type_id:
              selectedTaskCategory?.task_type_id ??
              activeTimer.task_type.id ??
              null,
            task_category_id:
              selectedTaskCategory?.id ?? activeTimer.category?.id ?? null,
            partner_group_id:
              selectedPartner?.uuid ?? activeTimer.partner?.id ?? null,
            campaign_id:
              selectedCampaign?.uuid ?? activeTimer.campaign?.uuid ?? null,
            concept_id:
              selectedConcept?.uuid ?? activeTimer.concept?.uuid ?? null,
            time_out: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'),
          },
          paginationOnCompletion
        )
      );
      setSelectedTaskCategory(null);
      setSelectedPartner(null);
      setSelectedCampaign(null);
      setSelectedConcept(null);
      setRequiredFields(null);
    }
  };

  const handleStartTimerPreviousLog = (log) => {
    const { task_timer_id } = log;
    dispatch(startTimerById({ task_timer_id: task_timer_id }));
  };

  const handleTimeChange = (log, start, end) => {
    if (!_.isUndefined(log)) {
      const { task_timer_id: id } = log;
      const paginationOnCompletion = {
        page: 1,
        limit: logs?.data?.length ?? 1,
      };
      dispatch(
        updateTimer(
          userId,
          {
            id,
            time_in: start,
            time_out: end,
          },
          paginationOnCompletion
        )
      );
    }
  };

  const handleDelete = (taskTimerId) => {
    Swal.fire({
      title: '<p style="font-size: 0.85em">Do you want to delete this log?</p>',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
      focusConfirm: false,
      customClass: {
        container: 'swal-container',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const paginationOnCompletion = {
          page: 1,
          limit: logs?.data?.length ?? 1,
        };
        dispatch(
          deleteTimer(
            userId,
            {
              ids: taskTimerId,
            },
            paginationOnCompletion,
            () => {
              Toast.fire({
                title: 'Deleted successfully!',
              });
            }
          )
        );
      }
    });
  };

  const isParent = (log) => log.data?.length > 1;

  const hasFilledOutRequiredFields = () => {
    return (
      [
        !_.isNull(selectedPartner) && requiredFields?.includes('partner'),
        !_.isNull(selectedCampaign) && requiredFields?.includes('campaign'),
        !_.isNull(selectedConcept) && requiredFields?.includes('concept'),
      ]?.filter(Boolean).length === requiredFields?.length
    );
  };

  const canStopTimer =
    !_.isNull(selectedTaskCategory?.id ?? null) && hasFilledOutRequiredFields();

  // These logs are for debugging purposes only if ever an issue occured again.
  // console.log('selectedTaskCategory: ', selectedTaskCategory);
  // console.log('requiredFields: ', requiredFields);
  // console.log('selectedPartner: ', selectedPartner);
  // console.log('selectedCampaign: ', selectedCampaign);
  // console.log('selectedConcept: ', selectedConcept);
  // console.log('activeTimer: ', activeTimer);

  const getRequiredFields = (id) => {
    return getItemByKey('id', id, categories ?? []).required_fields ?? [];
  };

  const getCategoriesByTeam = () => {
    if (team_name.toLowerCase().includes('admin')) {
      return list;
    } else {
      return list.filter((i) =>
        i.team_name.toLowerCase().includes(team_name.toLowerCase())
      );
    }
  };

  const hasActiveTimer = !_.isUndefined(activeTimer) && !_.isEmpty(activeTimer);

  const generateRequiredFieldsWarningLabel = () => {
    if (requiredFields?.length === 3) {
      return capitalized(
        `${requiredFields[0] ?? ''}, ${requiredFields[1] ?? ''} and ${
          requiredFields[2] ?? ''
        } fields are required.`
      );
    } else if (requiredFields.length === 2) {
      return capitalized(
        `${requiredFields[0] ?? ''} and ${
          requiredFields[1] ?? ''
        } fields are required.`
      );
    } else {
      return capitalized(`${requiredFields[0] ?? ''} field is required.`);
    }
  };

  const capitalized = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Dialog
      keepMounted
      fullWidth
      closeAfterTransition
      disableEnforceFocus
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
      maxWidth="lg"
      sx={{
        '.MuiDialog-paper': { height: '80vh', maxHeight: '80vh' },
      }}
    >
      <Box
        sx={{
          top: 0,
          height: 55,
          pl: '1.5rem',
          zIndex: '9999999',
          position: 'sticky',
          backgroundColor: 'primary.main',
        }}
      >
        <Box
          sx={{
            color: 'white',
            fontWeight: 700,
            height: 'inherit',
            pt: 1.5,
          }}
        >
          Task Timer
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          padding: '2rem',
        }}
      >
        {[
          'admin',
          'project management',
          'client partner',
          'client services',
        ].includes(team_name?.toLowerCase()) ? (
          <Stack spacing={4}>
            {/* Header */}
            <Stack spacing={1}>
              <Header>
                {
                  <ActiveTimer
                    timer={activeTimer}
                    tasksDatasource={{
                      list: getCategoriesByTeam(),
                      categories,
                    }}
                    partnersDatasource={partners}
                    campaignsDatasource={campaigns}
                    conceptsDatasource={concepts}
                    requiredFields={requiredFields}
                    onPresetsSelectionChange={
                      handleNewTimerPresetsSelectionChange
                    }
                    onPartnersSelectionChange={(data) =>
                      setSelectedPartner(data)
                    }
                    onCampaignsSelectionChange={(data) =>
                      setSelectedCampaign(data)
                    }
                    onConceptsSelectionChange={(data) =>
                      setSelectedConcept(data)
                    }
                    onStartTimer={handleStartTimer}
                    onStopTimer={handleStopTimer}
                    canStopTimer={canStopTimer}
                    inputPlaceholder="What are you working on?"
                  />
                }
              </Header>
              {hasActiveTimer &&
                !_.isEmpty(requiredFields) &&
                !hasFilledOutRequiredFields() && (
                  <Box sx={{ textAlign: 'left' }}>
                    <Alert severity="error">
                      {generateRequiredFieldsWarningLabel()}
                    </Alert>
                  </Box>
                )}
            </Stack>
            {logs?.data?.length > 0 ? (
              logs?.data
                ?.filter((i) => !_.isEmpty(i.total_time))
                .map((datasource, index) => (
                  <List key={index} datasource={datasource}>
                    {!_.isEmpty(datasource.category) &&
                      datasource.category
                        .filter((i) => !_.isEmpty(i.total_time))
                        .map((log, index) => (
                          <ListItem
                            key={index}
                            log={{
                              selectedTask: isParent(log)
                                ? log?.category_name
                                : log?.data
                                ? log?.data[0].category?.name
                                : log?.category_name,
                              selectedPartner: log.data
                                ? log.data[0]?.partner
                                : log.partner,
                              selectedCampaign: log.data
                                ? log.data[0]?.campaign
                                : log.campaign,
                              selectedConcept: log.data
                                ? log.data[0]?.concept
                                : log.concept,
                              total: log?.data ? log?.total_time : log?.total,
                              ...log,
                            }}
                            tasksDatasource={getCategoriesByTeam()}
                            partnersDatasource={partners}
                            campaignsDatasource={campaigns}
                            conceptsDatasource={concepts}
                            onPresetsSelectionChange={(_log, task) =>
                              handleExistingLogPresetsSelectionChange(
                                _log.data ? _log.data[0] : _log,
                                task
                              )
                            }
                            onPartnersSelectionChange={(_log, data) =>
                              handleExistingPartnersSelectionChange(
                                _log.data ? _log.data[0] : _log,
                                data
                              )
                            }
                            onCampaignsSelectionChange={(_log, data) =>
                              handleExistingCampaignsSelectionChange(
                                _log.data ? _log.data[0] : _log,
                                data
                              )
                            }
                            onConceptsSelectionChange={(_log, data) =>
                              handleExistingConceptsSelectionChange(
                                _log.data ? _log.data[0] : _log,
                                data
                              )
                            }
                            onStartPreviousLog={(_log) =>
                              handleStartTimerPreviousLog(
                                _log.data ? _log.data[0] : _log
                              )
                            }
                            onTimeChange={(_log, startTime, endTime) =>
                              handleTimeChange(
                                _log.data ? _log.data[0] : _log,
                                startTime,
                                endTime
                              )
                            }
                            onDelete={handleDelete}
                            inputPlaceholder="Add description"
                            isParent={isParent(log)}
                          />
                        ))}
                  </List>
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
                      No task timelogs found.
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            )}
            {!_.isNull(logs?.next_page_url) &&
              !_.isEmpty(logs?.data ?? []) &&
              (isPaginatedLogsFetching ? (
                <Stack direction="row" justifyContent="center">
                  <CircularProgress size={26} color="secondary" thickness={7} />
                </Stack>
              ) : (
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    onClick={handleScrollPaginate}
                    endIcon={<ExpandMoreIcon />}
                  >
                    {'Load More'}
                  </Button>
                </Stack>
              ))}
          </Stack>
        ) : (
          <Stack
            sx={{
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            spacing={-3}
          >
            <img width={200} src={emptyImage} alt="empty-favorites" />
            <Typography color="primary" variant="span" fontWeight={700}>
              NO ACTIVE TASK TIMER AVAILABLE
            </Typography>
          </Stack>
        )}
      </Box>
    </Dialog>
  );
};

TaskTimer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.any,
};

export default TaskTimer;
