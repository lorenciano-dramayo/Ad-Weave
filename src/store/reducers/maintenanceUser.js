import { createSlice } from '@reduxjs/toolkit';
import { requestMaintenanceUser } from 'services/api/maintenance';

const initialState = {
  list: [],
  fetching: false,
  error: null,
};

const maintenanceUser = createSlice({
  name: 'maintenanceUser',
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
    deleteMaintenanceStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteMaintenanceError: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    deleteMaintenanceSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchListStart,
  fetchListSuccess,
  fetchListFailed,
  createMaintenanceStart,
  createMaintenanceError,
  createMaintenanceSuccess,
  updateMaintenanceStart,
  updateMaintenanceError,
  updateMaintenanceSuccess,
  deleteMaintenanceStart,
  deleteMaintenanceError,
  deleteMaintenanceSuccess,
} = maintenanceUser.actions;

export const fetchUserDetailss = () => async (dispatch) => {
  dispatch(fetchListStart());
  const { success, message, data } = await requestMaintenanceUser();

  if (success) {
    dispatch(fetchListSuccess(data.data));
  } else {
    dispatch(fetchListFailed(message));
  }
};

// export const createTeam = (body) => async (dispatch) => {
//   dispatch(createMaintenanceStart());
//   const { success, message } = await requestMaintenanceCreateTeam(body);

//   if (success) {
//     dispatch(createMaintenanceSuccess());
//     dispatch(fetchMaintenanceTeams());
//   } else {
//     dispatch(createMaintenanceError(message));
//   }
// };

// export const updateMaintenanceTaskStatus = (body) => async (dispatch) => {
//   dispatch(updateMaintenanceStart());
//   const { success, message } = await requestMaintenanceTaskStatusPut(body);

//   if (success) {
//     dispatch(updateMaintenanceSuccess());
//     dispatch(fetchMaintenanceTaskStatus());
//   } else {
//     dispatch(updateMaintenanceError(message));
//   }
// };
// export const deleteMaintenanceTaskStatus = (body) => async (dispatch) => {
//   dispatch(deleteMaintenanceStart());
//   const { success, message } = await requestMaintenanceTaskStatusDelete(body);

//   if (success) {
//     dispatch(deleteMaintenanceSuccess());
//     dispatch(fetchMaintenanceTaskStatus());
//   } else {
//     dispatch(deleteMaintenanceError(message));
//   }
// };

export default maintenanceUser.reducer;
