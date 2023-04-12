import { useState, useRef, useContext, useEffect } from 'react';
import _ from 'lodash';

import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import theme from 'theme';

import {
  Box,
  Card,
  Divider,
  Stack,
  Button,
  Avatar,
  Tooltip,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';

// helper
import { dateFormatter, getFileType } from 'pages/Task/helpers';
import TaskContext from 'pages/Task/Context';

// constant
import {
  thread_opts_default,
  thread_opts_for_assigned_teams,
  thread_opts_for_assigned_teams_with_edit_history,
  thread_opts_for_assigned_teams_with_ownership,
  thread_opts_for_assigned_teams_with_ownership_and_edit_history,
  subtask_thread_opts,
  thread_opts_with_ownership_and_edit_history,
  thread_opts_with_ownership,
} from 'pages/Task/constant';

import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';

// local component
import CommentHeader from 'pages/Task/Components/CommentHeader';
import ThreadInput from '../ThreadInput';
import CommentInput from './CommentInput';
import ThreadComment from './ThreadComment';

// MUI Icons
import VideoFileIcon from '@mui/icons-material/VideoFile';
import ImageIcon from '@mui/icons-material/Image';
import DocumentIcon from '@mui/icons-material/Article';
import OtherFileIcon from '@mui/icons-material/InsertDriveFile';

import { getItemByKey } from 'utils/dictionary';

const Thread = ({
  thread,
  threadComment,
  commentRelType,
  user,
  taskId,
  handleThread,
  handleAttachments,
}) => {
  const {
    overview: { assignees, watcher, is_parent, task_type, team },
  } = useSelector((state) => state.tasks);

  const [collapseComment, setCollapseComment] = useState(false);
  const [collapseThreadAttachments, setCollapseThreadAttachments] =
    useState(false);
  const commentRef = useRef(null);

  const { isThreadEditing, selectedThreadId, handleModal } =
    useContext(TaskContext);

  const renderIcon = (fileName) => {
    if (getFileType(fileName) === 'image') {
      return <ImageIcon color="secondary" sx={{ marginTop: '2px' }} />;
    } else if (getFileType(fileName) === 'document') {
      return <DocumentIcon color="secondary" sx={{ marginTop: '2px' }} />;
    } else if (getFileType(fileName) === 'video') {
      return <VideoFileIcon color="secondary" sx={{ marginTop: '2px' }} />;
    } else {
      return <OtherFileIcon color="secondary" sx={{ marginTop: '2px' }} />;
    }
  };

  const handleFocusCommentReply = () => {
    // if (!collapseComment) {
    //   setCollapseComment(true);
    //   setTimeout(() => {
    //     commentRef.current.focus();
    //     clearTimeout();
    //   }, 500);
    // } else {
    //   commentRef.current.focus();
    // }
    setCollapseComment(!collapseComment); // Temporary
  };

  const handleCollapseComment = () => {
    setCollapseComment(!collapseComment);
  };

  // TODO: To be removed later. This is for debugging purposes only.
  // useEffect(() => {
  //   console.log('isConceptDesignTask: ', isConceptDesignTask);
  //   console.log('isMyThread: ', isMyThread);
  //   console.log('hasEditHistory: ', hasEditHistory);
  //   console.log('isDesignQaTask: ', isDesignQaTask);
  //   console.log('isUserDesigner: ', isUserDesigner);
  //   console.log('isUserQa: ', isUserQa);
  //   console.log('isQaTask: ', isQaTask);
  //   console.log('isAssignee: ', isAssignee);
  //   console.log('user: ', user);
  //   console.log('=======');
  // }, [user, assignees, team, task_type]);

  const isAssignee = !_.isEmpty(
    getItemByKey(
      is_parent ? 'id' : 'user_id',
      is_parent ? user?.id : `${user?.id}`,
      assignees
    )
  );

  const isWatcher =
    _.filter(watcher ?? [], (w) => w?.user_id === user?.id)?.length > 0;

  const isMyThread = user?.id === thread?.user_id;

  const isUserQa = user?.team_name?.toLowerCase() === 'qa';

  const isUserDesigner = user?.team_name?.toLowerCase() === 'design';

  const isUserAdministrator =
    user?.user_role?.toLowerCase() === 'administrator';

  const isDesignQaTask = task_type?.toLowerCase() === 'design qa';

  const isQaTask = team?.name?.toLowerCase() === 'qa';

  const isConceptDesignTask = task_type?.toLowerCase() === 'concept design';

  const hasEditHistory = !_.isEmpty(thread?.edit_history ?? []);

  const getThreadOptions = () => {
    if (commentRelType === 'task') {
      if (isUserAdministrator) {
        if (isAssignee && isMyThread && hasEditHistory) {
          return thread_opts_for_assigned_teams_with_ownership_and_edit_history;
        } else if (isAssignee && isMyThread) {
          return thread_opts_for_assigned_teams_with_ownership;
        } else if (isAssignee && hasEditHistory) {
          return thread_opts_for_assigned_teams_with_edit_history;
        } else if (isAssignee) {
          return thread_opts_for_assigned_teams;
        } else {
          return [];
        }
      } else {
        if (isConceptDesignTask) {
          if (isMyThread && hasEditHistory) {
            return thread_opts_with_ownership_and_edit_history;
          } else if (isMyThread) {
            return thread_opts_with_ownership;
          } else if (hasEditHistory) {
            thread_opts_default;
          } else {
            return [];
          }
        } else {
          const isRelatedToQa = isQaTask && isUserQa;
          const isRelatedToDesignQa = isDesignQaTask && isUserDesigner;

          if (
            (isAssignee && isRelatedToQa && isMyThread && hasEditHistory) ||
            (isAssignee && isRelatedToDesignQa && isMyThread && hasEditHistory)
          ) {
            return thread_opts_for_assigned_teams_with_ownership_and_edit_history;
          } else if (
            (isAssignee && isRelatedToQa && isMyThread) ||
            (isAssignee && isRelatedToDesignQa && isMyThread)
          ) {
            return thread_opts_for_assigned_teams_with_ownership;
          } else if (
            (isAssignee && isRelatedToQa && hasEditHistory) ||
            (isAssignee && isRelatedToDesignQa && hasEditHistory)
          ) {
            return thread_opts_for_assigned_teams_with_edit_history;
          } else if (isMyThread && hasEditHistory) {
            return thread_opts_with_ownership_and_edit_history;
          } else if (isMyThread) {
            return thread_opts_with_ownership;
          } else if (hasEditHistory) {
            thread_opts_default;
          } else {
            return [];
          }
        }
      }
    } else {
      return subtask_thread_opts;
    }
  };

  return (
    <>
      {isThreadEditing && thread?.id === selectedThreadId ? (
        <Box my={2} mx={1}>
          <ThreadInput
            user={user}
            commentRelType={commentRelType}
            taskId={taskId}
            threadId={thread?.id}
            threadAttachments={thread?.attachment}
            defaultText={thread?.thread}
            handleThread={handleThread}
            handleAttachments={handleAttachments}
            collapsed
          />
        </Box>
      ) : (
        <Card key={thread?.id} variant="outlined" sx={{ margin: '0.5em' }}>
          <CommentHeader
            user={{ name: thread?.username, avatar: thread?.avatar }}
            createdDate={dateFormatter(
              _.isEmpty(thread?.date_created)
                ? thread?.date
                : thread?.date_created
            )}
            commentRelType={commentRelType}
            options={getThreadOptions()}
            isEdited={thread?.is_edited}
            status={thread?.status}
            threadId={thread?.id}
            thread={thread}
          />

          {/*  Thread Info */}
          <Box
            px={2}
            pb={2}
            lineHeight="initial"
            whiteSpace="pre-line"
            dangerouslySetInnerHTML={{ __html: thread?.thread }}
          />

          {/* Thread Attachments */}
          {!_.isEmpty(thread?.attachment) && (
            <Box px={2} mb={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <AttachFileIcon color="secondary" />
                <Typography
                  color="secondary"
                  variant="body2"
                  onClick={() =>
                    setCollapseThreadAttachments(!collapseThreadAttachments)
                  }
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      // color: theme.palette.secondary.main,
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Attachments
                </Typography>
              </Stack>
              <Collapse in={collapseThreadAttachments}>
                <Stack mt={1}>
                  {thread?.attachment?.map((attachment, index) => (
                    <Stack
                      key={index}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          color: theme.palette.secondary.main,
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      <Stack
                        key={index}
                        spacing={1}
                        direction="row"
                        alignItems="center"
                      >
                        {renderIcon(attachment.file_name)}
                        <Typography
                          variant="p"
                          sx={{
                            fontSize: '0.85em',
                          }}
                          onClick={() => {
                            if (getFileType(attachment.file_name) === 'image') {
                              handleModal(
                                'attachment_preview',
                                true,
                                attachment.file_path
                              );
                            } else {
                              window.open(attachment.file_path, '_blank');
                            }
                          }}
                        >
                          {attachment.file_name}
                        </Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Collapse>
            </Box>
          )}

          {!_.isEmpty(thread?.status?.voters) && (
            <>
              <Divider sx={{ borderStyle: 'dashed' }} />

              <Stack
                direction="row"
                justifyContent="space-between"
                p={1}
                alignItems="center"
              >
                <Stack direction="row">
                  <Tooltip title="Report Summary" arrow>
                    <IconButton
                      color="secondary"
                      size="small"
                      onClick={() =>
                        handleModal(
                          'response_summary',
                          true,
                          thread?.status?.voters ?? []
                        )
                      }
                    >
                      <AssessmentOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      Revision rounds: {thread?.revision_rounds}
                    </Typography>
                  </Box>
                </Stack>

                {/* Approve Assigned Thread */}
                <Stack direction="Row" justifyContent="flex-end">
                  {thread?.status?.voters.map((voter, index) => (
                    <Tooltip title={voter?.user_name ?? ''} key={index} arrow>
                      <Avatar
                        sx={{
                          width: 15,
                          height: 15,
                          border: '2px solid',
                          borderColor:
                            voter.status?.toLowerCase() === 'rejected'
                              ? '#ff4a4a'
                              : '#1ABC00',
                          marginRight: 0.1,
                          fontSize: '9px',
                          textTransform: 'capitalize',
                        }}
                        alt={voter?.user_name}
                        src={voter?.avatar}
                      />
                    </Tooltip>
                  ))}
                </Stack>
              </Stack>
            </>
          )}

          <Divider />
          <Stack direction="row" justifyContent="space-between">
            {(isAssignee || isWatcher) && (
              <Box flex={1}>
                <Button
                  sx={{
                    width: '-webkit-fill-available',
                    borderRadius: 0,
                  }}
                  onClick={handleFocusCommentReply}
                >
                  Reply
                </Button>
              </Box>
            )}
            <Divider orientation="vertical" flexItem />
            <Box flex={1}>
              <Button
                sx={{
                  width: '-webkit-fill-available',
                  borderRadius: 0,
                }}
                onClick={handleCollapseComment}
              >
                {`${
                  !_.isUndefined(thread?.comment?.length)
                    ? thread?.comment?.length
                    : 0
                } Comments`}
              </Button>
            </Box>
          </Stack>
          <Divider />

          {/* Comment */}
          <Collapse in={collapseComment}>
            <Box>
              {(isAssignee || isWatcher) && (
                <Stack pt={1}>
                  <CommentInput
                    commentRef={commentRef}
                    user={user}
                    commentRelType={commentRelType}
                    taskId={taskId}
                    threadId={thread?.id}
                    // defaultText={thread?.thread}
                    handleThread={handleThread}
                    isEditing={false}
                  />
                  <Divider />
                </Stack>
              )}
              {!_.isEmpty(threadComment)
                ? [...threadComment].reverse()?.map((data, index) =>
                    isThreadEditing && selectedThreadId === data?.id ? (
                      <Box my={2} mx={1} key={index}>
                        <CommentInput
                          user={user}
                          commentRelType={commentRelType}
                          taskId={taskId}
                          threadId={{
                            threadId: thread?.id,
                            commentId: data?.id,
                          }}
                          threadAttachments={data?.attachment}
                          defaultText={data?.comment}
                          handleThread={handleThread}
                          handleAttachments={handleAttachments}
                          isEditing={true}
                        />
                      </Box>
                    ) : (
                      <ThreadComment
                        key={index}
                        index={index}
                        taskId={taskId}
                        data={data}
                        user={user}
                        assignees={assignees}
                        isThreadEditing={
                          isThreadEditing && selectedThreadId === data?.id
                        }
                        handleModal={handleModal}
                      />
                    )
                  )
                : null}
            </Box>
          </Collapse>
        </Card>
      )}
    </>
  );
};

Thread.propTypes = {
  thread: PropTypes.any,
  threadComment: PropTypes.any,
  commentRelType: PropTypes.any,
  user: PropTypes.any,
  taskId: PropTypes.any,
  handleThread: PropTypes.func,
  handleAttachments: PropTypes.func,
};

export default Thread;
