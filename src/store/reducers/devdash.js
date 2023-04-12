import { createSlice } from '@reduxjs/toolkit';

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

import {
  requestUpdateTaskByKey,
  requestTasksCompleted,
} from 'services/api/tasks';

const initialState = {
  data: [],
  statistics: {},
  count: [],
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
    data: {},
    fetching: false,
  },
  tasksCompleted: {
    data: {},
    fetching: false,
  },
  fetching: false,
  error: null,
};

const qadash = createSlice({
  name: 'devdash',
  initialState,
  reducers: {
    initDashboard: (state) => {
      state.fetching = true;
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
    initTasksCompleted: (state) => {
      state.tasksCompleted.fetching = true;
    },
    initPartner: (state) => {
      (state.options.partner.fetching = true), (state.error = null);
    },
    isDashboardSuccess: (state, { payload }) => {
      state.data = payload?.all_tasks;
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
    isTasksCompletedSuccess: (state, { payload }) => {
      state.tasksCompleted.data = payload;
      state.tasksCompleted.fetching = false;
    },
    isQueueCountSuccess: (state, { payload }) => {
      state.count = payload;
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
    isResourcesError: (state, { payload }) => {
      state.error = payload;
      state.resources.fetching = false;
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
  initResources,
  initStatuses,
  initTaskTypes,
  initPartner,
  initTasksCompleted,
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
  isTasksCompletedSuccess,
  isSuccessUpdateByKey,
  isDashboardError,
  isResourcesError,
  clearDashboard,
  clearTypesAndStatus,
} = qadash.actions;

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

export const getFilteredDashboard = (params) => async (dispatch) => {
  // dispatch(initDashboard());
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
    dispatch(isResourcesError(message));
  }
};

export const getTasksCompleted = (params) => async (dispatch) => {
  dispatch(initTasksCompleted());

  const { success, message, data } = await requestTasksCompleted(params);

  if (success) {
    dispatch(isTasksCompletedSuccess(data));
  } else {
    dispatch(isDashboardError(message));
  }
};

// get data
export const getOptions = (type) => async (dispatch) => {
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
      return requestMaintenanceUser();
    case 'teams':
      return requestMaintenanceTeams();
    case 'priorities':
      return requestPriorityFlag();
    case 'partners':
      return requestPartners();
    case 'statuses':
      return requestMaintenanceTaskStatus();
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
    case 'statuses':
      return isStatusSuccess(d.data);
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
    ? dispatch(updateData(params.key, data))
    : dispatch(isDashboardError(message));
};

const updateData = (type, data) => {
  switch (type) {
    case 'status':
      return isSuccessUpdateByKey({
        id: data.id,
        status: data.status,
        status_id: data.status_id,
      });

    case 'priority':
      return isSuccessUpdateByKey({
        id: data.id,
        priority: data.priority_description,
        priority_id: Number(data.priority_id),
      });

    case 'assignees':
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
      return isSuccessUpdateByKey({
        id: data.id,
        due_date: data.due_date,
      });

    case 'delivery_date':
      return isSuccessUpdateByKey({
        id: data.id,
        delivery_date: data.delivery_date,
      });
    case 'pin':
      return isSuccessUpdateByKey({
        id: data.id,
        is_pinned: data.is_pinned,
      });
  }
};

export default qadash.reducer;
