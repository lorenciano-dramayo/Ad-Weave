// Redux
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// Reducers
import authReducer from './auth';
import counterReducer from './counter';
import dashboardReducer from './dashboard';
import devdashReducer from './devdash';
import timesheetReducer from './timesheet';
import teamsReducer from './teams';
import userReducer from './user';
import favoritesReducer from './favorites';
import tasksReducer from './tasks';
import partnersReducer from './partners';
import conceptReducer from './concept';
import campaignReducer from './campaign';
import timerReducer from './timer';
import linksReducer from './links';
import manualTaskCreationReducer from './manualTaskCreation';
import notificationsReducer from './notifications';
import globalSearchReducer from './globalSearch';
import profileReducer from './profile';
import forgotPasswordReducer from './forgotPassword';
import supportReducer from './support';

// maintenance reducers
import maintenanceTaskStatusReducer from './maintenanceTaskStatus';
import maintenanceTaskCategoryReducer from './maintenanceTaskCategory';
import maintenanceTaskTypeReducer from './maintenanceTaskType';
import maintenanceTeamReducer from './maintenanceTeam';
import maintenanceTaskPresetReducer from './maintenanceTaskPreset';
import maintenanceUserReducer from './maintenanceUser';
import maintenanceReducer from './maintenance';
import maintenanceTriggerReducer from './maintenanceTrigger';
import maintenanceDisplayReducer from './maintenanceDisplay';
import redirection from './redirection';

// const authPersistConfig = {
//   key: 'adweaveAuth',
//   storage: storage,
//   blacklist: ['error', 'isLoading'],
// };

const userPersistConfig = {
  key: 'adweaveUser',
  storage: storage,
  blacklist: ['error', 'isLoading'],
};

const globalSearchPersistConfig = {
  key: 'adweaveGlobalSearch',
  storage: storage,
  blacklist: ['concept', 'campaign', 'task', 'isFetching', 'error'],
};

const rootReducer = combineReducers({
  forgotPassword: forgotPasswordReducer,
  auth: authReducer,
  counter: counterReducer,
  teams: teamsReducer,
  maintenanceTaskStatus: maintenanceTaskStatusReducer,
  maintenanceTaskCategory: maintenanceTaskCategoryReducer,
  maintenanceTaskType: maintenanceTaskTypeReducer,
  maintenanceTeam: maintenanceTeamReducer,
  maintenanceTrigger: maintenanceTriggerReducer,
  maintenanceDisplay: maintenanceDisplayReducer,
  favorites: favoritesReducer,
  tasks: tasksReducer,
  maintenanceTaskPreset: maintenanceTaskPresetReducer,
  maintenanceUser: maintenanceUserReducer,
  maintenance: maintenanceReducer,
  user: persistReducer(userPersistConfig, userReducer),
  partners: partnersReducer,
  concept: conceptReducer,
  campaign: campaignReducer,
  links: linksReducer,
  manualTaskCreation: manualTaskCreationReducer,
  timer: timerReducer,
  notifications: notificationsReducer,
  dashboard: dashboardReducer,
  devdash: devdashReducer,
  timesheet: timesheetReducer,
  globalSearch: persistReducer(globalSearchPersistConfig, globalSearchReducer),
  profile: profileReducer,
  support: supportReducer,
  redirection: redirection,
});

export default rootReducer;
