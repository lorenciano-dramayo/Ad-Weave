import * as React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import _ from 'lodash';

// MUI Components
import {
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  Typography,
} from '@mui/material';

// helpers

import { stableSort, getComparator } from 'pages/Maintenance/helpers';

const EnhancedTableBody = ({
  data,
  order,
  orderBy,
  page,
  rowsPerPage,
  isSelected,
  handleClick,
  emptyRows,
  tableHeading,
}) => {
  return (
    <TableBody>
      {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
      {stableSort(data, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const isItemSelected = isSelected(row.id);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              hover
              onClick={(event) => handleClick(event, row.id)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.id}
              selected={isItemSelected}
            >
              <TableCell
                padding="checkbox"
                sx={{
                  position: 'sticky',
                  left: 0,
                  background: isItemSelected ? '#edecf2' : '#fff',
                  borderBottom:
                    isItemSelected && '1px solid rgba(224, 224, 224, 1)',
                }}
              >
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                  sx={{
                    '& .MuiSvgIcon-root': {
                      width: '1.5em',
                      height: '1.5em',
                    },
                  }}
                />
              </TableCell>
              {tableHeading.map((dataItem, index) => (
                <TableCell key={index} align={dataItem.align}>
                  {_.isNull(row[dataItem.id]) || row[dataItem.id] === '' ? (
                    '-'
                  ) : _.includes(['updated_at', 'created_at'], dataItem.id) ? (
                    <Moment format="MM/DD/YY (hh:mm:ss A)">
                      {row[dataItem.id]}
                    </Moment>
                  ) : _.includes(['name', 'fullname'], dataItem.id) ? (
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      color="secondary"
                    >
                      {row[dataItem.id]}
                    </Typography>
                  ) : (
                    row[dataItem.id]
                  )}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 33 * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

EnhancedTableBody.propTypes = {
  data: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.any,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  isSelected: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  emptyRows: PropTypes.number.isRequired,
  tableHeading: PropTypes.array.isRequired,
};

export default EnhancedTableBody;
