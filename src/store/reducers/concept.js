// Redux
import { createSlice } from '@reduxjs/toolkit';
// Services
import {
  fetchConceptsListRequest,
  fetchOverviewRequest,
  fetchSubscribersRequest,
  fetchAssigneesRequest,
  fetchTagsRequest,
  updateStatusRequest,
  updateConceptStatusRequest,
  updateDealIdRequest,
  updateMembersRequest,
  updateAssigneesRequest,
  updateTagsRequest,
  updateAssetDownloadRequest,
  fetchLinkList,
  requestDestroyLinkList,
  createLinkList,
  filterLinkList,
  updateLinkList,
} from 'services/api/concept';

const initialState = {
  list: [],
  isLoadingList: false,
  overview: {},
  subscribers: [],
  assignees: [],
  tags: [],
  linkListItem: [],
  table: {},
  isAssetPending: false,
  isFetchingList: true,
  isFetchingSubscribers: false,
  isFetchingAssignees: false,
  isFetchingTags: false,
  isFetchingOverview: true,
  error: null,
};

const concept = createSlice({
  name: 'concept',
  initialState,
  reducers: {
    // Start
    fetchListStart: (state, { shouldDisplayLoader }) => {
      state.isFetchingList = shouldDisplayLoader;
      state.error = null;
    },
    fetchConceptListStart: (state) => {
      state.linkListItem = {};
      state.isLoadingList = true;
      state.error = null;
    },
    fetchOverviewStart: (state) => {
      state.overview = {};
      state.isFetchingOverview = true;
      state.error = null;
    },
    fetchSubscribersStart: (state) => {
      state.isFetchingSubscribers = true;
      state.error = null;
    },
    fetchAssigneesStart: (state) => {
      state.isFetchingAssignees = true;
      state.error = null;
    },
    fetchTagsStart: (state) => {
      state.isFetchingTags = true;
      state.error = null;
    },
    updateStatusStart: (state) => {
      state.fetching = true;
      state.error = null;
    },
    updateDealIdStart: (state) => {
      state.fetching = true;
      state.error = null;
    },
    updateMembersStart: (state) => {
      state.error = null;
    },
    updateAssigneesStart: (state) => {
      state.error = null;
    },
    // Success
    fetchListSuccess: (state, { payload }) => {
      state.list = payload.isFirstFetch
        ? payload.data
        : { ...payload.data, data: [...state.list.data, ...payload.data.data] };
      state.isFetchingList = false;
      state.error = null;
    },
    fetchOverviewSuccess: (state, { payload }) => {
      state.overview = payload;
      state.isFetchingOverview = false;
      state.error = null;
    },
    fetchLinkListSuccess: (state, { payload }) => {
      state.linkListItem = payload;
      state.isLoadingList = false;
      state.error = null;
    },
    fetchSubscribersSuccess: (state, { payload }) => {
      state.subscribers = payload;
      state.isFetchingSubscribers = false;
      state.error = null;
    },
    fetchAssigneesSuccess: (state, { payload }) => {
      state.assignees = payload;
      state.isFetchingAssignees = false;
      state.error = null;
    },
    fetchTagsSuccess: (state, { payload }) => {
      state.tags = payload;
      state.isFetchingTags = false;
      state.error = null;
    },
    updateStatusSuccess: () => { },
    updateDealIdSuccess: () => { },
    updateMembersSuccess: (state, { payload }) => {
      state.overview.concept.subscribers = payload;
      state.error = null;
    },
    updateAssigneesSuccess: (state) => {
      state.error = null;
    },
    updateTagsSuccess: (state) => {
      state.error = null;
    },
    // Failed
    fetchListFailed: (state, { payload }) => {
      state.isFetchingList = false;
      state.error = payload;
    },
    fetchOverviewFailed: (state, { payload }) => {
      state.isFetchingOverview = false;
      state.error = payload;
    },
    fetchLinkListFailed: (state, { payload }) => {
      state.isLoadingList = false;
      state.error = payload;
    },
    fetchSubscribersFailed: (state, { payload }) => {
      state.isFetchingSubscribers = false;
      state.error = payload;
    },
    fetchAssigneesFailed: (state, { payload }) => {
      state.isFetchingAssignees = false;
      state.error = payload;
    },
    fetchTagsFailed: (state, { payload }) => {
      state.isFetchingTags = false;
      state.error = payload;
    },
    updateStatusFailed: (state, { payload }) => {
      state.isFetchingTags = false;
      state.error = { message: payload };
    },
    updateDealIdFailed: (state, { payload }) => {
      state.fetching = false;
      state.error = { message: payload };
    },
    updateMembersFailed: (state, { payload }) => {
      state.error = { message: payload };
    },
    updateAssigneesFailed: (state, { payload }) => {
      state.error = { message: payload };
    },
    updateTagsFailed: (state, { payload }) => {
      state.error = { message: payload };
    },
    updateAssetDownloadSuccess: (state, { payload }) => {
      state.isAssetPending = payload;
    },
    populateTable: (state, { payload }) => {
      state.table = payload;
    },
  },
});

export const {
  // Start
  fetchListStart,
  fetchConceptListStart,
  initConceptList,
  fetchOverviewStart,
  fetchSubscribersStart,
  fetchAssigneesStart,
  fetchTagsStart,
  updateDealIdStart,
  updateStatusStart,
  updateMembersStart,
  updateAssigneesStart,
  // Success
  fetchLinkListSuccess,
  fetchOverviewSuccess,
  fetchListSuccess,
  fetchSubscribersSuccess,
  fetchAssigneesSuccess,
  fetchTagsSuccess,
  updateStatusSuccess,
  updateDealIdSuccess,
  updateMembersSuccess,
  updateAssigneesSuccess,
  updateTagsSuccess,
  updateAssetDownloadSuccess,
  // Failed
  fetchListFailed,
  fetchLinkListFailed,
  fetchOverviewFailed,
  fetchSubscribersFailed,
  fetchAssigneesFailed,
  fetchTagsFailed,
  updateStatusFailed,
  updateDealIdFailed,
  updateMembersFailed,
  updateAssigneesFailed,
  updateTagsFailed,
  // Populate
  populateTable,
} = concept.actions;

export const fetchConceptsList =
  (shouldDisplayLoader = true, isFirstFetch = true, params = {}, page = 1) =>
    async (dispatch) => {
      dispatch(fetchListStart(shouldDisplayLoader));

      const { success, message, data } = await fetchConceptsListRequest(
        page,
        params
      );
      if (success) {
        dispatch(fetchListSuccess({ isFirstFetch: isFirstFetch, data: data }));
      } else {
        dispatch(fetchListFailed(message));
      }
    };

export const fetchOverview = (params) => async (dispatch) => {
  dispatch(fetchOverviewStart());

  const { success, message, data } = await fetchOverviewRequest(params);

  if (success) {
    dispatch(fetchOverviewSuccess(data));
  } else {
    dispatch(fetchOverviewFailed(message));
  }
};

export const fetchSubscribers = (params) => async (dispatch) => {
  dispatch(fetchSubscribersStart());

  const { success, message, data } = await fetchSubscribersRequest(params);

  if (success) {
    dispatch(fetchSubscribersSuccess(data));
  } else {
    dispatch(fetchSubscribersFailed(message));
  }
};

export const fetchAssignees = (params) => async (dispatch) => {
  dispatch(fetchAssigneesStart());

  const { success, message, data } = await fetchAssigneesRequest(params);

  if (success) {
    dispatch(fetchAssigneesSuccess(data));
  } else {
    dispatch(fetchAssigneesFailed(message));
  }
};

export const fetchTags = (params) => async (dispatch) => {
  dispatch(fetchTagsStart());

  const { success, message, data } = await fetchTagsRequest(params);

  if (success) {
    dispatch(fetchTagsSuccess(data));
  } else {
    dispatch(fetchTagsFailed(message));
  }
};

export const updateStatus = (body) => async (dispatch) => {
  dispatch(updateStatusStart());

  const { success, message } = await updateStatusRequest(body);

  if (success) {
    dispatch(updateStatusSuccess());
  } else {
    dispatch(updateStatusFailed(message));
  }

  return success;
};

export const updateConceptCampaignStatus = (body) => async (dispatch) => {
  const { success, message } = await updateConceptStatusRequest(body);

  if (success) {
    dispatch(updateStatusSuccess());
  } else {
    dispatch(updateStatusFailed(message));
  }

  return success;
};

export const updateDealId = (body) => async (dispatch) => {
  dispatch(updateDealIdStart());
  const { success, message } = await updateDealIdRequest(body);

  if (success) {
    dispatch(updateDealIdSuccess());
  } else {
    dispatch(updateDealIdFailed(message));
  }
};

export const updateMembers = (body) => async (dispatch) => {
  dispatch(updateMembersStart());
  const { success, message, data } = await updateMembersRequest(body);

  if (success) {
    dispatch(updateMembersSuccess(data));
  } else {
    dispatch(updateMembersFailed(message));
  }
};

export const updateAssignees = (body) => async (dispatch) => {
  dispatch(updateAssigneesStart());
  const { success, message, data } = await updateAssigneesRequest(body);

  if (success) {
    dispatch(updateAssigneesSuccess());
  } else {
    dispatch(updateAssigneesFailed(message));
  }

  return data;
};

export const updateTags = (body) => async (dispatch) => {
  const { success, message, data } = await updateTagsRequest(body);

  if (success) {
    dispatch(updateTagsSuccess());
  } else {
    dispatch(updateTagsFailed(message));
  }

  return data;
};

export const updateAssetDownload = (body) => async (dispatch) => {
  const { success, data } = await updateAssetDownloadRequest(body);

  if (success) {
    dispatch(updateAssetDownloadSuccess(data.downloading_assets));
  }
};

export const fetchLinkList_ = (id) => async (dispatch) => {
  dispatch(fetchConceptListStart());
  const { success, message, data } = await fetchLinkList(id);

  if (success) {
    dispatch(fetchLinkListSuccess(data));
  } else {
    dispatch(fetchLinkListFailed(message));
  }
};

export const requestDestroyLinkList_ = (body) => async (dispatch) => {
  dispatch(fetchConceptListStart());
  const item = [body.id];
  const { success, data, message } = await requestDestroyLinkList({ id: item });
  if (success) {
    dispatch(fetchLinkListSuccess(data));
    dispatch(fetchLinkList_(body?.concept.concept_uuid));
  } else {
    dispatch(fetchLinkListFailed(message));
  }
};

export const createLinkList_ = (body) => async (dispatch) => {
  dispatch(fetchConceptListStart());

  const { success, data, message } = await createLinkList(body);

  if (success) {
    dispatch(fetchLinkListSuccess(data));
    dispatch(fetchLinkList_(body.rel_id));
  } else {
    dispatch(fetchLinkListFailed(message));
  }
};

export const updateLinkList_ = (body, id) => async (dispatch) => {
  dispatch(fetchConceptListStart());
  const { success, data, message } = await updateLinkList(body);

  if (success) {
    dispatch(fetchLinkListSuccess(data));
    dispatch(fetchLinkList_(id));
  } else {
    dispatch(fetchLinkListFailed(message));
  }
};

export const filterLinkList_ = (id, body) => async (dispatch) => {
  dispatch(fetchConceptListStart());

  const { success, data, message } = await filterLinkList(id, body);

  if (success) {
    dispatch(fetchLinkListSuccess(data));
    // dispatch(fetchLinkList_(id));
  } else {
    dispatch(fetchLinkListFailed(message));
  }
};
export default concept.reducer;
