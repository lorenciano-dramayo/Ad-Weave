import api from 'utils/api';

export const fetchUserProfileRequest = () => api.callGet('admin/user/profile');
export const updateUserProfileRequest = (params) =>
  api.callPost('admin/user/profile-update', params);

export const updateUserProfilePicture = (params) =>
  api.callPost('admin/user/profile-picture-update', params);
