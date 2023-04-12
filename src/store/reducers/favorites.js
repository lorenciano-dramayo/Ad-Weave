import _ from 'lodash';

import {
  createSlice
} from '@reduxjs/toolkit';

// API's
import {
  requestFavoritesList,
  requestFavoritesPin,
} from 'services/api/favorites';

const initialState = {
  list: [],
  fetching: false,
  error: null,
};

const favorites = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    initListStart: (state) => {
      state.fetching = true;
      state.error = null;
    },
    listSuccess: (state, {
      payload
    }) => {
      state.list = payload;
      state.fetching = false;
      state.error = null;
    },
    listFailed: (state, {
      payload
    }) => {
      state.fetching = false;
      state.error = {
        message: payload
      };
    },
    filterList: (state, {
      payload
    }) => {
      return {
        ...state,
        list: _.filter(state.list, (item) => item.id != payload),
        fetching: false
      };
    },
  },
});

export const {
  initListStart,
  listSuccess,
  listFailed,
  filterList
} =
  favorites.actions;

export const fetchAllFavorites = () =>
  async (dispatch) => {
    dispatch(initListStart());
    const {
      success,
      message,
      data
    } = await requestFavoritesList();

    if (success) {
      dispatch(listSuccess(data));
    } else {
      dispatch(listFailed(message));
    }
  };

export const pinFavorites = ({
  data_id,
  type,
  fav_id
}) => async (dispatch) => {
  dispatch(initListStart());

  const {
    success,
    message
  } = await requestFavoritesPin({
    data_id,
    type
  });

  if (success) {
    dispatch(filterList(fav_id));
  } else {
    dispatch(listFailed(message));
  }
};

export default favorites.reducer;