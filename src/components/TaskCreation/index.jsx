import React, { useState, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux';

import { clearAll } from 'store/reducers/manualTaskCreation';

// animation
import SwipeableViews from 'react-swipeable-views';

// MUI Components
import { Stack, Box } from '@mui/material';

// Components
import Header from 'components/TaskCreation/views/Header';
import Footer from 'components/TaskCreation/views/Footer';
import GlobalDrawer from 'components/Common/Drawer';
import Summary from 'components/TaskCreation/views/Summary';
import FloatingButton from 'components/TaskCreation/views/FloatingButton';

//Contents
// import TaskCreativeDetails from 'components/TaskCreation/views/CreativeDetails';
import TaskConfiguration from 'components/TaskCreation/views/TaskConfiguration';
import TaskClassification from 'components/TaskCreation/views/Classification';
import TaskDetails from 'components/TaskCreation/views/Details';
// import TaskFormats from 'components/TaskCreation/views/Formats';
import TaskReference from 'components/TaskCreation/views/Reference';
import TaskInstruction from 'components/TaskCreation/views/Instructions';
import Error from 'components/TaskCreation/views/Error';
import Success from 'components/TaskCreation/views/Success';

// Context
import { TaskCreationProvider } from 'components/TaskCreation/Context';

//styles
import { useStyles } from 'components/TaskCreation/styles';

const TaskCreation = ({ onClose }) => {
  const dispatch = useDispatch();

  const {
    save: { data, processing },
    error,
  } = useSelector((state) => state.manualTaskCreation);
  const containerRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(!open);
  };

  const handleTempClose = () => {
    Swal.fire({
      title: 'Are you sure? ',
      text: 'The task you created will not be saved.',
      icon: 'question',
      allowOutsideClick: false,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'Cancel',
      customClass: { container: 'swal-manual-creation-container' },
      backdrop: '#25175aa3',
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          setOpen(false);
          clearTimeout();
          dispatch(clearAll());
          onClose();
        }, 20);
      }
    });
  };

  const handleErrorClose = () => {
    setOpen(false);
    dispatch(clearAll());
    onClose();
  };

  return (
    <Fragment>
      <TaskCreationProvider>
        {!_.isEmpty(error) ? (
          <Error onClose={handleErrorClose} />
        ) : !_.isEmpty(data) && !processing ? (
          <Success
            onClose={handleErrorClose}
            // task={
            //   data?.sub_categories.length > 0
            //     ? data?.sub_categories[0].id
            //     : data?.id
            // }
            // isSubtask={data?.sub_categories.length > 0}
            redirection={data?.redirection}
          />
        ) : (
          <>
            <Stack className={classes.root} ref={containerRef}>
              {/* Floater */}
              <FloatingButton
                floatingButton={classes.floatingButton}
                floatingText={classes.floatingText}
                handleClose={handleClose}
                open={open}
              />

              {/* Header */}
              <Header onClose={handleTempClose} />
              {/* Content */}
              <Box className={classes.content}>
                <SwipeableViews index={index} disabled={true}>
                  <TaskConfiguration />
                  <TaskClassification />
                  {/* <TaskFormats /> */}
                  {/* <TaskCreativeDetails /> */}
                  <TaskDetails />
                  <TaskReference />
                  <TaskInstruction />
                </SwipeableViews>
              </Box>

              {/* Footer */}
              <Footer step={index} setIndex={setIndex} />
            </Stack>

            {/* Drawer for Summary */}
            <GlobalDrawer
              disableEnforceFocus
              content={<Summary />}
              transitionDuration={{ enter: 500, exit: 900 }}
              name="summary-task-creation"
              width={400}
              isOpen={open}
              className={classes.drawer}
              anchor="left"
              BackdropProps={{
                invisible: false,
                sx: { backgroundColor: '#1a1627a3' },
              }}
              hideBackdrop={false}
              onClose={() => false}
              PaperProps={{
                sx: { marginLeft: '700px', background: '#140633' },
              }}
            />
          </>
        )}
      </TaskCreationProvider>
    </Fragment>
  );
};

TaskCreation.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default TaskCreation;
