import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { DropzoneAreaBase } from 'react-mui-dropzone';

const Uploader = ({ setAsset }) => {
  const handleAdd = (obj) => {
    setAsset((prevState) => [...prevState, ...obj]);
  };

  return (
    <Box>
      <DropzoneAreaBase
        filesLimit={100}
        dropzoneClass="drop-zone-base"
        dropzoneText="Drag and Drop files here."
        onAdd={(fileObjs) => handleAdd(fileObjs)}
      />
    </Box>
  );
};

Uploader.propTypes = {
  setAsset: PropTypes.func,
};

export default Uploader;
