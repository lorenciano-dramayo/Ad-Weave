import React, { useState } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import Swal from 'sweetalert2';

// MUI Components
import {
  Box,
  IconButton,
  OutlinedInput,
  Stack,
  Card,
  Tooltip,
  Typography,
} from '@mui/material';

// variables
import { options } from 'pages/Maintenance/variables/maintenance';

// Helper
import { filterSearch, optionProperty } from 'pages/Maintenance/helpers';

// react-redux
import { useDispatch, useSelector } from 'react-redux';

// reducers
import { deleteData } from 'store/reducers/maintenance';

// MUI Icons
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// Components
import EnhancedTable from 'pages/Maintenance/Components/Table';
import SkeletonLoader from 'pages/Maintenance/Components/Skeleton';
import MaintenanceModal from 'pages/Maintenance/Components/Modal';

// empty image
import emptyImage from 'assets/images/maintenance-empty.svg';

const Main = ({ isOpen, handleOpen, tag }) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const [openModal, setModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const { list, fetching, headers } = useSelector((state) => state.maintenance);

  const handleSearch = (e) => {
    setFilter(e.target.value);
  };

  const handleClick = (e) => {
    switch (e) {
      case 'archive':
        Swal.fire({
          icon: 'question',
          title: 'Archive Selected?',
          text: 'No worries! All records selected will be moved to archive.',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Yes please!',
          denyButtonText: 'Maybe next time',
          backdrop: `#25175aa3`,
          customClass: { container: 'swal-maintenance-container' },
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(deleteData(tag, selectedIndex));
            if (!fetching) {
              Swal.fire({
                title: `Archived Successfully!`,
                text: 'Use the filter to view tje archived entries.',
                icon: 'success',
                timer: 1500,
                timerProgressBar: true,
                backdrop: `#25175aa3`,
                showConfirmButton: false,
                customClass: { container: 'swal-maintenance-container' },
              });
            }
          }
        });
        break;
      case 'filter':
        break;
      default:
        setModal((prev) => !prev);
        break;
    }
  };

  return (
    <Stack>
      <Stack direction="row">
        <IconButton
          onClick={handleOpen}
          sx={{
            background: '#25165B',
            color: '#fff',
            position: 'absolute',
            marginLeft: '-3.3em',
            marginTop: '-1em',
            display: isOpen ? 'flex' : 'none',
            zIndex: 1,
            '&:hover': { background: '#25165B' },
          }}
          size="small"
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      </Stack>
      <Box sx={{ height: 'calc(100vh - 5.4em)' }}>
        <Card
          variant="outlined"
          sx={{ borderRadius: '25px', height: 'inherit' }}
        >
          {fetching ? (
            <Stack py={1} px={2}>
              <SkeletonLoader />
            </Stack>
          ) : (
            <Stack py={2.5} px={2}>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <OutlinedInput
                    sx={{ paddingRight: '10px' }}
                    endAdornment={
                      <SearchIcon
                        sx={{
                          width: '1.5em !important',
                          height: '1.5em !important',
                          color: '#484964',
                        }}
                      />
                    }
                    size="small"
                    placeholder="Search..."
                    onChange={(e) => handleSearch(e)}
                  />
                </Box>
                <Stack spacing={1} direction="row">
                  {options.map((o, i) => (
                    <Tooltip title={o.title ?? ''} key={i} arrow>
                      <span>
                        <IconButton
                          disabled={optionProperty(
                            o.title,
                            selectedIndex.length
                          )}
                          color={o.color}
                          onClick={() => handleClick(o.tag)}
                        >
                          {o.icon}
                        </IconButton>
                      </span>
                    </Tooltip>
                  ))}
                </Stack>
              </Stack>

              {/* Table */}
              {!fetching && _.isEmpty(filterSearch(list, filter)) ? (
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{ minHeight: '70vh' }}
                >
                  <img width={300} src={emptyImage} alt="empty-favorites" />
                  <Typography variant="h6">
                    Calm down, everthing is fine!
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#888888' }}>
                    We&apos;ll first need to get some data in here.
                  </Typography>
                </Stack>
              ) : (
                <Box border="2px solid #ececec" mt={3}>
                  <EnhancedTable
                    data={filterSearch(list, filter)}
                    tableHeading={headers}
                    setDataSelected={setSelectedIndex}
                  />
                </Box>
              )}
            </Stack>
          )}
        </Card>
      </Box>

      {/* Modal */}
      <MaintenanceModal
        openModal={openModal}
        title={tag}
        headers={headers}
        handleClick={handleClick}
      />
    </Stack>
  );
};

Main.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default Main;
