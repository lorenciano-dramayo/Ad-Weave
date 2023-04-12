import { useState, memo } from 'react';
import _ from 'lodash';

import PropTypes from 'prop-types';

import theme from 'theme';

import { Box, Divider, Stack, Collapse, Typography } from '@mui/material';

// helper
import { dateFormatter, getFileType } from 'pages/Task/helpers';

// constant
import {
  comment_opts,
  comment_opts_with_edit_history,
  comment_opts_with_ownership,
  comment_opts_with_ownership_and_edit_history,
} from 'pages/Task/constant';

import AttachFileIcon from '@mui/icons-material/AttachFile';

// local component
import CommentHeader from 'pages/Task/Components/CommentHeader';

// MUI Icons
import VideoFileIcon from '@mui/icons-material/VideoFile';
import ImageIcon from '@mui/icons-material/Image';
import DocumentIcon from '@mui/icons-material/Article';
import OtherFileIcon from '@mui/icons-material/InsertDriveFile';

function ThreadComment({
  index,
  user,
  assignees,
  taskId,
  data,
  isThreadEditing,
  handleModal,
}) {
  const [collapseCommentAttachments, setCollapseCommentAttachments] =
    useState(false);

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

  const isMyComment = user?.id === data?.user_id;

  const isAssigned =
    _.filter(assignees ?? [], (assign) => assign?.id === user?.id)?.length > 0;

  const hasEditHistory = !_.isEmpty(data?.edit_history ?? []);

  const getCommentOptions = () => {
    if (isAssigned && isMyComment && hasEditHistory) {
      return comment_opts_with_ownership_and_edit_history;
    } else {
      if (isAssigned && isMyComment) {
        return comment_opts_with_ownership;
      } else if (isAssigned && hasEditHistory) {
        return comment_opts_with_edit_history;
      } else {
        [];
      }
    }
  };

  return (
    <Box sx={{ backgroundColor: index === 0 ? '#fafaf7' : 'inherit' }}>
      <CommentHeader
        type="comment"
        taskId={taskId}
        user={{
          name: data?.username,
          avatar: data?.avatar,
        }}
        createdDate={dateFormatter(data?.date)}
        threadId={data?.id}
        options={getCommentOptions()}
        isThreadEditing={isThreadEditing}
        isEdited={data?.is_edited}
        comment={data?.comment}
      />

      <Box
        mr={2}
        ml={7}
        mb={2}
        px={2}
        py={1}
        borderRadius="0.5em"
        backgroundColor="#f5f5f5"
        lineHeight="initial"
        whiteSpace="pre-line"
        dangerouslySetInnerHTML={{ __html: data?.comment }}
      />

      {/* Comment Attachments */}
      {!_.isEmpty(data?.attachment) && (
        <Box px={2} mb={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <AttachFileIcon color="secondary" />
            <Typography
              color="secondary"
              variant="body2"
              onClick={() =>
                setCollapseCommentAttachments(!collapseCommentAttachments)
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
          <Collapse in={collapseCommentAttachments}>
            <Stack mt={1}>
              {data?.attachment?.map((attachment, index) => (
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
      <Divider />
    </Box>
  );
}

ThreadComment.propTypes = {
  index: PropTypes.any,
  user: PropTypes.any,
  assignees: PropTypes.arrayOf(PropTypes.object),
  taskId: PropTypes.func,
  data: PropTypes.func,
  isThreadEditing: PropTypes.bool,
  handleModal: PropTypes.func,
};

export default memo(ThreadComment);
