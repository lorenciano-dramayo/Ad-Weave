import { createSlice } from '@reduxjs/toolkit';

// API's
import {
  requestDashboard,
  requestDashboardEOD,
  requestDashboardFilter,
} from 'services/api/dashboard';

const initialState = {
  data: [],
  data_eod: [],
  data_filter: [],
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
    isSuccess: (state, { payload }) => {
      state.data = payload;
      state.fetching = false;
    },
    isError: (state, { payload }) => {
      state.error = payload;
      state.fetching = false;
    },
    initDashboardEOD: (state) => {
      state.fetching = true;
      state.error = null;
    },
    isSuccessEOD: (state, { payload }) => {
      state.data_eod = payload;
      state.fetching = false;
    },
    isErrorEOD: (state, { payload }) => {
      state.error = payload;
      state.fetching = false;
    },
    initDashboardFilter: (state) => {
      state.fetching = true;
      state.error = null;
    },
    isSuccessFilter: (state, { payload }) => {
      state.data_filter = payload;
      state.fetching = false;
    },
    isErrorFilter: (state, { payload }) => {
      state.error = payload;
      state.fetching = false;
    },
  },
});

export const {
  initDashboard,
  isSuccess,
  isError,
  initDashboardEOD,
  isSuccessEOD,
  isErrorEOD,
  initDashboardFilter,
  isSuccessFilter,
  isErrorFilter,
} = dashboard.actions;

export const getDashboard = () => async (dispatch) => {
  dispatch(initDashboard());
  const { success, message, data } = await requestDashboard({
    filter: { is_dashboard: true },
  });

  if (success) {
    dispatch(isSuccess(data));
  } else {
    dispatch(isError(message));
  }
};

export const fetchDashboardFilter = (body) => async (dispatch) => {
  dispatch(initDashboardFilter());
  const { success, message, data } = await requestDashboardFilter(body);

  if (success) {
    dispatch(isSuccessFilter(data));
  } else {
    dispatch(isErrorFilter(message));
  }
};

export const fetchDashboardEOD = (body) => async (dispatch) => {
  dispatch(initDashboardEOD());
  const { success, message, data } = await requestDashboardEOD(body);

  if (success) {
    dispatch(isSuccessEOD(data));
  } else {
    dispatch(isErrorEOD(message));
  }
};

// export const fetchDashboardEOD = (body) => async (dispatch) => {
//     dispatch(initDashboardEOD());
//     const { success, message } = await requestDashboardEOD(body);

//     if (success) {
//       dispatch(requestMaintenanceTaskTypePreset());
//       dispatch(createMaintenanceSuccessTaskType());
//     } else {
//       dispatch(requestMaintenanceTaskTypePreset());

//       dispatch(createMaintenanceErrorTaskType(message));
//     }
//   };
export default dashboard.reducer;
