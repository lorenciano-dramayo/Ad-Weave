import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

import _ from 'lodash';

import PropTypes from 'prop-types';

import {
  Box,
  Stack,
  Typography,
  IconButton,
  Collapse,
  Card,
  Divider,
  styled,
  Badge,
  Tooltip,
} from '@mui/material';

// MUI icons
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';

// children
import Thread from 'pages/Task/Components/CommentPanel/Thread';
import ThreadInput from './ThreadInput';

import { getItemByKey } from 'utils/dictionary';

const StyleCard = styled(Card)({
  boxShadow: '0 0 5px 4px rgb(134 134 134 / 10%)',
  border: '1px solid rgb(134 134 134 / 10%)',
  maxHeight: 'inherit !important',
});

const ToolTipStack = styled(Stack)({
  cursor: 'pointer',
});

const CommentPanel = ({
  user,
  section,
  comment,
  commentRelType,
  taskId,
  handleThread,
  handleAttachments,
  isCollapseEnabled,
}) => {
  const threadRef = useRef(null);

  const [collapseThread, setCollapseThread] = useState(
    isCollapseEnabled ? true : !isCollapseEnabled
  );

  const [threadCount, setthreadCount] = useState(0);

  const {
    overview: { assignees, watcher, is_parent },
  } = useSelector((state) => state.tasks);

  const handleCollapseThread = () => {
    setCollapseThread(!collapseThread);
  };

  // const isAssignee =
  //   _.filter(assignees ?? [], (assign) => assign?.id === user?.id)?.length > 0;

  const isAssignee = !_.isEmpty(
    getItemByKey(
      is_parent ? 'id' : 'user_id',
      is_parent ? user?.id : `${user?.id}`,
      assignees
    )
  );

  useEffect(() => {
    setthreadCount(comment?.length);
  });

  const isWatcher =
    _.filter(watcher ?? [], (w) => w?.user_id === user?.id)?.length > 0;

  return (
    <Stack mt={2}>
      {isCollapseEnabled && (
        <Stack direction="row" justifyContent="space-between">
          <Stack
            direction="row"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            <Stack display="flex" alignItems="center" flexDirection="row">
              <Typography fontWeight={700} color="primary" marginRight="14px">
                {section}
              </Typography>
              <Badge
                color="secondary"
                overlap="circular"
                badgeContent={threadCount}
              ></Badge>
            </Stack>
          </Stack>
          <Box>
            <IconButton size="small" onClick={handleCollapseThread}>
              {!collapseThread ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
          </Box>
        </Stack>
      )}
      <Collapse in={collapseThread}>
        <StyleCard>
          <Stack>
            {/* Create a thread */}
            {(isAssignee || isWatcher) && (
              <ThreadInput
                threadRef={threadRef}
                user={user}
                commentRelType={commentRelType}
                taskId={taskId}
                handleThread={handleThread}
                handleAttachments={handleAttachments}
              />
            )}
          </Stack>
          <Divider />
          <Stack mt={2} justifyContent="space-between">
            {!_.isEmpty(comment) ? (
              comment.map((thread, index) => (
                <Thread
                  key={index}
                  thread={thread}
                  threadComment={thread?.comment}
                  commentRelType={commentRelType}
                  user={user}
                  taskId={taskId}
                  handleThread={handleThread}
                  handleAttachments={handleAttachments}
                />
              ))
            ) : (
              <Card variant="outlined" sx={{ margin: '0.5em' }}>
                <Stack alignItems="center" p={2}>
                  <IconButton>
                    <CommentsDisabledIcon />
                  </IconButton>
                  <Typography variant="caption">
                    No thread found for this task.
                  </Typography>
                  {/* {type !== 'subtask' && (isAssignee || isWatcher) && (
                    <Button size="small" onClick={handleFocusCreateThread}>
                      Create a thread
                    </Button>
                  )} */}
                </Stack>
              </Card>
            )}

            {/* {type !== 'subtask' &&
              _.isEmpty(comment) &&
              !_.isNull(_.last(comment)?.status?.status) && (
                
              )} */}
          </Stack>
        </StyleCard>
      </Collapse>
      {!collapseThread && <Divider />}
    </Stack>
  );
};

CommentPanel.propTypes = {
  user: PropTypes.object.isRequired,
  section: PropTypes.any,
  comment: PropTypes.any,
  commentRelType: PropTypes.string,
  taskId: PropTypes.any,
  handleThread: PropTypes.func,
  handleAttachments: PropTypes.func,
  isCollapseEnabled: PropTypes.bool,
};

export default CommentPanel;
