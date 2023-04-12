import api from 'utils/api';

export const requestFavoritesPin = (params) => api.callPost('admin/favorite/pin', params);

export const requestFavoritesUnPin = (params) => api.callPost('admin/favorite/un-pin', params);

export const requestFavoritesList = () => api.callGet('admin/favorite');

export const requestFavoritesListConcept = () =>
    api.callGet(
        `admin/favorite?type=concept`
    );

export const requestFavoritesListTasks = () =>
    api.callGet(
        `admin/favorite?type=task`
    );
export const requestFavoritesListCampaign = () =>
    api.callGet(
        `admin/favorite?type=campaign`
    );

