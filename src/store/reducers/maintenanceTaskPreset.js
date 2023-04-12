import { createSlice } from '@reduxjs/toolkit';
import {
  // requestMaintenanceTaskType,
  requestMaintenanceTaskTypePreset,
  requestMaintenanceTaskTypePost,
  requestMaintenanceTaskTypeDelete,
  requestMaintenanceTaskTypePut,
} from 'services/api/maintenance';

const initialState = {
  list: [],
  fetching: false,
  error: null,
};

const maintenanceTaskPreset = createSlice({
  name: 'maintenanceTaskPreset',
  initialState,
  reducers: {
    fetchListStartTaskType: (state) => {
      state.fetching = true;
      state.error = null;
    },
    fetchListSuccessTaskType: (state, { payload }) => {
      state.list = payload;
      state.fetching = false;
      state.error = null;
    },
    fetchListFailedTaskType: (state, { payload }) => {
      state.fetching = false;
      state.error = { message: payload };
    },
    updateMaintenanceStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateMaintenanceError: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    updateMaintenanceSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    createMaintenanceStartTaskType: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    createMaintenanceErrorTaskType: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    createMaintenanceSuccessTaskType: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    deleteMaintenanceStartTaskType: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteMaintenanceErrorTaskType: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    deleteMaintenanceSuccessTaskType: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  updateMaintenanceStart,
  updateMaintenanceError,
  updateMaintenanceSuccess,
  fetchListStartTaskType,
  fetchListSuccessTaskType,
  fetchListFailedTaskType,
  createMaintenanceStartTaskType,
  createMaintenanceErrorTaskType,
  createMaintenanceSuccessTaskType,
  deleteMaintenanceStartTaskType,
  deleteMaintenanceErrorTaskType,
  deleteMaintenanceSuccessTaskType,
} = maintenanceTaskPreset.actions;

export const fetchMaintenanceTaskTypePreset = () => async (dispatch) => {
  dispatch(fetchListStartTaskType());
  const { success, message, data } = await requestMaintenanceTaskTypePreset();

  if (success) {
    dispatch(fetchListSuccessTaskType(data.data));
  } else {
    dispatch(fetchListFailedTaskType(message));
  }
};

export const createMaintenanceTaskType = (body) => async (dispatch) => {
  dispatch(createMaintenanceStartTaskType());
  const { success, message } = await requestMaintenanceTaskTypePost(body);

  if (success) {
    dispatch(requestMaintenanceTaskTypePreset());
    dispatch(createMaintenanceSuccessTaskType());
  } else {
    dispatch(requestMaintenanceTaskTypePreset());

    dispatch(createMaintenanceErrorTaskType(message));
  }
};
export const updateMaintenanceTaskType = (body) => async (dispatch) => {
  dispatch(updateMaintenanceStart());
  const { success, message } = await requestMaintenanceTaskTypePut(body);

  if (success) {
    dispatch(updateMaintenanceSuccess());
    dispatch(requestMaintenanceTaskTypePreset());
  } else {
    dispatch(requestMaintenanceTaskTypePreset());
    dispatch(updateMaintenanceError(message));
  }
};
export const deleteMaintenanceTaskType = (body) => async (dispatch) => {
  dispatch(deleteMaintenanceStartTaskType());
  const { success, message } = await requestMaintenanceTaskTypeDelete(body);

  if (success) {
    dispatch(deleteMaintenanceSuccessTaskType());
    dispatch(requestMaintenanceTaskTypePreset());
  } else {
    dispatch(deleteMaintenanceErrorTaskType(message));
  }
};

export default maintenanceTaskPreset.reducer;
