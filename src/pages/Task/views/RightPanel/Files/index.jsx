import { memo, useContext } from 'react';

import { useSelector } from 'react-redux';

// Context
import TaskContext from 'pages/Task/Context';

import theme from 'theme';

import {
  Box,
  Grid,
  Typography,
  styled,
  Card,
  Stack,
  IconButton,
} from '@mui/material';

import PDFIcon from 'assets/icons/file_formats/pdf.svg';
import ExcelIcon from 'assets/icons/file_formats/excel.svg';
import PowerPointIcon from 'assets/icons/file_formats/powerpoint.svg';
import WordIcon from 'assets/icons/file_formats/word.svg';
import OtherFileIcon from '@mui/icons-material/InsertDriveFile';

import { getFileTypeSpecific } from 'pages/Task/helpers';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import _ from 'lodash';

const StyleCard = styled(Card)({
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  boxShadow: '0 0 2px 4px rgb(134 134 134 / 3%)',
  border: '1px solid rgb(134 134 134 / 5%)',
});

const StyledIcon = styled('img')({
  // backgroundColor: 'red',
  height: 100,
  width: 70,
  margin: 'auto',
});

const Files = () => {
  // Redux State
  const { files } = useSelector((state) => state.tasks);
  const { handleModal } = useContext(TaskContext);

  const renderPlaceHolder = (file) => {
    if (getFileTypeSpecific(file.file_name) === 'image') {
      return (
        <img
          src={file.file_path}
          alt={file.file_name}
          style={{ width: '100%', height: '100%' }}
        />
      );
    } else if (getFileTypeSpecific(file.file_name) === 'word') {
      return <StyledIcon alt="word" src={WordIcon} />;
    } else if (getFileTypeSpecific(file.file_name) === 'pdf') {
      return <StyledIcon alt="pdf" src={PDFIcon} />;
    } else if (getFileTypeSpecific(file.file_name) === 'excel') {
      return <StyledIcon alt="excel" src={ExcelIcon} />;
    } else if (getFileTypeSpecific(file.file_name) === 'powerpoint') {
      return <StyledIcon alt="powerpoint" src={PowerPointIcon} />;
    } else {
      return <StyledIcon alt="other" src={OtherFileIcon} />;
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Grid container sx={{ padding: '0.2em 0' }} spacing={2}>
        {!_.isEmpty(files) ? (
          files?.map((file) => (
            <Grid key={file.id} item xs={3}>
              <Stack
                spacing={1}
                sx={{
                  '&:hover .file-name': {
                    color: theme.palette.secondary.main,
                    textDecoration: 'underline',
                  },
                }}
              >
                <StyleCard
                  width="fit-content"
                  sx={{
                    height: 140,
                    cursor: 'pointer',
                    padding: '0 10px',
                  }}
                  onClick={() => {
                    if (getFileTypeSpecific(file.file_name) === 'image') {
                      handleModal('attachment_preview', true, file.file_path);
                    } else {
                      window.open(file.file_path, '_blank');
                    }
                  }}
                >
                  {renderPlaceHolder(file)}
                </StyleCard>
                <Typography
                  className="file-name"
                  display="inline"
                  variant="subtitle1"
                  sx={{
                    fontSize: '0.85em',
                    wordWrap: 'break-word',
                    lineHeight: '1.2',
                    textAlign: 'center',
                  }}
                >
                  {file.file_name}
                </Typography>
              </Stack>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ borderStyle: 'dashed' }}>
              <Stack alignItems="center" p={3}>
                <Box>
                  <IconButton
                    size="large"
                    color="error"
                    disableRipple
                    disableTouchRipple
                    disableFocusRipple
                    sx={{ backgroundColor: '#f2445c1a' }}
                  >
                    <AttachFileIcon />
                  </IconButton>
                </Box>
                <Box>
                  <Typography fontWeight={700} color="#999999">
                    No files found for this task.
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default memo(Files);
