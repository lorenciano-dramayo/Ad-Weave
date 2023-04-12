import api from 'utils/api';

export const requestTimesheet = (
  search,
  user_id,
  partner_id,
  campaign_id,
  date,
  timer_id
) =>
  api.callGet(
    `admin/task-timelog/get-all?search=${search}&user_id=${user_id}&partner_id=${partner_id}&campaign_id=${campaign_id}&date=${date}&date_filter=custom&timer_id=${timer_id}  `
  );

export const requestTimesheetAll = () =>
  api.callGet(`admin/task-timelog/get-all`);
export const requestTimesheetChart = (
  search,
  userId,
  partnerId,
  campaignId,
  dates,
  dateFilter
) =>
  api.callGet(
    `admin/task-timelog/get-all?search=${search}&user_id=${userId}&partner_id=${partnerId}&campaign_id=${campaignId}&date_filter=${dateFilter}&date=${dates}`
  );
export const requestTimesheetOptionList = () =>
  api.callGet('admin/task-timelog/timesheet-list-option');

export const requestTimesheetStats = () =>
  api.callGet('admin/task-timer/user-total-time');

export const updateStartEnd = (params) =>
  api.callPost(`admin/task-timer/update-timesheet`, params);
