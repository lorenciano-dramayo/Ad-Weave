import React from 'react';
import PropTypes from 'prop-types';
//MUI Components
import {
  Button,
  ToggleButtonGroup,
  Grid,
  ToggleButton,
  styled,
  Box,
  Stack,
  Typography,
} from '@mui/material';

const StyledToggleButton = styled(ToggleButton)({
  minWidth: '64px',
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: '#25175a',
  },
});

const NotificationFilters = ({
  count,
  navClass,
  dataFilter,
  onChange,
  onClick,
}) => {
  return (
    <Grid container className={navClass}>
      <Grid item>
        <ToggleButtonGroup
          value={dataFilter}
          exclusive
          onChange={onChange}
          size="small"
          aria-label="text alignment"
        >
          <StyledToggleButton
            color="primary"
            value="all"
            aria-label="all aligned"
          >
            <Stack direction="row" spacing={0.8} alignItems="center">
              <Typography color="inherit" variant="caption">
                All
              </Typography>
              <Box
                sx={{
                  background: dataFilter === 'all' ? '#F22076' : '#ececec',
                  borderRadius: '30px',
                  padding: '0 6px',
                  fontSize: '9px',
                }}
              >
                {count?.all > 99 ? '99+' : count?.all}
              </Box>
            </Stack>
          </StyledToggleButton>
          <StyledToggleButton value={'unread'} aria-label="unread aligned">
            <Stack direction="row" spacing={0.8} alignItems="center">
              <Typography color="inherit" variant="caption">
                Unread
              </Typography>
              <Box
                sx={{
                  background: dataFilter === 'unread' ? '#F22076' : '#ececec',
                  borderRadius: '30px',
                  padding: '0 6px',
                  fontSize: '9px',
                }}
              >
                {count?.unread > 99 ? '99+' : count?.unread}
              </Box>
            </Stack>
          </StyledToggleButton>
          <StyledToggleButton value={'read'} aria-label="read aligned">
            <Stack direction="row" spacing={0.8} alignItems="center">
              <Typography color="inherit" variant="caption">
                Read
              </Typography>
              <Box
                sx={{
                  background: dataFilter === 'read' ? '#F22076' : '#ececec',
                  borderRadius: '30px',
                  padding: '0 6px',
                  fontSize: '9px',
                }}
              >
                {count?.read > 99 ? '99+' : count?.read}
              </Box>
            </Stack>
          </StyledToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item>
        <Button onClick={onClick} variant="text" disabled={count?.unread === 0}>
          Read All
        </Button>
      </Grid>
    </Grid>
  );
};

NotificationFilters.propTypes = {
  count: PropTypes.any,
  navClass: PropTypes.any,
  dataFilter: PropTypes.any,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

export default NotificationFilters;
