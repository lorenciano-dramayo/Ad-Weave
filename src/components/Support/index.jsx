import React, { memo, useState, useRef, useEffect } from 'react';

import PropTypes from 'prop-types';

import { Editor } from '@tinymce/tinymce-react';

import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  TextField,
  Button,
  Typography,
  Autocomplete,
  Stack,
  Container,
  Divider,
  IconButton,
  Box,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import DoneIcon from '@mui/icons-material/Done';

import cover from 'assets/cover.svg';

import _ from 'lodash';

import { useFileUpload } from 'use-file-upload';

import appTheme from 'theme';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import ClearIcon from '@mui/icons-material/Clear';
import { ConstructionOutlined } from '@mui/icons-material';

import { saveTicket } from 'store/reducers/support';
import Swal from 'sweetalert2';

// Toast notification
const Toast = Swal.mixin({
  toast: true,
  icon: 'success',
  width: 370,
  position: 'top-right',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

function NewTicket({ options, onClose, onCloseAndReload }) {
  const editorRef = useRef(null);
  const dispatch = useDispatch();

  const [, selectFiles] = useFileUpload();
  const [attachments, setAttachments] = useState([]);

  // Fields State
  const [subject, setSubject] = useState(null);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [department, setDepartment] = useState(null);
  const [carboncopy, setCarbonCopy] = useState(null);
  const [assigned, setAssigned] = useState(null);
  const [service, setService] = useState(null);
  const [priority, setPriority] = useState(null);
  const [predefinedReply, setPredefinedReply] = useState(null);
  const [message, setMessage] = useState(null);
  const [tags, setTags] = useState(null);

  const { data: user } = useSelector((state) => state.user);
  const {
    save: { data: savedData, processing },
    error,
  } = useSelector((state) => state.support);

  const handleEditorChange = () => {
    if (editorRef.current) {
      setMessage(editorRef.current.getContent());
    }
  };

  function handleCTAClick() {
    const formData = new FormData();

    formData.append('subject', subject);
    formData.append('contactid', userId);
    formData.append('userid', userId);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('department', department?.id);
    formData.append('cc', carboncopy);
    formData.append('assigned', assigned?.id);
    formData.append('service', service?.serviceid);
    formData.append('message', message);
    formData.append('tags', tags?.map((t) => t.name).join(','));
    // formData.append('predefinedReply: ', predefinedReply);

    for (const attachment of attachments) {
      formData.append('attachments[]', attachment.file);
    }

    dispatch(saveTicket(formData, () => {}));

    // Debugging purposes
    // console.log('subject: ', subject);
    // console.log('contactid: ', userId);
    // console.log('userid: ', userId);
    // console.log('name: ', name);
    // console.log('email: ', email);
    // console.log('department: ', department?.id);
    // console.log('cc: ', carboncopy);
    // console.log('assigned: ', assigned?.id);
    // console.log('service: ', service?.serviceid);
    // console.log('message: ', message);
    // console.log('tags: ', tags?.map((t) => t.name).join(','));
    // console.log('predefinedReply: ', predefinedReply);
  }

  useEffect(() => {
    setUserId(user?.id ?? '');
    setName(user?.fullname ?? '');
    setEmail(user?.email ?? '');
  }, [user]);

  return (
    <Container maxWidth="lg">
      <Stack mt={4} mb={4} mx={3}>
        {_.isEmpty(savedData) || !_.isNull(error) ? (
          <Grid container spacing={3}>
            <Grid item mb={1} xs={8}>
              <Typography variant="h4" fontWeight={800} color="primary">
                New Ticket
              </Typography>
            </Grid>

            {/* Subject */}
            <Grid item xs={12}>
              <TextField
                label="Subject"
                variant="outlined"
                value={null}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Grid>

            {/* Tag */}
            <Grid item xs={6}>
              <Autocomplete
                multiple
                freeSolo
                options={options?.tags ?? []}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Tag" required />
                )}
                onChange={(_, value) => setTags(value)}
              />
            </Grid>

            {/* Services */}
            <Grid item xs={6}>
              <Autocomplete
                freeSolo
                options={options?.services ?? []}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Services" required />
                )}
                onChange={(_, value) => setService(value)}
              />
            </Grid>

            {/* Name */}
            <Grid item xs={6}>
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={6}>
              <TextField
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            {/* Assign */}
            <Grid item xs={6}>
              <Autocomplete
                freeSolo
                options={options?.users ?? []}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Assign" required />
                )}
                onChange={(_, value) => setAssigned(value)}
              />
            </Grid>

            {/* CC */}
            <Grid item xs={6}>
              <TextField
                label="CC"
                variant="outlined"
                onChange={(e) => setCarbonCopy(e.target.value)}
              />
            </Grid>

            {/* Department */}
            <Grid item xs={6}>
              <Autocomplete
                freeSolo
                options={options?.departments ?? []}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Department" required />
                )}
                onChange={(_, value) => setDepartment(value)}
              />
            </Grid>

            {/* Priority */}
            <Grid item xs={6}>
              <Autocomplete
                freeSolo
                options={options?.priorities ?? []}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Priority" required />
                )}
                onChange={(_, value) => setPriority(value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider
                sx={{
                  backgroundColor: 'rgb(176 174 174 / 12%)',
                  borderColor: 'rgb(243 243 243 / 12%)',
                }}
              />
            </Grid>

            {/* Predefined Text */}
            <Grid item xs={6}>
              <Autocomplete
                freeSolo
                options={options?.predefined_replies}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Insert Predefined Text"
                    required
                  />
                )}
                onChange={(_, value) => setPredefinedReply(value)}
              />
            </Grid>

            {/* Knowledge base link */}
            <Grid item xs={6}>
              <TextField
                label="Insert knowledge base link"
                variant="outlined"
                value={null}
              />
            </Grid>
            <Grid item xs={12}>
              <Editor
                onInit={(evt, editor) => {
                  editorRef.current = editor;
                  editor.on('Paste Change input Undo Redo', function () {
                    setMessage(editor.getContent());
                  });
                }}
                apiKey="ete4lgqtbj1e2pnldnq9d6d8qnphjgcy9rw4phddizgfqe7z"
                initialValue="<p></p>"
                init={{
                  plugins: 'link image code fullscreen preview',
                  toolbar:
                    'undo redo | bold italic | alignleft aligncenter alignright | code ',
                  branding: false,
                }}
                // onChange={handleEditorChange}
              />
            </Grid>
            <Grid item mb={1} xs={12}>
              <Stack>
                <Stack direction="row" justifyContent="start" spacing={1}>
                  <Typography variant="h7" fontWeight={700} color="primary">
                    Attachments
                  </Typography>
                  <IconButton
                    color="secondary"
                    variant="text"
                    sx={{ fontSize: '1.2em' }}
                    onClick={() => {
                      selectFiles({ multiple: true }, (files) =>
                        setAttachments([...attachments, ...files])
                      );
                    }}
                  >
                    <FileUploadIcon />
                  </IconButton>
                </Stack>
                {_.isEmpty(attachments) ? (
                  <Typography
                    variant="span"
                    fontWeight={400}
                    sx={{ color: '#a8a8a8' }}
                  >
                    No files attached
                  </Typography>
                ) : (
                  attachments?.map((attachment, index) => (
                    <Stack
                      key={index}
                      spacing={1}
                      direction="row"
                      alignItems="center"
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          color: appTheme.palette.secondary.main,
                          textDecoration: 'underline',
                        },
                        '&:hover .remove-button': {
                          display: 'inherit',
                        },
                      }}
                    >
                      <Typography
                        variant="p"
                        sx={{
                          fontSize: '0.85em',
                        }}
                        // onClick={() => {
                        //   if (
                        //     getFileType(attachment.name ?? attachment.file_name) ===
                        //     'image'
                        //   ) {
                        //     handleModal(
                        //       'attachment_preview',
                        //       true,
                        //       attachment.source ?? attachment.file_path
                        //     );
                        //   } else {
                        //     window.open(
                        //       attachment.source ?? attachment.file_path,
                        //       '_blank'
                        //     );
                        //   }
                        // }}
                      >
                        {attachment.name ?? attachment.file_name}
                      </Typography>
                      <IconButton
                        ml={2}
                        className="remove-button"
                        aria-label="remove"
                        onClick={() =>
                          setAttachments([
                            ...attachments.filter(
                              (a) => a.source != attachment.source
                            ),
                          ])
                        }
                        sx={{ display: 'none' }}
                      >
                        <ClearIcon sx={{ fontSize: 12 }} />
                      </IconButton>
                    </Stack>
                  ))
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} justifyContent="flex-end" display="flex">
              <LoadingButton
                variant="contained"
                onClick={handleCTAClick}
                loading={processing}
                disabled={
                  _.isNull(tags) ||
                  _.isNull(service) ||
                  _.isNull(assigned) ||
                  _.isNull(department) ||
                  _.isNull(priority) ||
                  _.isNull(predefinedReply) ||
                  _.isNull(message)
                }
              >
                Create
              </LoadingButton>
            </Grid>
          </Grid>
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              height: '90vh',
              // backgroundImage: `url(${cover})`,
              backgroundSize: 'cover',
              backgroundPositionX: 'center',
            }}
          >
            <Box mb={3}>
              <IconButton
                size="large"
                sx={{
                  width: '4em',
                  height: '4em',
                  backgroundColor: '#52c41a',
                  '&:hover': { backgroundColor: '#52c41a' },
                }}
              >
                <DoneIcon
                  sx={{ width: 'auto', height: 'auto', color: '#fff' }}
                />
              </IconButton>
            </Box>
            <Typography variant="h4" color="primary" fontWeight={700}>
              Ticket Created Successfully!
            </Typography>
            <Stack mt={2} direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={onCloseAndReload}
                sx={{ textTransform: 'none', fontWeight: 700 }}
              >
                Close
              </Button>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Container>
  );
}

NewTicket.propTypes = {
  options: PropTypes.any,
  onClose: PropTypes.any,
  onCloseAndReload: PropTypes.any,
};
export default memo(NewTicket);
