import api from 'utils/api';

export const requestDueDateUpdate = (params) =>
  api.callPost('admin/task/update-duedate', params);

export const requestTaskDeliveryDateUpdate = (params) =>
  api.callPost('admin/task/update-delivery-date', params);

export const requestCampaignDeliveryDateUpdate = (params) =>
  api.callPost('admin/campaigns/update-delivery-date', params);

export const requestCampaignLaunchDateUpdate = (params) =>
  api.callPost('admin/campaigns/update-launch-date', params);

export const requestGetOverview = ({ taskId, isSubtask }) =>
  api.callGet(
    [true, 'true'].includes(isSubtask)
      ? `admin/task/task-overview/${taskId}?is_subtask=1`
      : `admin/task/task-overview/${taskId}`
  );

export const requestGetTaskTimelog = (id) =>
  api.callGet(`admin/task-timelog/getbyreltype?rel_id=${id}&rel_type=task`);

export const requestCreateTask = (params) =>
  api.callPostFormData(`admin/task/create`, params);

export const requestMaintenanceDisplay = () => api.callGet('admin/displays');

export const requestUpdateTaskByKey = (params) =>
  api.callPost('admin/task/update-key', params);

export const requestUpdateTask = (params) =>
  api.callPost('admin/concepts/update-status', params);

export const requestGetParentTaskComment = (taskId) =>
  api.callGet(`admin/task-comment/${Number(taskId)}`);

export const requestGetSubtaskComment = (id, type) =>
  api.callGet(
    `admin/task-comment/get-threads?rel_id=${Number(id)}&rel_type=${type}`
  );

export const requestAddTaskComment = (params) =>
  api.callPostFormData(`admin/task-comment/store`, params);

export const requestDeleteTaskComment = (params) =>
  api.callPost(`admin/task-comment/delete-comment`, params);

export const requestEditTaskComment = (params) =>
  api.callPost(`admin/task-comment/edit-comment`, params);

export const requestDeleteCommentAttachment = (params) =>
  api.callPost(`admin/task-comment/delete-attachment`, params);

export const requestChangelogTask = (id) =>
  api.callGet(`admin/change-log/task?id=${id}`);

export const requestChangelogTaskCampaign = (id) =>
  api.callGet(`admin/change-log/campaign?uuid=${id}`);

export const requestTemplates = (id) =>
  api.callGet(`admin/task/template/${id}`);

export const requestTemplateVersions = (id) =>
  api.callGet(`admin/task/template/${id}?version`);

export const requestChangeTemplateVersion = (params) =>
  api.callPost(`admin/task/select-template-version`, params);

export const requestAddThreadStatus = (params) =>
  api.callPost(`admin/task-comment/mark-comment`, params);

export const requestGetRevision = (id, type) =>
  api.callGet(`admin/task-revision/revisions?rel_id=${id}&rel_type=${type}`);

export const requestStartTimer = (params) =>
  api.callPost(`admin/task-timelog/start`, params);

export const requestPlayTimer = (params) =>
  api.callPost(`admin/task-timelog/play`, params);

export const requestPauseTimer = (params) =>
  api.callPost(`admin/task-timelog/pause`, params);

export const requestStopTimer = (params) =>
  api.callPost(`admin/task-timelog/stop`, params);

export const requestAddChecklist = (params) =>
  api.callPost(`admin/task-checklist/store`, params);

export const requestUpdateChecklist = (params) =>
  api.callPost(`admin/task-checklist/update`, params);

export const requestFetchChecklist = (id) =>
  api.callGet(`admin/task-checklist/${id}`);

export const requestCheckedChecklist = (params) =>
  api.callPost(`admin/task-checklist/check`, params);

export const requestUncheckedChecklist = (params) =>
  api.callPost(`admin/task-checklist/uncheck`, params);

export const requestDestroyChecklist = (params) =>
  api.callPost(`admin/task-checklist/delete`, params);

export const requestAddTaskReference = (params) =>
  api.callPost(`admin/task/store-ref-link`, params);

export const requestFetchRevision = (id) =>
  api.callGet(`admin/task-revision/revisions?rel_id=${id}`);

export const requestAddRevision = (params) =>
  api.callPost(`admin/task-revision/store`, params);

export const requestAddRevisionV2 = (params) =>
  api.callPost(`admin/task-revision/store-v2`, params);

export const requestUpdateRevision = (params) =>
  api.callPost(`admin/task-revision/update`, params);

export const requestUpdateRevisionV2 = (params) =>
  api.callPost(`admin/task-revision/revision-update`, params);

export const requestDestroyRevision = (params) =>
  api.callPost(`admin/task-revision/delete`, params);

export const requestResolvedRevision = (params) =>
  api.callPost(`admin/task-revision/mark-resolved`, params);

export const requestResolvedRevisionV2 = (params) =>
  api.callPost(`admin/task-revision/mark-resolved-v2`, params);

export const requestAddRefLink = (params) =>
  api.callPost(`admin/task/store-ref-link`, params);

export const requestDestroyRefLink = (params) =>
  api.callPost(`admin/link/remove-to-task`, params);

export const requestFetchRefLink = (rel_id, rel_type) =>
  api.callGet(`admin/task/get-ref-link?rel_id=${rel_id}&rel_type=${rel_type}`);

export const requestFetchTags = (params) =>
  api.callGet(
    `admin/tags/get-all?rel_id=${params.relId}&rel_type=${params.relType}`
  );

export const requestFetchSubTask = (task_id) =>
  api.callGet(`admin/task/get-subtasks?task_id=${task_id}`);
export const requestDestroySubtask = (id) =>
  api.callPost(`admin/task/delete-subtask?id=${id}`);

export const requestAddTags = (params) =>
  api.callPost('admin/tags/add', params);

export const requestRemoveTags = (params) =>
  api.callPost('admin/tags/remove', params);

export const requestAddFormatDisplay = (params) =>
  api.callPost('admin/displays/add-task-display', params);

export const requestTimelogEndedStarted = (params) =>
  api.callPost('/admin/task-timelog/update-timelog', params);

export const requestRemoveFormatDisplay = (params) =>
  api.callPost('admin/displays/delete-task-displays', params);

export const requestFetchTriggers = (params) =>
  api.callGet(
    `admin/triggers/get-all?task_id=${params.taskId}&is_parent=${params.isParent}`
  );

export const requestFetchDisplayMD = (params) =>
  api.callGet(
    `admin/task/display-option?rel_id=${params.taskId}&rel_type=3&type=${params.type}`
  );
// {{url}}/v2/admin/task/display-option?rel_id=1&rel_type=3&type=desktop
export const requestAddTriggers = (params) =>
  api.callPost('admin/triggers/add-task-trigger', params);

export const requestRemoveTriggers = (params) =>
  api.callPost('admin/triggers/delete-task-triggers', params);

export const requestAddSubtask = (params) =>
  api.callPost('admin/task/store-subtask', params);

export const requestFetchFiles = (params) =>
  api.callGet(
    `admin/task/attachments?rel_id=${params.relId}&rel_type=${params.relType}`
  );

export const requestFetchRevisionList = (rel_id, page, limit) =>
  api.callGet(
    `admin/task-revision/revision-tab?rel_id=${rel_id}&page=${page}&limit=${limit}`
  );

export const requestDeleteRevision = (params) =>
  api.callPost(`admin/task-revision/delete`, params);

export const requestChecklistRevision = (params) =>
  api.callPost(`admin/task-revision/add-to-checklist`, params);

export const requestAddSubtaskRevision = (params) =>
  api.callPost(`admin/task-revision/add-subtask`, params);

export const requestTasksCompleted = (params) =>
  api.callGet(`admin/dashboard/task-completed?team_id=${params.teamId}`);
