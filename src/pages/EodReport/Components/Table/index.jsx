import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import {
  Box,
  Typography,
  Modal,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 80, hide: false },
  { field: 'type', headerName: 'Type', width: 130 },
  { field: 'name', headerName: 'Name', width: 310 },
  { field: 'date', headerName: 'Date', width: 230 },
  { field: 'channel', headerName: 'Channel', width: 230 },
  // { field: 'delivery_date', headerName: 'Delivery Date', width: 150 },
  // { field: 'live_date', headerName: 'Live Date', width: 150 },
  // { field: 'latest_update', headerName: 'Latest Update', width: 130 },
  // { field: 'next_step', headerName: 'Next Step', width: 130 },
  // { field: 'critical_items', headerName: 'Critical Items', width: 130 },
  // { field: 'risk_level', headerName: 'Risk Level', width: 130 },
];

const useStyles = makeStyles(() => ({
  inputContainer: {
    marginBottom: '15px',
  },
  titleTxtModal: {
    margin: '0',
    fontWeight: '600',
    fontSize: '26px',
    textTransform: 'capitalize',
    color: 'white',
    backgroundImage: 'linear-gradient(90deg, #e0238c, #f22076 47.43%, #f96666)',
    '-webkit-background-clip': 'text',
    '-moz-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '770px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const EodTable = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [, setType] = React.useState('');
  const [modalData, setmodalData] = React.useState('');
  const classes = useStyles();

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const tableList = (data?.data ?? []).map((item) => ({
    id: item.id,
    type: item.type,
    name: item.name,
    date: item.delivery_date,
    channel: item.channel,
  }));

  const handleOpenModal = (data) => {
    setOpen(true);
    setmodalData(data);
  };

  return (
    <>
      <div style={{ height: 'calc(100vh - 16em)', width: '100%' }}>
        <DataGrid
          // disableSelectionOnClick={true}
          rows={tableList}
          columns={columns}
          onRowClick={(rowData) => handleOpenModal(rowData.row)}
          initialState={{
            pagination: {
              pageSize: 10,
            },
          }}
          // pageSize={data.per_page}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className={classes.inputContainer}>
            <Typography variant="p" className={classes.titleTxtModal}>
              Information EOD
            </Typography>
          </Box>
          <Box className={classes.inputContainer}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={modalData.type}
                label="Type"
                onChange={handleChange}
              >
                <MenuItem value="Campaign">Campaign</MenuItem>
                <MenuItem value="Concept">Concept</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className={classes.inputContainer}>
            <TextField value={modalData.name} label="Name" variant="outlined" />
          </Box>

          <Box className={classes.inputContainer}>
            <TextField value={modalData.date} label="Date" variant="outlined" />
          </Box>
          <Box className={classes.inputContainer}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={modalData.channel}
                label="Type"
                onChange={handleChange}
              >
                <MenuItem value="Youtube">Youtube</MenuItem>
                <MenuItem value="Facebook">Facebook</MenuItem>
                <MenuItem value="Google">Google</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className={classes.inputContainer}>
            <Button variant="outlined">Update</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

EodTable.propTypes = {
  data: PropTypes.string,
};

export default EodTable;
