import React, { useEffect, Fragment, useContext } from 'react';

import _ from 'lodash';

import { useDispatch, useSelector } from 'react-redux';

//Reducer
import { getData } from 'store/reducers/manualTaskCreation';

// Context
import TaskCreationContext from 'components/TaskCreation/Context';

// MUI Components
import { Box, Typography, styled, Stack } from '@mui/material';

// Custom Component
import TaskInput from 'components/TaskCreation/Components/TaskInput';

// Loader
import SkeletonLoader from 'components/TaskCreation/Components/Skeleton';

// bg
import cover from 'assets/cover.svg';

const StyledTypography = styled(Typography)`
  background-image: linear-gradient(90deg, #e0238c, #f22076 47.43%, #f96666);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`;

const TaskConfiguration = () => {
  const { team, setTeam, taskType, setTaskType, subTask, setSubTask } =
    useContext(TaskCreationContext);

  const dispatch = useDispatch();

  const {
    data: { teamList, taskTypeList, subTaskList },
    fetching,
  } = useSelector((state) => state.manualTaskCreation);

  useEffect(() => {
    dispatch(getData('get_teams'));
    dispatch(getData('get_active_task_type'));
    dispatch(getData('get_active_task_category'));
  }, []);

  const onInputChange = (e, v, name) => {
    switch (name.toLowerCase().replace(/ /g, '_')) {
      case 'team':
        _.isNull(v)
          ? setTeam(null)
          : setTeam(
              _.pickBy(v, (value, key) => key === 'name' || key === 'id')
            );
        break;
      case 'task_type':
        if (_.isNull(v)) {
          setTaskType(null);
        } else {
          setTaskType(
            _.pickBy(v, (value, key) => key === 'name' || key === 'id')
          );

          setTeam({
            id: v.team_id,
            name: v.team_name,
          });
        }

        break;
      case 'sub_task':
        if (_.isNull(v)) {
          setSubTask(null);
        } else {
          setSubTask(
            _.pickBy(v, (value, key) => key === 'name' || key === 'id')
          );
          setTaskType({
            id: v.task_type_id,
            name: v.task_type_name,
          });
          setTeam({
            id: v.team_id,
            name: v.team_name,
          });
        }

        break;
    }
  };

  // TODO: To be removed later. This is for debugging purposes only.
  // useEffect(() => {
  //   if (_.isEmpty(team)) {
  //     console.log(
  //       'task type list for empty team: ',
  //       _.filter(
  //         _.sortBy(taskTypeList, (s) => s.name),
  //         (t) => [3, 4, 5, 6, 8].includes(t.team_id)
  //       )
  //     );
  //     console.log(
  //       'sorted: ',
  //       _.sortBy(taskTypeList, (s) => s.name)
  //     );
  //   } else {
  //     console.log(
  //       'task type list if has team: ',
  //       _.sortBy(taskTypeList, (s) => s.name).filter(
  //         (i) => i.team_id === team.id
  //       )
  //     );
  //   }
  // }, [team, taskTypeList]);

  return (
    <Fragment>
      <Box
        backgroundColor="#25175a"
        color="#fff"
        padding="100px 76px 8px"
        sx={{
          backgroundImage: `url(${cover})`,
          backgroundSize: 'cover',
        }}
      >
        <Stack direction="row">
          <Typography variant="h4" fontWeight={800}>
            Create new &nbsp;
          </Typography>
          <StyledTypography variant="h4" fontWeight={800}>
            Task
          </StyledTypography>
        </Stack>
      </Box>
      {!fetching &&
      !_.isEmpty(teamList) &&
      !_.isEmpty(taskTypeList) &&
      !_.isEmpty(subTaskList) ? (
        <Box padding="45px 60px">
          <TaskInput
            data={_.filter(
              _.sortBy(teamList, (s) => s.name),
              (t) => [3, 4, 5, 6, 8].includes(t.id)
            )}
            name="Team"
            defaultValue={team}
            description="Selected team will be assigned by this task."
            isRequired={true}
            isDisabled={_.isEmpty(teamList)}
            onInputChange={onInputChange}
          />
          <TaskInput
            data={
              _.isEmpty(team)
                ? _.filter(
                    _.sortBy(taskTypeList, (s) => s.name),
                    (t) => [3, 4, 5, 6, 8].includes(t.team_id)
                  )
                : _.sortBy(taskTypeList, (s) => s.name).filter(
                    (i) => i.team_id === team.id
                  )
            }
            name="Task Type"
            defaultValue={taskType}
            isDisabled={
              _.isEmpty(taskTypeList) || _.isEmpty(team) || _.isUndefined(team)
            }
            isRequired={true}
            onInputChange={onInputChange}
          />
          <TaskInput
            data={
              _.isEmpty(taskType)
                ? _.filter(
                    _.sortBy(subTaskList, (s) => s.name),
                    (t) => [3, 4, 5, 6, 8].includes(t.team_id)
                  )
                : _.sortBy(subTaskList, (s) => s.name).filter(
                    (i) => i.task_type_id === taskType.id
                  )
            }
            name="Sub Task"
            defaultValue={subTask}
            isDisabled={
              _.isEmpty(subTaskList) ||
              _.isEmpty(taskType) ||
              _.isUndefined(taskType)
            }
            description="Task Category is now deprecated."
            isRequired={false}
            onInputChange={onInputChange}
          />
        </Box>
      ) : (
        <SkeletonLoader />
      )}
    </Fragment>
  );
};

export default TaskConfiguration;
