// Redux
import { createSlice } from '@reduxjs/toolkit';
// Services
import { requestPartners } from 'services/api/partner';

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

const partners = createSlice({
  name: 'partners',
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

export const { fetchStart, fetchSuccess, fetchFailed } = partners.actions;

export const fetchPartners = () => async (dispatch) => {
  dispatch(fetchStart());
  const { success, data, message } = await requestPartners();
  if (success) {
    dispatch(fetchSuccess(data.data));
  } else {
    dispatch(fetchFailed(message));
  }
};

export default partners.reducer;
