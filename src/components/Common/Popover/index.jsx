import PropTypes from 'prop-types';

// MUI Components
import { Popover } from '@mui/material';

export default function GlobalPopover({
  id,
  isOpen,
  anchorEl,
  handleClose,
  popperHorizontal,
  content,
}) {
  return (
    <Popover
      id={id}
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: popperHorizontal,
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: popperHorizontal,
      }}
      PaperProps={{
        sx: {
          marginTop: '0.15em',
          boxShadow: '3px 5px 11px 0px #25165b59',
          minWidth: 0,
        },
      }}
    >
      {content}
    </Popover>
  );
}

GlobalPopover.propTypes = {
  id: PropTypes.any,
  isOpen: PropTypes.bool,
  anchorEl: PropTypes.any,
  handleClose: PropTypes.func,
  popperHorizontal: PropTypes.any,
  content: PropTypes.any,
};
