import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  getTaskRevisions,
  getRevisionsList,
  requestDeleteRevision_,
  addSubtaskRevision,
  addChecklistRevision,
} from 'store/reducers/tasks';
import { getData } from 'store/reducers/manualTaskCreation';
import PropTypes from 'prop-types';
import TablePagination from '@mui/material/TablePagination';
import { useRouteMatch } from 'react-router-dom';

import {
  Button,
  Stack,
  Checkbox,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Menu,
  MenuItem,
  Fade,
  TextField,
} from '@mui/material';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';

import { visuallyHidden } from '@mui/utils';

import _ from 'lodash';

function createData(user, team, feedback, report_link) {
  return {
    user,
    team,
    feedback,
    report_link,
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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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
    id: 'user',
    numeric: false,
    disablePadding: true,
    label: 'User',
  },
  {
    id: 'team',
    numeric: false,
    disablePadding: true,
    label: 'Team',
  },
  {
    id: 'feedback',
    numeric: false,
    disablePadding: true,
    label: 'Feedback',
  },
  {
    id: 'report_link',
    numeric: false,
    disablePadding: true,
    label: 'Report Link',
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

  const [isSelected, setIsSelected] = useState(
    rowCount > 0 && numSelected === rowCount
  );

  return (
    <TableHead sx={{ backgroundColor: '#F9F9FC' }}>
      <TableRow>
        <TableCell sx={{ padding: '1em 1em 1em 0.5em' }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={isSelected}
            onChange={() => {
              onSelectAllClick(!isSelected);
              setIsSelected((prev) => !prev);
            }}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
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

export default function Revisions() {
  const { overview, data_revision_tab } = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

  const { url } = useRouteMatch();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('team');
  const [selectedRevisions, setSelectedRevisions] = useState([]);
  const [revisions, setRevisionData] = useState(data_revision_tab);
  const [subtaskPopperAnchorEl, setSubtaskPopperAnchorEl] = useState(null);
  const [itemChcked, setItemChcked] = useState([]);
  const [itemChckedString, setItemChckedString] = useState('');
  const [itemChckedAddSubtask, setItemChckedAddSubtask] = useState([]);

  const urlParams = url.split('/');

  useEffect(() => {
    const taskIdFromURL = urlParams.pop();
    // dispatch(getTaskRevisions({ id: overview?.id, type: overview?.rel_type }));
    dispatch(
      getRevisionsList(overview?.id ?? taskIdFromURL, page, rowsPerPage)
    );
    setRevisionData(data_revision_tab);
  }, []);

  const isRevisionSelected = (id) => selectedRevisions.indexOf(id) !== -1;

  const handleChangePage = (newPage) => {
    setPage(newPage);
    dispatch(getRevisionsList(urlParams.pop(), newPage, rowsPerPage));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(page);
    dispatch(
      getRevisionsList(urlParams.pop(), page, parseInt(event.target.value, 10))
    );
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (isCheckboxSelected) => {
    if (isCheckboxSelected) {
      const newSelected = (data_revision_tab ?? []).map((n) => n.id);
      setSelectedRevisions(newSelected);
      return;
    }

    setSelectedRevisions([]);
  };

  const handleSubtaskClick = (event) => {
    setSubtaskPopperAnchorEl(event.currentTarget);
  };

  const handleSubtaskPopperClose = () => {
    setSubtaskPopperAnchorEl(null);
  };

  const handleDeleteClick = () => {
    const params = {
      rel_id: urlParams.pop(),
      rel_type: overview?.rel_type,
      ids: selectedRevisions.join(),
    };
    dispatch(requestDeleteRevision_(params));
    setRevisionData(data_revision_tab);
    setSelectedRevisions([]);
  };

  const handleChecklistClick = () => {
    const params = {
      rel_id: urlParams.pop(),
      rel_type: overview?.rel_type,
      ids: selectedRevisions.join(),
    };
    dispatch(addChecklistRevision(params));
    setRevisionData(data_revision_tab);
  };

  const handleSubtaskSelection = (id) => {
    const taskIdFromURL = urlParams.pop();
    setSubtaskPopperAnchorEl(null);
    const params = {
      task_id: taskIdFromURL,
      category_id: id,
      revision_id: selectedRevisions,
    };
    dispatch(addSubtaskRevision(params));
    setSelectedRevisions([]);
  };

  const handleRevisionSelection = (item) => {
    setSelectedRevisions((prev) =>
      prev?.indexOf(item.id) !== -1
        ? [...prev.filter((i) => i !== item.id)]
        : [...prev, item.id]
    );
  };

  const isSubtaskPopperOpen = Boolean(subtaskPopperAnchorEl);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mt: 2 }} elevation={0} variant="outlined">
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={'small'}>
            <EnhancedTableHead
              numSelected={selectedRevisions?.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data_revision_tab?.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(
                data_revision_tab ?? [],
                getComparator(order, orderBy)
              ).map((row, index) => {
                const isItemSelected = isRevisionSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    aria-checked={isItemSelected}
                    selected={isItemSelected}
                    onClick={() => handleRevisionSelection(row)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                        checked={isItemSelected}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.user}
                    </TableCell>
                    <TableCell>{row.team}</TableCell>
                    <TableCell>
                      <div
                        dangerouslySetInnerHTML={{ __html: row.feedback }}
                      ></div>{' '}
                    </TableCell>
                    <TableCell>{row.report_link}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Stack direction="row" justifyContent="space-between" mt={2}>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteOutlineOutlinedIcon />}
          onClick={handleDeleteClick}
          disableElevation
          disabled={_.isEmpty(selectedRevisions)}
        >
          Delete
        </Button>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AddOutlinedIcon />}
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleSubtaskClick}
            disabled={_.isEmpty(selectedRevisions)}
          >
            Subtask
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FactCheckOutlinedIcon />}
            disableElevation
            onClick={handleChecklistClick}
            disabled={_.isEmpty(selectedRevisions)}
          >
            Checklist
          </Button>
        </Stack>
      </Stack>
      <TablePagination
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={subtaskPopperAnchorEl}
        open={isSubtaskPopperOpen}
        onClose={handleSubtaskPopperClose}
        TransitionComponent={Fade}
      >
        <TextField />
        {overview?.task_sub_categories?.map((subCategory, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleSubtaskSelection(subCategory?.id);
            }}
            sx={{ fontSize: '1em' }}
          >
            {subCategory?.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
