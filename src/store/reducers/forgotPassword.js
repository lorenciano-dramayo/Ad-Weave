// Redux
import { createSlice } from '@reduxjs/toolkit';
// Services
import { forgetPasswordRequest, resetPasswordRequest } from 'services/api/auth';

const initialState = {
  statusCode: null,
  message: null,
  isLoading: false,
  error: null,
};

const forgotPassword = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    initForgotPassword: (state) => {
      state.isLoading = true;
      state.error = null;
      state.statusCode = null;
      state.message = null;
    },
    ForgotPasswordSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.statusCode = payload?.status_code;
      state.message = payload?.msg;
    },
    ForgotPasswordFailed: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    reset: () => initialState,
  },
});

export const {
  initForgotPassword,
  ForgotPasswordSuccess,
  ForgotPasswordFailed,
} = forgotPassword.actions;

export const setForgotPassword = (formData) => async (dispatch) => {
  dispatch(initForgotPassword());

  const { msg, status, status_code } = await forgetPasswordRequest(formData);

  if (status) {
    dispatch(
      ForgotPasswordSuccess({
        msg,
        status_code,
      })
    );
  } else {
    ForgotPasswordFailed(msg);
  }
};

export const setResetPassword = (password, key) => async (dispatch) => {
  dispatch(initForgotPassword());

  const { msg, status, status_code } = await resetPasswordRequest(
    password,
    key
  );

  if (status) {
    dispatch(
      ForgotPasswordSuccess({
        msg,
        status_code,
      })
    );
  } else {
    ForgotPasswordFailed(msg);
  }
};

export default forgotPassword.reducer;
