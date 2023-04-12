import { createSlice } from '@reduxjs/toolkit';

// API's
import {
  requestTimesheet,
  requestTimesheetChart,
  requestTimesheetOptionList,
  requestTimesheetStats,
  updateStartEnd, requestTimesheetAll
} from 'services/api/timesheet';

const initialState = {
  statistics: {
    data: [],
    fetching: false,
  },
  timesheet: {
    data: [],
    fetching: false,
  },
  timesheetData: [],
  chart: {
    data: [],
    fetching: false,
  },
  optionTimeSheets: {
    data: [],
    fetching: false,
  },
  error: null,
};

const timesheet = createSlice({
  name: 'timesheet',
  initialState,
  reducers: {
    initTimesheet: (state) => {
      state.timesheet.fetching = true;
      state.error = null;
    },
    initTimesheetChart: (state) => {
      state.chart.fetching = true;
      state.error = null;
    },
    initoptionTimeSheets: (state) => {
      state.optionTimeSheets.fetching = true;
      state.error = null;
    },


    isSuccess: (state, { payload }) => {
      console.log(payload, "payload")
      state.timesheet.data = payload;
      // state.timesheetData = payload;
      state.timesheet.fetching = false;
    },

    isSuccessData: (state, { payload }) => {
      state.timesheetData = payload;
    },
    isSuccessChart: (state, { payload }) => {
      state.chart.data = payload;
      state.chart.fetching = false;
    },
    isSuccessStats: (state, { payload }) => {
      state.statistics.data = payload;
      state.statistics.fetching = false;
    },
    isSuccessOption: (state, { payload }) => {
      state.optionTimeSheets.data = payload;
      state.optionTimeSheets.fetching = false;
    },
    isError: (state, { payload }) => {
      state.error = payload;
      state.fetching = false;
    },
  },
});

export const {
  initTimesheet,
  initTimesheetChart,
  initoptionTimeSheets,
  isSuccess,
  isSuccessChart,
  isSuccessStats,
  isSuccessOption,
  isError,
  isSuccessData
} = timesheet.actions;

export const getTimesheet =
  (search, user_id, partner_id, campaign_id, date, timer_id) => async (dispatch) => {
    dispatch(initTimesheet());
    if (search != null || user_id != null || partner_id != null || campaign_id != null || date != null || timer_id != null) {
      const { success, message, data } = await requestTimesheet(
        search,
        user_id,
        partner_id,
        campaign_id,
        date,
        timer_id
      );

      if (success) {
        dispatch(isSuccess(data));
      } else {
        dispatch(isError(message));
      }
    }
    else {
      const { success, message, data } = await requestTimesheetAll();

      if (success) {
        dispatch(isSuccess(data));
      } else {
        dispatch(isError(message));
      }
    }


  };

export const getTimesheetStats = () => async (dispatch) => {
  dispatch(initTimesheet());
  const { success, message, data } = await requestTimesheetStats();

  if (success) {
    dispatch(isSuccessStats(data));
  } else {
    dispatch(isError(message));
  }
};

export const getTimesheetChart =
  (search, userId, partnerId, campaignId, dates, dateFilter) =>
    async (dispatch) => {
      dispatch(initTimesheetChart());
      const { success, message, data } = await requestTimesheetChart(
        search,
        userId,
        partnerId,
        campaignId,
        dates,
        dateFilter
      );

      if (success) {
        dispatch(isSuccessChart(data));
      } else {
        dispatch(isError(message));
      }
    };



// export const getTimesheetAll = () => async (dispatch) => {
//   dispatch(initTimesheet());
//   const { success, message, data } = await requestTimesheetAll();

//   if (success) {
//     dispatch(isSuccess(data));
//   } else {
//     dispatch(isError(message));
//   }
// };



export const getTimesheetOption = () => async (dispatch) => {
  dispatch(initoptionTimeSheets());
  const { success, message, data } = await requestTimesheetOptionList();

  if (success) {
    dispatch(isSuccessOption(data));
  } else {
    dispatch(isError(message));
  }
};


export const updateStartEnd_ = (params) => async (dispatch) => {
  const { success, data, message } = await updateStartEnd(params);
  if (success) {
    dispatch(isSuccess(data));
  } else {
    dispatch(isError(message));
  }

};


export default timesheet.reducer;
