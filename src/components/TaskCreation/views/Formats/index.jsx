import { useContext } from 'react';

import {
  Box,
  Stack,
  Grid,
  Typography,
  Card,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  styled,
} from '@mui/material';

import _ from 'lodash';

import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

import TaskCreationContext from 'components/TaskCreation/Context';

// Custom Icons
import { channelIcons } from 'constants/widgets';

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
  padding: 1em 1.4em 1.5em;
`;

const TaskFormats = () => {
  const { concept, channel, campaign } = useContext(TaskCreationContext);
  return (
    <Box padding="40px 60px">
      <Stack direction="row">
        <Typography
          variant="h4"
          color="primary"
          fontWeight={800}
          sx={{ display: 'flex' }}
        >
          {_.isEmpty(concept?.name)
            ? 'Untitled'
            : _.isEmpty(campaign?.name)
            ? concept?.name
            : campaign?.name}
          <StyledTypography variant="h4" fontWeight={800}>
            &nbsp;{_.isEmpty(channel?.name) ? '' : `- ${channel?.name}`}
          </StyledTypography>
        </Typography>
      </Stack>
      <Box mb={2}>
        <Typography>Kindly select the formats needed.</Typography>
      </Box>

      <StyledCard variant="outlined">
        <Grid container spacing={3}>
          <Grid item sx={{ fontSize: '2.2em' }}>
            <AutoAwesomeOutlinedIcon
              sx={{ color: '#5025c442', marginTop: '0.6em' }}
            />
          </Grid>
          <Grid item>
            <Box>
              <Typography fontWeight={700} color="primary">
                System detected desktop and mobile sizes.
              </Typography>
            </Box>
            <Box>
              <Button variant="outlined" size="small">
                Select Suggested
              </Button>
            </Box>
          </Grid>
        </Grid>
      </StyledCard>

      <Box my={2}>
        <Card variant="outlined" sx={{ padding: '1em 1em' }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={4}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  display="flex"
                  alignItems="center"
                  width="2em"
                  height="2em"
                >
                  {channelIcons.google}
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography fontWeight={700}>Google</Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={8}>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography color="secondary" fontWeight={700}>
                    Desktop
                  </Typography>
                </Box>
                <Box>
                  <Button>Select All</Button>
                  <Button>Clear All</Button>
                </Box>
              </Stack>
              <Stack>
                <FormGroup>
                  <Grid container>
                    <Grid item>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="160x600"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="300x250"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="300x600"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel control={<Checkbox />} label="728x90" />
                    </Grid>
                  </Grid>
                </FormGroup>
              </Stack>
              <Box>
                <Button variant="text" size="small" disableElevation>
                  See All
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>

      <Box my={2}>
        <Card variant="outlined" sx={{ padding: '1em 1em' }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={4}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  display="flex"
                  alignItems="center"
                  width="2em"
                  height="2em"
                >
                  {channelIcons.google}
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography fontWeight={700}>Google</Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={8}>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography color="secondary" fontWeight={700}>
                    Mobile
                  </Typography>
                </Box>
                <Box>
                  <Button>Select All</Button>
                  <Button>Clear All</Button>
                </Box>
              </Stack>
              <Stack>
                <FormGroup>
                  <Grid container>
                    <Grid item>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="160x600"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="300x250"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="300x600"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel control={<Checkbox />} label="728x90" />
                    </Grid>
                  </Grid>
                </FormGroup>
              </Stack>
              <Box>
                <Button variant="text" size="small" disableElevation>
                  See All
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Box>
  );
};

export default TaskFormats;
