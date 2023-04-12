import api from 'utils/api';

export const fetchSearchResultsRequest = ({ keyword, page }) =>
  api.callGet(`admin/search?keyword=${keyword}&page=${page}`);
