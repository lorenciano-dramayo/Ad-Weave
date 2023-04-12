import api from 'services/api/common';

export const authMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  const { token } = state.auth;
  if (token) {
    // insert token from store to axios request
    api.updateRequestInterceptor(token);
  }

  return next(action);
};

export default authMiddleware;
