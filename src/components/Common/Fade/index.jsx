// MUI
import { Fade } from '@mui/material';
// Utilities
import PropTypes from 'prop-types';

const CustomFade = ({ children, ...props }) => {
  return (
    <Fade
      timeout={400}
      easing={{
        enter: 'ease-out',
      }}
      {...props}
    >
      <div>{children}</div>
    </Fade>
  );
};

CustomFade.propTypes = {
  children: PropTypes.node,
};

export default CustomFade;
