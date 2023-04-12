import { useState, memo, forwardRef } from 'react';

import _ from 'lodash';

import CloseIcon from '@mui/icons-material/Close';

// MUI Components
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Slide,
  Box,
  Typography,
  Stack,
  Avatar,
  IconButton,
} from '@mui/material';

import PropTypes from 'prop-types';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CommentViewHistoryDialog({ data }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
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
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Box>{'View History'}</Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <DialogContent>
          {data?.list?.map((history, index) => (
            <Box key={index}>
              <Stack spacing={1.5} direction="row" alignItems="center">
                {!_.isEmpty(data?.user?.avatar) &&
                data?.user?.avatar?.split('/').pop() !== 'thumb_' ? (
                  <Avatar
                    sx={{ border: '3px solid #fff' }}
                    alt={data?.user?.name}
                    src={data?.user?.avatar}
                  />
                ) : (
                  <Avatar sx={{ border: '3px solid #fff' }}>
                    {`${data?.user?.name.split(' ')[0][0]}${
                      !_.isEmpty(data?.user?.name.split(' ')[1][0])
                        ? data?.user?.name.split(' ')[1][0]
                        : ''
                    }`}
                  </Avatar>
                )}
                <Stack justifyContent="center">
                  <Typography
                    variant="body1"
                    component="div"
                    fontWeight={700}
                    textTransform="capitalize"
                  >
                    {data?.user?.name?.toLowerCase().includes('ad-weave')
                      ? 'Ad-Weave'
                      : data?.user?.name}
                  </Typography>
                  <Stack
                    direction="row"
                    mt={'-0.5em'}
                    spacing={0.5}
                    alignItems="center"
                  >
                    <Typography variant="caption">
                      {history?.date ?? ''}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              {/*  Thread Info */}
              <Box
                pr={2}
                pb={2}
                lineHeight="initial"
                whiteSpace="pre-line"
                dangerouslySetInnerHTML={{ __html: history?.comment ?? '' }}
              />
            </Box>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default memo(CommentViewHistoryDialog);

CommentViewHistoryDialog.propTypes = {
  user: PropTypes.any,
  data: PropTypes.any,
};
