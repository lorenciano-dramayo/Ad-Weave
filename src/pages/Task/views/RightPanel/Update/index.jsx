import { useContext, useState } from 'react';

import _ from 'lodash';

import { useSelector } from 'react-redux';

// Context
import TaskContext from 'pages/Task/Context';

import {
  Card,
  Stack,
  Box,
  Alert,
  Collapse,
  Button,
  Typography,
} from '@mui/material';

// local component
import CommentPanel from 'pages/Task/Components/CommentPanel';

export default function Update() {
  const { isTask, handleThread, handleAttachments } = useContext(TaskContext);
  const [checked, setChecked] = useState(false);
  // Redux State
  const {
    overview: {
      name,
      id: taskId,
      task_type,
      rel_type,
      is_migrated,
      description,
    },
    comments,
  } = useSelector((state) => state.tasks);

  const { data: userData } = useSelector((state) => state.user);

  return (
    !_.isUndefined(rel_type) && (
      <Stack>
        {is_migrated && !_.isEmpty(description) && (
          <>
            <Box sx={{ display: 'flex' }}>
              <Alert
                severity="info"
                sx={{ width: '100%' }}
                action={
                  <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    sx={{ textTransform: 'capitalize' }}
                    onClick={(e) => {
                      e.preventDefault();
                      setChecked(!checked);
                    }}
                  >
                    {checked ? `Hide` : `View`} Description
                  </Button>
                }
              >
                This task is migrated with description.
              </Alert>
            </Box>
            <Collapse in={checked}>
              <Card
                sx={{
                  padding: '2em',
                  overflowX: 'auto',
                  lineHeight: '16px',
                  backgroundColor: '#4099ff0f',
                  marginTop: '10px',
                }}
                variant="outlined"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </Collapse>
          </>
        )}
        {/* Thread Comment */}
        {isTask ? (
          <>
            {!_.isEmpty(comments) ? (
              <CommentPanel
                user={userData}
                section={task_type}
                comment={[...(comments?.task?.comments ?? [])].reverse()}
                commentRelType={'task'}
                taskId={taskId}
                handleThread={handleThread}
                handleAttachments={handleAttachments}
                isCollapseEnabled={true}
              />
            ) : null}
            {!_.isEmpty(comments)
              ? comments?.subtask?.map((subtask) => (
                  <CommentPanel
                    key={subtask?.subtask_id}
                    user={userData}
                    section={subtask?.subtask_name}
                    comment={[...(subtask?.comments ?? [])].reverse()}
                    commentRelType={'subtask'}
                    taskId={subtask?.subtask_id}
                    handleThread={handleThread}
                    handleAttachments={handleAttachments}
                    isCollapseEnabled={true}
                  />
                ))
              : null}
          </>
        ) : (
          // comments?.subtask?.map((subtask, index) => (
          <CommentPanel
            // key={subtask?.subtask_id}
            user={userData}
            section={name}
            comment={[...(comments?.subtask ?? [])].reverse()}
            commentRelType={'subtask'}
            taskId={taskId}
            handleThread={handleThread}
            handleAttachments={handleAttachments}
            isCollapseEnabled={false}
          />
          // ))
        )}
      </Stack>
    )
  );
}
