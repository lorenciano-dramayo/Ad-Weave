import React, { useState, useContext } from 'react';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import _ from 'lodash';

// Context
import TaskCreationContext from 'components/TaskCreation/Context';

import {
  Box,
  Divider,
  Stack,
  Button,
  Typography,
  styled,
  Card,
  IconButton,
  Grid,
  Tabs,
  Tab,
  Collapse,
} from '@mui/material';

import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';

import Uploader from 'components/TaskCreation/Components/Uploader';
import Reference from 'components/TaskCreation/Components/Reference';

const StyledTypography = styled(Typography)`
  background-image: linear-gradient(90deg, #e0238c, #f22076 47.43%, #f96666);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`;

const StyledCard = styled(Card)`
  background: rgba(80, 37, 196, 0.05);
  border: 2px solid rgba(80, 37, 196, 0.1);
  border-radius: 4px;
  padding: 1em;
`;

const TaskReference = () => {
  const {
    concept,
    channel,
    campaign,
    subTask,
    taskType,
    asset,
    referenceLinks,
    setReferenceLinks,
    setAsset,
  } = useContext(TaskCreationContext);

  const {
    data: { assetLinks },
  } = useSelector((state) => state.manualTaskCreation);

  const [value, setValue] = useState(0);
  const [isUpload, setUpload] = useState(false);
  const [isReference, setReference] = useState(false);
  const [suggestion, setSuggestion] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUpload = () => {
    setUpload(!isUpload);
    setReference(false);
  };

  const handleReference = () => {
    setReference(!isReference);
    setUpload(false);
  };

  const addReference = () => {
    setReferenceLinks((prevState) => [...prevState, ...assetLinks]);
    setSuggestion(false);
  };

  const filterAsset = (i) => {
    setAsset(_.filter(asset, (v, index) => index !== i));
  };

  const filterReference = (i) => {
    setReferenceLinks(_.filter(referenceLinks, (v, index) => index !== i));
  };

  return (
    <Box
      padding="40px 60px"
      height="calc(100vh - 7.2em)"
      sx={{ overflowY: 'auto' }}
    >
      <Stack direction="row">
        <Typography variant="h4" color="primary" fontWeight={800}>
          {!_.isEmpty(subTask?.name)
            ? subTask?.name
            : !_.isEmpty(taskType?.name)
            ? taskType?.name
            : ''}
          {_.isEmpty(concept?.name)
            ? ' - Untitled'
            : _.isEmpty(campaign?.name)
            ? ` - ${concept?.name} - `
            : ` - ${campaign?.name} - `}
          <StyledTypography
            variant="caption"
            fontSize={'1.9732142857142858rem'}
            lineHeight={1.3}
            fontWeight={800}
          >
            {_.isEmpty(channel?.name) ? '' : `${channel?.name}`}
          </StyledTypography>
        </Typography>
      </Stack>
      <Box mb={2}>
        <Typography>
          Provide reference links and assets to be use by the team.
        </Typography>
      </Box>

      {!_.isEmpty(assetLinks) && (
        <Collapse in={suggestion}>
          <Box mb={2}>
            <StyledCard variant="outlined">
              <Typography sx={{ fontSize: '0.93em' }}>
                We&apos;ve detected asset links to this concept. Do you want to
                include this to the task?
              </Typography>
              <Stack
                spacing={1}
                direction="row"
                sx={{ marginBottom: '0.65em' }}
              >
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => addReference()}
                >
                  Include all
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setSuggestion(false)}
                >
                  Nope
                </Button>
              </Stack>

              {assetLinks.map((data, index) => (
                <Box
                  component={Link}
                  to={{ pathname: data.name }}
                  target="_blank"
                  key={index}
                  sx={{ textDecoration: 'none' }}
                >
                  <Typography fontWeight={700} color="primary">
                    {data.name}
                  </Typography>
                </Box>
              ))}
            </StyledCard>
          </Box>
        </Collapse>
      )}

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box>
            <Button
              fullWidth
              disableElevation
              size="large"
              sx={{
                background: isUpload ? '#F22076' : '#ececec85',
                '&:hover': { background: isUpload ? '#F22076' : '#ececec85' },
              }}
              onClick={handleUpload}
            >
              <Stack alignItems="center">
                <CloudUploadOutlinedIcon
                  sx={{ fontSize: 25, color: isUpload ? '#fff' : 'initial' }}
                />
                <Typography
                  sx={{
                    color: isUpload ? '#fff' : 'initial',
                    textTransform: 'capitalize',
                  }}
                >
                  Upload File
                </Typography>
              </Stack>
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Button
              fullWidth
              disableElevation
              size="large"
              sx={{
                background: isReference ? '#F22076' : '#ececec85',
                '&:hover': {
                  background: isReference ? '#F22076' : '#ececec85',
                },
              }}
              onClick={handleReference}
            >
              <Stack alignItems="center">
                <AddLinkOutlinedIcon
                  sx={{ fontSize: 25, color: isReference ? '#fff' : 'initial' }}
                />
                <Typography
                  sx={{
                    color: isReference ? '#fff' : 'initial',
                    textTransform: 'capitalize',
                  }}
                >
                  Add Reference Link
                </Typography>
              </Stack>
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Collapse in={isUpload || isReference}>
        <Box mt={2}>
          {isUpload ? <Uploader setAsset={setAsset} /> : null}{' '}
          {isReference ? (
            <Reference setReferenceLinks={setReferenceLinks} />
          ) : null}{' '}
        </Box>
      </Collapse>

      <Box sx={{ width: '100%' }} mt={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="All" disableRipple />
            <Tab label="Files" disableRipple />
            <Tab label="Reference Links" disableRipple />
          </Tabs>
        </Box>
        {value === 0 ? (
          <Box>
            {!_.isEmpty(asset) &&
              asset.map((data, index) => (
                <Box key={index}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ padding: '1em 0' }}
                  >
                    <Box>
                      <Typography fontWeight={700} fontSize="1.1em">
                        {data?.file?.name.split('').length > 40
                          ? `${data?.file?.name.slice(0, 40)} ...`
                          : data?.file?.name}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={2}>
                      <Box>
                        <Typography fontWeight={600} color="secondary">
                          Assets
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton
                          size="small"
                          onClick={() => filterAsset(index)}
                        >
                          <DoDisturbOnOutlinedIcon />
                        </IconButton>
                      </Box>
                    </Stack>
                  </Stack>
                  <Divider />
                </Box>
              ))}

            {!_.isEmpty(referenceLinks) &&
              referenceLinks.map((data, index) => (
                <Box key={index}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ padding: '1em 0' }}
                  >
                    <Box>
                      <Typography fontWeight={700} fontSize="1.1em">
                        {data?.name.split('').length > 40
                          ? `${data?.name.slice(0, 40)} ...`
                          : data?.name}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={2}>
                      <Box>
                        <Typography fontWeight={600} color="secondary">
                          Reference Link
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton
                          size="small"
                          onClick={() => filterReference(index)}
                        >
                          <DoDisturbOnOutlinedIcon />
                        </IconButton>
                      </Box>
                    </Stack>
                  </Stack>
                  <Divider />
                </Box>
              ))}
          </Box>
        ) : null}

        {value === 1 ? (
          <Box>
            {!_.isEmpty(asset) &&
              asset.map((data, index) => (
                <Box key={index}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ padding: '1em 0' }}
                  >
                    <Box>
                      <Typography fontWeight={700} fontSize="1.1em">
                        {data?.file?.name.split('').length > 40
                          ? `${data?.file?.name.slice(0, 40)} ...`
                          : data?.file?.name}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={2}>
                      <Box>
                        <Typography fontWeight={600} color="secondary">
                          Assets
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton
                          size="small"
                          onClick={() => filterAsset(index)}
                        >
                          <DoDisturbOnOutlinedIcon />
                        </IconButton>
                      </Box>
                    </Stack>
                  </Stack>
                  <Divider />
                </Box>
              ))}
          </Box>
        ) : null}

        {value === 2 ? (
          <Box>
            {!_.isEmpty(referenceLinks) &&
              referenceLinks.map((data, index) => (
                <Box key={index}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ padding: '1em 0' }}
                  >
                    <Box>
                      <Typography fontWeight={700} fontSize="1.1em">
                        {data?.name.split('').length > 40
                          ? `${data?.name.slice(0, 40)} ...`
                          : data?.name}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={2}>
                      <Box>
                        <Typography fontWeight={600} color="secondary">
                          Reference Link
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton
                          size="small"
                          onClick={() => filterReference(index)}
                        >
                          <DoDisturbOnOutlinedIcon />
                        </IconButton>
                      </Box>
                    </Stack>
                  </Stack>
                  <Divider />
                </Box>
              ))}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default TaskReference;
