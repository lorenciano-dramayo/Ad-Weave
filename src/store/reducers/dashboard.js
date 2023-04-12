import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// API's
import {
  requestDashboard,
  requestDashboardFilters,
  requestDashboardResources,
} from 'services/api/dashboard';

import {} from 'services/api/maintenance';

import { requestPartners } from 'services/api/partner';

// Services
import {
  requestMaintenanceTeams,
  requestMaintenanceTaskType,
  requestMaintenanceUser,
  requestPriorityFlag,
  requestMaintenanceTaskStatus,
} from 'services/api/maintenance';

import { requestUpdateTaskByKey } from 'services/api/tasks';
import _ from 'lodash';

const initialState = {
  data: [],
  statistics: {},
  count: {
    data: [],
    fetching: false,
  },
  options: {
    statuses: {
      data: [],
      fetching: false,
    },
    taskTypes: {
      data: [],
      fetching: false,
    },
    priorities: {
      data: [],
      fetching: false,
    },
    partner: {
      data: [],
      fetching: false,
    },
    teams: {
      data: [],
      fetching: false,
    },
    users: {
      data: [],
      fetching: false,
    },
  },
  resources: {
    data: [],
    fetching: false,
  },
  fetching: false,
  error: null,
};

const dashboard = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    initDashboard: (state) => {
      state.fetching = true;
      state.error = null;
    },
    initQueueCount: (state) => {
      state.count.fetching = true;
      state.error = null;
    },
    initResources: (state) => {
      state.resources.fetching = true;
      state.error = null;
    },
    initStatuses: (state) => {
      state.options.statuses.fetching = true;
      state.error = null;
    },
    initTaskTypes: (state) => {
      state.options.taskTypes.fetching = true;
      state.error = null;
    },
    initTeams: (state) => {
      state.options.teams.fetching = true;
      state.error = null;
    },
    initPartner: (state) => {
      (state.options.partner.fetching = true), (state.error = null);
    },
    isDashboardSuccess: (state, { payload }) => {
      state.data = payload?.all_tasks;
      state.count.data = payload;
      state.statistics = {
        completed: payload?.completed,
        critical: payload?.critical,
        onTrack: payload?.on_track,
        overdue: payload?.overdue,
        recentlyApproved: payload?.recently_approved,
        resources: payload?.resources,
        ticketClosed: payload?.ticket_closed,
      };
      state.fetching = false;
    },
    isStatusSuccess: (state, { payload }) => {
      state.options.statuses.data = payload;
      state.options.statuses.fetching = false;
    },
    isTaskTypeSuccess: (state, { payload }) => {
      state.options.taskTypes.data = payload;
      state.options.taskTypes.fetching = false;
    },
    isPrioritiesSuccess: (state, { payload }) => {
      state.options.priorities.data = payload;
      state.options.priorities.fetching = false;
    },
    isTeamsSuccess: (state, { payload }) => {
      state.options.teams.data = payload;
      state.options.teams.fetching = false;
    },
    isUsersSuccess: (state, { payload }) => {
      state.options.users.data = payload;
      state.options.users.fetching = false;
    },
    isPartnerSuccess: (state, { payload }) => {
      state.options.partner.data = payload;
      state.options.partner.fetching = false;
    },
    isResourcesSuccess: (state, { payload }) => {
      state.resources = { ...state.resources, ...payload };
      state.resources.fetching = false;
    },
    isQueueCountSuccess: (state, { payload }) => {
      state.count.data = payload;
      state.count.fetching = false;
    },
    isPaginateSuccess: (state, { payload }) => {
      return {
        ...state,
        data: {
          ...state.data,
          data: [...state.data.data, ...payload.all_tasks.data],
          current_page: payload.all_tasks.current_page,
          next_page_url: payload.all_tasks.next_page_url,
        },
      };
    },
    isSuccessUpdateByKey: (state, { payload }) => {
      return {
        ...state,
        data: {
          ...state.data,
          data: state.data.data.map((d) =>
            d.id === payload.id ? { ...d, ...payload } : d
          ),
        },
      };
    },
    isDashboardError: (state, { payload }) => {
      state.error = payload;
      state.fetching = false;
    },
    clearDashboard: (state) => {
      state.data = [];
      state.count = [];
      state.options.priorities.data = [];
      state.options.priorities.fetching = false;
      state.options.partner.data = [];
      state.options.partner.fetching = false;
      state.options.teams.data = [];
      state.options.teams.fetching = false;
      state.options.users.data = [];
      state.options.users.fetching = false;
      state.resources.data = [];
      state.resources.fetching = [];
      state.fetching = false;
      state.error = null;
    },
    clearTypesAndStatus: (state) => {
      state.options.statuses.data = [];
      state.options.statuses.fetching = false;
      state.options.taskTypes.data = [];
      state.options.taskTypes.fetching = false;
    },
  },
});

export const {
  initDashboard,
  initQueueCount,
  initResources,
  initTeams,
  initStatuses,
  initTaskTypes,
  initPartner,
  isTaskTypeSuccess,
  isResourcesSuccess,
  isStatusSuccess,
  isPrioritiesSuccess,
  isTeamsSuccess,
  isUsersSuccess,
  isPartnerSuccess,
  isDashboardSuccess,
  isQueueCountSuccess,
  isPaginateSuccess,
  isSuccessUpdateByKey,
  isDashboardError,
  clearDashboard,
  clearTypesAndStatus,
} = dashboard.actions;

export const getDashboard = (params) => async (dispatch) => {
  dispatch(initDashboard());
  const { success, message, data } = await requestDashboard(1, {
    filter: params,
  });

  if (success) {
    dispatch(isDashboardSuccess(data));
  } else {
    dispatch(isDashboardError(message));
  }
};

export const getQueueCount = (params) => async (dispatch) => {
  dispatch(initQueueCount());
  const { success, message, data } = await requestDashboardFilters(1, {
    filter: params,
  });

  if (success) {
    dispatch(isQueueCountSuccess(data));
  } else {
    dispatch(isDashboardError(message));
  }
};

export const getQueueFilters =
  (params, params2 = []) =>
  async (dispatch) => {
    dispatch(initDashboard());
    const { success, message, data } = await requestDashboardFilters(1, {
      filter: params,
      sort: params2,
    });

    if (success) {
      dispatch(isDashboardSuccess(data));
    } else {
      dispatch(isDashboardError(message));
    }
  };

export const getStatuses = () => async (dispatch) => {
  dispatch(initStatuses());
  const { success, message, data } = await requestMaintenanceTaskStatus(
    '?limit=1000'
  );

  if (success) {
    dispatch(isStatusSuccess(data?.data));
  } else {
    dispatch(isDashboardError(message));
  }
};

export const getTaskType = () => async (dispatch) => {
  dispatch(initTaskTypes());
  const { success, data, message } = await requestMaintenanceTaskType(
    '?limit=1000'
  );

  success
    ? dispatch(isTaskTypeSuccess(data?.data))
    : dispatch(isDashboardError(message));
};

export const getPartner = () => async (dispatch) => {
  dispatch(initPartner());
};

export const getPaginatedDashboard =
  (type, page, params, params2) => async (dispatch) => {
    const { success, message, data } = await initPaginate(
      type,
      page,
      params,
      params2
    );

    if (success) {
      dispatch(isPaginateSuccess(data));
    } else {
      dispatch(isDashboardError(message));
    }
  };

export const getDashboardResources = () => async (dispatch) => {
  dispatch(initResources());

  const { success, message, data } = await requestDashboardResources();

  if (success) {
    dispatch(isResourcesSuccess(data));
  } else {
    dispatch(isDashboardError(message));
  }
};

// get data
export const getOptions = (type) => async (dispatch) => {
  dispatch(initTeams());
  const { data, message, ...rest } = await getOptionsApi(type);

  if (rest?.success) {
    dispatch(setOptions(type, data));
  } else {
    dispatch(isDashboardError(message));
  }
};

// getters for datasource
const getOptionsApi = (t) => {
  switch (t) {
    case 'users':
      return requestMaintenanceUser('?limit=10000');
    case 'teams':
      return requestMaintenanceTeams();
    case 'priorities':
      return requestPriorityFlag();
    case 'partners':
      return requestPartners();
    default:
      return null;
  }
};

// setters for datasource
const setOptions = (t, d) => {
  switch (t) {
    case 'users':
      return isUsersSuccess(d?.data);
    case 'teams':
      return isTeamsSuccess(d?.data);
    case 'priorities':
      return isPrioritiesSuccess(d);
    case 'partners':
      return isPartnerSuccess(d.data);
    default:
      break;
  }
};

const initPaginate = (type, page, params, params2) => {
  switch (type) {
    case 'filter':
      return requestDashboardFilters(page, { filter: params, sort: params2 });
    default:
      return requestDashboard(page, { filter: params, sort: params2 });
  }
};

export const updateTaskByKey = (params) => async (dispatch) => {
  const { success, data, message } = await requestUpdateTaskByKey(params);

  success
    ? dispatch(updateData(params.key, data, params))
    : dispatch(isDashboardError(message));
};

const updateData = (type, data, param) => {
  switch (type) {
    case 'status':
      toast.success(
        () => (
          <>
            <strong>{`AW-${data?.id}`}</strong>&nbsp;&apos;s status is set to{' '}
            {_.capitalize(_.split(data?.status, '_').join(' '))}
          </>
        ),
        { duration: 4000 }
      );

      return isSuccessUpdateByKey({
        id: data.id,
        status: data.status,
        status_id: data.status_id,
      });

    case 'priority':
      toast.success(
        () => (
          <>
            <strong>{`AW-${data?.id}`}</strong>&nbsp;&apos;s priority is set to{' '}
            {_.capitalize(data?.priority_description)}
          </>
        ),
        { duration: 4000 }
      );

      return isSuccessUpdateByKey({
        id: data.id,
        priority: data.priority_description,
        priority_id: Number(data.priority_id),
      });

    case 'assignees':
      toast.success(
        () => (
          <p>
            <strong>{param?.selectedArr?.name}</strong>
            {` is ${
              _.isEmpty(
                _.filter(
                  data?.assignees,
                  (assign) => Number(assign.user_id) === param?.selectedArr?.id
                )
              )
                ? 'removed'
                : 'added'
            } as assignee to task `}
            <u>{`AW-${data?.id}`}</u>.
          </p>
        ),
        { duration: 4000 }
      );

      return isSuccessUpdateByKey({
        id: data.id,
        assignees: data.assignees,
      });

    case 'watcher':
      return isSuccessUpdateByKey({
        id: data.id,
        watcher: data.watcher,
      });

    case 'due_date':
      toast.success(
        () => (
          <>
            Updated&nbsp;<strong>{`AW-${data?.id}`}</strong>&apos;s due date.
          </>
        ),
        { duration: 4000 }
      );

      return isSuccessUpdateByKey({
        id: data.id,
        due_date: data.due_date,
      });

    case 'delivery_date':
      toast.success(
        () => (
          <>
            Updated&nbsp;<strong>{`AW-${data?.id}`}</strong>&apos;s delivery
            date.
          </>
        ),
        { duration: 4000 }
      );

      return isSuccessUpdateByKey({
        id: data.id,
        delivery_date: data.delivery_date,
      });
    case 'pin':
      toast.success(
        () => (
          <>
            <strong>{`AW-${data?.id}`}</strong>&nbsp;is{' '}
            {data.is_pinned ? 'added' : 'removed'} to favorites.
          </>
        ),
        { duration: 4000 }
      );

      return isSuccessUpdateByKey({
        id: data.id,
        is_pinned: data.is_pinned,
      });
  }
};

export default dashboard.reducer;
