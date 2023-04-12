import React, { useEffect, Fragment, useContext } from 'react';

import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { updateStartEnd_, getTimesheet } from 'store/reducers/timesheet';
import { totalTime } from 'helpers';
import 'assets/css/timesheet/overide.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import {
  Avatar,
  Chip,
  Typography,
  Stack,
  TableRow,
  TablePagination,
  Paper,
  Box,
} from '@mui/material';
import TimesheetContext from '../../Context';
import Loader from 'pages/Dashboard/Components/Loader';

const columns = [
  {
    id: 'task',
    label: 'Task',
    minWidth: 300,
    isSticky: true,
    align: 'left',
  },

  {
    id: 'user',
    label: 'Staff',
    minWidth: 200,
    isSticky: false,
    align: 'left',
  },
  {
    id: 'timer_type',
    label: 'Classification',
    minWidth: 170,
    isSticky: false,
    align: 'center',
  },
  {
    id: 'task_type',
    label: 'Task Type',
    minWidth: 170,
    isSticky: false,
    align: 'center',
  },
  {
    id: 'start_12hrs',
    label: 'Start',
    minWidth: 180,
    isSticky: false,
    align: 'center',
  },
  {
    id: 'end_12hrs',
    label: 'End',
    minWidth: 180,
    isSticky: false,
    align: 'center',
  },
  {
    id: 'partners',
    label: 'Partner',
    minWidth: 170,
    isSticky: false,
    align: 'center',
  },
  {
    id: 'concepts',
    label: 'Concept',
    minWidth: 170,
    isSticky: false,
    align: 'center',
  },
  {
    id: 'campaigns',
    label: 'Campaign',
    minWidth: 170,
    isSticky: false,
    align: 'center',
  },
  {
    id: 'total',
    label: 'Time(h)',
    minWidth: 170,
    isSticky: false,
    align: 'center',
  },
  {
    id: 'total_decmial',
    label: 'Time(decimal)',
    minWidth: 170,
    isSticky: false,
    align: 'center',
  },
];

export default function TableSheet({ timesheetData, handleRedirect, isTimeSheetFetching, handleFilter }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { handlePopper } = useContext(TimesheetContext);
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getTimesheet());

  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{
                    minWidth: column.minWidth,
                    [column.align]: 0,
                    background: column.isSticky && 'white',
                    zIndex: column.isSticky ? 900 : 800,
                    boxShadow:
                      column.isSticky &&
                      'rgb(136 136 136 / 60%) 0px 0px 6px 0px',
                    clipPath: column.isSticky && 'inset(0px -15px 0px 0px)',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {timesheetData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      return (
                        <TableCell

                          key={column.id}
                          style={{
                            position: column.isSticky ? 'sticky' : 'initial',
                            [column.align]: 0,
                            background: column.isSticky && 'white',
                            zIndex: column.isSticky ? 800 : 1,
                            boxShadow:
                              column.isSticky &&
                              'rgb(136 136 136 / 60%) 0px 0px 6px 0px',
                            clipPath:
                              column.isSticky && 'inset(0px -15px 0px 0px)',
                            textTransform: 'capitalize',
                            textAlign: column.align,
                          }}
                        >
                          {[
                            'total',
                            'total_decmial',
                          ].includes(column?.id) ? (
                            row[column.id]
                          ) : column.id === 'start_12hrs' ? (

                            <Box onClick={(e) =>
                              handlePopper(e, 'start_12hrs',
                                {
                                  type: 'start_12hrs',
                                  timer_id: row['timer_id'],
                                  selectedDate: row[column.id],
                                  timer_type: row['timer_type']
                                }


                              )}>{row[column.id]}  </Box>

                          ) : column.id === 'end_12hrs' ? (

                            <Box onClick={(e) =>
                              handlePopper(e, 'end_12hrs',
                                {
                                  type: 'end_12hrs',
                                  timer_id: row['timer_id'],
                                  selectedDate: row[column.id],
                                  timer_type: row['timer_type']
                                }


                              )}>{row[column.id]}  </Box>
                          ) : column.id === 'timer_type' ? (
                            <Chip

                              label={row[column.id]}
                              size="small"
                              sx={{ borderRadius: '3px', height: '19px' }}
                              color={
                                row[column.id] === 'subtask'
                                  ? 'secondary'
                                  : row[column.id] === 'task'
                                    ? 'primary'
                                    : 'warning'
                              }
                            />
                          ) : column.id === 'user' ? (
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                            >
                              <Avatar
                                sx={{ width: 22, height: 22, fontSize: 12 }}
                                src={row[column.id]?.avatar}
                                alt={row[column.id]?.name}
                              />
                              <Typography
                                variant="body2"
                                sx={{
                                  display: '-webkit-box',
                                  WebkitLineClamp: '1',
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                }}
                              >
                                {row[column.id]?.name}
                              </Typography>
                            </Stack>
                          ) : _.isEmpty(row[column.id]?.name) ? (
                            '-'
                          ) : ['task', 'subtask', 'preset']?.includes(
                            column?.id

                          ) ? (
                            <Typography
                              className={row['timer_type'] === 'preset' ? 'preset__active' : ''}
                              variant="body2"
                              onClick={(e) =>
                                handleRedirect(
                                  e,
                                  row?.timer_type,
                                  row?.task?.id
                                )
                              }
                              sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: '1',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                cursor:
                                  column?.id?.includes('task') && 'pointer',
                                color:
                                  !column?.id?.includes('task') && '#bdbdbd',
                                ':hover': {
                                  color:
                                    column?.id?.includes('task') && '#F22076',
                                },
                              }}
                            >
                              {row[column.id]?.name}
                            </Typography>
                          ) : column?.id === 'task_type' ? (
                            <Typography
                              variant="body2"
                              sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: '1',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {row[column.id]?.name}
                            </Typography>
                          ) : (
                            row[column.id]?.name
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          borderTop: '1px solid #ececec',
          justifyContent: 'flex-end',
          padding: '0 1em',
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            borderTop: '4px solid #000',
            margin: '0.2em',
          }}
        >
          <Typography>Total:</Typography>
          <Typography fontWeight={700}>
            {totalTime(_.map(timesheetData, (times) => times?.total))}
          </Typography>
        </Stack>
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={timesheetData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

TableSheet.propTypes = {
  timesheetData: PropTypes.any,
  handleRedirect: PropTypes.any,
  isTimeSheetFetching: PropTypes.any,
  handleFilter: PropTypes.any,
};
