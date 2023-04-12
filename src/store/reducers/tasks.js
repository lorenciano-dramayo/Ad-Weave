// Redux
import { createSlice } from '@reduxjs/toolkit';
// Services
import {
  requestDueDateUpdate,
  requestTaskDeliveryDateUpdate,
  requestCampaignDeliveryDateUpdate,
  requestCampaignLaunchDateUpdate,
  requestGetOverview,
  requestUpdateTaskByKey,
  requestUpdateTask,
  requestGetParentTaskComment,
  requestGetSubtaskComment,
  requestAddTaskComment,
  requestEditTaskComment,
  requestGetTaskTimelog,
  requestDeleteTaskComment,
  requestDeleteCommentAttachment,
  requestChangelogTask,
  requestAddThreadStatus,
  requestStartTimer,
  requestPlayTimer,
  requestPauseTimer,
  requestStopTimer,
  requestGetRevision,
  requestTemplates,
  requestAddTaskReference,
  requestFetchChecklist,
  requestAddChecklist,
  requestDestroyChecklist,
  requestCheckedChecklist,
  requestUncheckedChecklist,
  requestUpdateChecklist,
  requestFetchRevision,
  requestAddRevision,
  requestAddRevisionV2,
  requestUpdateRevisionV2,
  requestDestroyRevision,
  requestResolvedRevisionV2,
  requestFetchRefLink,
  requestDestroyRefLink,
  requestAddRefLink,
  requestFetchTags,
  requestAddTags,
  requestAddFormatDisplay,
  requestTimelogEndedStarted,
  requestRemoveFormatDisplay,
  requestRemoveTags,
  requestFetchTriggers,
  requestFetchDisplayMD,
  requestAddTriggers,
  requestRemoveTriggers,
  requestAddSubtask,
  requestFetchFiles,
  requestFetchSubTask,
  requestChangelogTaskCampaign,
  requestFetchRevisionList,
  requestDeleteRevision,
  requestAddSubtaskRevision,
  requestChecklistRevision,
  requestChangeTemplateVersion,
  requestDestroySubtask,
} from 'services/api/tasks';

import {
  requestPriorityFlag,
  requestMaintenanceUser,
  requestMaintenanceTaskStatus,
} from 'services/api/maintenance';

import { fetchReferenceLink } from 'services/api/campaign';
import _ from 'lodash';

const initialState = {
  isLoading: false,
  isLoadingOverview: false,
  isLoadingTemplate: false,
  isLoadingTimelog: false,
  isLoadingRevisions: false,
  isLoadingActivityLog: false,
  error: null,
  data_check: [],
  data_revision: [],
  data_revision_tab: [],
  data_reference: [],
  data_revision_subtask: [],
  data_subtask: [],
  data_subtask_modal: [],
  data_reference_campaign: [],
  data_reference_campaign_delete: [],
  overview: {},
  timelog: [],
  activityLog: [],
  comments: {
    task: [],
    subtask: [],
  },
  task_subtask: [],
  creatives: {},
  checkListCheck: [],
  revisionResolved: [],
  timelogEndedStarted: [],
  options: {
    priorityList: [],
    usersList: [],
    statusList: [],
    tagsList: [],
    triggersList: [],
    desktopDisplayList: [],
    mobileDisplayList: [],
    isFetching: false,
  },
  files: [],
};

const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    initTask: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    initOverview: (state) => {
      state.isLoadingOverview = true;
      state.error = null;
    },
    initTemplate: (state) => {
      state.isLoadingTemplate = true;
      state.error = null;
    },
    initTimelog: (state) => {
      state.isLoadingTimelog = true;
      state.error = null;
    },
    initRevisions: (state) => {
      state.isLoadingRevisions = true;
      state.error = null;
    },
    initActivityLog: (state) => {
      state.isLoadingActivityLog = true;
      state.error = null;
    },
    initOptions: (state) => {
      state.options.isFetching = true;
      state.error = null;
    },
    initFiles: (state) => {
      state.error = null;
    },
    errorTask: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    validateTask: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    successTaskOverview: (state, { payload }) => {
      state.overview = payload;
      state.task_subtask = payload.sub_categories;
      state.isLoadingOverview = false;
      state.error = null;
    },
    successTaskTimelog: (state, { payload }) => {
      state.timelog = payload;
      state.isLoadingTimelog = false;
      state.error = null;
    },
    successPriorityList: (state, { payload }) => {
      state.options.priorityList = payload;
      state.options.isFetching = false;
    },
    successUsersList: (state, { payload }) => {
      state.options.usersList = payload.data;
      state.options.isFetching = false;
    },
    successStatusList: (state, { payload }) => {
      state.options.statusList = payload.data;
      state.options.isFetching = false;
    },
    successChecklistList: (state, { payload }) => {
      state.data_check = payload;
      state.isLoading = false;
    },
    successRevisionList: (state, { payload }) => {
      state.data_revision = payload.data;
      state.isLoading = false;
    },
    successRevisionListTab: (state, { payload }) => {
      state.data_revision_tab = payload.data;
      state.isLoading = false;
    },
    successRevisionAddSubtask: (state, { payload }) => {
      state.data_revision_subtask = payload.data;
      state.isLoading = false;
    },
    successRefLinkList: (state, { payload }) => {
      state.data_reference = _.isArray(payload) ? payload : [payload]; // Added temp safety. API returns an object instead of array after adding the first item.
      state.isLoading = false;
    },
    successRefLinkListCampaign: (state, { payload }) => {
      state.data_reference_campaign = payload.data;
      state.isLoading = false;
    },
    successRefLinkListCampaignDelete: (state, { payload }) => {
      state.data_reference_campaign_delete = payload;
      state.isLoading = false;
    },
    successFilesList: (state, { payload }) => {
      state.files = payload;
    },
    // successSubtask: (state, { payload }) => {
    //   state.data_subtask = payload;
    //   state.isLoading = false;
    // },
    successSubtask: (state, { payload }) => {
      state.task_subtask = payload;
      state.isLoading = false;
    },

    successSubtaskDelete: (state, { payload }) => {
      state.data_subtask_modal = payload;
      state.task_subtask = payload;
      state.isLoading = false;
    },

    successAddSubtask: (state, { payload }) => {
      state.data_subtask_modal = payload;
      state.task_subtask = [...state.task_subtask, payload];
      state.isLoading = false;
    },

    // successSubtask: (state, { payload }) => {
    //   return { ...state, data_subtask: { ...state.data_subtask, ...payload } };
    // },
    successTagsList: (state, { payload }) => {
      state.options.tagsList = payload;
    },
    successDesktopDisplayList: (state, { payload }) => {
      state.options.desktopDisplayList = payload;
    },
    successTimelogStartEnded: (state, { payload }) => {
      state.options.timelogEndedStarted = payload;
    },
    successMobileDisplayList: (state, { payload }) => {
      state.options.mobileDisplayList = payload;
    },
    successTriggersList: (state, { payload }) => {
      state.options.triggersList = payload;
    },
    successUpdateByKey: (state, { payload }) => {
      return payload.isParent || _.isUndefined(state.task_subtask) // Task & Subtask key modal update
        ? { ...state, overview: { ...state.overview, ...payload.data } }
        : {
            ...state,
            task_subtask: state.task_subtask?.map((subTask) =>
              subTask.id === payload.id
                ? { ...subTask, ...payload.data }
                : subTask
            ),
          }; // Subtask key update inside task modal
    },
    successUpdateTags: (state, { payload }) => {
      return {
        ...state,
        overview: {
          ...state.overview,
          tags: payload.filter((tag) => tag.is_selected),
        },
        options: {
          ...state.options,
          tagsList: [...payload],
        },
      };
    },
    successUpdateDesktopDisplays: (state, { payload }) => {
      return {
        ...state,
        overview: {
          ...state.overview,
          desktop_displays: payload.filter(
            (desktop_display) => desktop_display.is_selected
          ),
        },
        options: {
          ...state.options,
          desktopDisplayList: [...payload],
        },
      };
    },
    successUpdateMobileDisplays: (state, { payload }) => {
      return {
        ...state,
        overview: {
          ...state.overview,
          mobile_displays: payload.filter(
            (mobile_display) => mobile_display.is_selected
          ),
        },
        options: {
          ...state.options,
          mobileDisplayList: [...payload],
        },
      };
    },
    successUpdateTriggers: (state, { payload }) => {
      return {
        ...state,
        overview: {
          ...state.overview,
          triggers: payload.filter((tag) => tag.is_selected),
        },
        options: {
          ...state.options,
          triggersList: [...payload],
        },
      };
    },
    successCommentList: (state, { payload }) => {
      let { type, data } = payload;
      state.comments.task = type === 'task_comment' ? data.task[0] : {};
      state.comments.subtask = type === 'task_comment' ? data.subtask : data;
      state.isLoading = false;
    },
    successTemplates: (state, { payload }) => {
      state.creatives = payload;
      state.isLoadingTemplate = false;
      state.error = null;
    },
    successChecklistCheck: (state, { payload }) => {
      state.checkListCheck = payload;
      state.isLoading = false;
    },
    successRevisionResolved: (state, { payload }) => {
      state.revisionResolved = payload;
      state.isLoading = false;
    },
    successThread: (
      state,
      { payload: { relId, commentRelType, data, isTask } }
    ) => {
      return isTask && commentRelType === 'subtask' // Adding subtask's thread from task modal
        ? {
            ...state,
            comments: {
              ...state.comments,
              subtask: state.comments.subtask.map((subtask) =>
                subtask.subtask_id == relId
                  ? {
                      ...subtask,
                      comments: [...subtask.comments, data],
                    }
                  : subtask
              ),
            },
          }
        : commentRelType === 'task' // Task
        ? {
            ...state,
            comments: {
              ...state.comments,
              task: {
                ...state.comments.task,
                comments:
                  // Checks if a thread is being created
                  state.comments.task.task_id === relId
                    ? [...state.comments.task.comments, data]
                    : state.comments.task.comments.map((comment) =>
                        comment.id == relId
                          ? {
                              ...data,
                              comment: comment.comment,
                            }
                          : comment
                      ),
              },
            },
          }
        : commentRelType === 'subtask' // Subtask
        ? {
            ...state,
            comments: {
              ...state.comments,
              subtask: [...state.comments.subtask, data],
            },
          }
        : {};
    },
    successComment: (
      state,
      { payload: { data, commentRelType, commentId, relId, isTask } }
    ) => {
      return isTask && commentRelType === 'subtask' // Adding subtask's comment from task modal
        ? {
            ...state,
            comments: {
              ...state.comments,
              subtask: state.comments.subtask.map((subtask) =>
                subtask.subtask_id === relId
                  ? {
                      ...subtask,
                      comments: subtask.comments.map((thread) =>
                        thread.id === commentId
                          ? { ...thread, comment: data }
                          : thread
                      ),
                    }
                  : subtask
              ),
            },
          }
        : commentRelType === 'task' // Task
        ? {
            ...state,
            comments: {
              ...state.comments,
              task: {
                ...state.comments.task,
                comments: state.comments.task.comments.map((comment) =>
                  comment.id === commentId
                    ? { ...comment, comment: data }
                    : comment
                ),
              },
            },
          }
        : commentRelType === 'subtask' // Subtask
        ? {
            ...state,
            comments: {
              ...state.comments,
              subtask: state.comments.subtask.map((comment) =>
                comment.id === commentId
                  ? { ...comment, comment: data }
                  : comment
              ),
            },
          }
        : {};
    },
    successThreadCommentEdit: (
      state,
      { payload: { commentId, commentRelType, data } }
    ) => {
      return commentRelType === 'task'
        ? {
            ...state,
            comments: {
              ...state.comments,
              task: {
                ...state.comments.task,
                comments: state.comments.task.comments.map((comment) =>
                  comment.id === commentId
                    ? { ...comment, comment: data }
                    : comment
                ),
              },
            },
          }
        : {
            ...state,
            comments: {
              ...state.comments,
              subtask: state.comments.subtask.map((subtask) => ({
                ...subtask,
                comments: subtask.comments.map((comment) =>
                  comment.id === commentId
                    ? { ...comment, comment: data }
                    : comment
                ),
              })),
            },
          };
    },
    successCommentDelete: (state, { payload }) => {
      return {
        ...state,
        comments: {
          ...state.comments,
          task: {
            ...state.comments.task,
            comments: state.comments.task.comments.map((data) => ({
              ...data,
              comment: data.comment.filter((c) => c.id !== payload.params.id),
            })),
          },
        },
      };
    },
    successMarkThread: (state, { payload }) => {
      return {
        ...state,
        comments: {
          ...state.comments,
          task: {
            ...state.comments.task,
            comments: state.comments.task.comments.map((data) =>
              data.id === payload.params.comment_id
                ? { ...data, status: payload.data }
                : data
            ),
          },
        },
      };
    },
    successActivityLog: (state, { payload }) => {
      state.activityLog = payload.data;
      state.isLoadingActivityLog = false;
      state.error = null;
    },

    successActivityLogCampaign: (state, { payload }) => {
      state.activityLogCampaign = payload.data;
      state.isLoadingActivityLog = false;
      state.error = null;
    },

    successRevisions: (state) => {
      state.isLoadingRevisions = false;
      state.error = null;
    },
    successUpdateTimer: (state) => {
      state.error = null;
    },
    successUpdateSubtaskTImer: (state, { payload }) => {
      return {
        ...state,
        task_subtask: state.task_subtask.map((data) =>
          data.id === payload.id
            ? {
                ...data,
                current_timelog:
                  payload.data.status.toLowerCase() === 'stop'
                    ? null
                    : payload.data,
              }
            : data
        ),
      };
    },
    reset: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isLoading = false;
      state.error = null;
      state.overview = {};
      state.comments.task = [];
      state.comments.subtask = [];
      state.options.priorityList = [];
      state.options.usersList = [];
      state.options.statusList = [];
      state.options.isFetching = false;
    },
  },
});

export const {
  initTask,
  initOverview,
  initTemplate,
  initTimelog,
  initRevisions,
  initActivityLog,
  initOptions,
  initFiles,
  errorTask,
  validateTask,
  successTaskOverview,
  successTaskTimelog,
  successTemplates,
  successActivityLog,
  successActivityLogCampaign,
  successPriorityList,
  successUsersList,
  successStatusList,
  successChecklistList,
  successUpdateByKey,
  successAddSubtask,
  successSubtaskDelete,
  successRefLinkListCampaign,
  successRefLinkListCampaignDelete,
  successUpdateTags,
  successUpdateTriggers,
  successUpdateMobileDisplays,
  successUpdateDesktopDisplays,
  successCommentList,
  successComment,
  successCommentDelete,
  successMarkThread,
  successThread,
  successThreadEdit,
  successThreadCommentEdit,
  successRevisions,
  successUpdateTimer,
  successUpdateSubtaskTImer,
  successChecklistCheck,
  successRevisionList,
  successRevisionResolved,
  successRefLinkList,
  successSubtask,
  successTagsList,
  successMobileDisplayList,
  successDesktopDisplayList,
  successTriggersList,
  successFilesList,
  successRevisionListTab,
  successRevisionAddSubtask,
  successTimelogStartEnded,
  reset,
} = tasks.actions;

export const getData = (type, params) => async (dispatch) => {
  dispatch(initOptions);

  const { success, data, message } = await requestData(type, params);

  success ? dispatch(setData(type, data)) : dispatch(errorTask(message));
};

export const taskTemplates = (id) => async (dispatch) => {
  dispatch(initTemplate());
  const { success, data, message } = await requestTemplates(id);
  if (success) {
    dispatch(successTemplates(data));
  } else {
    dispatch(errorTask(message));
  }
};

export const taskReference = (params) => async (dispatch) => {
  // dispatch

  const { success, data, message } = await requestAddTaskReference(params);

  if (success) {
    dispatch(successTemplates(data));
  } else {
    dispatch(errorTask(message));
  }
};

export const requestChangeTemplateVersion_ = (body) => async (dispatch) => {
  // dispatch(initTemplate());

  const { success, data, message } = await requestChangeTemplateVersion(body);

  if (success) {
    dispatch(successTemplates(data));
    dispatch(taskTemplates(body.rel_id));
  } else {
    dispatch(errorTask(message));
  }
};

export const taskComment = (type, params) => async (dispatch) => {
  // dispatch(initOverview());
  const { success, data, message } = await getComment(type, params);
  if (success) {
    dispatch(successCommentList({ type, data }));
  } else {
    dispatch(errorTask(message));
  }
};
// ttps://stg-api.ad-weave.io/v2/admin/task-comment/get-threads?rel_id=82&rel_type=subtask
export const threadComment = (type, params, isTask) => async (dispatch) => {
  const { success, data, message } = await setThread(type, params);
  if (success) {
    switch (type) {
      case 'add_thread':
        console.log('rel_id: ', Number(params.get('rel_id')));
        console.log('rel_type: ', params.get('rel_type'));
        console.log('isTask: ', isTask);

        dispatch(
          successThread({
            relId: Number(params.get('rel_id')),
            commentRelType: params.get('rel_type'),
            data,
            isTask,
          })
        );

        break;
      case 'edit_thread':
        dispatch(
          successThread({
            relId: Number(params.get('id')),
            commentRelType: params.get('rel_type'),
            data,
          })
        );
        if (params.get('rel_type') == 'subtask') {
          dispatch(
            taskComment('subtask_comment', {
              taskId: Number(params.get('rel_id')),
            })
          );
        }

        break;

      case 'add_thread_comment':
        dispatch(
          successComment({
            data,
            commentId: Number(params.get('comment_id')),
            commentRelType: params.get('rel_type'),
            relId: Number(params.get('rel_id')),
            isTask,
          })
        );

        // if (params.get('rel_type') == 'subtask' && isTask) {
        //   dispatch(
        //     taskComment('subtask_comment', {
        //       taskId: Number(params.get('rel_id')),
        //     })
        //   );
        // }

        break;
      case 'edit_thread_comment':
        dispatch(
          successThreadCommentEdit({
            commentId: Number(params.get('rel_id')),
            commentRelType: params.get('rel_type'),
            data,
          })
        );
        break;
      case 'thread_delete':
        dispatch(taskComment('task_comment', { taskId: params.taskId }));
        break;
      case 'comment_delete':
        dispatch(successCommentDelete({ data, params }));
        break;
      case 'thread_resolve':
      case 'thread_reject':
        dispatch(successMarkThread({ data, params }));
        break;
    }
  } else {
    dispatch(errorTask(message));
  }
};

export const updateTaskDuedate = (body) => async (dispatch) => {
  dispatch(initTask());
  const { success, message } = await requestDueDateUpdate(body);

  if (success) {
    dispatch(validateTask());
  } else {
    dispatch(errorTask(message));
  }
};

export const updateTaskDeliveryDate = (body) => async (dispatch) => {
  dispatch(initTask());
  const { success, message } = await requestTaskDeliveryDateUpdate(body);

  if (success) {
    dispatch(validateTask());
  } else {
    dispatch(errorTask(message));
  }
};

export const updateCampaignDeliveryDate = (body) => async (dispatch) => {
  dispatch(initTask());
  const { success, message } = await requestCampaignDeliveryDateUpdate(body);

  if (success) {
    dispatch(validateTask());
  } else {
    dispatch(errorTask(message));
  }
};

export const updateCampaignLaunchDate = (body) => async (dispatch) => {
  dispatch(initTask());
  const { success, message } = await requestCampaignLaunchDateUpdate(body);

  if (success) {
    dispatch(validateTask());
  } else {
    dispatch(errorTask(message));
  }
};

export const getTaskByid = (params) => async (dispatch) => {
  dispatch(initOverview());
  const { success, data, message } = await requestGetOverview(params);
  if (success) {
    dispatch(successTaskOverview(data));
  } else {
    dispatch(errorTask(message));
  }
};

export const getTaskTimelogById = (id) => async (dispatch) => {
  dispatch(initTimelog());
  const { success, data, message } = await requestGetTaskTimelog(id);
  if (success) {
    dispatch(successTaskTimelog(data));
  } else {
    dispatch(errorTask(message));
  }
};

export const getTaskActivityLog = (id) => async (dispatch) => {
  dispatch(initActivityLog());

  const { success, data, message } = await requestChangelogTask(id);

  if (success) {
    dispatch(successActivityLog(data));
  } else {
    dispatch(errorTask(message));
  }
};

export const getTaskActivityLogCampaign = (id) => async (dispatch) => {
  dispatch(initActivityLog());

  const { success, data, message } = await requestChangelogTaskCampaign(id);

  if (success) {
    dispatch(successActivityLogCampaign(data));
  } else {
    dispatch(errorTask(message));
  }
};

export const getTaskRevisions = (params) => async (dispatch) => {
  dispatch(initRevisions());

  const { success, data, message } = await requestGetRevision(
    params.id,
    params.type
  );

  if (success) {
    dispatch(successRevisions(data));
  } else {
    dispatch(errorTask(message));
  }
};

export const getTaskFiles = (params) => async (dispatch) => {
  dispatch(initFiles());
  const { success, data, message } = await requestFetchFiles(params);
  if (success) {
    dispatch(successFilesList(data));
  } else {
    dispatch(errorTask(message));
  }
};

export const updateTaskByKey = (params) => async (dispatch) => {
  const { success, data, message } = await requestUpdateTaskByKey(params);

  success
    ? dispatch(updateData(params.key, data))
    : dispatch(errorTask(message));
};

export const updateTags = (params) => async (dispatch) => {
  const { success, data, message } =
    params.action == 'add'
      ? await requestAddTags(params)
      : await requestRemoveTags(params);

  success ? dispatch(successUpdateTags(data)) : dispatch(errorTask(message));
};

// export const updateMobileDisplays = (params) => async (dispatch) => {
//   const { success, data, message } =
//     params.action == 'add'
//       ? await requestAddFormatDisplay(params)
//       : await requestRemoveFormatDisplay(params);

//   success
//     ? dispatch(successUpdateMobileDisplays(data))
//     : dispatch(errorTask(message));
// };

export const updateDesktopDisplays = (params) => async (dispatch) => {
  const { success, data, message } = await requestAddFormatDisplay(params);

  success
    ? dispatch(successDesktopDisplayList(data))
    : dispatch(errorTask(message));
};

export const updateTimelogEnded = (params) => async (dispatch) => {
  var item_ended = [];
  item_ended.push({
    timeline_id: params.timeline_id,
    time_out: params.time_out,
  });

  dispatch(initTimelog());
  const { success, data, message } = await requestTimelogEndedStarted(
    item_ended[0]
  );
  if (success) {
    dispatch(getTaskTimelogById(params.task_id));
    dispatch(successTimelogStartEnded(data));
  } else {
    dispatch(errorTask(message));
  }
};

export const updateTimelogStart = (params) => async (dispatch) => {
  var item_ended = [];
  item_ended.push({
    timeline_id: params.timeline_id,
    time_in: params.time_in,
  });

  dispatch(initTimelog());
  const { success, data, message } = await requestTimelogEndedStarted(
    item_ended[0]
  );
  if (success) {
    dispatch(getTaskTimelogById(params.task_id));
    dispatch(successTimelogStartEnded(data));
  } else {
    dispatch(errorTask(message));
  }
};

export const updateDesktopDisplaysRemove = (params) => async (dispatch) => {
  const { success, data, message } = await requestRemoveFormatDisplay(params);

  success
    ? dispatch(successDesktopDisplayList(data))
    : dispatch(errorTask(message));
};

export const updateMobileDisplays = (params) => async (dispatch) => {
  const { success, data, message } = await requestAddFormatDisplay(params);

  success
    ? dispatch(successMobileDisplayList(data))
    : dispatch(errorTask(message));
};

export const updateMobileDisplaysRemove = (params) => async (dispatch) => {
  const { success, data, message } = await requestRemoveFormatDisplay(params);

  success
    ? dispatch(successMobileDisplayList(data))
    : dispatch(errorTask(message));
};

export const updateTriggers = (params) => async (dispatch) => {
  const { success, data, message } =
    params.action == 'add'
      ? await requestAddTriggers(params)
      : await requestRemoveTriggers(params);

  success
    ? dispatch(successUpdateTriggers(data))
    : dispatch(errorTask(message));
};

export const updateTaskModal = (params) => async (dispatch) => {
  const { success, data, message } = await requestUpdateTask(params);

  success ? dispatch(updateTaskCampaign(data)) : dispatch(errorTask(message));
};

export const deleteCommentAttachment = (params) => async () =>
  await requestDeleteCommentAttachment(params);

export default tasks.reducer;

const requestData = (type, params) => {
  switch (type) {
    case 'priority_flag':
      return requestPriorityFlag();
    case 'users':
      return requestMaintenanceUser('?limit=1000');
    case 'status':
      return requestMaintenanceTaskStatus('?limit=1000');
    case 'tags':
      return requestFetchTags(params);
    case 'triggers':
      return requestFetchTriggers(params);
    case 'mobile_displays':
      return requestFetchDisplayMD(params);
    case 'desktop_displays':
      return requestFetchDisplayMD(params);
  }
};

const setData = (type, data) => {
  switch (type) {
    case 'priority_flag':
      return successPriorityList(data);
    case 'users':
      return successUsersList(data);
    case 'status':
      return successStatusList(data);
    case 'tags':
      return successTagsList(data);
    case 'mobile_displays':
      return successMobileDisplayList(data);
    case 'desktop_displays':
      return successDesktopDisplayList(data);
    case 'triggers':
      return successTriggersList(data);
    case 'activity-log':
    //return;
  }
};

const updateTaskCampaign = (data) => {
  return successUpdateByKey({
    id: data.id,
    status: data.status,
    type: data.type,
  });
};

const updateData = (type, data) => {
  switch (type) {
    case 'status':
      return successUpdateByKey({
        id: data.id,
        isParent: data.is_parent,
        data: {
          status: data.status,
          status_id: data.status_id,
          assignees: data.assignees ?? [],
        },
      });

    case 'priority':
      return successUpdateByKey({
        id: data.id,
        isParent: data.is_parent,
        data: {
          priority_description: data.priority_description,
          priority_id: data.priority_id,
        },
      });

    case 'assignees':
      return successUpdateByKey({
        id: data.id,
        isParent: data.is_parent,
        data: { assignees: data.assignees },
      });

    case 'watcher':
      return successUpdateByKey({
        id: data.id,
        isParent: data.is_parent,
        data: { watcher: data.watcher },
      });

    case 'due_date':
      return successUpdateByKey({
        id: data.id,
        isParent: data.is_parent,
        data: { due_date: data.due_date },
      });

    case 'delivery_date':
      return successUpdateByKey({
        id: data.id,
        isParent: data.is_parent,
        data: { delivery_date: data.delivery_date },
      });
    case 'pin':
      return successUpdateByKey({
        id: data.id,
        isParent: data.is_parent,
        data: { is_pinned: data.is_pinned },
      });
  }
};

const getComment = (type, data) => {
  switch (type) {
    case 'task_comment':
      return requestGetParentTaskComment(data.taskId);
    case 'subtask_comment':
      return requestGetSubtaskComment(data.taskId, 'subtask');
  }
};

const setThread = (type, data) => {
  switch (type) {
    case 'add_thread':
    case 'add_thread_comment':
      return requestAddTaskComment(data);
    case 'edit_thread':
    case 'edit_thread_comment':
      return requestEditTaskComment(data);
    case 'thread_delete':
    case 'comment_delete':
      return requestDeleteTaskComment(data);
    case 'thread_resolve':
    case 'thread_reject':
      return requestAddThreadStatus(data);
    case 'delete_attachment':
      return requestDeleteCommentAttachment(data);
  }
};

export const startTimer = (id, params) => async (dispatch) => {
  const { success, data, message } = await requestStartTimer(params);

  if (success) {
    const isTask = data?.rel_type === 'task';
    const isTaskNotYetStarted =
      (params.status?.toLowerCase() ?? '') === 'not_started';

    if (isTask) {
      dispatch(successUpdateTimer());
      dispatch(getTaskTimelogById(id));
    } else {
      dispatch(successUpdateSubtaskTImer({ data, id }));
    }

    if (isTaskNotYetStarted) {
      dispatch(
        updateTaskByKey({
          is_parent: isTask ? 1 : 0,
          key: 'status',
          id: data?.rel_id, // Task id
          value: 19, // Status id
        })
      );
    }
  } else {
    dispatch(errorTask(message));
  }
};

export const playTimer = (id, params) => async (dispatch) => {
  const { success, data, message } = await requestPlayTimer(params);

  if (success) {
    if (data?.rel_type === 'task') {
      dispatch(successUpdateTimer());
      dispatch(getTaskTimelogById(id));
    } else {
      dispatch(successUpdateSubtaskTImer({ data, id }));
    }
  } else {
    dispatch(errorTask(message));
  }
};

export const pauseTimer = (id, params) => async (dispatch) => {
  const { success, data, message } = await requestPauseTimer(params);

  if (success) {
    if (data?.rel_type === 'task') {
      dispatch(successUpdateTimer());
      dispatch(getTaskTimelogById(id));
    } else {
      dispatch(successUpdateSubtaskTImer({ data, id }));
    }
  } else {
    dispatch(errorTask(message));
  }
};

export const stopTimer = (id, params) => async (dispatch) => {
  const { success, data, message } = await requestStopTimer(params);

  if (success) {
    if (data?.rel_type === 'task') {
      dispatch(successUpdateTimer());
      dispatch(getTaskTimelogById(id));
    } else {
      dispatch(successUpdateSubtaskTImer({ data, id }));
    }
  } else {
    dispatch(errorTask(message));
  }
};

export const requestFetchChecklist_ = (id) => async (dispatch) => {
  dispatch(initTask());

  const { success, data, message } = await requestFetchChecklist(id);

  if (success) {
    dispatch(successChecklistList(data));
  } else {
    dispatch(errorTask(message));
  }
};

export const requestAddChecklist_ = (body) => async (dispatch) => {
  dispatch(initTask());

  const { success, data, message } = await requestAddChecklist(body);

  if (success) {
    dispatch(successChecklistList(data));
    dispatch(requestFetchChecklist_(body.task_id));
  } else {
    dispatch(errorTask(message));
  }
};

export const requestUpdateChecklist_ = (body) => async (dispatch) => {
  dispatch(initTask());

  const { success, data, message } = await requestUpdateChecklist(body);

  if (success) {
    dispatch(successChecklistList(data));
    dispatch(requestFetchChecklist_(body.task_id));
  } else {
    dispatch(errorTask(message));
  }
};

export const requestDestroyChecklist_ = (body) => async (dispatch) => {
  dispatch(initTask());
  const { success, data, message } = await requestDestroyChecklist(body);

  if (success) {
    dispatch(successChecklistList(data));
    dispatch(requestFetchChecklist_(body.task_id));
  } else {
    dispatch(errorTask(message));
  }
};

export const requestCheckedChecklist_ = (body) => async (dispatch) => {
  dispatch(initTask());

  const { success, message } = await requestCheckedChecklist(body);

  if (success) {
    dispatch(successChecklistCheck(success));
    dispatch(requestFetchChecklist_(body.task_id));
  } else {
    dispatch(errorTask(message));
  }
};

export const requestUncheckedChecklist_ = (body) => async (dispatch) => {
  dispatch(initTask());

  const { success, message } = await requestUncheckedChecklist(body);

  if (success) {
    dispatch(successChecklistCheck(success));
    dispatch(requestFetchChecklist_(body.task_id));
  } else {
    dispatch(errorTask(message));
  }
};

export const requestDestroyRefLink_ = (body) => async (dispatch) => {
  dispatch(initTask());
  const { success, data, message } = await requestDestroyRefLink(body);

  if (success) {
    dispatch(successRefLinkList(data));
    dispatch(requestFetchRefLink_(body.rel_id));
  } else {
    dispatch(errorTask(message));
  }
};

export const requestAddRefLink_ = (body) => async (dispatch) => {
  dispatch(initTask());

  const { success, data, message } = await requestAddRefLink(body);

  if (success) {
    dispatch(successRefLinkList(data));
    dispatch(requestFetchRefLink_(body.rel_id));
  } else {
    dispatch(errorTask(message));
  }
};

export const requestFetchRefLink_ = (id) => async (dispatch) => {
  dispatch(initTask());

  const { success, data, message } = await requestFetchRefLink(id, '3');

  if (success) {
    dispatch(successRefLinkList(data));
  } else {
    dispatch(errorTask(message));
  }
};

export const requestAddRefLinkCampaign_ = (body) => async (dispatch) => {
  dispatch(initTask());

  const { success, data, message } = await requestAddRefLink(body);

  if (success) {
    dispatch(successRefLinkListCampaign(data));
    dispatch(fetchReferenceLinkCampaign_(body.rel_id));
  } else {
    dispatch(errorTask(message));
  }
};

export const fetchReferenceLinkCampaign_ = (id) => async (dispatch) => {
  dispatch(initTask());

  const { success, data, message } = await fetchReferenceLink(id);

  if (success) {
    dispatch(successRefLinkListCampaign(data));
  } else {
    dispatch(errorTask(message));
  }
};

export const requestDestroyRefLinkCampaign_ =
  (id, rel_id) => async (dispatch) => {
    dispatch(initTask());
    const item = [];
    item.push({
      ids: id,
    });
    const { success, message } = await requestDestroyRefLink(item[0]);
    if (success) {
      dispatch(successRefLinkListCampaignDelete(item[0]));
      dispatch(fetchReferenceLinkCampaign_(rel_id));
    } else {
      dispatch(errorTask(message));
    }
  };

// export const requestAddSubtask_ = (params) => async (dispatch) => {
//   const { success, data, message } = await requestAddSubtask(params);

//   success
//     ? dispatch(successSubtask(params.key, data))
//     : dispatch(errorTask(message));
// };

export const requestFetchSubTask_ = (id) => async (dispatch) => {
  dispatch(initTask());

  const { success, data, message } = await requestFetchSubTask(id);

  if (success) {
    dispatch(successSubtask(data.data));
  } else {
    dispatch(errorTask(message));
  }
};

export const requestDestroySubtask_ = (body) => async (dispatch) => {
  dispatch(initTask());

  const { success, data, message } = await requestDestroySubtask(body.id);
  if (success) {
    dispatch(successSubtaskDelete(data));
    dispatch(taskComment('task_comment', { taskId: body.task_id }));
  } else {
    dispatch(errorTask(message));
  }
};

export const requestAddSubtask_ = (body) => async (dispatch) => {
  dispatch(initTask());

  const { success, data, message } = await requestAddSubtask(body);

  if (success) {
    dispatch(successAddSubtask(data));
    dispatch(taskComment('task_comment', { taskId: body.task_id }));
  } else {
    dispatch(errorTask(message));
  }
};

export const getRevisionsList = (rel_id, page, limit) => async (dispatch) => {
  dispatch(initTask());

  const { success, data, message } = await requestFetchRevisionList(
    rel_id,
    page,
    limit
  );
  if (success) {
    dispatch(successRevisionListTab(data));
  } else {
    dispatch(errorTask(message));
  }
};

export const requestDeleteRevision_ = (body) => async (dispatch) => {
  dispatch(initTask());

  const { success, data, message } = await requestDeleteRevision(body);
  if (success) {
    dispatch(getRevisionsList(body.rel_id, 1, 10));
    dispatch(successRevisionListTab(data));
  } else {
    dispatch(errorTask(message));
  }
};

export const addChecklistRevision = (body) => async (dispatch) => {
  dispatch(initTask());

  const { success, data, message } = await requestChecklistRevision(body);
  if (success) {
    // dispatch(getRevisionsList(body.rel_id, 1, 10));
    dispatch(successRevisionListTab(data));
  } else {
    dispatch(errorTask(message));
  }
};

export const addSubtaskRevision = (body) => async (dispatch) => {
  dispatch(initTask());

  const { success, data, message } = await requestAddSubtaskRevision(body);
  if (success) {
    dispatch(successRevisionAddSubtask(data));
  } else {
    dispatch(errorTask(message));
  }
};

export const requestResolvedRevision_ = (body) => async (dispatch) => {
  dispatch(initTask());

  const itemRevision = [];
  itemRevision.push({
    id: body.id,
  });

  const { success, message } = await requestResolvedRevisionV2(itemRevision[0]);

  if (success) {
    dispatch(successRevisionResolved(success));
    dispatch(requestFetchRevision_(body.task_id, 1, 1000));
  } else {
    dispatch(errorTask(message));
  }
};

export const requestFetchRevision_ = (id) => async (dispatch) => {
  dispatch(initTask());

  const { success, data, message } = await requestFetchRevisionList(
    id,
    1,
    1000
  );

  if (success) {
    dispatch(successRevisionList(data));
  } else {
    dispatch(errorTask(message));
  }
};

export const requestAddRevision_ = (body) => async (dispatch) => {
  dispatch(initTask());

  const { success, data, message } = await requestAddRevisionV2(body);

  if (success) {
    dispatch(successRevisionList(data));
    dispatch(requestFetchRevision_(body.rel_id, 1, 1000));
  } else {
    dispatch(errorTask(message));
  }
};

export const requestUpdateRevision_ = (body) => async (dispatch) => {
  dispatch(initTask());

  const { success, data, message } = await requestUpdateRevisionV2(body);

  if (success) {
    dispatch(successRevisionList(data));
    dispatch(requestFetchRevision_(body.task_id, 1, 1000));
  } else {
    dispatch(errorTask(message));
  }
};

export const requestDestroyRevision_ = (body) => async (dispatch) => {
  dispatch(initTask());
  const { success, data, message } = await requestDestroyRevision(body);

  if (success) {
    dispatch(successRevisionList(data));
    dispatch(requestFetchRevision_(body.rel_id, 1, 1000));
  } else {
    dispatch(errorTask(message));
  }
};
