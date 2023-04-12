// MUI
import { Stack, Typography } from '@mui/material';

import emptyImage from 'assets/images/fav-empty.svg';

const EmptyResults = () => {
  return (
    <Stack justifyContent="center" alignItems="center" height="inherit" mt={-5}>
      <img width={300} src={emptyImage} alt="empty-favorites" />
      <Typography variant="h6">No Results Found!</Typography>
    </Stack>
  );
};

export default EmptyResults;
