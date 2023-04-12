// Redux
import { createSlice } from '@reduxjs/toolkit';
// Services
import { loginRequest, loginViaGoogleRequest } from 'services/api/auth';
// Reducers
import { reset as resetUserState, fetchUserDetails } from './user';
// Utilities
import { authenticateUser, deauthenticateUser } from 'utils/session';

const initialState = {
  isLoading: false,
  error: null,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    loginFailed: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    reset: () => initialState,
  },
});

export const { loginStart, loginSuccess, loginFailed, reset } = auth.actions;

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(loginStart());

    const { success, message, data } = await loginRequest({
      email,
      password,
    });

    if (success) {
      authenticateUser(data?.token);
      dispatch(loginSuccess());
      dispatch(fetchUserDetails());
      localStorage.setItem('local', true);
    } else {
      dispatch(loginFailed(message));
    }
  };

export const loginViaGoogle = (body) => async (dispatch) => {
  dispatch(loginStart());

  const { success, message, data } = await loginViaGoogleRequest(body);

  if (success) {
    authenticateUser(data?.token);
    dispatch(loginSuccess());
    dispatch(fetchUserDetails());
  } else {
    dispatch(loginFailed(message));
  }
};

export const logout = () => async (dispatch) => {
  deauthenticateUser();
  dispatch(resetUserState());
  dispatch(reset());
};

export default auth.reducer;
