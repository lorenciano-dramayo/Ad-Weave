import PropTypes from 'prop-types';

// MUI Components
import { Popper, Paper, Fade } from '@mui/material';
import { ClickAwayListener } from '@mui/base';

const GlobalPopper = ({
  isOpen,
  placement,
  anchorEl,
  onClose,
  content,
  ...props
}) => (
  <Popper
    open={isOpen}
    disablePortal={true}
    anchorEl={anchorEl}
    placement={placement}
    transition
    {...props}
  >
    {({ TransitionProps }) => (
      <ClickAwayListener onClickAway={onClose}>
        <Fade {...TransitionProps} timeout={350}>
          <Paper elevation={5}>{content}</Paper>
        </Fade>
      </ClickAwayListener>
    )}
  </Popper>
);

GlobalPopper.propTypes = {
  isOpen: PropTypes.bool,
  placement: PropTypes.any,
  content: PropTypes.any,
  onClose: PropTypes.func,
  anchorEl: PropTypes.any,
};

export default GlobalPopper;
