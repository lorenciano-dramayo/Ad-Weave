import { memo } from 'react';

import { DataGrid } from '@mui/x-data-grid';

import clsx from 'clsx';

// MUI Components
import { Box, Typography, Tooltip } from '@mui/material';

import PropTypes from 'prop-types';

const renderColumnCellWithTooltip = (params) => (
  <Tooltip
    title={
      params.value === '-' ? (
        ''
      ) : (
        <Typography
          sx={{ color: 'white', fontSize: '1.15em', lineHeight: '1.6em' }}
        >
          {params.value}
        </Typography>
      )
    }
    placement="bottom-end"
  >
    <span
      style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {params.value}
    </span>
  </Tooltip>
);

const columns = [
  { field: 'id', headerName: 'ID', hideable: true },
  {
    field: 'status',
    headerName: 'Status',
    cellClassName: (params) => {
      return clsx('status', {
        'status--resolved': params.value == 'Resolved',
        'status--rejected': params.value == 'Rejected',
      });
    },
  },
  { field: 'assignee', headerName: 'Assignee', flex: 1 },
  {
    field: 'reason',
    headerName: 'Reason',
    flex: 1,
    renderCell: renderColumnCellWithTooltip,
  },
  {
    field: 'driven',
    headerName: 'Driven',
  },
  {
    field: 'notes',
    headerName: 'Notes',
    flex: 2,
    renderCell: renderColumnCellWithTooltip,
  },
];

function ResponseSummary({ data }) {
  const rows = data.map((d) => ({
    id: d.user_id,
    status: d.status,
    assignee: d.user_name,
    reason: d.reason ?? '-',
    driven: d.driven_type ?? '-',
    notes: d.note ?? '-',
  }));

  return (
    <Box
      sx={{
        m: 3,
        height: '500px',
        '& .status': {
          '& .MuiDataGrid-cellContent': {
            backgroundColor: 'transparent',
          },
        },
        '& .status--resolved': {
          '& .MuiDataGrid-cellContent': {
            color: '#2ED47A !important',
          },
        },
        '& .status--rejected.MuiDataGrid-cellContent': {
          '& .MuiDataGrid-cellContent': {
            color: '#EB5757 !important',
          },
        },
      }}
    >
      <DataGrid
        initialState={{
          columns: {
            columnVisibilityModel: {
              // Hide columns status and traderName, the other columns will remain visible
              id: false,
            },
          },
        }}
        rows={rows}
        columns={columns}
        disableSelectionOnClick
      />
    </Box>
  );
}

export default memo(ResponseSummary);

ResponseSummary.propTypes = {
  data: PropTypes.any,
};
