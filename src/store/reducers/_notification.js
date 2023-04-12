// Redux
import { createSlice } from '@reduxjs/toolkit';
// Services
import {
  requestNotification,
  requestNotificationMarkAsRead,
  requestNotificationById,
  requestNotificationRead,
  requestNotificationUnread,
  requestNotificationMarkAllRead,
  requestNotificationCount,
} from 'services/api/notification';

const initialState = {
  list: [],
  list_all: [],
  list_read: [],
  list_unread: [],
  list_data: [],
  count: 0,
  isLoading: false,
  error: null,
};

const notifications = createSlice({
  name: 'notifications',
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
    fetchSuccessAll: (state, { payload }) => {
      state.list_all = payload;
      state.isLoading = false;
    },
    fetchSuccessRead: (state, { payload }) => {
      state.list_read = payload;
      state.isLoading = false;
    },
    fetchSuccessUnread: (state, { payload }) => {
      state.list_unread = payload;
      state.isLoading = false;
    },
    fetchFailed: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    fetchSuccessByID: (state, { payload }) => {
      state.list_data = payload;
      state.isLoading = false;
    },
    NotificationCountSuccess: (state, { payload }) => {
      state.count = payload;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailed,
  fetchSuccessByID,
  fetchSuccessAll,
  fetchSuccessRead,
  fetchSuccessUnread,
  NotificationCountSuccess,
} = notifications.actions;

export const getNotification = () => async (dispatch) => {
  dispatch(fetchStart());
  const { success, data, message } = await requestNotification();
  if (success) {
    dispatch(fetchSuccess(data));
  } else {
    dispatch(fetchFailed(message));
  }
};

export const getNotificationRead = () => async (dispatch) => {
  dispatch(fetchStart());
  const { success, data, message } = await requestNotificationRead();
  if (success) {
    dispatch(fetchSuccess(data));
    dispatch(fetchSuccessRead(data));
  } else {
    dispatch(fetchFailed(message));
  }
};

export const getNotificationUnread = () => async (dispatch) => {
  dispatch(fetchStart());
  const { success, data, message } = await requestNotificationUnread();
  if (success) {
    dispatch(fetchSuccess(data));
    dispatch(fetchSuccessUnread(data));
  } else {
    dispatch(fetchFailed(message));
  }
};

export const getNotificationAllRead = () => async (dispatch) => {
  dispatch(fetchStart());
  const { success, data, message } = await requestNotificationMarkAllRead();
  if (success) {
    dispatch(fetchSuccess(data));
    dispatch(getNotification());
  } else {
    dispatch(fetchFailed(message));
  }
};

export const getNotificationMarkAsRead = (id) => async (dispatch) => {
  dispatch(fetchStart());
  const { success, data, message } = await requestNotificationMarkAsRead(id);
  if (success) {
    dispatch(fetchSuccess(data));
    dispatch(getNotification());
    dispatch(getNotificationUnread());
  } else {
    dispatch(fetchFailed(message));
  }
};

export const getNotificationById = (rel_type, rel_id) => async (dispatch) => {
  dispatch(fetchStart());
  const { success, data, message } = await requestNotificationById(
    rel_type,
    rel_id
  );
  if (success) {
    dispatch(fetchSuccessByID(data));
  } else {
    dispatch(fetchFailed(message));
  }
};

//read, unread, no param  all
export const getNotificationCount = (query) => async (dispatch) => {
  const { success, data, message } = await requestNotificationCount(query);
  if (success) {
    dispatch(NotificationCountSuccess(data));
  } else {
    dispatch(fetchFailed(message));
  }
};

export default notifications.reducer;
