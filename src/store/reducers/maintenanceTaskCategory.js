import { createSlice } from '@reduxjs/toolkit';
import {
  requestMaintenanceTaskCategory, requestMaintenanceTaskCategoryPost, requestMaintenanceTaskCategoryPut, requestMaintenanceTaskCategoryDelete
} from 'services/api/maintenance';

const initialState = {
  list: [],
  fetching: false,
  error: null,
};

const maintenanceTaskCategory = createSlice({
  name: 'maintenanceTaskCategory',
  initialState,
  reducers: {
    fetchListStart: (state) => {
      state.fetching = true;
      state.error = null;
    },
    fetchListSuccess: (state, { payload }) => {
      state.list = payload;
      state.fetching = false;
      state.error = null;
    },
    fetchListFailed: (state, { payload }) => {
      state.fetching = false;
      state.error = { message: payload };
    },
    createMaintenanceStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    createMaintenanceError: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    createMaintenanceSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
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
    deleteMaintenanceStartTaskCategory: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteMaintenanceErrorTaskCategory: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    deleteMaintenanceSuccessTaskCategory: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { fetchListStart, fetchListSuccess, fetchListFailed, createMaintenanceStart, createMaintenanceError, createMaintenanceSuccess, updateMaintenanceStart, updateMaintenanceError, updateMaintenanceSuccess, deleteMaintenanceStartTaskCategory, deleteMaintenanceErrorTaskCategory, deleteMaintenanceSuccessTaskCategory } =
  maintenanceTaskCategory.actions;

export const fetchMaintenanceTaskCategory =
  () =>
    async (dispatch) => {
      dispatch(fetchListStart());
      const { success, message, data } = await requestMaintenanceTaskCategory();

      if (success) {
        dispatch(fetchListSuccess(data.data));

      } else {
        dispatch(fetchListFailed(message));
      }
    };

export const createMaintenanceTaskCategory = (body) => async (dispatch) => {
  dispatch(createMaintenanceStart());
  const { success, message } = await requestMaintenanceTaskCategoryPost(body);

  if (success) {

    dispatch(createMaintenanceSuccess());
    dispatch(fetchMaintenanceTaskCategory());

  } else {
    dispatch(fetchMaintenanceTaskCategory());
    dispatch(createMaintenanceError(message));
  }
};
export const updateMaintenanceTaskCategory = (body) => async (dispatch) => {
  dispatch(updateMaintenanceStart());
  const { success, message } = await requestMaintenanceTaskCategoryPut(body);

  if (success) {

    dispatch(updateMaintenanceSuccess());
    dispatch(fetchMaintenanceTaskCategory());

  } else {
    dispatch(fetchMaintenanceTaskCategory());
    dispatch(updateMaintenanceError(message));
  }
};
export const deleteMaintenanceTaskCategory = (body) => async (dispatch) => {
  dispatch(deleteMaintenanceStartTaskCategory());
  const { success, message } = await requestMaintenanceTaskCategoryDelete(body);

  if (success) {
    dispatch(deleteMaintenanceSuccessTaskCategory());
    dispatch(fetchMaintenanceTaskCategory());
  } else {
    dispatch(deleteMaintenanceErrorTaskCategory(message));
  }
};

export default maintenanceTaskCategory.reducer;
