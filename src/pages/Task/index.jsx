import { useState, useEffect, forwardRef } from 'react';

import _ from 'lodash';

import { useDispatch } from 'react-redux';

import { fetchOverview } from 'store/reducers/concept';

// Context
import { TaskProvider } from 'pages/Task/Context';

import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import { Dialog, Zoom, Box } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

import Main from 'pages/Task/views/Main';

// Styles
import { useStyles } from 'pages/Task/styles';
import '../../assets/css/concept/task/overide.css';

export default function Task() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const { taskId } = useParams();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (
      !localStorage?.getItem('redirect')?.includes('task') &&
      !_.isEmpty(localStorage?.getItem('isURL'))
    ) {
      localStorage?.setItem('redirect', location.pathname);
      setOpen(false);
      history.push('/dashboard');
    } else {
      setOpen(true);
      localStorage.removeItem('redirect');
    }
  }, []);

  const handleCloseDialog = (subtaskId) => {
    setOpen(false);
    !_.isEmpty(url.split('/')[2]) &&
      !_.isEmpty(url.split('/')[4]) &&
      dispatch(
        fetchOverview({
          conceptId: url.split('/')[4],
          partnerId: url.split('/')[2],
        })
      );

    // localStorage.setItem('projectLink', url.split('/task')[0]);
    history.goBack();

    // Open modal if has subtaskId
    if (subtaskId) {
      const state = {
        pathname: `/subtask/${subtaskId}`,
        state: {
          background: location.state.background,
          type: 'subtask',
          subtask: 'true',
        },
      };
      setTimeout(function () {
        localStorage?.removeItem('isURL');
        history.push(state);
      }, 300);
    }
  };

  return (
    <Dialog
      keepMounted
      closeAfterTransition
      fullWidth
      disableEnforceFocus
      open={open}
      TransitionComponent={Transition}
      maxWidth="lg"
      sx={{
        '.MuiDialog-container': { marginLeft: '3em' },
        '.MuiPaper-root': {
          maxHeight: '100vh',
        },
      }}
      onClose={() => handleCloseDialog(null)}
    >
      <TaskProvider>
        <Main
          id={taskId}
          relType={location.state?.type}
          onCloseDialog={handleCloseDialog}
        />
      </TaskProvider>
    </Dialog>
  );
}
