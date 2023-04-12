// Redux
import { createSlice } from '@reduxjs/toolkit';

import {
  fetchCampaignsSpecific,
  requestUpdateCampaignBykey,
  fetchTimelog,
} from 'services/api/campaign';

import {
  requestUpdateTask as requestUpdateStatus,
  requestFetchTags,
  requestFetchTriggers,
  requestFetchDisplayMD,
} from 'services/api/tasks';

import {
  requestPriorityFlag,
  requestMaintenanceUser,
  requestMaintenanceTaskStatus,
} from 'services/api/maintenance';

const initialState = {
  list: [],
  timelog: [],
  options: {
    priorityList: [],
    usersList: [],
    statusList: [],
    tagsList: [],
    triggersList: [],
    desktopDisplayList: [],
    mobileDisplayList: [],
    isFetching: false,
  },
  isFetching: false,
  isFetchingTimelog: false,
  error: null,
};

const campaign = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    initCampaign: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    initTimelog: (state) => {
      state.isFetchingTimelog = true;
      state.error = null;
    },
    initOptions: (state) => {
      state.options.isFetching = true;
      state.error = null;
    },
    validateCampaign: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    isSuccess: (state, { payload }) => {
      state.list = payload;
      state.isFetching = false;
    },
    isSuccessTimelog: (state, { payload }) => {
      state.timelog = payload;
      state.isFetchingTimelog = false;
    },
    isError: (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    },
    errorTask: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    successUpdateByKey: (state, { payload }) => {
      return { ...state, list: { ...state.list, ...payload.data } };
    },
    successPriorityList: (state, { payload }) => {
      state.options.priorityList = payload;
      state.options.isFetching = false;
    },
    successUsersList: (state, { payload }) => {
      state.options.usersList = payload.data;
      state.options.isFetching = false;
    },
    successStatusList: (state, { payload }) => {
      state.options.statusList = payload.data;
      state.options.isFetching = false;
    },
    successTagsList: (state, { payload }) => {
      state.options.tagsList = payload;
    },
    reset: (state) => {
      state.list = [];
      state.timelog = [];
      state.isFetching = false;
      state.options = {};
      state.error = null;
    },
  },
});

export const {
  initCampaign,
  initTimelog,
  initOptions,
  validateCampaign,
  isSuccessTimelog,
  isSuccess,
  isError,
  successUpdateByKey,
  successPriorityList,
  successUsersList,
  successStatusList,
  successTagsList,
  errorTask,
  reset,
} = campaign.actions;

export const getData = (type, params) => async (dispatch) => {
  dispatch(initOptions);

  const { success, data, message } = await requestData(type, params);

  success ? dispatch(setData(type, data)) : dispatch(errorTask(message));
};

export const fetchCampaignsList = (id) => async (dispatch) => {
  dispatch(initCampaign());

  const { success, data, message } = await fetchCampaignsSpecific(id);

  if (success) {
    dispatch(isSuccess(data));
  } else {
    dispatch(isError(message));
  }
};

export const fetchTimelogList = (id) => async (dispatch) => {
  dispatch(initTimelog());

  const { success, data, message } = await fetchTimelog(id);

  if (success) {
    dispatch(isSuccessTimelog(data));
  } else {
    dispatch(isError(message));
  }
};

export const updateCampaignByKey = (params) => async (dispatch) => {
  const { success, data, message } = await requestUpdateCampaignBykey(params);

  success
    ? dispatch(updateData(params.key, data))
    : dispatch(errorTask(message));
};

export const updateCampaignStatus = (params) => async (dispatch) => {
  const { success, data, message } = await requestUpdateStatus(params);

  success
    ? dispatch(updateData(params.key, data))
    : dispatch(errorTask(message));
};

const updateData = (type, data) => {
  switch (type) {
    case 'status':
      return successUpdateByKey({
        id: data.id,
        isParent: data.is_parent,
        data: {
          status: data.status,
          status_id: data.status_id,
        },
      });

    case 'priority':
      return successUpdateByKey({
        id: data.id,
        isParent: data.is_parent,
        data: {
          priority_description: data.priority_description,
          priority_id: data.priority_id,
        },
      });

    case 'assignees':
      return successUpdateByKey({
        id: data.id,
        isParent: data.is_parent,
        data: { assignees: data.assignees },
      });

    case 'watcher':
      return successUpdateByKey({
        id: data.id,
        isParent: data.is_parent,
        data: { watcher: data.watcher },
      });

    case 'due_date':
      return successUpdateByKey({
        id: data.id,
        isParent: data.is_parent,
        data: { due_date: data.due_date },
      });

    case 'delivery_date':
      return successUpdateByKey({
        id: data.id,
        isParent: data.is_parent,
        data: { delivery_date: data.delivery_date },
      });
    case 'pin':
      return successUpdateByKey({
        id: data.id,
        isParent: data.is_parent,
        data: { is_pinned: data.is_pinned },
      });
  }
};

const requestData = (type, params) => {
  switch (type) {
    case 'priority_flag':
      return requestPriorityFlag();
    case 'users':
      return requestMaintenanceUser('?limit=1000');
    case 'status':
      return requestMaintenanceTaskStatus('?limit=1000');
    case 'tags':
      return requestFetchTags(params);
    case 'triggers':
      return requestFetchTriggers(params);
    case 'mobile_displays':
      return requestFetchDisplayMD(params);
    case 'desktop_displays':
      return requestFetchDisplayMD(params);
  }
};

const setData = (type, data) => {
  switch (type) {
    case 'priority_flag':
      return successPriorityList(data);
    case 'users':
      return successUsersList(data);
    case 'status':
      return successStatusList(data);
    case 'tags':
      return successTagsList(data);
  }
};

export default campaign.reducer;
