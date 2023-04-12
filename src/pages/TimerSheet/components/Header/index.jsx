import React, { useState } from 'react';

// MUI Icons
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';

// MUI Components
import {
  OutlinedInput,
  Stack,
  Button,
  Box
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { appColors } from 'theme/variables';
import GlobalDrawer from 'components/Common/Drawer';
import Filters from 'pages/TimerSheet/components/Filters';

// Utilities
import PropTypes from 'prop-types';


export default function Header({ onSearch, onFilter, optionList }) {
  const [filterByDate, setFilterByDate] = useState('');
  const [filterByStaff, setFilterByStaff] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [, setFilter] = useState(false);
  const [filterByCustomer, setFilterByCustomer] = useState('');
  const [filterByCampaign, setFilterByCampaign] = useState([]);
  const dispatch = useDispatch();
  const [channel, setChannel] = useState([]);
  const [selectedFilterOptions, setSelectedFilterOptions] = useState({});
  const [, setFilterOptions] = useState({});


  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleOnClickApply = () => {
    const filters = {
      date: filterByDate,
      customer: filterByCustomer,
      staffs: filterByStaff.map((x) => x.name.toLowerCase()),
      campaigns: filterByCampaign.map((x) => x.name.toLowerCase()),
    };
    onFilter(filters);
  };


  return (
    <>
      <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start', width: '50%' }}>
        <OutlinedInput
          size="small"
          placeholder="Search"
          onChange={(event) => {
            onSearch(event.target.value);
          }}
          sx={{
            flex: 1.2,
            '& .MuiOutlinedInput-input': {
              height: '20px',
            },
          }}
          endAdornment={
            <SearchIcon
              sx={{
                width: '20px !important',
                height: '20px !important',
                color: '#484964',
              }}
            />
          }
        />
        <Box>
          <Button
            startIcon={<TuneIcon />}
            variant="outlined"
            disableElevation
            onClick={() => {
              setDrawerOpen(true);
              setFilter(true);
            }}
            sx={{
              borderColor: appColors.lightViolet,
              color: appColors.lightViolet,
              fontWeight: 700,
              textTransform: 'capitalize',
              '&:hover': {
                backgroundColor: appColors.lightViolet,
                color: '#fff',
              },
            }}
          >
            Filter by
          </Button>
        </Box>
        {/* Switch */}
        {/* <Stack flexDirection="row" alignItems="center" sx={{ flex: 1 }}>
          <p className={classes.toggleText}>Group by Task</p>
          <Switch
            {...{ inputProps: { 'aria-label': 'Switch demo' } }}
            defaultChecked
          />
        </Stack> */}
      </Stack>
      <GlobalDrawer
        content={
          <Filters
            handleClose={() => handleDrawerClose()}
            channel={channel}
            options={optionList}
            selectedFilterOptions={selectedFilterOptions}
            setSelectedFilterOptions={setSelectedFilterOptions}
            setFilterOptions={setFilterOptions}
            setChannel={setChannel}
          />
        }
        transitionDuration={{ enter: 350, exit: 300 }}
        name="search"
        width={400}
        isOpen={drawerOpen}
        anchor="right"
        BackdropProps={{
          invisible: true,
        }}
        onClose={handleDrawerClose}
      />
    </>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func,
  onFilter: PropTypes.func,
  optionList: PropTypes.any
};
