import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Reducers
import { deleteLinks, setLinks } from 'store/reducers/links';

// Reducers
import { fetchMaintenanceTaskType } from 'store/reducers/maintenanceTaskType';

// MUI Components
import {
  Table,
  TableContainer,
  Paper,
  Stack,
  Box,
  Button,
} from '@mui/material';

// MUI Icons
import AddLinkIcon from '@mui/icons-material/AddLink';

// Alert Component
import Swal from 'sweetalert2';

// Components
import GlobalDrawer from 'components/Common/Drawer';
import DrawerForm from 'components/Project/LinkList/Form';
import Header from 'components/Project/LinkList/Header';
import Body from 'components/Project/LinkList/Body';

// Icons
import emptyIcon from 'assets/empty.svg';

// styles
import { useStyles } from './styles';

const ProjectLinkList = ({ lists }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { list: task_type_list } = useSelector(
    (state) => state.maintenanceTaskType
  );

  const { list: reference_list } = useSelector((state) => state.links);

  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    _.isEmpty(task_type_list) ? dispatch(fetchMaintenanceTaskType()) : null;
    dispatch(setLinks(lists));
  }, []);

  const handleClick = (event, sId, sName) => {
    setSelectedId(sId);
    setSelectedName(sName);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes, delete it!',
      denyButtonText: 'No, Cancel!',
      backdrop: `#25175aa3`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteLinks({ ids: selectedId }));

        Swal.fire({
          title: `The ${selectedName} is now deleted!`,
          icon: 'success',
          timer: 1500,
          backdrop: `#25175aa3`,
        });
      }
    });
    setAnchorEl(null);
  };

  const handleDrawerOpen = (title) => {
    setAnchorEl(null);
    setTitle(title);
    setDrawerOpen((prevState) => !prevState);
  };

  const handleSearch = (searchInput) => {
    setSearch(searchInput.target.value);
  };

  return (
    <Fragment>
      {!_.isEmpty(reference_list) ? (
        <TableContainer
          component={Paper}
          elevation={0}
          variant="outlined"
          square
          className={classes.root}
        >
          <Table stickyHeader size="small" aria-label="link list table">
            <Header
              handleSearch={handleSearch}
              handleDrawer={() => handleDrawerOpen('Add')}
            />
            <Body
              list={reference_list}
              anchor={anchorEl}
              search={search}
              handleButtonClick={handleClick}
              handlePopperClose={handleClose}
              handleDrawer={handleDrawerOpen}
              handleDelete={handleDelete}
            />
          </Table>
        </TableContainer>
      ) : (
        <Stack
          className={classes.root}
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <img src={emptyIcon} alt="empty-table" />
          </Box>
          <Box color="#b5b5b5" mb={3}>
            No Data
          </Box>
          <Box>
            <Button
              variant="outlined"
              startIcon={<AddLinkIcon />}
              onClick={() => handleDrawerOpen('Add')}
            >
              Add a Reference link
            </Button>
          </Box>
        </Stack>
      )}

      {/* Drawer */}
      <GlobalDrawer
        content={
          <DrawerForm
            onClose={handleDrawerOpen}
            drawerTitle={title}
            listId={selectedId}
            listLinks={reference_list}
          />
        }
        name="search"
        width={400}
        isOpen={drawerOpen}
        anchor="right"
        BackdropProps={{
          invisible: true,
          sx: { backgroundColor: '#25175aa3' },
        }}
        hideBackdrop={false}
        onClose={() => handleDrawerOpen(title)}
      />
    </Fragment>
  );
};

ProjectLinkList.propTypes = {
  lists: PropTypes.array,
};

export default ProjectLinkList;
