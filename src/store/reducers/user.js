// Redux
import { createSlice } from '@reduxjs/toolkit';
// Services
import { loginRequest } from 'services/api/auth';
import {
  fetchUserProfileRequest,
  updateUserProfileRequest,
  updateUserProfilePicture,
} from 'services/api/user';

const initialState = {
  isLoading: false,
  error: null,
  data: {},
};

const users = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    fetchUserSuccess: (state, { payload }) => {
      state.data = payload;
      state.error = null;
      state.isLoading = false;
    },
    fetchUserFailed: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    updateUserStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateUserError: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    updateUserSuccess: (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
      state.error = null;
    },
    reset: () => initialState,
  },
});

export const {
  fetchUserStart,
  fetchUserFailed,
  fetchUserSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserError,
  reset,
} = users.actions;

export const fetchUserDetails = () => async (dispatch) => {
  dispatch(fetchUserStart());
  const { success, message, data } = await fetchUserProfileRequest();
  if (success) {
    dispatch(fetchUserSuccess(data));
  } else {
    dispatch(fetchUserFailed(message));
  }
};

export const updateUserProfile = (params) => async (dispatch) => {
  dispatch(updateUserStart());
  const { success, message, data } = await updateUserProfileRequest(params);

  if (success) {
    dispatch(updateUserSuccess(data));
  } else {
    dispatch(updateUserError(message));
  }
};

export const updateProfilePicture = (params) => async (dispatch) => {
  dispatch(updateUserStart());
  const { success, message, data } = await updateUserProfilePicture(params);
  if (success) {
    dispatch(fetchUserSuccess(data));
  } else {
    dispatch(fetchUserFailed(message));
  }
};

export const changePassword =
  (
    { id, tab, email, current_password, password, password_confirmation },
    completion
  ) =>
  async (dispatch) => {
    dispatch(updateUserStart());
    const { success, message } = await loginRequest({
      email,
      password: current_password,
    });

    if (success) {
      const { success, message } = await updateUserProfileRequest({
        id,
        tab,
        password,
        password_confirmation,
      });
      if (success) {
        dispatch(updateUserSuccess());
        dispatch(fetchUserDetails());
        completion(true);
      } else {
        dispatch(updateUserError(message));
        completion(false);
      }
    } else {
      dispatch(updateUserError(message));
      completion(false);
    }
  };

export default users.reducer;
