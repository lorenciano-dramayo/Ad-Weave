import PropTypes from 'prop-types';

// MUI Components
import {
  Box,
  Stack,
  Modal,
  Typography,
  Zoom,
  Divider,
  styled,
  Button,
} from '@mui/material';

// components
import MaintenanceInput from 'pages/Maintenance/Components/Input';

// Styled
const StyledStack = styled(Box)({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  margin: '2rem auto',
  overflow: 'hidden',
  left: 0,
  width: 900,
  backgroundColor: '#fff',
  border: '1px solid #5025c44f',
  borderRadius: 25,
  boxShadow: '0px 0 13px 3px rgb(0 0 0 / 20%)',
});

const MaintenanceModal = ({ openModal, title, headers, handleClick }) => {
  return (
    <Modal
      keepMounted
      open={openModal}
      onClose={() => handleClick('add')}
      sx={{ marginLeft: '50px' }}
      BackdropProps={{
        sx: { backgroundColor: '#25175aa3', marginLeft: '50px' },
      }}
    >
      <Zoom in={openModal}>
        <StyledStack>
          <Box p={2}>
            <Typography variant="h6" component="h2">
              {title}
            </Typography>
          </Box>
          <Divider />
          <Stack
            sx={{
              overflow: 'scroll',
              height: 'calc(100vh - 12em)',
            }}
            p={2}
          >
            {headers.map((data, index) => (
              <Box key={index}>
                <MaintenanceInput name={data.label} />
              </Box>
            ))}
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="center" spacing={1} p={1}>
            <Button
              onClick={() => handleClick('add')}
              variant="contained"
              disableElevation
              color="error"
            >
              Cancel
            </Button>
            <Button disableElevation variant="contained">
              Save
            </Button>
          </Stack>
        </StyledStack>
      </Zoom>
    </Modal>
  );
};

MaintenanceModal.propTypes = {
  openModal: PropTypes.any,
  title: PropTypes.string,
  headers: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default MaintenanceModal;
