import PropTypes from 'prop-types';

// MUI Components
import { Paper, Stack, Box, Typography, IconButton } from '@mui/material';

// styles
import { useStyles } from 'components/Widgets/TaskCounter/styles';

const TaskCounter = ({ headline, subheading, count, icon: Icon, color }) => {
  const classes = useStyles();

  return (
    <Paper
      className={classes.root}
      elevation={0}
      variant="outlined"
      sx={{ backgroundColor: color }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        width="-webkit-fill-available"
      >
        <Box>
          <IconButton
            variant="contained"
            size="large"
            color="error"
            sx={{
              background: '#ffffff3b',
              '&:hover': { background: '#b3b3b33b' },
            }}
          >
            <Icon sx={{ color: '#fff' }} />
          </IconButton>
        </Box>
        <Box marginLeft="1em" width={164}>
          <Box lineHeight="initial" className={classes.multiLineEllipsis}>
            <Typography variant="h6" fontWeight={700} color="#fff">
              {headline}
            </Typography>
          </Box>
          <Box lineHeight="initial" color="#fff">
            {subheading}
          </Box>
          <Box lineHeight="initial">
            <Typography variant="button" color="#fff">
              {count}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};

TaskCounter.propTypes = {
  headline: PropTypes.string.isRequired,
  subheading: PropTypes.any,
  count: PropTypes.number.isRequired,
  icon: PropTypes.any,
  color: PropTypes.string.isRequired,
};

export default TaskCounter;
