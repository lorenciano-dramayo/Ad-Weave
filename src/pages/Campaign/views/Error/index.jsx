import PropTypes from 'prop-types';

import { Box, Stack, Typography, Button, IconButton } from '@mui/material';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

export default function Error({ onClose }) {
  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: '75vh' }}>
      <Box mb={3}>
        <IconButton
          size="large"
          sx={{
            width: '4em',
            height: '4em',
            backgroundColor: '#ff4d4f',
            '&:hover': { backgroundColor: '#ff4d4f' },
          }}
        >
          <ReportGmailerrorredIcon
            sx={{ width: 'auto', height: 'auto', color: '#fff' }}
          />
        </IconButton>
      </Box>
      <Typography variant="h4">Failed to load campaign</Typography>
      <Typography>
        This might be an error on the server, please contact the administrator.
      </Typography>
      <Box mt={2}>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Stack>
  );
}

Error.propTypes = {
  onClose: PropTypes.func.isRequired,
};
