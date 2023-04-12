import * as React from 'react';

import _ from 'lodash';

import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

// Reducer
import { threadComment, updateTaskByKey } from 'store/reducers/tasks';

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Slide,
  Box,
  Typography,
  Stack,
  FormControl,
  Select,
  MenuItem,
  Autocomplete,
} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CommentDialog({
  type,
  threadId,
  taskId,
  isParent,
  userId,
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const [reportLink, setReportLink] = React.useState('');
  const [reason, setReason] = React.useState('');
  const [drivenType, setDrivenType] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    type === 'thread_resolve'
      ? dispatch(
          threadComment('thread_resolve', {
            comment_id: threadId,
            status: 1,
            report_link: reportLink,
          })
        )
      : dispatch(
          threadComment('thread_reject', {
            comment_id: threadId,
            status: 2,
            note: notes,
            reason: reason,
            driven_type: drivenType,
            report_link: reportLink,
          })
        );
    dispatch(
      updateTaskByKey({
        is_parent: isParent,
        id: taskId,
        key: 'assignees',
        value: userId,
      })
    );

    setOpen(!open);
  };

  const canSave =
    type === 'thread_resolve'
      ? !_.isEmpty(reportLink)
      : !_.isEmpty(reason) && !_.isEmpty(reportLink) && !_.isEmpty(drivenType);

  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        TransitionComponent={Transition}
        BackdropProps={{
          sx: { backgroundColor: '#1a1627a3' },
        }}
        maxWidth={'sm'}
        fullWidth={true}
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box alignItems="center" display="flex">
              {type === 'thread_resolve' ? (
                <CheckCircleOutlinedIcon color="success" />
              ) : (
                <HighlightOffOutlinedIcon color="error" />
              )}
            </Box>
            <Box>
              {type === 'thread_resolve' ? 'Resolve Thread' : 'Reject Thread'}
            </Box>
          </Stack>
        </DialogTitle>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <DialogContent>
          {type === 'thread_resolve' ? (
            <Stack mb={2}>
              <Typography fontWeight={700}>Report Link</Typography>
              <TextField
                fullWidth
                placeholder="Report Link"
                onChange={(e) => setReportLink(e.target.value)}
              />
            </Stack>
          ) : (
            <>
              <Stack mb={2}>
                <Typography fontWeight={700}>Reason for Rejection</Typography>
                {/* <Autocomplete
                  freeSolo
                  inputValue={reason}
                  onInputChange={(event, newInputValue) => {
                    setReason(newInputValue);
                  }}
                  options={top100Films.map((option) => option.title)}
                  renderInput={(params) => <TextField {...params} />}
                /> */}
                <TextField
                  fullWidth
                  onChange={(e) => setReason(e.target.value)}
                />
              </Stack>
              <Stack mb={2}>
                <Typography fontWeight={700}>Report Link</Typography>
                <TextField
                  fullWidth
                  onChange={(e) => setReportLink(e.target.value)}
                />
              </Stack>
              <Stack mb={2}>
                <Typography fontWeight={700}>Driven Type</Typography>
                <FormControl fullWidth>
                  <Select onChange={(e) => setDrivenType(e.target.value)}>
                    <MenuItem value={'Dev Driven'}>Developer</MenuItem>
                    <MenuItem value={'PM'}>PM</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack mb={2}>
                <Typography fontWeight={700}>Notes</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Stack>
            </>
          )}
        </DialogContent>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disableElevation
            variant="contained"
            onClick={handleSave}
            color="secondary"
            disabled={!canSave}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CommentDialog.propTypes = {
  type: PropTypes.string,
  threadId: PropTypes.any,
  taskId: PropTypes.any,
  isParent: PropTypes.any,
  userId: PropTypes.any,
};

const top100Films = [
  {
    title: 'Wrong Assets',
  },
  {
    title: 'No Creative Border',
  },
  {
    title: 'Backup image not set',
  },
];
