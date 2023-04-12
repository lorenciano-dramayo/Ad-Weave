import api from 'utils/api';

export const fetchCampaignsSpecific = (id) =>
  api.callGet(`admin/campaigns/overview?id=${id}`);

export const requestUpdateCampaignBykey = (params) =>
  api.callPost('admin/campaigns/update-key', params);

export const fetchTimelog = (id) =>
  api.callGet(`admin/task-timelog/campaign?campaign_id=${id}`);

export const fetchReferenceLink = (id) =>
  api.callGet(`admin/link?rel_id=${id}&rel_type=2`);
