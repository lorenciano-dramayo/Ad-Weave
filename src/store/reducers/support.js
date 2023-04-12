import { createSlice } from '@reduxjs/toolkit';

import {
  requestGetTickets,
  requestSaveTicket,
  requestTicketCount,
  requestTicketOptions,
} from 'services/api/support';

const initialState = {
  data: [],
  count: {},
  options: {},
  fetching: false,
  save: {
    data: {},
    processing: false,
  },
  error: null,
};

const support = createSlice({
  name: 'support',
  initialState,
  reducers: {
    initSupport: (state) => {
      state.fetching = true;
      state.error = null;
    },
    initSaving: (state) => {
      state.save.processing = true;
      state.error = null;
    },
    SupportSuccess: (state, { payload }) => {
      state.data = payload;
      state.fetching = false;
    },
    NewTicketSuccess: (state, { payload }) => {
      state.save.data = payload;
      state.save.processing = false;
      state.fetching = false;
    },
    CountSuccess: (state, { payload }) => {
      state.count = payload;
    },
    OptionSuccess: (state, { payload }) => {
      state.options = payload;
    },
    SupportError: (state, { payload }) => {
      state.error = payload;
      state.fetching = false;
    },
    NewTicketError: (state, { payload }) => {
      state.error = payload;
      state.save.processing = false;
    },
    ResetSavedData: (state, { payload }) => {
      state.save.data = {};
    },
  },
});

export const {
  initSupport,
  initSaving,
  SupportSuccess,
  NewTicketSuccess,
  CountSuccess,
  SupportError,
  NewTicketError,
  OptionSuccess,
  ResetSavedData,
} = support.actions;

export const getTickets = (id) => async (dispatch) => {
  dispatch(initSupport());
  const { success, message, data } = await requestGetTickets(id);

  if (success) {
    dispatch(SupportSuccess(data));
  } else {
    dispatch(SupportError(message));
  }
};

export const saveTicket = (params, onSuccess) => async (dispatch) => {
  dispatch(initSaving());
  const { success, message, data } = await requestSaveTicket(params);
  if (success) {
    dispatch(NewTicketSuccess(data));
  } else {
    dispatch(NewTicketError(message ?? 'An error occured'));
  }
};

export const getTicketCount = (id) => async (dispatch) => {
  dispatch(initSupport());

  const { success, message, data } = await requestTicketCount(id);

  if (success) {
    dispatch(CountSuccess(data.data[0]));
  } else {
    dispatch(SupportError(message));
  }
};

export const getTicketOptions = () => async (dispatch) => {
  dispatch(initSupport);

  const { success, message, data } = await requestTicketOptions();

  if (success) {
    dispatch(OptionSuccess(data));
  } else {
    dispatch(SupportError(message));
  }
};

export const resetSavedData = () => async (dispatch) => {
  dispatch(ResetSavedData());
};

export default support.reducer;
