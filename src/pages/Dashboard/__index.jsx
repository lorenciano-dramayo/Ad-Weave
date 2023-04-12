import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

// reducers
import {
  getStatuses,
  getTaskType,
  clearTypesAndStatus,
} from 'store/reducers/qadash';

// hooks
import { useOnMount } from 'pages/Dashboard/hooks';

import Fade from 'components/Common/Fade';
import Loader from 'pages/Dashboard/Components/Loader';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);

  useOnMount(() => {
    dispatch(clearTypesAndStatus());
    dispatch(getStatuses());
    dispatch(getTaskType());
  });

  return (
    <div>
      <Loader />
      index
    </div>
  );
}
