import React, { memo, useState, forwardRef, useEffect } from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button,
  Typography,
  Autocomplete,
  Stack,
  Container,
  Slide,
  Divider,
  IconButton,
  Box,
  Chip,
  Tooltip,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import _ from 'lodash';

import { useFileUpload } from 'use-file-upload';

import { getFileType } from 'pages/Task/helpers';

import appTheme from 'theme';

import { appColors } from 'theme/variables';

// MUI Icons
import OtherFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/Link';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ViewTicket({ open, data, onClose }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        TransitionComponent={Transition}
        BackdropProps={{
          sx: { backgroundColor: '#1a1627a3' },
        }}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Tooltip title="Click to open link">
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <LinkIcon
                    color="secondary"
                    sx={{ transform: 'rotate(90deg)', mt: -0.4 }}
                  />
                  <Box
                    target="_blank"
                    component={Link}
                    to={{
                      pathname: `${data?.public_url}`,
                    }}
                    sx={{
                      color: 'inherit',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      ':hover': {
                        color: '#F22076',
                      },
                    }}
                  >{`Ticket #${data?.ticketid}`}</Box>
                </Stack>
              </Tooltip>
              {data?.priority && (
                <Chip
                  size="small"
                  label={data?.priority}
                  sx={{
                    color: 'white',
                    backgroundColor:
                      appColors.priority[data?.priority?.toLowerCase()],
                  }}
                />
              )}
            </Stack>

            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <DialogContent>
          <Stack spacing={3}>
            {/* Subject and Tags */}
            <Stack spacing={1}>
              <Typography variant="h5" fontWeight={800}>
                {data?.subject}{' '}
              </Typography>
              <Stack direction="row" spacing={1}>
                {!_.isEmpty(data?.tags) &&
                  data?.tags?.map((tag) => (
                    <Chip
                      size="medium"
                      key={tag?.id}
                      label={tag?.name}
                      sx={{ borderRadius: '3px' }}
                    />
                  ))}
              </Stack>
            </Stack>

            {/* User details and message */}
            <Stack spacing={2}>
              {/* Sender */}
              <Stack spacing={1}>
                <Stack direction="row">
                  <Stack spacing={-1} flex={1}>
                    <Typography
                      sx={{
                        color: 'rgba(0,0,0,.3)',
                      }}
                      fontWeight={600}
                      variant="body2"
                    >
                      SENDER
                    </Typography>
                    <Typography fontWeight={600}>
                      {data?.sender_name}
                    </Typography>
                  </Stack>

                  {/* Assigned to */}
                  <Stack spacing={-1} flex={1}>
                    <Typography
                      sx={{
                        color: 'rgba(0,0,0,.3)',
                      }}
                      fontWeight={600}
                      variant="body2"
                    >
                      ASSIGNED TO
                    </Typography>
                    <Typography fontWeight={600}>
                      {data?.assigned_name}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="row">
                  {/* Service Name */}
                  <Stack spacing={-1} flex={1}>
                    <Typography
                      sx={{
                        color: 'rgba(0,0,0,.3)',
                      }}
                      fontWeight={600}
                      variant="body2"
                    >
                      SERVICE NAME
                    </Typography>
                    <Typography fontWeight={600}>{data?.service}</Typography>
                  </Stack>

                  {/* Department */}
                  <Stack spacing={-1} flex={1}>
                    <Typography
                      sx={{
                        color: 'rgba(0,0,0,.3)',
                      }}
                      fontWeight={600}
                      variant="body2"
                    >
                      DEPARTMENT
                    </Typography>
                    <Typography fontWeight={600}>{data?.department}</Typography>
                  </Stack>
                </Stack>
                {/* <Typography fontWeight={600}>{data?.status_name}</Typography> */}
              </Stack>

              {/* Message */}
              <Box
                lineHeight="initial"
                whiteSpace="pre-line"
                dangerouslySetInnerHTML={{
                  __html: data?.message ?? 'No message found',
                }}
                pt={1}
                pb={2}
              />

              <Divider
                sx={{
                  backgroundColor: 'rgb(176 174 174 / 12%)',
                  borderColor: 'rgb(243 243 243 / 12%)',
                }}
              />

              {/* Attachments */}
              <Stack>
                <Typography
                  fontWeight={600}
                  //   color="secondary"
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  Attachments
                </Typography>
                {_.isEmpty(data?.ticket_attachments) ? (
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(0,0,0,.3)',
                    }}
                  >
                    No Attachments Found
                  </Typography>
                ) : (
                  <Stack spacing={-1}>
                    {data?.ticket_attachments?.map((attachment, index) => (
                      <Stack
                        key={index}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            color: appTheme.palette.secondary.main,
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
                          <OtherFileIcon
                            color="secondary"
                            sx={{ marginTop: '2px' }}
                          />
                          <Typography
                            variant="p"
                            sx={{
                              fontSize: '0.85em',
                            }}
                            onClick={() => {
                              window.open(attachment.link, '_blank');
                            }}
                          >
                            {`File ${index + 1}`}
                          </Typography>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                )}

                <Stack></Stack>
              </Stack>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
}

ViewTicket.propTypes = {
  open: PropTypes.any,
  data: PropTypes.any,
  onClose: PropTypes.any,
};

export default memo(ViewTicket);
