import _ from 'lodash';

import { createSlice } from '@reduxjs/toolkit';
// API
import {
  requestMaintenanceUser,
  requestMaintenanceTaskType,
  requestMaintenanceTaskTypePost,
  // requestMaintenanceTaskTypePut,
  requestMaintenanceTaskTypeDelete,
  requestMaintenanceTaskCategory,
  requestMaintenanceTaskCategoryDelete,
  requestMaintenanceTeams,
  requestMaintenanceTaskStatus,
  requestMaintenanceTaskStatusDelete,
  requestMaintenanceTaskTypePreset,
  requestMaintenanceTrigger,
  requestMaintenanceTriggerDelete,
} from 'services/api/maintenance';

const initialState = {
  list: [],
  fetching: false,
  error: null,
  headers: [],
};

const maintenance = createSlice({
  name: 'maintenance',
  initialState,
  reducers: {
    initMaintenance: (state) => {
      state.fetching = true;
      state.error = null;
    },
    isSuccess: (state, { payload }) => {
      state.headers = payload.headers;
      state.list = payload.list;
      state.fetching = false;
    },
    isFail: (state, { payload }) => {
      state.error = payload.message;
      state.headers = payload.headers;
      state.fetching = false;
      state.list = [];
    },
    newData: (state, { payload }) => {
      return { ...state, list: [...state.list, payload] };
    },
    filterData: (state, { payload }) => {
      return {
        ...state,
        list: _.filter(state.list, (item) => !payload.includes(item.id)),
        fetching: false,
      };
    },
  },
});

export const { initMaintenance, isSuccess, isFail, newData, filterData } =
  maintenance.actions;

// get data
export const getData = (type, headers) => async (dispatch) => {
  dispatch(initMaintenance());

  const { success, data, message } = await getApi(type);

  if (success) {
    dispatch(
      isSuccess({
        list: data.data,
        headers,
      })
    );
  } else {
    dispatch(
      isFail({
        message,
        headers,
      })
    );
  }
};

// getters
const getApi = (t) => {
  switch (t) {
    case 'user':
      return requestMaintenanceUser();
    case 'task_type':
      return requestMaintenanceTaskType();
    case 'task_category':
      return requestMaintenanceTaskCategory();
    case 'teams':
      return requestMaintenanceTeams();
    case 'status':
      return requestMaintenanceTaskStatus();
    case 'preset':
      return requestMaintenanceTaskTypePreset();
    case 'triggers':
      return requestMaintenanceTrigger();
    default:
      return null;
  }
};

// update data
export const updateData = () => async (dispatch) => {
  dispatch(initMaintenance());
};

// updaters
// const updateAPI = (t, b) => {
//     switch (t) {
//         case 'set_user':
//             return null;
//         case 'set_task_type':
//             return requestMaintenanceTaskTypePut(b);
//         default:
//             return null;
//     }
// }

// delete data
export const deleteData = (type, body) => async (dispatch) => {
  dispatch(initMaintenance());
  const { success, message } = await deleteAPI(type, {
    ids: body.toString(),
  });

  success ? dispatch(filterData(body)) : dispatch(isFail(message));
};

// deleters
const deleteAPI = (t, b) => {
  switch (t) {
    // case 'user':
    //     return requestMaintenanceUser();
    case 'task_type':
      return requestMaintenanceTaskTypeDelete(b);
    case 'task_category':
      return requestMaintenanceTaskCategoryDelete(b);
    // case 'teams':
    //     return requestMaintenanceTeams();
    case 'status':
      return requestMaintenanceTaskStatusDelete(b);
    case 'preset':
      return requestMaintenanceTaskTypeDelete(b);
    case 'triggers':
      return requestMaintenanceTriggerDelete(b);
    default:
      return null;
  }
};

// add data
export const addData = (type, body) => async (dispatch) => {
  dispatch(initMaintenance());

  const { success, message } = await addAPI(type);

  success ? dispatch(newData(body)) : dispatch(isFail(message));
};

// adders
const addAPI = (t, b) => {
  switch (t) {
    // case 'user':
    //     return requestMaintenanceUser();
    case 'task_type':
      return requestMaintenanceTaskTypePost(b);
    // case 'task_category':
    //     return requestMaintenanceTaskCategoryDelete(b);
    // case 'teams':
    //     return requestMaintenanceTeams();
    // case 'status':
    //     return requestMaintenanceTaskStatusDelete(b);
    // case 'preset':
    //     return requestMaintenanceTaskTypeDelete(b);
    // case 'triggers':
    //     return requestMaintenanceTriggerDelete(b);
    // default:
    //     return null;
  }
};

export default maintenance.reducer;
