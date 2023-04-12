import api from 'utils/api';

export const requestPartners = () => api.callGet('admin/partner?limit=1000');