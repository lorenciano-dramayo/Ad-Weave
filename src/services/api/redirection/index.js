import api from 'utils/api';

export const requestTaskRedirect = (taskId) =>
  api.callGet(`admin/task/get-old-task/${taskId}`);
