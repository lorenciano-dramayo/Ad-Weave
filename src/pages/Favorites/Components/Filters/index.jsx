import PropTypes from 'prop-types';

// MUI Components
import {
  Stack,
  Box,
  IconButton,
  Typography,
  Divider,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  TextField,
} from '@mui/material';

// MUI Icons
import CloseIcon from '@mui/icons-material/Close';

const Filters = ({ onClose }) => {
  return (
    <Stack>
      <Box p={1.08} display="flex" aligItems="center" justifyContent="center">
        <Typography variant="button" fontWeight={800} sx={{ color: '#888888' }}>
          Filter Favorites
        </Typography>
        <Box position="absolute" top={0} left={0} my={0.5} mx={1}>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <Box px={2} py={2}>
        <Box px={4} py={1}>
          <Typography fontWeight={700} color="primary">
            Channel
          </Typography>
        </Box>
        <Paper variant="outlined">
          <Box py={2} px={3}>
            <FormGroup sx={{ width: 'fit-content' }}>
              {['Google', 'Meta', 'Youtube'].map((data, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      color="primary"
                      sx={{
                        color: '#888888',
                        '& .MuiSvgIconroot': {
                          width: '1.2em',
                          height: '1.2em',
                        },
                      }}
                    />
                  }
                  label={data}
                />
              ))}
            </FormGroup>
          </Box>
        </Paper>
      </Box>
      <Box px={2} py={1}>
        <Box px={4} py={1}>
          <Typography fontWeight={700} color="primary">
            Members
          </Typography>
        </Box>

        <Box>
          <Autocomplete
            disableClearable
            freeSolo
            sx={{
              '& .MuiChip-root': {
                background: '#25175a',
                color: '#fff',
                borderRadius: '4px',
                '& .MuiChip-deleteIcon': {
                  display: 'none',
                },
              },
            }}
            multiple
            options={top100Films}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                placeholder="Select..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: 'auto',
                    minHeight: 45,
                    '&.Mui-focused fieldset': {
                      borderColor: '#5025c4',
                      boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
                    },
                  },
                }}
              />
            )}
            fullWidth
          />
        </Box>
      </Box>
    </Stack>
  );
};

Filters.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Filters;

const top100Films = [];
