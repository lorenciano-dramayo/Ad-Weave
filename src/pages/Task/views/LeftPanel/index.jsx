import { memo, useState } from 'react';

import { Box, Tabs, Tab, IconButton, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// Pages
import Overview from 'pages/Task/views/LeftPanel/Overview';
import TimelogTask from 'pages/Task/views/LeftPanel/TimelogTask';
import Revisions from 'pages/Task/views/LeftPanel/Revisions';
import Escalation from 'pages/Task/views/LeftPanel//Escalation';

const LeftPanel = ({ isSubtask, onCloseDialog }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  // const handleRevision = () => {
  //   dispatch(requestFetchRevisionList_(url.split('/')[7]));
  // };

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Stack
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          padding: '0 1em',
          justifyContent: 'space-between',
        }}
        direction="row"
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Overview" disableRipple />
          <Tab label="Time log" disableRipple />
          {!isSubtask && <Tab label="Revisions" disableRipple />}
        </Tabs>
        <IconButton onClick={() => {}}>
          <DeleteOutlineIcon />
        </IconButton>
      </Stack>
      <Box height="calc(100% - 49px)" overflow="auto" px={2} pb={2}>
        {value === 0 && <Overview onCloseDialog={onCloseDialog} />}
        {value === 1 && <TimelogTask />}
        {!isSubtask && value === 2 && <Revisions />}
        {value === 3 && <Escalation />}
      </Box>
    </Box>
  );
};

LeftPanel.propTypes = {
  id: PropTypes.any,
  isSubtask: PropTypes.any,
  onCloseDialog: PropTypes.any,
};

export default memo(LeftPanel);
