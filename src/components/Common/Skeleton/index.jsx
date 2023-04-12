// MUI
import { Skeleton } from '@mui/material';
// Utilities
import PropTypes from 'prop-types';

const CustomSkeletonLoader = ({ children, ...props }) => {
  return (
    <Skeleton animation="wave" {...props}>
      {children}
    </Skeleton>
  );
};

CustomSkeletonLoader.propTypes = {
  props: PropTypes.object,
  children: PropTypes.node,
};

export default CustomSkeletonLoader;
