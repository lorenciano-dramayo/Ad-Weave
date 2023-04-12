import PropTypes from 'prop-types';

import { useHistory, useLocation } from 'react-router-dom';

import { Box, Stack, Typography, Button, IconButton } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

import cover from 'assets/cover.svg';

Success.propTypes = {
  onClose: PropTypes.func.isRequired,
  redirection: PropTypes.any,
};

export default function Success({ onClose, redirection }) {
  const history = useHistory();
  const location = useLocation();

  const handleGoToTaskClick = () => {
    const relType = redirection.split('/')[1];

    localStorage?.removeItem('isURL');

    history.push({
      pathname: `${redirection}`,
      state: {
        background: location,
        type: relType,
        subtask: relType == 'subtask',
      },
    });

    onClose();
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: '100vh',
        backgroundImage: `url(${cover})`,
        backgroundSize: 'cover',
        backgroundPositionX: 'center',
      }}
    >
      <Box mb={3}>
        <IconButton
          size="large"
          sx={{
            width: '4em',
            height: '4em',
            backgroundColor: '#52c41a',
            '&:hover': { backgroundColor: '#52c41a' },
          }}
        >
          <DoneIcon sx={{ width: 'auto', height: 'auto', color: '#fff' }} />
        </IconButton>
      </Box>
      <Typography variant="h4" color="#fff" fontWeight={700}>
        Task Created Successfully!
      </Typography>
      <Typography color="#a3a3a4">
        Updating of details will be done in the task.
      </Typography>
      <Stack mt={2} direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ textTransform: 'none', fontWeight: 700 }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleGoToTaskClick}
          sx={{ textTransform: 'none', fontWeight: 700 }}
        >
          Go to task
        </Button>
      </Stack>
    </Stack>
  );
}
