import React, { memo } from 'react';
import { Drawer } from '@mui/material';
// Utilities
import PropTypes from 'prop-types';

const GlobalDrawer = ({
  width,
  isOpen,
  anchor,
  variant,
  content,
  ...props
}) => {
  return (
    <Drawer
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
        },
      }}
      variant={variant}
      anchor={anchor}
      open={isOpen}
      {...props}
    >
      {content}
    </Drawer>
  );
};

GlobalDrawer.propTypes = {
  width: PropTypes.any,
  isOpen: PropTypes.bool,
  anchor: PropTypes.string,
  variant: PropTypes.string,
  content: PropTypes.any,
};

export default memo(GlobalDrawer);
