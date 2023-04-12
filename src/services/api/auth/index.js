import api from 'utils/api';

export const loginRequest = (params) => api.callPost('admin/login', params);
export const loginViaGoogleRequest = (params) =>
  api.callPost('admin/google/signup', params);

export const forgetPasswordRequest = (params) =>
  api.callPost('admin/auth/forgot-password', params);

export const resetPasswordRequest = (password, key) =>
  api.callPost(
    `admin/auth/reset-password?validation_token=${key}&password=${password}`
  );
