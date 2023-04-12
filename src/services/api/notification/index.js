import api from 'utils/api';
import _ from 'lodash';

// Task Status

export const requestNotifications = (param) =>
  api.callGet(
    `admin/notification/${(!_.isEmpty(param) || !_.isNull(param)) && param}`
  );

export const requestNotification = (param) =>
  api.callGet(
    _.isEmpty(param) ? 'admin/notification' : `admin/notification?page=${param}`
  );

export const requestNotificationRead = (param) =>
  api.callGet(
    _.isEmpty(param)
      ? 'admin/notification/read-notification'
      : `admin/read-notification?page=${param}`
  );

export const requestNotificationUnread = (param) =>
  api.callGet(
    _.isEmpty(param)
      ? 'admin/notification/unread-notification'
      : `admin/unread-notification?page=${param}`
  );

export const requestNotificationMarkAllRead = () =>
  api.callGet('admin/notification?query=read_all');

export const requestNotificationMarkAsRead = (id) =>
  api.callGet(`admin/notification?id=${id}&query=read`);

export const requestNotificationById = (rel_type, rel_id) =>
  api.callGet(
    `admin/notification/get-data?rel_type=${rel_type}&rel_id=${rel_id}`
  );

export const requestNotificationCount = (query) =>
  api.callGet(`admin/notification/count?q=${query}`);
