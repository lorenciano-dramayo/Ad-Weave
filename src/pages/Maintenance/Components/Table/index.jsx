import React from 'react';
import PropTypes from 'prop-types';

// MUI Components
import {
  Box,
  Table,
  TableContainer,
  TablePagination,
  Divider,
} from '@mui/material';

// Components
import EnhancedTableHead from 'pages/Maintenance/Components/Table/TableHead';
import EnhancedTableBody from 'pages/Maintenance/Components/Table/TableBody';

const EnhancedTable = ({ data, tableHeading, setDataSelected }) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(null);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.id);
      setSelected(newSelecteds);
      setDataSelected(newSelecteds);
      return;
    }

    setSelected([]);
    setDataSelected([]);
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
    setDataSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box
      sx={{
        height: 'calc(100vh - 11.8rem)',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <TableContainer sx={{ height: '-webkit-fill-available' }}>
        <Table
          sx={{ minWidth: 'max-content' }}
          aria-labelledby="tableTitle"
          size="small"
          stickyHeader
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            headCells={tableHeading}
          />
          {/* Body */}
          <EnhancedTableBody
            data={data}
            order={order}
            orderBy={orderBy}
            page={page}
            rowsPerPage={rowsPerPage}
            isSelected={isSelected}
            handleClick={handleClick}
            emptyRows={emptyRows}
            tableHeading={tableHeading}
          />
        </Table>
      </TableContainer>
      {/* Pagination */}
      <Divider />
      <TablePagination
        sx={{ overflow: 'hidden' }}
        rowsPerPageOptions={[20, 35, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

EnhancedTable.propTypes = {
  data: PropTypes.array.isRequired,
  tableHeading: PropTypes.array.isRequired,
  setDataSelected: PropTypes.func.isRequired,
};

export default EnhancedTable;
