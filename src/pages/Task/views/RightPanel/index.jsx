import { memo, useState } from 'react';

import { Box, Tabs, Tab } from '@mui/material';

import Update from 'pages/Task/views/RightPanel/Update';
import ActivityLog from 'pages/Task/views/RightPanel/ActivityLog';
import Files from 'pages/Task/views/RightPanel/Files';

const RightPanel = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', padding: '0 1em' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Update" disableRipple />
          <Tab label="Activity log" disableRipple />
          <Tab label="Files" disableRipple />
        </Tabs>
      </Box>
      <Box height="calc(100% - 49px)" overflow="auto" p={2}>
        {value === 0 ? <Update /> : <Box />}
        {value === 1 ? <ActivityLog /> : <Box />}
        {value === 2 ? <Files /> : <Box />}
      </Box>
    </Box>
  );
};

export default memo(RightPanel);
