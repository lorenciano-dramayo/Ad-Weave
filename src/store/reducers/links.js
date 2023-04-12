import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  requestAddList,
  requestDeleteList,
  // requestUpdateList,
} from 'services/api/links';

const initialState = {
  list: [],
  fetching: false,
  error: null,
};

const links = createSlice({
  name: 'links',
  initialState,
  reducers: {
    initLinks: (state) => {
      state.fetching = true;
      state.error = null;
    },
    successLinks: (state, { payload }) => {
      state.list = payload;
      state.fetching = false;
      state.error = null;
    },
    errorLinks: (state, { payload }) => {
      state.fetching = false;
      state.error = { message: payload };
    },
    newLinks: (state, { payload }) => {
      return { ...state, list: [...state.list, payload] };
    },
    updateLinks: (state, { payload }) => {
      state.list = _.map(state.list, function (a) {
        return a.id === 1 ? { id: 1, payload } : a;
      });
      //return { ...state, list: [...state.list, payload] }
    },
    filterLinks: (state, { payload }) => {
      return {
        ...state,
        list: _.filter(state.list, (item) => item.id != payload),
      };
    },
  },
});

export const {
  initLinks,
  successLinks,
  errorLinks,
  newLinks,
  updateLinks,
  filterLinks,
} = links.actions;

export const deleteLinks = (body) => async (dispatch) => {
  dispatch(initLinks());
  const { success, message } = await requestDeleteList(body);

  if (success) {
    dispatch(filterLinks(body.ids));
  } else {
    dispatch(errorLinks(message));
  }
};

export const addLinks = (body, types) => async (dispatch) => {
  dispatch(initLinks());
  const { success, data, message } = await requestAddList(body);

  const link_list = _.map(types, (item) => ({
    name: item.is_parent ? '' : item.name,
    task_type_id: item.id,
    task_type_name: item.is_parent ? item.name : item.task_type_name,
  }));

  if (success) {
    dispatch(
      newLinks({
        id: data.id,
        name: data.name,
        link_url: data.url,
        rel_id: data.rel_id,
        rel_type: 1,
        created_by: data.created_by,
        task_type: link_list,
      })
    );
  } else {
    dispatch(errorLinks(message));
  }
};

export const editLinks = () => async (dispatch) => {
  dispatch(initLinks());

  // const { success, data, message } = await requestUpdateList(body);
  // const link_list = _.map(types, (item) => ({
  //     name: item.is_parent ? '' : item.name,
  //     task_type_id: item.id,
  //     task_type_name: item.is_parent ? item.name : item.task_type_name,
  // }));

  // if (success) {
  //     dispatch(
  //         updateLinks({
  //             id: data.id,
  //             name: data.name,
  //             link_url: data.url,
  //             rel_id: data.rel_id,
  //             rel_type: 1,
  //             created_by: data.created_by,
  //             task_type: link_list,
  //         })
  //     );
  // } else {
  //     dispatch(errorLinks(message));
  // }
};

export const setLinks = (links) => async (dispatch) => {
  dispatch(initLinks());

  !_.isEmpty(links)
    ? dispatch(successLinks(links))
    : dispatch(successLinks([]));
};

export default links.reducer;
