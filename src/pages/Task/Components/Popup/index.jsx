import PropTypes from 'prop-types';
import { Popover } from '@mui/material';

const Popup = ({ anchorEl, handleClose, horizontal, content }) => {
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal,
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal,
      }}
    >
      {content}
    </Popover>
  );
};

Popup.propTypes = {
  anchorEl: PropTypes.any,
  handleClose: PropTypes.func.isRequired,
  horizontal: PropTypes.string,
  content: PropTypes.any,
};

export default Popup;
