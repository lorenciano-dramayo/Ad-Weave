// Redux
import { createSlice } from '@reduxjs/toolkit';

// Services
import { fetchSearchResultsRequest } from 'services/api/globalSearch';

const initialState = {
  concept: {},
  campaign: {},
  task: {},
  savedSearches: [],
  recentSearches: [],
  isFetching: true,
  error: null,
};

const globalSearch = createSlice({
  name: 'globalSearch',
  initialState,
  reducers: {
    // Start
    fetchListStart: (state, { payload: isFirstLoad }) => {
      state.isFetching = isFirstLoad;
      state.error = null;
    },
    // Success
    fetchListSuccess: (state, { payload }) => {
      state.concept = payload.isFirstLoad
        ? payload.data.concept
        : {
            ...payload.data.concept,
            data: [...state.concept.data, ...payload.data.concept.data],
          };
      state.campaign = payload.isFirstLoad
        ? payload.data.campaign
        : {
            ...payload.data.campaign,
            data: [...state.campaign.data, ...payload.data.campaign.data],
          };
      state.task = payload.isFirstLoad
        ? payload.data.task
        : {
            ...payload.data.task,
            data: [...state.task.data, ...payload.data.task.data],
          };
      state.isFetching = false;
      state.error = null;
    },
    // Failed
    fetchListFailed: (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    },
    // Populate
    addSavedSearches: (state, { payload }) => {
      state.savedSearches = [
        payload,
        ...state.savedSearches.filter((i) => i != payload.toLowerCase()),
      ];
    },
    addRecentSearches: (state, { payload }) => {
      state.recentSearches = [
        payload,
        ...state.recentSearches.filter((i) => i != payload.toLowerCase()),
      ];
    },
    removeFromSavedSearches: (state, { payload }) => {
      state.savedSearches = [
        ...state.savedSearches.filter((i) => i != payload.toLowerCase()),
      ];
    },
  },
});

export const {
  // Start
  fetchListStart,
  // Success
  fetchListSuccess,
  // Failed
  fetchListFailed,
  addSavedSearches,
  addRecentSearches,
  removeFromSavedSearches,
} = globalSearch.actions;

export const fetchSearchResults = (isFirstLoad, params) => async (dispatch) => {
  dispatch(fetchListStart(isFirstLoad));

  const { success, message, data } = await fetchSearchResultsRequest(params);

  if (success) {
    dispatch(fetchListSuccess({ isFirstLoad: isFirstLoad, data: data }));
  } else {
    dispatch(fetchListFailed(message));
  }

  return success;
};

export default globalSearch.reducer;
