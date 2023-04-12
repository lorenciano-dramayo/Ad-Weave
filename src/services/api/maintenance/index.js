import api from 'utils/api';
import _ from 'lodash';

// Task Status
export const requestMaintenanceTaskStatus = (params) =>
  api.callGet(`admin/task-status${_.isEmpty(params) ? '?limit=20' : params}`);

export const requestMaintenanceTaskStatusPost = (params) =>
  api.callPost('admin/task-status/store', params);

export const requestMaintenanceTaskStatusPut = (params) =>
  api.callPost('admin/task-status/update', params);

export const requestMaintenanceTaskStatusDelete = (params) =>
  api.callPost('admin/task-status/delete', params);

// Task Type
export const requestMaintenanceTaskType = (params) =>
  api.callGet(`admin/task-type${_.isEmpty(params) ? '?limit=20' : params}`);

export const requestMaintenanceTaskTypePost = (params) =>
  api.callPost('admin/task-type/store', params);

export const requestMaintenanceTaskTypePut = (params) =>
  api.callPost('admin/task-type/update', params);

export const requestMaintenanceTaskTypeDelete = (params) =>
  api.callPost('admin/task-type/delete', params);

// Task Category
export const requestMaintenanceTaskCategory = (params) =>
  api.callGet(`admin/task-category${_.isEmpty(params) ? '?limit=20' : params}`);

export const requestMaintenanceTaskCategoryPost = (params) =>
  api.callPost('admin/task-category/store', params);

export const requestMaintenanceTaskCategoryPut = (params) =>
  api.callPost('admin/task-category/update', params);

export const requestMaintenanceTaskCategoryDelete = (params) =>
  api.callPost('admin/task-category/delete', params);

// Teams
export const requestMaintenanceTeams = (params) =>
  api.callGet(`admin/teams${_.isEmpty(params) ? '?limit=20' : params}`);

export const requestMaintenanceCreateTeam = (params) =>
  api.callPost('admin/teams/store', params);

// Task Preset
export const requestMaintenanceTaskPreset = (params) =>
  api.callGet(`admin/task-preset${params}`);

export const requestMaintenanceCreateTaskPreset = (params) =>
  api.callPost('admin/task-preset/store', params);

export const requestMaintenanceTaskTypePreset = (params) =>
  api.callGet(
    `admin/task-type/preset${_.isEmpty(params) ? '?limit=20' : params}`
  );

// User
export const requestMaintenanceUser = (params) =>
  api.callGet(`admin/user${_.isEmpty(params) ? '?limit=20' : params}`);
export const requestSearchUser = (params) =>
  api.callPost(`admin/search/user`, params);

// Triggers
export const requestMaintenanceTrigger = (params) =>
  api.callGet(`admin/triggers${_.isEmpty(params) ? '?limit=20' : params}`);

export const requestMaintenanceTriggerPost = (params) =>
  api.callPost('admin/triggers/store', params);

export const requestMaintenanceTriggerPut = (params) =>
  api.callPost('admin/triggers/update', params);

export const requestMaintenanceTriggerDelete = (params) =>
  api.callPost('admin/triggers/delete', params);

// priority list
export const requestPriorityFlag = () => api.callGet('admin/priority-flag');
