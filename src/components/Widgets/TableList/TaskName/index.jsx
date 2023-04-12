import * as React from 'react';
import PropTypes from 'prop-types';

import { Box, TableCell } from '@mui/material';

const TaskName = ({ taskAlign, taskClass, taskValue, taskLink }) => {
  return (
    <TableCell
      onClick={() => {}}
      align={taskAlign}
      sx={{ textDecoration: 'none', cursor: 'pointer' }}
    >
      <Box className={taskClass}>{taskValue}</Box>
    </TableCell>
  );
};

TaskName.propTypes = {
  taskAlign: PropTypes.string,
  taskClass: PropTypes.any,
  taskValue: PropTypes.any,
  taskLink: PropTypes.string,
};

export default TaskName;
