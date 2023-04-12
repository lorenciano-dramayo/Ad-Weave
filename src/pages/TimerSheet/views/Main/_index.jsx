import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Paper,
  Table,
  IconButton,
  Tooltip,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Grid,
  Divider,
} from '@mui/material';
import { getTimesheet, getTimesheetOption } from 'store/reducers/timesheet';
import Header from 'pages/TimerSheet/views/components/Header';
import _ from 'lodash';
import LineGraph from 'pages/TimerSheet/views/components/LineGraph';
import PieGraph from 'pages/TimerSheet/views/components/PieGraph';

function createData(
  staff_member,
  tasks,
  timesheet_tags,
  start_time,
  end_time,
  notes,
  related,
  time_h,
  time_decimal
) {
  return {
    staff_member,
    tasks,
    timesheet_tags,
    start_time,
    end_time,
    notes,
    related,
    time_h,
    time_decimal,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'staff_member',
    numeric: false,
    disablePadding: false,
    label: 'Staff Member',
  },
  {
    id: 'tasks',
    numeric: false,
    disablePadding: false,
    label: 'Tasks',
  },
  {
    id: 'timesheet_tags',
    numeric: false,
    disablePadding: false,
    label: 'Timesheet Tags',
  },
  {
    id: 'start_time',
    numeric: false,
    disablePadding: false,
    label: 'Start Time',
  },
  {
    id: 'end_time',
    numeric: false,
    disablePadding: false,
    label: 'End Time',
  },
  {
    id: 'notes',
    numeric: false,
    disablePadding: false,
    label: 'Notes',
  },
  {
    id: 'related',
    numeric: false,
    disablePadding: false,
    label: 'Related',
  },
  {
    id: 'time_h',
    numeric: false,
    disablePadding: false,
    label: 'Time(h)',
  },
  {
    id: 'time_decimal',
    numeric: false,
    disablePadding: false,
    label: 'Time(Decimal)',
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Timesheet
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ''
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const Main = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = timesheetList.map((n) => n.staff_member);
      setSelected(newSelected);
      return;
    }

    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - timesheetList.length) : 0;
  const dispatch = useDispatch();
  const { data, optionTimesheet } = useSelector((state) => state.timesheet);

  const timesheetList = (data?.data ?? []).map((item) => ({
    id: item.timelog_id,
    staff_member: item.user || '-',
    tasks: item.task_name || '-',
    timesheet_tags: item.status || '-',
    start_time: item.start || '-',
    end_time: item.end || '-',
    notes: item.note || '-',
    related: item.related || '-',
    time_h: item.start || '-',
    time_decimal: item.end || '-',
  }));

  const [filteredRows, setFilteredRows] = useState(timesheetList);

  useEffect(() => {
    setFilteredRows(timesheetList);
    dispatch(getTimesheetOption());
  }, [data]);

  useEffect(() => {
    dispatch(getTimesheet());
  }, []);

  const handleSearch = (query) => {
    if (_.isEmpty(query)) {
      return setFilteredRows(timesheetList);
    }

    setFilteredRows(
      timesheetList.filter((x) => {
        return x.staff_member.toLowerCase().includes(query.toLowerCase());
      })
    );
  };

  const handleFilter = (filters) => {
    if (_.isEmpty(filters) || _.isEmpty(filters.staffs)) {
      return setFilteredRows(timesheetList);
    }

    setFilteredRows(
      timesheetList.filter((x) => {
        return filters.staffs.includes(x.staff_member.toLowerCase());
      })
    );
  };

  return (
    <>
      <Box sx={{ width: '97%', margin: 'auto', paddingTop: '25px' }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <PieGraph />
          </Grid>
          <Grid item xs={2}>
            <PieGraph />
          </Grid>
          <Grid item xs={2}>
            <PieGraph />
          </Grid>
          <Grid item xs={2}>
            <PieGraph />
          </Grid>
          <Grid item xs={2}>
            <PieGraph />
          </Grid>
        </Grid>

        <LineGraph />
        <Header
          onSearch={handleSearch}
          onFilter={handleFilter}
          optionList={optionTimesheet}
        />
        <Paper sx={{ width: '100%', mb: 2, mt: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={filteredRows.length}
              />
              <TableBody>
                {stableSort(filteredRows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);

                    return (
                      <TableRow
                        hover
                        // onClick={(event) => handleClick(event, row.staff_member)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.staff_member}
                        selected={isItemSelected}
                      >
                        <TableCell align="left">{row.staff_member}</TableCell>
                        <TableCell align="left">{row.tasks}</TableCell>
                        <TableCell align="left">{row.timesheet_tags}</TableCell>
                        <TableCell align="left">{row.start_time}</TableCell>
                        <TableCell align="left">{row.end_time}</TableCell>
                        <TableCell align="left">{row.notes}</TableCell>
                        <TableCell align="left">{row.related}</TableCell>
                        <TableCell align="left">{row.time_h}</TableCell>
                        <TableCell align="left">{row.time_decimal}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
};

export default Main;
