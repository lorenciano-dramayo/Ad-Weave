import { useContext } from 'react';

import _ from 'lodash';

// Context
import TaskCreationContext from 'components/TaskCreation/Context';

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

const StyledTypography = styled(Typography)`
  background-image: linear-gradient(90deg, #e0238c, #f22076 47.43%, #f96666);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`;

const TaskCreativeDetails = () => {
  const { concept, channel, campaign, subTask, taskType } =
    useContext(TaskCreationContext);

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
          <StyledTypography variant="h4" fontWeight={800}>
            {_.isEmpty(channel?.name) ? '' : `${channel?.name}`}
          </StyledTypography>
        </Typography>
      </Stack>
      <Box mb={2}>
        <Typography>*Skip this step if not required.</Typography>
      </Box>
      <Box my={2}>
        <Card variant="outlined" sx={{ padding: '1.5em 2em' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography color="secondary" fontWeight={700}>
                    Triggers
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
                        label="trigger"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="trigger2"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="customVariable"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="customVariable2"
                      />
                    </Grid>
                  </Grid>
                </FormGroup>
              </Stack>
            </Grid>
          </Grid>
          <Box>
            <Button variant="text" size="small" disableElevation>
              See All
            </Button>
          </Box>
        </Card>
      </Box>

      {/* Hello */}
      <Typography fontWeight={700} color="secondary">
        Template Version
      </Typography>
      <Card
        variant="outlined"
        sx={{ padding: '0.5em 1em', marginBottom: '0.5em' }}
        square
      >
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography fontWeight={600} color="primary">
              300x600
            </Typography>
          </Box>
          <Box>Variant 1</Box>
        </Stack>
      </Card>
      <Card
        variant="outlined"
        sx={{ padding: '0.5em 1em', marginBottom: '0.5em' }}
        square
      >
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography fontWeight={600} color="primary">
              728x90
            </Typography>
          </Box>
          <Box>Variant 1</Box>
        </Stack>
      </Card>
    </Box>
  );
};

export default TaskCreativeDetails;
