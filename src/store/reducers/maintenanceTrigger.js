import { createSlice } from '@reduxjs/toolkit';
import {
  requestMaintenanceTrigger
} from 'services/api/maintenance';

const initialState = {
  list: [],
  fetching: false,
  error: null,
  data: {},
};

const maintenanceTrigger = createSlice({
  name: 'maintenanceTrigger',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    fetchSuccess: (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    },
    fetchFailed: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },

  },
});

export const { fetchStart, fetchSuccess, fetchFailed } = maintenanceTrigger.actions;

export const fetchMaintenanceTrigger = () => async (dispatch) => {
  dispatch(fetchStart());
  const { success, data, message } = await requestMaintenanceTrigger();
  if (success) {
    dispatch(fetchSuccess(data.data));
  } else {
    dispatch(fetchFailed(message));
  }
};
export default maintenanceTrigger.reducer;

