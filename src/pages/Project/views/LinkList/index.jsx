import {
  Box,
  Stack,
  Chip,
  InputAdornment,
  OutlinedInput,
  styled,
  MenuItem,
  FormControl,
  Select,
  Button,
  Modal,
  IconButton,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  Link,
  Divider,
  Popover,
  MenuList,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import PropTypes from 'prop-types';
import _ from 'lodash';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React, { useEffect, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { getData } from 'store/reducers/manualTaskCreation';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import GlobalDrawer from 'components/Common/Drawer';
import Filters from 'pages/Project/views/LinkList/Filters';
import {
  fetchLinkList_,
  requestDestroyLinkList_,
  createLinkList_,
  updateLinkList_,
  filterLinkList_,
} from 'store/reducers/concept';
import { appColors } from 'theme/variables';
import { useDispatch, useSelector } from 'react-redux';

import { channelIcons } from 'constants/widgets';

const StyledInputField = styled(OutlinedInput)({
  fontSize: '0.9rem',
  borderRadius: '0.2rem',
  paddingRight: '12px',
  '&.Mui-focused fieldset': {
    border: '1px solid #5025c4 !important',
    boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
  },
});

const channelList = [
  { label: 'Google Display', id: 1 },
  { label: 'Google Video', id: 2 },
  { label: 'Social Static', id: 3 },
  { label: 'Social Video', id: 4 },
  { label: 'Youtube', id: 5 },
];

const StyledSelect = styled(Select)({
  fontSize: '0.9rem',
  borderRadius: '0.2rem',
  '&.Mui-focused fieldset': {
    border: '1px solid #5025c4 !important',
    boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
  },
});

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  border: 0,
  maxWidth: '800px',
  p: 4,
};

const BoxChannelStyled = styled(Box)({
  borderRight: '1px solid',
  padding: '0px 10px',
  borderColor: 'rgba(0, 0, 0, 0.12)',
  ':last-child': {
    borderRight: 0,
  },
});

const ProjectLinkList = ({ id }) => {
  const { linkListItem } = useSelector((state) => state.concept);
  const {
    data: { taskTypeList, subTaskList },
  } = useSelector((state) => state.manualTaskCreation);
  const [open, setOpen] = React.useState(false);

  const [newestFilter, setNewestFilter] = React.useState('created_at');
  const [typeSubmit, setTypeSubmit] = useState('');
  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [taskTypeInput, setTaskTypeInput] = useState('');
  const [taskTypeListData, setTaskTypeListData] = useState('');
  const [categoryListData, setCategoryListData] = useState('');
  const [, setChannelUpdateGet] = useState('');
  const [, setCategoryUpdateGet] = useState('');
  const [, setTaskTypeUpdateGet] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [channelInput, setChannelInput] = useState('');
  const [listDataUpdate, setListDataUpdate] = useState('');
  const [filteredRowsSearchList, setFilteredRowsSearchList] =
    useState(linkListItem);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const Swal = require('sweetalert2');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [, setFilter] = useState(false);
  const [channel, setChannel] = useState([]);
  const [selectedFilterOptions, setSelectedFilterOptions] = useState({});
  const [, setFilterOptions] = useState({});

  const [poperAnchor, setPopAnchor] = useState(null);

  const {
    options: { priorities, teams, users, partner },
  } = useSelector((state) => state.dashboard);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleChangeFilter = (event) => {
    setNewestFilter(event.target.value);
    const item = [];

    item.push({
      sort: event.target.value,
    });
    dispatch(filterLinkList_(id, item[0]));
  };

  const handleClose = () => {
    setOpen(false);
    setNameInput('');
    setUrlInput('');
  };

  const handleOpen = (type, item) => {
    setOpen(true);
    setTypeSubmit(type);
    setListDataUpdate(item);

    // List of Data from API to AutoComplete Start
    const itemTaskType = taskTypeList.map((item) => ({
      id: item.id,
      label: item.name,
    }));

    setTaskTypeListData(itemTaskType);

    const itemCategory = subTaskList.map((item) => ({
      id: item.id,
      label: item.name,
    }));

    setCategoryListData(itemCategory);
    // List of Data from API to AutoComplete End

    if (type == 'update') {
      setCategoryInput(listDataUpdate?.categories);
      setChannelInput(listDataUpdate?.channels);
      setTaskTypeInput(listDataUpdate?.types);
      setNameInput(item.name);
      setUrlInput(item.url);

      const itemChannelGetByID = item?.channels?.map((item) => ({
        id: item.channel_id,
        label: item.channel_name,
      }));

      setChannelUpdateGet(itemChannelGetByID[0]);

      const itemCategoryGetByID = item?.categories?.map((item) => ({
        id: item.id,
        label: item.category?.name,
      }));

      setCategoryUpdateGet(itemCategoryGetByID[0]);

      const itemTaskTypeGetByID = item?.types?.map((item) => ({
        id: item.id,
        label: item.task_type?.name,
      }));

      setTaskTypeUpdateGet(itemTaskTypeGetByID[0]);
    } else {
      setCategoryUpdateGet('');
      setTaskTypeUpdateGet('');
      setChannelUpdateGet('');
    }
  };

  useEffect(() => {
    dispatch(fetchLinkList_(id));
    dispatch(getData('get_task_type'));
    dispatch(getData('get_task_category'));
  }, []);

  const handleListItemClick = (item) => {
    Swal.fire({
      title: 'Do you want to delete the link?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(requestDestroyLinkList_(item));
        dispatch(fetchLinkList_(id));

        Swal.fire('Deleted!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };

  const handleButtonClickSubmit = () => {
    const item = [];

    if (typeSubmit == 'create') {
      item.push({
        rel_id: id,
        rel_type: 1,
        name: nameInput,
        url: urlInput,
        task_type: taskTypeInput,
        category: categoryInput,
        channel: channelInput,
      });
      dispatch(createLinkList_(item[0]));
    } else {
      // const itemTaskType = [
      //   taskTypeInput?.id == null
      //     ? listDataUpdate?.types[0].task_type.id
      //     : taskTypeInput?.id,
      // ];
      // const itemCategory = [
      //   categoryInput?.id == null
      //     ? listDataUpdate?.categories[0].category.id
      //     : categoryInput?.id,
      // ];
      // const itemChannel = [
      //   channelInput?.id == null
      //     ? listDataUpdate?.channels[0].channel_id
      //     : channelInput?.id,
      // ];

      item.push({
        link_id: listDataUpdate.id,
        name: nameInput,
        url: urlInput,
        task_type: taskTypeInput,
        category: categoryInput,
        channel: channelInput,
      });
      dispatch(updateLinkList_(item[0], id));
    }

    setOpen(false);
    setNameInput('');
    setUrlInput('');
    setCategoryUpdateGet('');
    setTaskTypeUpdateGet('');
    setTaskTypeUpdateGet('');
    setCategoryInput('');
    setChannelInput('');
    setTaskTypeInput('');
  };

  const handleSearchLinkList = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      const valueSearch = e.target.value;
      if (_.isEmpty(valueSearch)) {
        return setFilteredRowsSearchList(linkListItem);
      }

      const searchResult = linkListItem?.data.filter(
        (item) => item.name == valueSearch
      );

      const item = [];
      item.push({
        data: searchResult,
      });
      setFilteredRowsSearchList(item[0]);
      setSearchTrigger(true);
    }
  };

  const handleChangeChannel = (item) => {
    const convert = item.map(({ id }) => `${id}`);
    setChannelInput(convert);
    // console.log('handleChangeChannel', convert);
  };

  const handleChangeCategory = (item) => {
    const convert = item.map(({ id }) => `${id}`);
    setCategoryInput(convert);
    // console.log('handleChangeCategory', convert);
  };

  const handleChangeTaskType = (item) => {
    const convert = item.map(({ id }) => `${id}`);
    setTaskTypeInput(convert);
    // console.log('handleChangeTaskType', convert);
  };

  const handleSettingsClick = (event) => setPopAnchor(event.currentTarget);

  const handleSettingsClose = () => setPopAnchor(null);

  const popperOpen = Boolean(poperAnchor);

  return (
    <Box pt={1} width="100%">
      {/* Header */}
      <Stack direction="Row" justifyContent="space-between" pb={1}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box>
            <StyledInputField
              onKeyUp={handleSearchLinkList}
              name="search"
              type="text"
              placeholder="Search"
              inputProps={{
                autoComplete: 'off',
              }}
              size="small"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      width: '1em !important',
                      height: '1em !important',
                      color: '#484964',
                    }}
                  />
                </InputAdornment>
              }
              required
            />
          </Box>
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
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <StyledSelect onChange={handleChangeFilter} value={newestFilter}>
                <MenuItem value={'created_at'}>Newest</MenuItem>
                <MenuItem value={'-created_at'}>Oldest</MenuItem>
                <MenuItem value={'name'}>From A to Z</MenuItem>
                <MenuItem value={'-name'}>From Z to A</MenuItem>
              </StyledSelect>
            </FormControl>
          </Box>
          <Box>
            <Button
              onClick={() => handleOpen('create')}
              startIcon={<AddLinkIcon />}
              variant="contained"
              color="secondary"
              disableElevation
              sx={{ fontWeight: 700, textTransform: 'capitalize' }}
            >
              Add Link
            </Button>
          </Box>
        </Stack>
      </Stack>

      {_.isEmpty(
        searchTrigger == true
          ? filteredRowsSearchList?.data
          : linkListItem?.data
      ) ? (
        <Stack alignItems="center" p={1}>
          <Box>
            <IconButton
              size="large"
              color="error"
              disableRipple
              disableTouchRipple
              disableFocusRipple
              sx={{ backgroundColor: '#f2445c1a' }}
            >
              <RemoveDoneIcon />
            </IconButton>
          </Box>
          <Box>
            <Typography fontWeight={700} color="#999999">
              No Link found.
            </Typography>
          </Box>
        </Stack>
      ) : (
        <Stack>
          {(searchTrigger == true
            ? filteredRowsSearchList?.data
            : linkListItem?.data
          )?.map((item, index) => (
            <Stack
              key={index}
              border="1px solid #5025c41a"
              borderRadius="0.4em"
              padding="10px"
              sx={{
                position: 'relative',
                '&:hover': {
                  boxShadow: '0 3px 15px rgb(80 37 196 / 40%)',
                },
              }}
              mb={1}
            >
              <Box
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  margin: '0.2em',
                }}
              >
                <IconButton size="small" onClick={handleSettingsClick}>
                  <MoreVertIcon />
                </IconButton>
              </Box>
              <Link
                sx={{ textDecoration: 'none' }}
                target="_blank"
                href={item.url}
              >
                <Stack direction="row" justifyContent="space-between">
                  {/* Title */}
                  <Box>
                    <Typography
                      sx={{ textTransform: 'capitalize' }}
                      variant="body1"
                      fontWeight={800}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </Stack>
                <Divider
                  sx={{
                    borderColor: '#ececec85',
                    margin: '0.4em 0 0.7em 0',
                  }}
                />

                {/* Footer */}
                <Stack direction="row" justifyContent="space-between">
                  {/* Left */}
                  <Stack direction="row" spacing={1}>
                    {/* Task type / Parent */}

                    {!_.isEmpty(item?.types) && (
                      <Stack direction="row" spacing={1}>
                        {item?.types.map((parentTask, indexParent) => (
                          <Chip
                            key={indexParent}
                            icon={
                              <Tooltip title="Parent" arrow>
                                <SupervisedUserCircleIcon />
                              </Tooltip>
                            }
                            label={parentTask?.task_type?.name}
                            color="primary"
                            variant="contained"
                            size="small"
                            sx={{ borderRadius: '0.3em' }}
                          />
                        ))}
                      </Stack>
                    )}

                    {!_.isEmpty(item?.categories) && (
                      <>
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                          sx={{
                            borderStyle: 'dotted',
                          }}
                        />

                        {/* Subtask/Category */}
                        <Stack direction="row" spacing={1}>
                          {item?.categories.map(
                            (subParentTask, indexSubParent) => {
                              if (!_.isEmpty(subParentTask?.category)) {
                                return (
                                  <Chip
                                    key={indexSubParent}
                                    icon={
                                      <Tooltip title="Subtask" arrow>
                                        <LowPriorityIcon />
                                      </Tooltip>
                                    }
                                    label={subParentTask?.category?.name}
                                    variant="outlined"
                                    size="small"
                                    sx={{ borderRadius: '0.3em' }}
                                  />
                                );
                              }
                            }
                          )}
                        </Stack>
                      </>
                    )}
                  </Stack>
                  {/* Right */}

                  <Stack direction="row" display="flex" alignItems="center">
                    {item?.channels.map((channelsItems, indexChannels) => {
                      switch (channelsItems?.channel_name?.toLowerCase()) {
                        case 'google display':
                          return (
                            <Tooltip
                              title={channelsItems.channel_name ?? ''}
                              key={indexChannels}
                              arrow
                            >
                              <BoxChannelStyled>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={0.5}
                                >
                                  <Box
                                    sx={{
                                      width: '14.85px',
                                      height: '14.85px',
                                      display: 'flex',
                                    }}
                                  >
                                    {channelIcons.google}
                                  </Box>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                    }}
                                  >
                                    <PhotoLibraryOutlinedIcon
                                      sx={{ color: 'rgb(0 0 0 / 42%)' }}
                                    />
                                  </Box>
                                </Stack>
                              </BoxChannelStyled>
                            </Tooltip>
                          );
                        case 'google video':
                          return (
                            <Tooltip
                              title={channelsItems.channel_name ?? ''}
                              key={indexChannels}
                              arrow
                            >
                              <BoxChannelStyled>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={0.5}
                                >
                                  <Box
                                    sx={{
                                      width: '14.85px',
                                      height: '14.85px',
                                      display: 'flex',
                                    }}
                                  >
                                    {channelIcons.google}
                                  </Box>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                    }}
                                  >
                                    <VideocamOutlinedIcon
                                      sx={{ color: 'rgb(0 0 0 / 42%)' }}
                                    />
                                  </Box>
                                </Stack>
                              </BoxChannelStyled>
                            </Tooltip>
                          );
                        case 'facebook static':
                          return (
                            <Tooltip
                              title="Meta Static"
                              key={indexChannels}
                              arrow
                            >
                              <BoxChannelStyled>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={0.5}
                                >
                                  <Box
                                    sx={{
                                      width: '14.85px',
                                      height: '14.85px',
                                      display: 'flex',
                                    }}
                                  >
                                    {channelIcons.facebook}
                                  </Box>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                    }}
                                  >
                                    <PhotoLibraryOutlinedIcon
                                      sx={{ color: 'rgb(0 0 0 / 42%)' }}
                                    />
                                  </Box>
                                </Stack>
                              </BoxChannelStyled>
                            </Tooltip>
                          );
                        case 'facebook video':
                          return (
                            <Tooltip
                              title="Meta Video"
                              key={indexChannels}
                              arrow
                            >
                              <BoxChannelStyled>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={0.5}
                                >
                                  <Box
                                    sx={{
                                      width: '14.85px',
                                      height: '14.85px',
                                      display: 'flex',
                                    }}
                                  >
                                    {channelIcons.facebook}
                                  </Box>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                    }}
                                  >
                                    <VideocamOutlinedIcon
                                      sx={{ color: 'rgb(0 0 0 / 42%)' }}
                                    />
                                  </Box>
                                </Stack>
                              </BoxChannelStyled>
                            </Tooltip>
                          );
                        case 'youtube':
                          return (
                            <Tooltip
                              title={channelsItems.channel_name ?? ''}
                              key={indexChannels}
                              arrow
                            >
                              <BoxChannelStyled>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={0.5}
                                >
                                  <Box
                                    sx={{
                                      width: '14.85px',
                                      height: '14.85px',
                                      display: 'flex',
                                    }}
                                  >
                                    {channelIcons.youtube}
                                  </Box>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                    }}
                                  >
                                    <VideocamOutlinedIcon
                                      sx={{ color: 'rgb(0 0 0 / 42%)' }}
                                    />
                                  </Box>
                                </Stack>
                              </BoxChannelStyled>
                            </Tooltip>
                          );
                        default:
                          return null;
                      }
                    })}
                  </Stack>
                </Stack>
              </Link>
              <Popover
                id="settings-link-list"
                open={popperOpen}
                anchorEl={poperAnchor}
                onClose={handleSettingsClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  sx: {
                    width: 150,
                    maxWidth: '100%',
                  },
                }}
              >
                <MenuList dense={true}>
                  <MenuItem onClick={() => handleOpen('update', item)}>
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => handleListItemClick(item)}>
                    <ListItemIcon>
                      <DeleteOutlineIcon />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                  </MenuItem>
                </MenuList>
              </Popover>
            </Stack>
          ))}
        </Stack>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textTransform: 'capitalize' }}
          >
            {typeSubmit} Link
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: '10px' }}>
            <Grid item xs={12}>
              <TextField
                value={nameInput}
                onChange={(event) => setNameInput(event.target.value)}
                id="name"
                label="Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={urlInput}
                onChange={(event) => setUrlInput(event.target.value)}
                id="url"
                label="Url"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                disablePortal
                id="combo-box-demo"
                options={taskTypeListData}
                // defaultValue={taskTypeUpdateGet ?? ''}
                getOptionLabel={(option) => (option ? option.label : '')}
                sx={{ width: '100%' }}
                // value={taskTypeInput}
                onChange={(event, value) => handleChangeTaskType(value)}
                // onChange={(event, value) => setTaskTypeInput(value.map(({ id }) => `${id}`))}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.label}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Task Type" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                disablePortal
                id="combo-box-demo"
                options={categoryListData}
                // defaultValue={categoryUpdateGet ?? ''}
                getOptionLabel={(option) => (option ? option.label : '')}
                sx={{ width: '100%' }}
                // value={categoryInput}
                onChange={(event, value) => handleChangeCategory(value)}
                // onChange={(event, value) => setCategoryInput(value.map(({ id }) => `${id}`))}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.label}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Category" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                disablePortal
                // defaultValue={channelUpdateGet ?? ''}
                id="combo-box-demo"
                // value={channelInput}
                getOptionLabel={(option) => (option ? option.label : '')}
                options={channelList}
                sx={{ width: '100%' }}
                onChange={(event, value) => handleChangeChannel(value)}
                // onChange={(event, value) => setChannelInput(value.map(({ id }) => `${id}`))}
                renderInput={(params) => (
                  <TextField {...params} label="Channel" />
                )}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button
                onClick={handleClose}
                color="error"
                sx={{ marginRight: '10px' }}
                variant="contained"
              >
                Cancel
              </Button>
              <Button onClick={handleButtonClickSubmit} variant="contained">
                {typeSubmit}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <GlobalDrawer
        content={
          <Filters
            _id={id}
            handleClose={() => handleDrawerClose()}
            channel={channel}
            options={{
              priorities: priorities?.data.map((d) => ({
                id: d.id,
                title: d.name,
              })),
              teams: teams?.data.map((d) => ({
                id: d.id,
                title: d.name,
              })),
              users: users?.data.map((d) => ({
                id: d.id,
                title: d.fullname,
              })),
              partners: partner?.data.map((d) => ({
                id: d.id,
                title: d.name,
              })),
            }}
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
    </Box>
  );
};

ProjectLinkList.propTypes = {
  lists: PropTypes.any,
  id: PropTypes.any,
};

export default ProjectLinkList;
