import PropTypes from 'prop-types';

import { Snackbar, Alert, AlertTitle } from '@mui/material';

const GlobalSnackbar = ({
    isOpen,
    anchor,
    onClose,
    alertType,
    alertHeader,
    alertContent
}) => {
  return (
    <Snackbar
      anchorOrigin={anchor}
      open={isOpen}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert variant="filled" severity={alertType} elevation={4}>
        <AlertTitle
          fontWeight={700}
          sx={{ marginTop: '-5px', marginBottom: 0, color:'#fff' }}
        >
          {alertHeader}
        </AlertTitle>
        {alertContent}
      </Alert>
    </Snackbar>
  );
};

GlobalSnackbar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    anchor: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    alertType: PropTypes.string.isRequired,
    alertHeader: PropTypes.string,
    alertContent: PropTypes.string.isRequired
}

export default GlobalSnackbar;