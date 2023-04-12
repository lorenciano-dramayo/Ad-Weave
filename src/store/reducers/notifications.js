// Redux
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
// Services
import {
  requestNotification,
  requestNotificationRead,
  requestNotificationUnread,
  requestNotificationMarkAsRead,
  requestNotificationMarkAllRead,
  requestNotificationCount,
} from 'services/api/notification';

const initialState = {
  list: [],
  count: {
    all: null,
    read: null,
    unread: null,
  },
  isLoading: false,
  error: null,
};

const notifications = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    initNotification: (state) => {
      state.error = null;
      state.isLoading = true;
    },

    notificationSuccess: (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    },

    notificationCountSuccess: (state, { payload }) => {
      state.count[_.isEmpty(payload?.query) ? 'all' : payload?.query] =
        payload?.data;
    },

    notificationPaginateSuccess: (state, { payload }) => {
      return {
        ...state,
        list: {
          ...state.list,
          data: [...state.list.data, ...payload.data],
          current_page: payload.data.current_page,
          next_page_url: payload.data.next_page_url,
        },
      };
    },

    notificationUpdate: (state, { payload }) => {
      return {
        ...state,
        list: {
          ...state.list,
          data: state.list.data?.map((obj) =>
            obj?.id === payload.data
              ? { ...obj, status: 'read' }
              : { ...obj, status: obj?.status }
          ),
        },
      };
    },

    notificationError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export const {
  initNotification,
  notificationSuccess,
  notificationCountSuccess,
  notificationPaginateSuccess,
  notificationUpdate,
  notificationError,
} = notifications.actions;

export const getNotification = (type) => async (dispatch) => {
  dispatch(initNotification());
  const { success, data, message } = await (type === 'unread'
    ? requestNotificationUnread()
    : type === 'read'
    ? requestNotificationRead()
    : requestNotification());

  if (success) {
    dispatch(notificationSuccess(data));
  } else {
    dispatch(notificationError(message));
  }
};

export const getPaginatedNotifications = (type, page) => async (dispatch) => {
  const { success, data, message } = await (type === 'unread'
    ? requestNotificationUnread(page)
    : type === 'read'
    ? requestNotificationRead(page)
    : requestNotification(page));

  if (success) {
    dispatch(notificationPaginateSuccess(data));
  } else {
    dispatch(notificationError(message));
  }
};

export const getNotificationAllRead = () => async (dispatch) => {
  dispatch(initNotification());
  const { success, data, message } = await requestNotificationMarkAllRead();
  if (success) {
    dispatch(getNotificationCount());
    dispatch(getNotificationCount('unread'));
    dispatch(getNotificationCount('read'));
    dispatch(notificationSuccess(data));
  } else {
    dispatch(notificationError(message));
  }
};

export const setNotificationToRead = (id) => async (dispatch) => {
  const { success, data, message } = await requestNotificationMarkAsRead(id);
  if (success) {
    dispatch(notificationUpdate(id));
    dispatch(getNotificationCount());
    dispatch(getNotificationCount('unread'));
    dispatch(getNotificationCount('read'));
  } else {
    dispatch(notificationError(message));
  }
};

//read, unread, no param  all
export const getNotificationCount = (query) => async (dispatch) => {
  const { success, data, message } = await requestNotificationCount(query);
  if (success) {
    dispatch(notificationCountSuccess({ query, data }));
  } else {
    dispatch(notificationError(message));
  }
};

export default notifications.reducer;
