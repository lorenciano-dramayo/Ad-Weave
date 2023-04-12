import api from 'utils/api';

export const fetchLinkList = () =>
    api.callGet('admin/concepts/link-store');

export const requestAddList = (params) =>
    api.callPost('admin/concepts/link-store', params);

export const requestUpdateList = (params) =>
    api.callPost('admin/concepts/link-update', params);

export const requestDeleteList = (params) =>
    api.callPost('admin/concepts/links-delete', params);

export const requestLinkList = (cid) =>
    api.callGet(`admin/link/concept?concept_uuid=${cid}`);