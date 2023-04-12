import React, { memo, useState, useRef } from 'react';

import { Editor } from '@tinymce/tinymce-react';

import {
  Grid,
  Button,
  Typography,
  Autocomplete,
  Stack,
  Container,
  TextField,
  IconButton,
} from '@mui/material';

import _ from 'lodash';

import { useFileUpload } from 'use-file-upload';

import appTheme from 'theme';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import ClearIcon from '@mui/icons-material/Clear';

function NewKnowledgeBase() {
  const editorRef = useRef(null);
  const [, selectFiles] = useFileUpload();
  const [attachments, setAttachments] = useState([]);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <Container maxWidth="lg">
      <Stack mt={4} mb={4} mx={3}>
        <Grid container spacing={3}>
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
          <Grid item xs={12}>
            <TextField label="Subject" variant="outlined" value={null} />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={SampleValue}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Group"
                  placeholder="Group"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              freeSolo
              value={null}
              options={[]}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Tags" required />
              )}
              onChange={() => {}}
            />
          </Grid>

          <Grid item xs={12}>
            <Editor
              apiKey="ete4lgqtbj1e2pnldnq9d6d8qnphjgcy9rw4phddizgfqe7z"
              initialValue="<p></p>"
              init={{
                plugins: 'link image code fullscreen preview',
                toolbar:
                  'undo redo | bold italic | alignleft aligncenter alignright | code ',
                branding: false,
              }}
              onChange={log}
            />
          </Grid>

          <Grid item xs={12} justifyContent="flex-end" display="flex">
            <Button variant="contained">Save</Button>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}

export default memo(NewKnowledgeBase);

const SampleValue = [
  { title: 'Sample 1', year: 1 },
  { title: 'Sample 2', year: 2 },
  { title: 'Sample 3', year: 3 },
];
