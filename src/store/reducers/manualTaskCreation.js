// API's
import {
  requestMaintenanceTeams,
  requestMaintenanceTaskType,
  requestMaintenanceTaskCategory,
} from 'services/api/maintenance';

import { requestPartners } from 'services/api/partner';

import {
  fetchConceptByPartner,
  fetchOverviewRequest,
  fetchAllTags,
} from 'services/api/concept';

import { requestCreateTask } from 'services/api/tasks';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    step: null,
    teamList: [],
    taskTypeList: [],
    subTaskList: [],
    partnerList: [],
    conceptList: [],
    campaignList: [],
    marketList: [],
    channelList: [],
    deliveryTypeList: [],
    assetLinks: [],
    formatsList: [],
    aTags: [],
  },
  save: {
    processing: false,
    data: [],
  },
  fetching: false,
  error: null,
};

const manualTaskCreation = createSlice({
  name: 'manualTaskCreation',
  initialState,
  reducers: {
    initCreation: (state) => {
      state.fetching = true;
      state.error = null;
    },
    initSaveCreation: (state) => {
      state.save.processing = true;
      state.error = null;
    },
    successSaveTask: (state, { payload }) => {
      state.save.data = payload;
      state.save.processing = false;
    },
    errorSaveTask: (state, { payload }) => {
      state.error = payload;
      state.save.processing = false;
    },
    setTeamList: (state, { payload }) => {
      state.data.teamList = payload;
      state.fetching = false;
    },
    setTaskTypeList: (state, { payload }) => {
      state.data.taskTypeList = payload;
      state.fetching = false;
    },
    setSubTaskList: (state, { payload }) => {
      state.data.subTaskList = payload;
      state.fetching = false;
    },
    setPartnerList: (state, { payload }) => {
      state.data.partnerList = payload;
      state.fetching = false;
    },
    setConceptList: (state, { payload }) => {
      state.data.conceptList = payload;
      state.fetching = false;
    },
    setTags: (state, { payload }) => {
      state.data.aTags = payload;
      state.fetching = false;
    },
    setDetails: (state, { payload }) => {
      const channels = [];
      state.data.campaignList = payload.campaigns;
      state.data.marketList = payload.partner_market;
      state.data.assetLinks = payload.assetLinks;
      state.data.formatsList = payload.formats;

      payload.display_progress.length > 0 &&
        channels.push({ name: 'Google Display' });
      payload.social_static_progress.length > 0 &&
        channels.push({ name: 'Social Static' });
      payload.social_video_progress.length > 0 &&
        channels.push({ name: 'Social Video' });
      payload.youtube_video.length > 0 && channels.push({ name: 'Youtube' });

      state.data.channelList = channels;

      state.fetching = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.fetching = false;
    },
    clearAll: (state) => {
      state.data.step = null;
      state.data.teamList = [];
      state.data.taskTypeList = [];
      state.data.subTaskList = [];
      state.data.partnerList = [];
      state.data.conceptList = [];
      state.data.campaignList = [];
      state.data.marketList = [];
      state.data.channelList = [];
      state.data.deliveryTypeList = [];
      state.data.assetLinks = [];
      state.data.aTags = [];
      state.save.processing = false;
      state.save.data = [];
      state.fetching = false;
      state.error = null;
    },
  },
});

export const {
  initCreation,
  initSaveCreation,
  successSaveTask,
  errorSaveTask,
  setTeamList,
  setTaskTypeList,
  setSubTaskList,
  setPartnerList,
  setConceptList,
  setDetails,
  setTags,
  setError,
  clearAll,
} = manualTaskCreation.actions;

export const getData = (type, body) => async (dispatch) => {
  dispatch(type === 'add_task' ? initSaveCreation() : initCreation());

  const { success, data, message } = await callApi(type, body);

  success
    ? dispatch(
        setData(
          type,
          [
            'get_concepts',
            'get_concept_overview',
            'get_tags',
            'add_task',
          ].includes(type)
            ? data
            : data.data
        )
      )
    : dispatch(setError(message));
};

// API Selector
const callApi = (t, b) => {
  switch (t) {
    // case 'get_user':
    // return requestMaintenanceUser();
    case 'get_task_type':
      return requestMaintenanceTaskType('?limit=1000');
    case 'get_active_task_type':
      return requestMaintenanceTaskType('?limit=1000&status=1');
    case 'get_task_category':
      return requestMaintenanceTaskCategory('?limit=1000');
    case 'get_active_task_category':
      return requestMaintenanceTaskCategory('?limit=1000&status=1');
    case 'get_teams':
      return requestMaintenanceTeams('?limit=1000');
    // case 'get_status':
    // return requestMaintenanceTaskStatus();
    // case 'get_preset':
    // return requestMaintenanceTaskTypePreset();
    // case 'get_triggers':
    // return requestMaintenanceTrigger();
    case 'get_tags':
      return fetchAllTags();
    case 'get_partners':
      return requestPartners();
    case 'get_concepts':
      return fetchConceptByPartner(b);
    case 'get_concept_overview':
      return fetchOverviewRequest(b);
    case 'add_task':
      return requestCreateTask(b);
    default:
      return null;
  }
};

// Set Data
const setData = (t, data) => {
  switch (t) {
    case 'get_teams':
      return setTeamList(data);
    case 'get_task_type':
    case 'get_active_task_type':
      return setTaskTypeList(data);
    case 'get_task_category':
    case 'get_active_task_category':
      return setSubTaskList(data);
    case 'get_partners':
      return setPartnerList(data);
    case 'get_concepts':
      return setConceptList(data);
    case 'get_concept_overview':
      return setDetails(data);
    case 'get_tags':
      return setTags(data);
    case 'add_task':
      return successSaveTask(data);
    default:
      return null;
  }
};

export default manualTaskCreation.reducer;
