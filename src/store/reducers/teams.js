import { createSlice } from '@reduxjs/toolkit';
import api from 'services/api/teams';

const initialState = {
  list: [],
  fetching: false,
  error: null,
};

const teams = createSlice({
  name: 'teams',
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
  },
});

export const { fetchListStart, fetchListSuccess, fetchListFailed } =
  teams.actions;

export const fetchTeams =
  (search = '') =>
  async (dispatch) => {
    dispatch(fetchListStart());
    const { success, message, data } = await api.getList('teams', { search });

    if (success) {
      dispatch(fetchListSuccess(data));
    } else {
      dispatch(fetchListFailed(message));
    }
  };

export default teams.reducer;
