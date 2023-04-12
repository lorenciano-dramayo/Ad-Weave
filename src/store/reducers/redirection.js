import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { requestTaskRedirect } from 'services/api/redirection';

const initialState = {
  taskId: null,
  error: null,
  fetching: false,
};

const redirection = createSlice({
  name: 'redirection',
  initialState,
  reducers: {
    initRedirection: (state) => {
      state.fetching = true;
      state.error = null;
    },
    successRedirection: (state, { payload }) => {
      state.taskId = payload;
      state.fetching = false;
      state.error = null;
    },
    errorRedirection: (state, { payload }) => {
      state.fetching = false;
      state.error = { message: payload };
    },
  },
});

export const { initRedirection, successRedirection, errorRedirection } =
  redirection.actions;

export const getNewTaskId = (body) => async (dispatch) => {
  dispatch(initRedirection());
  const { success, message, data } = await requestTaskRedirect(body);

  if (success) {
    dispatch(successRedirection(data.id));
  } else {
    dispatch(errorRedirection(message));
  }
};

export default redirection.reducer;
