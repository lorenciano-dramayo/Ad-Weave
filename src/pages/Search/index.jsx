import { useState, Fragment } from 'react';
import { styled } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';

// MUI Components
import { Box, Grid, IconButton, Typography, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import HistoryIcon from '@mui/icons-material/History';
import ClearIcon from '@mui/icons-material/Clear';

// Styles
import { useStyles } from './styles';

// Components
import SearchField from 'components/Search/SearchField';
import MainFilter from 'components/Search/MainFilter';
import FilterHeader from 'components/Search/FilterHeader';
import CollapsibleTable from 'components/Common/CollapsibleTable';
import SkeletonLoader from './Components/Skeleton';
import EmptyResults from './Components/EmptyResults';

// Reducers
import {
  fetchSearchResults,
  addSavedSearches,
  addRecentSearches,
  removeFromSavedSearches,
} from 'store/reducers/globalSearch';

import libi from 'assets/libi.svg';

import theme from 'theme';
import _ from 'lodash';

// Utilities
import PropTypes from 'prop-types';

import {
  transformDataForGlobalSearchTasks,
  transformDataForGlobalSearchConcepts,
  transformDataForGlobalSearchCampaigns,
} from 'utils/dictionary';

const StyledResultsTableWrapper = styled(Stack)({ width: '100%', mb: 2 });

const StyledLoadingButton = styled(LoadingButton)({
  marginTop: 2,
  marginRight: 'auto',
  marginLeft: 'auto',
  textAlign: 'center',
  fontSize: '0.7em',
});

const Search = ({ onClose }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  // React  States
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShowResultsBox, setIsShowResultsBox] = useState(false);
  const [isFetchingConceptResults, setIsFetchingConceptResults] =
    useState(false);
  const [isFetchingCampaignResults, setIsFetchingCampaignResults] =
    useState(false);
  const [isFetchingTaskResults, setIsFetchingTaskResults] = useState(false);

  // Redux States
  const { concept, campaign, task, savedSearches, recentSearches, isFetching } =
    useSelector((state) => state.globalSearch);

  const searchKeyword = (keyword) => {
    setIsShowResultsBox(true);
    dispatch(addRecentSearches(keyword.toLowerCase()));
    dispatch(
      fetchSearchResults(true, { keyword: keyword.toLowerCase(), page: 1 })
    );
  };

  // Event Handlers
  const handleSearchFieldChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsFavorite(savedSearches.includes(value.toLowerCase()));
    if (_.isEmpty(value)) {
      setIsShowResultsBox(false);
    }
  };

  const handleSearchFieldEnterClick = (e) => {
    const value = e.target.value;
    searchKeyword(value);
  };

  const handleTabChange = (e) => {
    setActiveTab(e);
  };

  const handleSaveKeywordClick = () => {
    dispatch(addSavedSearches(searchQuery.toLowerCase()));
    setIsFavorite(!isFavorite);
  };

  const handleConceptResultsShowMoreClick = async () => {
    setIsFetchingConceptResults(true);

    const nextPage = concept.current_page + 1;
    await dispatch(
      fetchSearchResults(false, {
        keyword: searchQuery.toLowerCase(),
        page: nextPage,
      })
    );
    setIsFetchingConceptResults(false);
  };

  const handleCampaignResultsShowMoreClick = async () => {
    setIsFetchingCampaignResults(true);

    const nextPage = campaign.current_page + 1;
    await dispatch(
      fetchSearchResults(false, {
        keyword: searchQuery.toLowerCase(),
        page: nextPage,
      })
    );
    setIsFetchingCampaignResults(false);
  };

  const handleTaskResultsShowMoreClick = async () => {
    setIsFetchingTaskResults(true);

    const nextPage = task.current_page + 1;
    await dispatch(
      fetchSearchResults(false, {
        keyword: searchQuery.toLowerCase(),
        page: nextPage,
      })
    );
    setIsFetchingTaskResults(false);
  };

  const handleRemoveSavedSearchButton = (keyword) => {
    dispatch(removeFromSavedSearches(keyword));
  };

  const conceptResults = transformDataForGlobalSearchConcepts(
    concept.data?.map((c) => ({ ...c, rel_type: 'task' }))
  );
  const taskResults = transformDataForGlobalSearchTasks(
    task.data?.map((c) => ({ ...c, rel_type: 'task' }))
  );
  const campaignResults = transformDataForGlobalSearchCampaigns(campaign.data);

  const shouldShowConceptResults =
    !_.isEmpty(conceptResults) &&
    (activeTab === 'All' || activeTab === 'Concept');
  const shouldShowCampaignResults =
    !_.isEmpty(campaignResults) &&
    (activeTab === 'All' || activeTab === 'Campaign');
  const shouldShowTaskResults =
    !_.isEmpty(taskResults) && (activeTab === 'All' || activeTab === 'Task');

  return (
    <Box className={classes.root}>
      <Grid container>
        {/* Search */}
        <Grid item xs={12}>
          <SearchField
            value={searchQuery}
            placeholder={`Search ${activeTab === 'All' ? 'Everything' : activeTab
              }...`}
            className={classes.input}
            onChange={handleSearchFieldChange}
            onKeyPress={(e) => {
              if (e.key == 'Enter') {
                handleSearchFieldEnterClick(e);
              }
            }}
            endAdornment={
              <div className={classes.extraSearch}>
                {!_.isEmpty(searchQuery) && (
                  <LoadingButton
                    variant="text"
                    aria-label="Save to favorite filter"
                    onClick={handleSaveKeywordClick}
                    startIcon={
                      isFavorite ? (
                        <CheckIcon
                          sx={{ color: 'white', fontSize: '15px !important' }}
                        />
                      ) : (
                        <StarIcon
                          sx={{ color: 'white', fontSize: '15px !important' }}
                        />
                      )
                    }
                    sx={{
                      mr: 1,
                      padding: '0px 15px',
                      height: 28,
                      borderRadius: 10,
                      backgroundColor: isFavorite
                        ? theme.palette.secondary.main
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: isFavorite
                          ? theme.palette.secondary.main
                          : 'transparent',
                      },
                    }}
                    disableFocusRipple
                  >
                    <Typography
                      sx={{ color: 'white', textTransform: 'capitalize' }}
                    >
                      Save
                    </Typography>
                  </LoadingButton>
                )}
                <IconButton aria-label="Search" component="span">
                  <SearchIcon sx={{ color: '#fff' }} />
                </IconButton>
              </div>
            }
            sx={{
              margin: '0 !important',
            }}
          />
        </Grid>

        {/* Main filter */}
        <Grid item xs={12} className={classes.mainFilterRoot}>
          <MainFilter
            containerClass={classes.mainFilter}
            buttonClass={classes.mainButton}
            active={activeTab}
            clickable={handleTabChange}
          />
        </Grid>

        <Box className={classes.extraBox}>
          {isShowResultsBox ? (
            <Fragment>
              {/* Search Results */}
              <Grid item xs={12} className={classes.result}>
                <Box sx={{ overflowY: 'auto', height: '100%', px: 2, pb: 2 }}>
                  {isFetching ? (
                    <Box pt={2}>
                      <SkeletonLoader />
                    </Box>
                  ) : (
                    <>
                      {/* Concepts */}
                      {shouldShowConceptResults && (
                        <StyledResultsTableWrapper>
                          <CollapsibleTable
                            config={{
                              ...conceptResults.header,
                            }}
                            searchData={concept}
                            searchType="concept"
                            dataset={conceptResults.dataset}
                            onClickRow={onClose}
                          />
                          {concept.current_page !== concept.last_page && (
                            <StyledLoadingButton
                              color="secondary"
                              variant="outlined"
                              loading={isFetchingConceptResults}
                              onClick={handleConceptResultsShowMoreClick}
                            >
                              See more
                            </StyledLoadingButton>
                          )}
                        </StyledResultsTableWrapper>
                      )}

                      {/* Campaigns */}
                      {shouldShowCampaignResults && (
                        <StyledResultsTableWrapper>
                          <CollapsibleTable
                            config={{
                              ...campaignResults.header,
                            }}
                            searchData={campaign}
                            searchType="campaign"
                            dataset={campaignResults.dataset}
                            onClickRow={onClose}
                          />
                          {campaign.current_page !== campaign.last_page && (
                            <StyledLoadingButton
                              color="secondary"
                              variant="outlined"
                              loading={isFetchingCampaignResults}
                              onClick={handleCampaignResultsShowMoreClick}
                            >
                              See more
                            </StyledLoadingButton>
                          )}
                        </StyledResultsTableWrapper>
                      )}

                      {/* Tasks */}
                      {shouldShowTaskResults && (
                        <StyledResultsTableWrapper>
                          <CollapsibleTable
                            config={{
                              ...taskResults.header,
                            }}
                            searchData={task}
                            searchType="task"
                            dataset={taskResults.dataset}
                          />
                          {task.current_page !== task.last_page && (
                            <StyledLoadingButton
                              color="secondary"
                              variant="outlined"
                              loading={isFetchingTaskResults}
                              onClick={handleTaskResultsShowMoreClick}
                            >
                              See more
                            </StyledLoadingButton>
                          )}
                        </StyledResultsTableWrapper>
                      )}
                      {(activeTab === 'Tags' ||
                        activeTab === 'Partner/Market') && (
                          <Stack
                            sx={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: 'inherit',
                            }}
                            spacing={1}
                            direction="column"
                          >
                            <img src={libi} alt="libi" style={{ width: '5%' }} />
                            <Typography variant="p" gutterBottom component="div">
                              Unknown error, please contact support.
                            </Typography>
                          </Stack>
                        )}
                      {activeTab === 'All'
                        ? _.isEmpty(conceptResults) &&
                        _.isEmpty(campaignResults) &&
                        _.isEmpty(taskResults) && <EmptyResults />
                        : ((_.isEmpty(conceptResults) &&
                          activeTab === 'Concept') ||
                          (_.isEmpty(campaignResults) &&
                            activeTab === 'Campaign') ||
                          (_.isEmpty(taskResults) &&
                            activeTab === 'Task')) && <EmptyResults />}
                    </>
                  )}
                </Box>
              </Grid>
            </Fragment>
          ) : (
            <Fragment>
              {/* Extra filter Headers */}
              <Grid item xs={12} mb={1}>
                <FilterHeader buttonClass={classes.genericButton} />
              </Grid>
              {/* Extra filters result */}
              <Grid item xs={12}>
                <Grid container>
                  {/* Recent Researches */}
                  <Grid item xs={4}>
                    {recentSearches &&
                      recentSearches.map((item) => (
                        <Stack
                          key={item}
                          direction="row"
                          spacing={1.3}
                          alignItems="center"
                        >
                          <HistoryIcon sx={{ color: '#FFBE0F' }} />
                          <Typography
                            sx={{ color: '#fff', cursor: 'pointer' }}
                            variant="body1"
                            onClick={() => {
                              setSearchQuery(item);
                              searchKeyword(item);
                            }}
                          >
                            {item}
                          </Typography>
                        </Stack>
                      ))}
                  </Grid>
                  {/* Assigned to me */}
                  <Grid item xs={4}>
                    {/* <Stack
                      key={item}
                      direction="row"
                      spacing={1.3}
                      alignItems="center"
                    >
                      <HowToRegIcon sx={{ color: '#FFBE0F' }} />
                      <Typography variant="body1" sx={{ color: '#fff' }}>
                        {item}
                      </Typography>
                    </Stack> */}
                  </Grid>
                  {/* Saved searches */}
                  <Grid item xs={4}>
                    {savedSearches &&
                      savedSearches.map((item) => (
                        <Stack
                          key={item}
                          direction="row"
                          spacing={1.3}
                          alignItems="center"
                          sx={{
                            '&:hover .remove-button': {
                              display: 'inherit',
                            },
                          }}
                        >
                          <StarIcon sx={{ color: '#FFBE0F' }} />
                          <Typography
                            sx={{
                              color: '#fff',
                              cursor: 'pointer',
                            }}
                            variant="body1"
                            onClick={() => {
                              setSearchQuery(item);
                            }}
                          >
                            {item}
                          </Typography>
                          <IconButton
                            ml={2}
                            className="remove-button"
                            aria-label="remove"
                            onClick={() => {
                              handleRemoveSavedSearchButton(item);
                            }}
                            sx={{ display: 'none' }}
                          >
                            <ClearIcon
                              color="secondary"
                              sx={{ fontSize: 12 }}
                            />
                          </IconButton>
                        </Stack>
                      ))}
                  </Grid>
                </Grid>
              </Grid>
            </Fragment>
          )}
        </Box>
      </Grid>
    </Box>
  );
};

Search.propTypes = {
  onClose: PropTypes.func,
};

export default Search;
