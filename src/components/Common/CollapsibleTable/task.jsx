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

import _ from 'lodash';

import { useRouteMatch } from 'react-router-dom';

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

const CollapsibleTableTask = ({
  config,
  dataset,
  tableProps,
  isEditable,
  onStatusChange,
  onClickRow,
}) => {
  const { url } = useRouteMatch();
  const { columns, rows, isColumnHeaderHidden } = dataset;
  return (
    <StyledTable {...tableProps}>
      <TableHead>
        <TableRow>
          {!isColumnHeaderHidden &&
            columns.map((column, index) => (
              <StyledHeaderCell key={index}>
                <StyledHeaderTitle>{column}</StyledHeaderTitle>
              </StyledHeaderCell>
            ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows
          .filter((c) => c.id === url.split('/')[7])
          .map((row) => (
            <CollapsibleTableRow
              key={row.id}
              config={config}
              columns={columns}
              data={row}
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

CollapsibleTableTask.propTypes = {
  config: PropTypes.object,
  tableProps: PropTypes.object,
  dataset: PropTypes.object.isRequired,
  isEditable: PropTypes.bool,
  onStatusChange: PropTypes.func,
  onClickRow: PropTypes.func,
};

export default CollapsibleTableTask;
