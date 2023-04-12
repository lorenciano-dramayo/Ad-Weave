import * as React from 'react';
import FilesDummyImage from 'assets/files_dummy.png';
import { Box, Grid } from '@mui/material';

const Images = () => {
  return (
    <Box width="100%">
      <Grid container>
        <Grid item xs={2}>
          <img src={FilesDummyImage} alt="sample" className="w-96" />
        </Grid>
        <Grid item xs={2}>
          <img src={FilesDummyImage} alt="sample" className="w-96" />
        </Grid>
        <Grid item xs={2}>
          <img src={FilesDummyImage} alt="sample" className="w-96" />
        </Grid>
        <Grid item xs={2}>
          <img src={FilesDummyImage} alt="sample" className="w-96" />
        </Grid>
        <Grid item xs={2}>
          <img src={FilesDummyImage} alt="sample" className="w-96" />
        </Grid>
        <Grid item xs={2}>
          <img src={FilesDummyImage} alt="sample" className="w-96" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Images;
