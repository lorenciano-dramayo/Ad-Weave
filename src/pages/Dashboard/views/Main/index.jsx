import React, { useContext } from 'react';
import _ from 'lodash';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';

// Context
import DashboardContext from 'pages/Dashboard/Context';

import InfiniteScroll from 'react-infinite-scroll-component';

// Global Component
import Header from 'pages/Dashboard/views/DesignQADash/Components/Header';
import Title from 'pages/Dashboard/Components/Title';
import Options from 'pages/Dashboard/Components/Options';
import ChipResult from 'pages/Dashboard/Components/ChipsResult';
import Sidebar from 'pages/Dashboard/views/DesignQADash/Components/Sidebar';
import NavList from 'pages/Dashboard/views/DesignQADash/Components/NavList';
import Loader from 'pages/Dashboard/Components/Loader';
import DataLoader from 'pages/Dashboard/Components/DataLoader';

// Themes
import Card from 'pages/Dashboard/views/Card';

// helper
import { Default } from 'pages/Dashboard/views/DesignQADash/helpers';

// constant
import {
  queues_options,
  //more_options,
  //dashboard_statistics,
  //dashboard_themes,
  navigation_list,
} from 'pages/Dashboard/constant';

// MUI Components
import {
  Box,
  Divider,
  Stack,
  CircularProgress,
  Typography,
} from '@mui/material';

// logo
import logo from 'assets/adLibLogo.svg';

export default function Main() {
  const {
    user,
    data: dash_data,
    openSide,
    handleDrawer,
    handlePopper,
    getDashData,
    dash,
    taskTypeList,
    statusList,
    queueCount,
    teamsList,
    prioritiesList,
    partnerList,
    dashboardFetching,
    statusFetching,
    taskTypeListFetching,
    teamsListFetching,
    prioritiesFetching,
    partnerFetching,
    queueCountFetching,
    handleScrollPaginate,
    handleReset,
    handleTaskUpdate,
  } = useContext(DashboardContext);
  const { height, width } = useWindowDimensions();

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
  }

  return (
    <Box overflow="hidden" height="100vh">
      {!_.isEmpty(taskTypeList) &&
        !_.isEmpty(statusList) &&
        !_.isEmpty(prioritiesList) &&
        !_.isEmpty(partnerList) &&
        !_.isEmpty(localStorage.getItem('dashboard')) && (
          <DataLoader
            dashData={JSON.parse(localStorage.getItem('dashboard'))}
            getDashData={getDashData}
          />
        )}

      {!(
        !dashboardFetching &&
        !statusFetching &&
        !taskTypeListFetching &&
        !teamsListFetching &&
        !prioritiesFetching &&
        !partnerFetching &&
        !_.isEmpty(dash_data) &&
        !queueCountFetching
      ) && <Loader />}
      {/* 
      <Header
        onSettingsClicked={handleDrawer}
        setSettingsOpen={[]}
        setDrawerType={[]}
      /> */}

      <Box display="flex">
        {/* Side Navigation */}

        <Sidebar
          isOpen={true}
          content={
            <Box>
              <Stack
                direction="row"
                sx={{ margin: '18px 18px 0' }}
                spacing={2}
                justifyContent="center"
                backgroundColor="#5025c40d"
                alignItems="center"
                p={1}
                borderRadius={1}
                border="1px solid #f1ebff"
              >
                <Box display="flex">
                  <img
                    src={logo}
                    alt="ad-lib-logo"
                    style={{ width: '15px', height: 'auto' }}
                  />
                </Box>
                <Typography fontWeight={800} color="primary">
                  Ad-Weave.io
                </Typography>
              </Stack>

              {navigation_list?.map((data, index) => (
                <Box key={index}>
                  <NavList
                    user={user}
                    title={data?.title}
                    options={
                      data?.slug === 'queues'
                        ? queues_options
                        : data?.slug === 'teams'
                          ? teamsList
                          : data?.slug === 'task_types'
                            ? _.filter(
                              _.filter(
                                taskTypeList,
                                (dataList) =>
                                  !_.isEmpty(dataList?.name) &&
                                  dataList?.status?.toLowerCase() === 'active'
                              ),
                              (dataAuth) =>
                                !user?.admin_role?.toLowerCase().includes('admin')
                                  ? dataAuth?.team_id === user?.team_id
                                  : dataAuth
                            )
                            : data?.slug === 'priority'
                              ? prioritiesList
                              : data.slug === 'health'
                                ? data?.options
                                : statusList
                    }
                    queueCount={data?.slug === 'queues' ? queueCount : []}
                    getDashData={getDashData}
                    dashData={dash_data}
                    history={history}
                  />
                  {!(navigation_list.length === index + 1) ? (
                    [3, 4, 5, 7, 9, 10, 11].includes(user?.team_id) &&
                      user?.admin_role?.toLowerCase().includes('member') &&
                      data?.slug === 'teams' ? (
                      <></>
                    ) : (
                      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.05)' }} />
                    )
                  ) : (
                    <></>
                  )}
                </Box>
              ))}
            </Box>
          }
        />

        {/* Main */}

        <Default open={openSide} id="dashboard-main" className="scroll-shadows">
          {/* Title */}
          {!_.isEmpty(dash) && (
            <Stack position="relative" width="100%">
              <Stack width={width - 365} position="fixed" zIndex="1" backgroundColor="white">
                <Title
                  queues_options={queues_options}
                  dataDash={dash_data}
                  dashData={dash_data}
                />

                {/* Counter */}

                {/* Options */}
                {!_.isEmpty(dash_data) && (
                  <Options
                    onOptionsClicked={handleDrawer}
                    onSortClicked={handlePopper}
                    getDashData={getDashData}
                    dashData={dash_data}
                  />
                )}
              </Stack>
            </Stack>
          )}
          {/* Keys */}
          {/* <Stack direction="row">
            {!_.isEmpty(urlParams) &&
              Object.keys(urlParams).map(
                (keys) =>
                  keys !== 'queue' &&
                  urlParams[keys].split(',').map((data, index) => (
                    <Chip
                      key={index}
                      label={keys === 'search' ? `'${data}'` : data}
                      size="small"
                      onDelete={() => handleFilterDelete(keys, data)}
                      color="primary"
                      sx={{
                        borderRadius: '0.3em',
                        textTransform:
                          keys !== 'search' ? 'capitalize' : 'normal',
                        marginRight: '0.5em',
                      }}
                    />
                  ))
              )}

            {Object.keys(urlParams).length > 1 && (
              <Button
                variant="text"
                startIcon={<HighlightOffIcon />}
                size="small"
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: 700,
                  color: appColors.lightViolet,
                  '.MuiButton-startIcon': {
                    marginRight: '4px',
                    '.MuiSvgIcon-root': { fontSize: '12px' },
                  },
                  '&:hover': { background: 'transparent' },
                }}
                disableRipple
                disableElevation
                disableFocusRipple
                disableTouchRipple
                onClick={handleReset}
              >
                Reset
              </Button>
            )}
          </Stack> */}

          {/* Cards */}
          {!_.isEmpty(dash) && (
            <>
              {/* ChipsResult */}
              <ChipResult urlParams={dash_data} />
              <Stack marginTop="150px">
                <InfiniteScroll
                  dataLength={dash?.data?.length}
                  style={{ overflow: 'unset !important' }}
                  hasMore={!_.isEmpty(dash?.next_page_url)}
                  loader={
                    <Stack direction="row" justifyContent="center">
                      <CircularProgress
                        size={26}
                        color="secondary"
                        thickness={7}
                      />
                    </Stack>
                  }
                  scrollableTarget="dashboard-main"
                  next={() => handleScrollPaginate(dash)}
                >
                  <Card
                    dash={dash}
                    onFieldUpdate={handlePopper}
                    getDashData={getDashData}
                    handleReset={handleReset}
                    handleTaskUpdate={handleTaskUpdate}
                  />
                </InfiniteScroll>
              </Stack>
            </>
          )}
        </Default>
        <Toaster position="top-right" reverseOrder={false} />
      </Box>
    </Box>
  );
}
