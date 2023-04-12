import React, { useState, Fragment } from 'react';

// MUI Components
import { Stack, Button, Backdrop } from '@mui/material';

// Components
import SpeedDialTooltip from 'components/Common/SpeedDial';
import GlobalDrawer from 'components/Common/Drawer';
import TaskCreation from 'components/TaskCreation';
import TaskTimer from 'components/TaskTimer/index';

// Icons
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

// Styles
import { useStyles } from 'components/Affix/styles';

function Affix() {
  const classes = useStyles();
  const [openTaskTimer, setOpenTaskTimer] = useState(false);
  const [openTaskCreation, setOpenTaskCreation] = useState(false);

  function handleTaskTimerClick() {
    setOpenTaskTimer((prev) => !prev);
  }

  function handleTaskCreationClick() {
    setOpenTaskCreation((prev) => !prev);
  }

  return (
    <Fragment>
      <Stack className={classes.actions}>
        <Stack>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            startIcon={<AddOutlinedIcon />}
            size="small"
            disableElevation
            onClick={handleTaskCreationClick}
          >
            Task
          </Button>
        </Stack>
        <Stack>
          <SpeedDialTooltip setSelected={handleTaskTimerClick} />
        </Stack>
      </Stack>
      {/* Task Timer */}
      <TaskTimer isOpen={openTaskTimer} handleClose={handleTaskTimerClick} />
      {/* Drawer */}
      <Backdrop
        sx={{ background: '#25175aa3', zIndex: 2 }}
        open={openTaskCreation || openTaskTimer}
      />
      <GlobalDrawer
        content={<TaskCreation onClose={handleTaskCreationClick} />}
        transitionDuration={{ enter: 300, exit: 0 }}
        name="search"
        width={700}
        isOpen={openTaskCreation}
        className={classes.drawer}
        anchor="left"
        BackdropProps={{
          invisible: true,
          sx: { backgroundColor: '#25175aa3' },
        }}
        hideBackdrop={true}
      />
    </Fragment>
  );
}

export default Affix;
