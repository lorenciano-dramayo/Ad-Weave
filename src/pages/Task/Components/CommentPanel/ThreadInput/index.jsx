import { useState, useEffect, useRef, useContext, memo } from 'react';

import _ from 'lodash';

import { Editor } from '@tinymce/tinymce-react';

import PropTypes from 'prop-types';

import theme from 'theme';

import {
  Box,
  Stack,
  IconButton,
  Avatar,
  Typography,
  Button,
  Collapse,
} from '@mui/material';

import { useFileUpload } from 'use-file-upload';

// MUI icons
import ClearIcon from '@mui/icons-material/Clear';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import ImageIcon from '@mui/icons-material/Image';
import DocumentIcon from '@mui/icons-material/Article';
import OtherFileIcon from '@mui/icons-material/InsertDriveFile';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import TaskContext from 'pages/Task/Context';
import { getFileType } from 'pages/Task/helpers';

function ThreadInput({
  user,
  taskId,
  threadId,
  threadAttachments,
  commentRelType,
  defaultText,
  collapsed,
  handleThread,
  handleAttachments,
}) {
  const { handleModal } = useContext(TaskContext);

  const [threadText, setThreadText] = useState(null);
  const [editorKey, setEditorKey] = useState(1);
  const [collapseThreadCreate, setCollapseThreadCreate] = useState(
    collapsed ?? false
  );
  const [collapseThreadCreateColor, setCollapseThreadCreateColor] =
    useState('#F22076 !important');
  // Image Uploading
  const [, selectFiles] = useFileUpload();
  const [attachments, setAttachments] = useState(threadAttachments ?? []);

  const editorRef = useRef(null);

  useEffect(() => {
    setThreadText(defaultText);
  }, [defaultText]);

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

  const handleDeleteAttachment = (attachment) => {
    if (attachment.id) {
      // Component is in edit mode
      setAttachments([...attachments.filter((a) => a.id != attachment.id)]);
    } else {
      setAttachments([
        ...attachments.filter((a) => a.source != attachment.source),
      ]);
    }

    handleAttachments(attachment);
  };

  const handleTaskCreateThread = () => {
    if (collapseThreadCreate === false) {
      setCollapseThreadCreate(true);
      setCollapseThreadCreateColor('#25165B !important');
    } else {
      setCollapseThreadCreateColor('#F22076 !important');
      setCollapseThreadCreate(false);

      if (threadText) {
        handleThread(
          taskId,
          commentRelType,
          threadText,
          threadId ?? null,
          attachments
        );
        setThreadText('');
        setAttachments([]);

        // Clears editor
        setEditorKey((prev) => prev * 2);
      }
    }
  };

  // const handleEditorButtonClick = () => {
  //   handleThread(
  //     taskId,
  //     commentRelType,
  //     threadText,
  //     threadId ?? null,
  //     attachments
  //   );
  //   setThreadText('');
  //   setAttachments([]);

  //   // Clears editor
  //   setEditorKey((prev) => prev * 2);
  // };

  return (
    <Stack
      sx={{ padding: '0.5em 0.5em' }}
      direction="column"
      spacing={1}
      alignItems="flex-start"
    >
      {/* <Typography
        variant="body1"
        component="div"
        fontWeight={700}
        textTransform="capitalize"
      >
        Create a Thread
      </Typography> */}
      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Stack spacing={1} direction="row" alignItems="center">
          <Box sx={{ margin: '0.2em 0' }}>
            {!_.isNull(user?.profile_picture) &&
            user?.profile_picture?.split('/').pop() !== 'thumb_' ? (
              <Avatar
                sx={{ width: 30, height: 30 }}
                alt={user?.fullname}
                src={user?.profile_picture}
              />
            ) : (
              <Avatar
                sx={{
                  border: '2px solid #25165b',
                }}
              >
                {`${user?.fullname.split(' ')[0][0]}${
                  !_.isEmpty(user?.fullname.split(' ')[1][0])
                    ? user?.fullname.split(' ')[1][0]
                    : ''
                }`}
              </Avatar>
            )}
          </Box>
          <Typography
            variant="body1"
            component="div"
            fontWeight={700}
            textTransform="capitalize"
          >
            {user?.fullname?.toLowerCase().includes('ad-weave')
              ? 'Ad-Weave'
              : user?.fullname}
          </Typography>
        </Stack>
        <Button
          sx={{ background: collapseThreadCreateColor }}
          variant="contained"
          onClick={handleTaskCreateThread}
          // disabled={_.isEmpty(threadText ?? '')}
        >
          {_.isUndefined(threadId) ? 'Create thread' : 'Update'}
        </Button>
      </Stack>

      <Box width="100%">
        <Collapse in={collapseThreadCreate}>
          <Editor
            init={{
              height: 300,
              width: '100%',
              menubar: false,
              placeholder: 'Write something...',
              plugins: 'link image code fullscreen preview',
              toolbar_location: 'top',
              toolbar_mode: 'floating',
              toolbar:
                'undo redo | fontsize | select bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | fullscreen preview media | forecolor backcolor emoticons | link',
              branding: false,
              link_quicklink: true,
              content_style:
                "@import url('https://fonts.googleapis.com/css2?family=Karla:wght@400;600&display=swap'); body { font-family: Karla; }",
            }}
            onInit={(evt, editor) => {
              editorRef.current = editor;
              editor.on('Paste Change input Undo Redo', function () {
                setThreadText(editor.getContent());
              });
            }}
            initialValue={defaultText}
            key={editorKey}
            apiKey="ete4lgqtbj1e2pnldnq9d6d8qnphjgcy9rw4phddizgfqe7z"
          />
          <Stack direction="row" justifyContent="start" spacing={0.5} mt={1}>
            <Typography variant="h7" fontWeight={700} color="primary">
              Attachments
            </Typography>
            <IconButton
              color="secondary"
              variant="text"
              sx={{ fontSize: '1.2em' }}
              onClick={() => {
                selectFiles({ multiple: true }, (files) =>
                  setAttachments([
                    ...attachments,
                    ...files.map((f) => ({
                      ...f,
                      is_new: true,
                    })),
                  ])
                );
              }}
            >
              <FileUploadIcon />
            </IconButton>
          </Stack>
          {/* <StyledTextField
          inputRef={threadRef}
          value={threadText}
          size="small"
          multiline
          placeholder="Create a thread..."
          variant="outlined"
          onChange={(e) =>
            setThreadText(
              e.target.value
                .replace(/\s/g, '')
                .replace(/(\r\n|\n|\r)/gm, '') === ''
                ? e.target.value.replace(/(\r\n|\n|\r)/gm, '')
                : e.target.value
            )
          }
          onKeyPress={(e) => {
            if (
              e.target.value
                .replace(/\s/g, '')
                .replace(/(\r\n|\n|\r)/gm, '') === ''
            ) {
              setThreadText('');
            } else {
              if (e.key === 'Enter' && !e.shiftKey) {
                handleThread(
                  taskId,
                  type,
                  e.target.value,
                  threadId ?? null,
                  attachments
                );
                setThreadText('');
                setAttachments([]);
              }
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Stack direction="row">
                  <IconButton>
                    <TextFormatIcon />
                  </IconButton>
                  <IconButton>
                    <SentimentSatisfiedAltIcon />
                  </IconButton>
                  <IconButton>
                    <GifBoxOutlinedIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      selectFiles({ multiple: true }, (files) =>
                        setAttachments([
                          ...attachments,
                          ...files.map((f) => ({
                            ...f,
                            is_new: true,
                          })),
                        ])
                      );
                    }}
                  >
                    <FileUploadOutlinedIcon />
                  </IconButton>
                </Stack>
              </InputAdornment>
            ),
          }}
        /> */}
          {!_.isEmpty(attachments) ? (
            <Stack>
              {/* <Typography
              variant="p"
              sx={{
                fontSize: '0.95em',
                fontWeight: '600',
                color: theme.palette.secondary.main,
              }}
            >
              Attachments
            </Typography> */}
              {attachments.map((attachment, index) => (
                <Stack
                  key={index}
                  spacing={1}
                  direction="row"
                  alignItems="center"
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      color: theme.palette.secondary.main,
                      textDecoration: 'underline',
                    },
                    '&:hover .remove-button': {
                      display: 'inherit',
                    },
                  }}
                >
                  {renderIcon(attachment.name ?? attachment.file_name)}
                  <Typography
                    variant="p"
                    sx={{
                      fontSize: '0.85em',
                    }}
                    onClick={() => {
                      if (
                        getFileType(attachment.name ?? attachment.file_name) ===
                        'image'
                      ) {
                        handleModal(
                          'attachment_preview',
                          true,
                          attachment.source ?? attachment.file_path
                        );
                      } else {
                        window.open(
                          attachment.source ?? attachment.file_path,
                          '_blank'
                        );
                      }
                    }}
                  >
                    {attachment.name ?? attachment.file_name}
                  </Typography>
                  <IconButton
                    ml={2}
                    className="remove-button"
                    aria-label="remove"
                    onClick={() => handleDeleteAttachment(attachment)}
                    sx={{ display: 'none' }}
                  >
                    <ClearIcon sx={{ fontSize: 12 }} />
                  </IconButton>
                </Stack>
              ))}
            </Stack>
          ) : (
            <Typography
              variant="span"
              fontWeight={400}
              sx={{ color: '#a8a8a8' }}
            >
              No files attached
            </Typography>
          )}
        </Collapse>
      </Box>
    </Stack>
  );
}

ThreadInput.propTypes = {
  user: PropTypes.object.isRequired,
  commentRelType: PropTypes.string,
  taskId: PropTypes.any,
  threadId: PropTypes.any,
  threadRef: PropTypes.any,
  threadAttachments: PropTypes.any,
  defaultText: PropTypes.any,
  collapsed: PropTypes.func,
  handleThread: PropTypes.func,
  handleAttachments: PropTypes.func,
};

export default memo(ThreadInput);
