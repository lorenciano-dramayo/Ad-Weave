import { Chip, TableCell, Box } from '@mui/material';

const TaskTypes = () => {
  return (
    <TableCell align="center">
      <Box>
        <Chip
          label="Concept Design"
          color="secondary"
          size="small"
          variant="outlined"
        />
      </Box>
    </TableCell>
  );
};

export default TaskTypes;
