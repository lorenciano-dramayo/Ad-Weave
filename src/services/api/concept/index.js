import api from 'utils/api';

export const fetchConceptsListRequest = (page, params) =>
  api.callPost(`admin/concepts?page=${page}&limit=30`, params);

export const fetchOverviewRequest = ({ conceptId, partnerId }) =>
  api.callGet(
    `admin/concepts/overview?concept_id=${conceptId}&partner_id=${partnerId}`
  );

export const fetchSubscribersRequest = ({ partnerId }) =>
  api.callGet(`admin/concepts/subscriber?partner_id=${partnerId}`);

export const fetchAssigneesRequest = ({ type, relId }) =>
  api.callGet(`admin/assignees?type=${type}&rel_id=${relId}`);

export const fetchAllTags = () => api.callGet(`admin/tags`);

export const fetchTagsRequest = ({ relId }) =>
  api.callGet(`admin/tags?rel_id=${relId}`);

export const updateStatusRequest = (params) =>
  api.callPost('admin/task/update-status', params);

export const updateConceptStatusRequest = (params) =>
  api.callPost('admin/concepts/update-status', params);

export const updateDealIdRequest = (params) =>
  api.callPost('admin/concepts/update-deal-id', params);

export const updateMembersRequest = (params) =>
  api.callPost('admin/member/update', params);

export const updateAssigneesRequest = (params) =>
  api.callPost('admin/assignees/add-remove', params);

export const updateTagsRequest = (params) =>
  api.callPost('admin/tags/add', params);

export const updateAssetDownloadRequest = (params) =>
  api.callPost('admin/concepts/downloading-assets', params);

export const fetchConceptByPartner = (id) =>
  api.callGet(`admin/concepts?partner_id=${id}`);

export const fetchLinkList = (rel_id) =>
  api.callGet(`admin/link?rel_id=${rel_id}&rel_type=1`);

export const requestDestroyLinkList = (params) =>
  api.callPost(`admin/link/delete`, params);

export const createLinkList = (params) =>
  api.callPost(`admin/link/create`, params);

export const updateLinkList = (params) =>
  api.callPost(`admin/link/update`, params);

export const filterLinkList = (id, params) =>
  api.callPost(`admin/link/filter?rel_id=${id}&rel_type=1`, params);
