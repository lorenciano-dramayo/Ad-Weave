import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useOnMount } from 'hooks';

import { useParams, useHistory, useLocation } from 'react-router-dom';
import { getNewTaskId } from 'store/reducers/redirection';
import _ from 'lodash';
import Loader from 'pages/Dashboard/Components/Loader';

export default function TaskRedirect() {
  const { oldId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { taskId, fetching, error } = useSelector((state) => state.redirection);

  React.useEffect(() => {
    _.isEmpty(error) &&
      !_.isNull(taskId) &&
      history.push({
        pathname: `/task/${taskId}`,
        search: history.location.search,
        state: {
          background: location,
          type: 'task',
        },
      });
  }, [taskId]);

  useOnMount(() => {
    dispatch(getNewTaskId(oldId));
  });

  return fetching ? <Loader /> : <></>;
}
