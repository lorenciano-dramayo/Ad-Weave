import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

// Sweetalert
import Swal from 'sweetalert2';

import { Link } from 'react-router-dom';

import _ from 'lodash';

import PropTypes from 'prop-types';

// Asset Download
import JSZip from 'jszip';

// Saver
import { saveAs } from 'file-saver';

import { updateAssetDownload } from 'store/reducers/concept';

import {
  Alert,
  Stack,
  Box,
  Typography,
  Divider,
  IconButton,
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  AlertTitle,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LinkIcon from '@mui/icons-material/Link';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';

import { appColors } from 'theme/variables';

const StyledListItemText = styled(ListItemText)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: initial;
  -webkit-text-decoration: none;
  text-decoration: none;
`;

export default function AssetDownload({ overview, onClose, conceptId }) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(0);

  // download asset
  const downloadAssets = async (assets) => {
    const zip = new JSZip();

    if (!_.isEmpty(assets)) {
      dispatch(
        updateAssetDownload({
          id: conceptId,
          isDownloading: true,
        })
      );

      const assetLinks = assets.map(async (item) => {
        const response = await fetch(item.url);
        const data = await response.blob();

        zip.file(item.name, data);

        return data;
      });

      Promise.all(assetLinks).then(() => {
        zip.generateAsync({ type: 'blob' }).then((content) => {
          saveAs(content, `${overview.concept.name}.zip`);
          Toast.fire({
            title: 'Downloaded successfully!',
          }).then(() => {
            dispatch(
              updateAssetDownload({
                id: conceptId,
                isDownloading: false,
              })
            );
          });
        });
      });
    }
  };

  return (
    <>
      <Stack
        p={1}
        px={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography fontWeight={800} color={appColors.black}>
            Assets
          </Typography>
        </Box>
        <Box>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              '&:hover': {
                backgroundColor: appColors.lightViolet,
                color: '#fff',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Stack>
      <Divider />

      <Box p={1} px={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Box>
            <Typography fontWeight={700} variant="body1" color="primary">
              {overview?.assets?.length + overview?.assetLinks?.length} Assets
              found
            </Typography>
          </Box>
          <Box>
            <Button
              variant="outlined"
              disableElevation
              color="secondary"
              size="small"
              sx={{
                textTransform: 'none',
                '&:hover': { color: '#fff', backgroundColor: '#F22076' },
              }}
              startIcon={<CloudDownloadOutlinedIcon />}
              onClick={() => downloadAssets(overview?.assets)}
            >
              Download All
            </Button>
          </Box>
        </Stack>
        <Divider />
        {/* assets */}
        {!_.isEmpty(overview?.assetLinks) && (
          <Box mt={1}>
            <Alert
              variant="outlined"
              severity="info"
              sx={{
                border: '1px solid rgba(80,37,196,.5)',
                boxShadow: '0 0 0 4px rgb(80 37 196 / 5%)',
                '.MuiAlert-icon': {
                  color: appColors.lightViolet,
                },
                '.MuiAlert-message': {
                  width: '100%',
                },
                '&:hover': { boxShadow: '0 8px 17px rgb(80 37 196 / 40%)' },
              }}
            >
              <AlertTitle
                sx={{
                  marginTop: '-6px',
                  fontWeight: 700,
                  color: appColors.lightViolet,
                }}
              >
                Asset Links
              </AlertTitle>
              {overview?.assetLinks?.map((data, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack
                    direction="row"
                    component={Link}
                    spacing={1}
                    alignItems="center"
                    to={{
                      pathname: data?.name,
                    }}
                    target="_blank"
                    sx={{
                      fontWeight: 700,
                      color: '#f22076',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <LinkIcon />
                    </Box>
                    <Box>{data?.name}</Box>
                  </Stack>
                  <Box>
                    <Typography
                      variant="overline"
                      fontWeight={800}
                      color="secondary"
                    >
                      {data?.type}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Alert>
          </Box>
        )}

        <Grid container spacing={2} p={2}>
          <Grid item xs={8} sx={{ paddingLeft: '0 !important' }}>
            <Box
              sx={{
                backgroundColor: '#ececec',
                width: '100%',
                height: 'calc(100vh - 15.6em)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #c5c5c5',
                overflow: 'hidden',
              }}
            >
              {['png', 'jpg', 'jpeg', 'gif'].includes(
                overview?.assets[selected]?.name.split('.').pop()
              ) ? (
                <img
                  style={{
                    position: 'relative',
                    maxHeight: '-webkit-fill-available',
                  }}
                  alt={overview?.assets[selected]?.name}
                  src={overview?.assets[selected]?.url}
                />
              ) : (
                overview?.assets[selected]?.type
              )}
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box mb={1}>
              <Typography
                variant="button"
                fontWeight={800}
                sx={{ color: appColors.darkGray }}
              >
                Name
              </Typography>
              <Typography variant="h6" fontWeight={800} color="secondary">
                {overview?.assets[selected]?.name
                  .split('.')
                  .slice(0, -1)
                  .join('.')}
              </Typography>
            </Box>
            <Box mb={1}>
              <Typography
                variant="button"
                fontWeight={800}
                sx={{ color: appColors.darkGray }}
              >
                Type
              </Typography>
              <Typography
                variant="h6"
                fontWeight={800}
                textTransform="uppercase"
                color="secondary"
              >
                {overview?.assets[selected]?.name.split('.').pop()}
              </Typography>
            </Box>
            <Box mb={1}>
              <Typography
                variant="button"
                fontWeight={800}
                sx={{ color: appColors.darkGray }}
              >
                Category
              </Typography>
              <Typography
                variant="h6"
                fontWeight={800}
                textTransform="capitalize"
                color="secondary"
              >
                {overview?.assets[selected]?.type}
              </Typography>
            </Box>
            {/* List */}
            <Divider />
            <Box mt={2} />
            <Typography
              variant="button"
              fontWeight={800}
              sx={{ color: appColors.darkGray }}
            >
              Assets
            </Typography>
            <List>
              {overview?.assets?.map((data, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton size="small">
                      <FileDownloadIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    onClick={() => setSelected(index)}
                    selected={index === selected}
                    dense
                  >
                    <ListItemIcon sx={{ minWidth: '35px' }}>
                      {index === selected ? (
                        <CheckIcon color="secondary" />
                      ) : (
                        <CheckIcon color="secondary" sx={{ opacity: 0 }} />
                      )}
                    </ListItemIcon>
                    <StyledListItemText
                      primary={
                        <Typography
                          variant="body2"
                          fontWeight={800}
                          sx={{
                            color:
                              selected === index
                                ? '#25165B'
                                : appColors.lightViolet,
                          }}
                        >
                          {data?.name}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          textTransform="capitalize"
                          color={appColors.gray}
                        >
                          {data?.type}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

AssetDownload.propTypes = {
  overview: PropTypes.any,
  onClose: PropTypes.func,
  conceptId: PropTypes.any,
};

// Toast notification
const Toast = Swal.mixin({
  toast: true,
  icon: 'success',
  position: 'top-right',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});
