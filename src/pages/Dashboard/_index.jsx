import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import {
  getStatuses,
  getTaskType,
  clearTypesAndStatus,
} from 'store/reducers/qadash';

import Fade from 'components/Common/Fade';

import { useSelector } from 'react-redux';

import DevDash from 'pages/Dashboard/views/DevDash';
import DesignQADash from 'pages/Dashboard/views/DesignQADash';

import Loader from 'pages/Dashboard/Components/Loader';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);

  const {
    options: {
      statuses: { data: statusList },
      taskTypes: { data: taskTypeList },
    },
  } = useSelector((state) => state.qadash);

  useEffect(() => {
    dispatch(clearTypesAndStatus());
    dispatch(getStatuses());
    dispatch(getTaskType());
  }, []);

  return (
    <>
      {user?.admin_role?.toLowerCase().includes('admin') ? (
        statusList?.length > 0 && taskTypeList?.length > 0 ? (
          <Fade in={statusList?.length > 0 && taskTypeList?.length > 0}>
            <DesignQADash statusList={statusList} taskTypeList={taskTypeList} />
          </Fade>
        ) : (
          <Loader />
        )
      ) : user?.team_name?.toLowerCase().includes('production') ? (
        <DevDash />
      ) : statusList?.length > 0 && taskTypeList?.length > 0 ? (
        <Fade in={statusList?.length > 0 && taskTypeList?.length > 0}>
          <DesignQADash statusList={statusList} taskTypeList={taskTypeList} />
        </Fade>
      ) : (
        <Loader />
      )}
    </>
  );
}
