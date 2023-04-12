import PropTypes from 'prop-types';

import { Stack, Box, Typography, Button, Divider } from '@mui/material';

const Header = ({ onClose }) => {
  return (
    <Box>
      <Stack
        justifyContent="space-between"
        direction="row"
        padding="0.5em 0.7em"
      >
        <Box>
          <Button variant="text" onClick={onClose}>
            Cancel
          </Button>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="button" color="#848484bd" fontWeight={700}>
            CREATE NEW TASK
          </Typography>
        </Box>
        <Box width={'64px'}>
          {/* <Button
            variant="outlined"
            disabled={
              (_.isEmpty(team) && _.isEmpty(taskType) && _.isEmpty(subTask))
            }
          >
            SAVE DRAFT
          </Button> */}
        </Box>
      </Stack>
      <Divider />
    </Box>
  );
};

Header.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Header;
