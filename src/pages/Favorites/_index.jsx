import React, { useEffect, useState, Fragment } from 'react';

// Toaster
import { Toast } from 'pages/Favorites/helpers';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Reducers
import { fetchAllFavorites, pinFavorites } from 'store/reducers/favorites';

// Views
import Concept from 'pages/Favorites/view/Concept';
import Campaign from 'pages/Favorites/view/Campaign';
import Task from 'pages/Favorites/view/Task';

// Components
import GlobalDrawer from 'components/Common/Drawer';
import Filters from 'pages/Favorites/Components/Filters';

// MUI
import SkeletonLoader from 'pages/Favorites/Components/Skeleton';

// MUI Component
import {
  Stack,
  Box,
  Typography,
  OutlinedInput,
  Button,
  styled,
  Select,
  MenuItem,
  Grid,
  Paper,
} from '@mui/material';

// MUI Icons
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DisplaySettingsOutlinedIcon from '@mui/icons-material/DisplaySettingsOutlined';

// empty image
import emptyImage from 'assets/images/fav-empty.svg';

const StyledTypography = styled(Typography)`
  font-size: 34px;
`;

const StyledPaper = styled(Paper)({
  cursor: 'pointer',
  height: 277,
  borderRadius: 25,
  '&:hover': {
    borderColor: '#5025c4',
    boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
  },
});

const Favorites = () => {
  const dispatch = useDispatch();
  const { list, fetching } = useSelector((state) => state.favorites);
  const [search, setSearch] = useState('');
  const [group, setGroup] = useState('all');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllFavorites());
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleGroup = (event) => {
    setGroup(event.target.value);
  };

  const handleFilterOptions = () => {
    setOpen((prev) => !prev);
  };

  const handlePinUnpin = (data_id, type, fav_id, name) => {
    dispatch(
      pinFavorites({
        data_id,
        type,
        fav_id,
      })
    );

    if (!fetching) {
      Toast.fire({
        title: name,
        text: 'is remove to favorites.',
      });
    }
  };

  return (
    <Fragment>
      <Stack p={5} sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Paper
          variant="outlined"
          sx={{
            borderRadius: '25px',
            padding: '28px 28px',
            minHeight: 'calc(100vh - 5.4em)',
          }}
        >
          <Stack>
            <StyledTypography variant="h4" fontWeight={800} color="primary">
              Favorites
            </StyledTypography>
          </Stack>
          {fetching ? (
            <SkeletonLoader />
          ) : (
            <Box>
              <Stack mt={2.4} direction="row" justifyContent="space-between">
                <OutlinedInput
                  sx={{ width: 330 }}
                  size="small"
                  variant="outlined"
                  placeholder="Search Concept, Campaign, or Task Name"
                  endAdornment={
                    <SearchOutlinedIcon
                      sx={{
                        fontSize: '2em',
                        marginRight: -1,
                      }}
                    />
                  }
                  onChange={handleSearch}
                />
                <Stack direction="row" spacing={1}>
                  <Select
                    size="small"
                    value={group}
                    name="type"
                    defaultValue="all"
                    sx={{
                      width: 116,
                      '& .MuiSvgIcon-root': { width: '1em', height: '1em' },
                    }}
                    onChange={handleGroup}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="concept">Concept</MenuItem>
                    <MenuItem value="campaign">Campaign</MenuItem>
                    <MenuItem value="task">Task</MenuItem>
                    <MenuItem value="subtask">Subtask</MenuItem>
                  </Select>
                  <Button
                    startIcon={<DisplaySettingsOutlinedIcon />}
                    size="small"
                    variant="contained"
                    disabled={
                      group === 'all'
                        ? false
                        : list.filter((i) => i.type === group).length <= 0
                    }
                    onClick={handleFilterOptions}
                  >
                    Filters
                  </Button>
                </Stack>
              </Stack>
              {list
                .filter((i) => (group === 'all' ? i : i.type === group))
                .filter((i) => {
                  return i?.type === 'concept'
                    ? i?.concept?.name
                        ?.toLowerCase()
                        ?.includes(search.toLowerCase())
                    : ['task', 'subtask'].includes(i?.type)
                    ? i?.task?.description
                        ?.toLowerCase()
                        ?.includes(search.toLowerCase())
                    : i?.campaign?.name
                        ?.toLowerCase()
                        ?.includes(search.toLowerCase());
                }).length > 0 ? (
                <Grid container mt={3} spacing={2}>
                  {list
                    .filter((i) => (group === 'all' ? i : i.type === group))
                    .filter((i) => {
                      return i?.type === 'concept'
                        ? i?.concept?.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        : ['task', 'subtask'].includes(i?.type)
                        ? i?.task?.description
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        : i?.campaign?.name
                            .toLowerCase()
                            .includes(search.toLowerCase());
                    })
                    .map((data, index) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <StyledPaper variant="outlined">
                          {data.type === 'concept' ? (
                            <Concept
                              data={data.concept}
                              id={data.id}
                              onPin={handlePinUnpin}
                            />
                          ) : data.type === 'campaign' ? (
                            <Campaign
                              data={data.campaign}
                              id={data.id}
                              onPin={handlePinUnpin}
                            />
                          ) : ['task', 'subtask'].includes(data?.type) ? (
                            <Task
                              data={data.task}
                              id={data.id}
                              onPin={handlePinUnpin}
                            />
                          ) : null}
                        </StyledPaper>
                      </Grid>
                    ))}
                </Grid>
              ) : (
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{ minHeight: '68vh' }}
                >
                  <img width={300} src={emptyImage} alt="empty-favorites" />
                  <Typography variant="h6">No Favorites Found!</Typography>
                  <Typography variant="body1" sx={{ color: '#888888' }}>
                    Click the &quot;Star&quot; button on any page to add a
                    favorite.
                  </Typography>
                </Stack>
              )}
            </Box>
          )}
        </Paper>
      </Stack>
      {/* Global Drawer Filter */}
      <GlobalDrawer
        content={
          <Filters
            data={list
              .filter((i) => (group === 'all' ? i : i.type === group))
              .filter((i) => {
                return i?.type === 'concept'
                  ? i?.concept?.name
                      ?.toLowerCase()
                      ?.includes(search.toLowerCase())
                  : ['task', 'subtask'].includes(i?.type)
                  ? i?.task?.description
                      ?.toLowerCase()
                      ?.includes(search.toLowerCase())
                  : i?.campaign?.name
                      ?.toLowerCase()
                      ?.includes(search.toLowerCase());
              })}
            onClose={handleFilterOptions}
          />
        }
        name="search"
        width={350}
        isOpen={open}
        anchor="right"
        PaperProps={{
          sx: {
            boxShadow: '2px 0 8px rgb(0 0 0 / 15%)',
          },
        }}
        BackdropProps={{
          invisible: true,
        }}
        hideBackdrop={false}
        onClose={handleFilterOptions}
      />
    </Fragment>
  );
};

export default Favorites;
