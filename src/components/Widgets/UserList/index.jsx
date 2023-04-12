import PropTypes from 'prop-types';

import {
  Paper,
  Stack,
  Box,
  Typography,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

const UserList = ({ headline, subheading, dataList: users }) => {
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{ height: '45.8em', padding: '0.2em 0 1em' }}
    >
      <Stack px={2} pb={1} pt={0.5}>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            {headline}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2">{`${users.length} ${subheading}`}</Typography>
        </Box>
      </Stack>
      <Divider />
      <List
        dense
        sx={{
          width: '100%',
          padding: '0.2em 1em 0',
          overflow: 'auto',
          height: 'calc(100% - 4em)',
        }}
        disablePadding
      >
        {users.map((user, index) => (
          <div key={index}>
            <ListItem disablePadding>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    color="primary"
                  >
                    {user.fullname}
                  </Typography>
                }
                secondary={user.team}
              />

              <ListItemAvatar>
                <Avatar sx={{ float: 'right' }}>
                  <Typography fontWeight={700}>
                    {user.fullname.split('')[0]}
                  </Typography>
                </Avatar>
              </ListItemAvatar>
            </ListItem>
            {index != users.length - 1 ? (
              <Divider sx={{ borderColor: '#9b9b9b1f' }} />
            ) : null}
          </div>
        ))}
      </List>
    </Paper>
  );
};

UserList.propTypes = {
  headline: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  dataList: PropTypes.array.isRequired,
};

export default UserList;
