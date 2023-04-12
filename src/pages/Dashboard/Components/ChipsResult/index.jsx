import React from 'react';

import PropTypes from 'prop-types';

import _ from 'lodash';

// Mui Components
import { Stack, Chip, Button } from '@mui/material';

// MUI Icons
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// colors
import { appColors } from 'theme/variables';

export default function ChipResult({
  handleFilterDelete,
  handleReset,
  dash_data,
}) {
  return (
    <Stack
      direction="row"
      sx={{
        marginBottom:
          !_.isEmpty(dash_data) &&
          Object.keys(dash_data).map((keys) => keys !== 'queues').length > 0
            ? '8px'
            : 0,
        display: 'block',
      }}
    >
      {!_.isEmpty(dash_data) &&
        Object.keys(dash_data).map(
          (keys) =>
            keys !== 'queues' &&
            dash_data[keys].split(',').map((data, index) => (
              <Chip
                key={index}
                label={keys === 'search' ? `'${data}'` : data}
                size="small"
                onDelete={() => handleFilterDelete(keys, data)}
                color="primary"
                deleteIcon={<CloseRoundedIcon />}
                sx={{
                  borderRadius: '0.3em',
                  textTransform: keys !== 'search' ? 'capitalize' : 'normal',
                  marginRight: '0.5em',
                  maxWidth: '150px',
                  '.MuiChip-deleteIcon': {
                    fontSize: '12px',
                  },
                }}
              />
            ))
        )}

      {/* Rest Button */}
      {/* {Object.keys(dash_data).length > 1 && (
        <Button
          variant="text"
          startIcon={<HighlightOffIcon />}
          size="small"
          sx={{
            textTransform: 'capitalize',
            fontWeight: 700,
            color: appColors.lightViolet,
            '.MuiButton-startIcon': {
              marginRight: '4px',
              '.MuiSvgIcon-root': { fontSize: '12px' },
            },
            '&:hover': { background: 'transparent' },
          }}
          disableRipple
          disableElevation
          disableFocusRipple
          disableTouchRipple
          onClick={handleReset}
        >
          Reset
        </Button>
      )} */}
    </Stack>
  );
}

ChipResult.propTypes = {
  handleFilterDelete: PropTypes.func,
  handleReset: PropTypes.func,
  dash_data: PropTypes.any,
};
