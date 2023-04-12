import * as React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  IconButton,
  TableRow,
} from '@mui/material';

// Styles
import { useStyles } from 'components/Widgets/TableList/styles';

//components
import TaskName from 'components/Widgets/TableList/TaskName';
import TaskStatus from 'components/Widgets/TableList/TaskStatus';
import TaskTypes from 'components/Widgets/TableList/TaskTypes';
import Users from 'components/Widgets/TableList/Users';

// constant
import { channelIcons } from 'constants/widgets';

const columns = [
  { id: 'task_name', label: 'Task Name', minWidth: 200 },
  { id: 'task_status', label: 'Status', minWidth: 100, align: 'center' },
  { id: 'channel', label: 'Channel', minWidth: 100, align: 'center' },
  {
    id: 'assignee',
    label: 'Assignee',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'date_created',
    label: 'Date Created',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'date_submitted',
    label: 'Date Submitted',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'delivery_date',
    label: 'Delivery Date',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'members',
    label: 'Members',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'task_type',
    label: 'Task type',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'parent_task',
    label: 'Parent Task',
    minWidth: 150,
    align: 'center',
  },
  {
    id: 'concept',
    label: 'Concept',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'campaign',
    label: 'Campaign',
    minWidth: 100,
    align: 'center',
  },
];

const rows = [
  {
    task_name: 'Lorem Ipsum dolor sit amet, consect',
    task_status_id: 0,
    channel: 'google',
    assignee: ['John Wick', 'Jay Cole', 'Bon Vis', 'Dhen Mark'],
    date_created: '05-25-2022',
    date_submitted: '05-25-2022',
    delivery_date: '05-26-2022',
    members: ['Ginna Cole', 'Kate Cole'],
    task_type_id: 12,
    parent_task: 'Here',
    concept: 'Concept',
    campaign: 'Campaign',
  },
  {
    task_name: 'Ipsum dolor sit amet, consect',
    task_status_id: 0,
    channel: 'facebook',
    assignee: ['Dhen Mark'],
    date_created: '05-25-2022',
    date_submitted: '05-25-2022',
    delivery_date: '05-26-2022',
    members: ['Bon Vista'],
    task_type_id: 12,
    parent_task: 'Here',
    concept: 'Concept',
    campaign: 'Campaign',
  },
];

const TableList = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box className={classes.root}>
      <Box sx={{ border: '1px solid #ececec' }}>
        <TableContainer sx={{ maxHeight: 334, minHeight: 334 }}>
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: '#8a80af',
                      color: '#fff',
                      fontWeight: 700,
                      textAlign: 'center',
                      zIndex: 0,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.task_name}
                    >
                      {columns.map((column) => {
                        let value = null;
                        switch (column.id) {
                          case 'task_name':
                            //   task name
                            value = (
                              <TaskName
                                key={column.id}
                                taskAlign={column.align}
                                taskClass={classes.multiLineEllipsis}
                                taskValue={row[column.id]}
                                taskLink={'/to'}
                              />
                            );
                            break;
                          case 'task_status':
                            //   status
                            value = (
                              <TaskStatus
                                key={column.id}
                                align={column.align}
                                value={'Complete'}
                              />
                            );
                            break;
                          case 'channel':
                            value = (
                              <TableCell key={column.id} align={column.align}>
                                <Box>
                                  <IconButton
                                    component="span"
                                    sx={{
                                      padding: 0,
                                    }}
                                  >
                                    {channelIcons[`${row[column.id]}`]}
                                  </IconButton>
                                </Box>
                              </TableCell>
                            );
                            break;

                          case 'assignee':
                          case 'members':
                            value = (
                              <Users
                                key={column.id}
                                align={column.align}
                                value={row[column.id]}
                              />
                            );
                            break;

                          case 'task_type':
                          case 'parent_task':
                            value = <TaskTypes key={column.id} />;
                            break;

                          case 'concept':
                          case 'campaign':
                            value = (
                              <TableCell key={column.id} align={column.align}>
                                <Box>{row[column.id]}</Box>
                              </TableCell>
                            );
                            break;

                          default:
                            value = (
                              <TableCell key={column.id} align={column.align}>
                                <Box>{row[column.id]}</Box>
                              </TableCell>
                            );
                            break;
                        }

                        return value;
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default TableList;
