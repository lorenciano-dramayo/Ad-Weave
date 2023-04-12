import {
  Box,
  Typography,
  Stack,
  Select,
  FormControl,
  MenuItem,
  styled,
  Divider,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Local Components
import EodTable from 'pages/EodReport/Components/Table';
import EodDialog from 'pages/EodReport/Components/Dialog';

const StyledTypography = styled(Typography)`
  background-image: linear-gradient(90deg, #e0238c, #f22076 47.43%, #f96666);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`;
const EodReport = () => {
  const dispatch = useDispatch();
  const { data_eod } = useSelector((state) => state.dashboard);

  // const handleChange = (event) => {
  //   const itemEOD = [];

  //   itemEOD.push({
  //     filter: {
  //       eod_report: event.target.value,
  //     },
  //   });
  //   dispatch(fetchDashboardEOD(itemEOD[0]));
  // };

  // useEffect(() => {
  //   const itemEOD1 = [];
  //   dispatch(fetchDashboardEOD(itemEOD1));
  // }, []);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" px={6} py={3}>
        <Box>
          <StyledTypography variant="h4" fontWeight={800}>
            End of Day Report
          </StyledTypography>
        </Box>
        <Box>
          <EodDialog />
        </Box>
      </Stack>

      <Divider />

      <Stack mb={2} px={6} pt={3}>
        <Box>
          <FormControl sx={{ width: 200 }} size="small">
            {/* <Select onChange={handleChange} defaultValue={'today'}>
              <MenuItem value={'today'}>Today</MenuItem>
              <MenuItem value={'this_week'}>This Week</MenuItem>
              <MenuItem value={'this_month'}>This Month</MenuItem>
              <MenuItem value={'custom'}>Custom</MenuItem>
            </Select> */}
          </FormControl>
        </Box>
      </Stack>

      <Stack mb={2} px={6} py={1}>
        <EodTable data={data_eod} />
      </Stack>
    </Box>
  );
};

export default EodReport;
