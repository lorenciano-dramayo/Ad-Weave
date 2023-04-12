// MUI
import { styled } from '@mui/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

// App Components
import CollapsibleTableRow from './Row';

// Utilities
import PropTypes from 'prop-types';

// Table
const StyledTable = styled(Table)({
  padding: 0,
  marginTop: '0.2em',
  borderCollapse: 'separate',
  width: '100%',
  overflow: 'hidden',
});

// Table Header
const StyledHeaderCell = styled(TableCell)({
  fontSize: '1em',
  textAlign: 'center',
  padding: '9px 0px',
  borderBottom: 0,
  minWidth: 200,
  '&:first-child p': {
    fontSize: '1.2em',
    textAlign: 'left',
  },
});

const StyledHeaderTitle = styled(Typography)({
  fontSize: '1em',
  fontWeight: '500 !important',
});

const CollapsibleTable = ({
  config,
  dataset,
  tableProps,
  isEditable,
  onStatusChange,
  onClickRow,
  searchData,
  searchType,
}) => {
  const { columns, rows, isColumnHeaderHidden } = dataset;
  return (
    <StyledTable {...tableProps}>
      <TableHead>
        <TableRow>
          {!isColumnHeaderHidden &&
            columns.map((column) => (
              <StyledHeaderCell key={column}>
                <StyledHeaderTitle>{column}</StyledHeaderTitle>
              </StyledHeaderCell>
            ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <CollapsibleTableRow
            key={row.id}
            config={config}
            columns={columns}
            data={row}
            searchData={searchData}
            searchType={searchType}
            tableProps={tableProps}
            isEditable={isEditable}
            onStatusChange={onStatusChange}
            onClickRow={onClickRow}
          />
        ))}
      </TableBody>
    </StyledTable>
  );
};

CollapsibleTable.propTypes = {
  config: PropTypes.object,
  tableProps: PropTypes.object,
  dataset: PropTypes.object.isRequired,
  isEditable: PropTypes.bool,
  onStatusChange: PropTypes.func,
  onClickRow: PropTypes.func,
  searchData: PropTypes.any,
  searchType: PropTypes.any,
};

export default CollapsibleTable;
