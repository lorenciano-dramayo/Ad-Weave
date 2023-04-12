// React
import React, { useState, useEffect, Fragment, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Sweetalert
import Swal from 'sweetalert2';
// Asset Download
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
// Router
import { useHistory, useLocation } from 'react-router-dom';
// MUI
import { styled } from '@mui/styles';
import { Stack } from '@mui/material';
// App hooks
import useRouteGuard from 'hooks/useRouteGuard';
import useQuery from 'hooks/useQuery';
// Pages
import ProjectLinkList from 'pages/Project/views/LinkList';
import Extra from 'pages/Project/views/Extra';
// App components
import ProjectSidebar from 'components/Project/Sidebar';
import ProjectHeader from 'components/Project/Header';
import ProjectNavigation from 'components/Project/Navigation';
import ProjectProgress from 'components/Project/Progress';
import ProjectProgressSkeletonLoader from 'components/Project/Progress/skeleton';
import Fade from 'components/Common/Fade';
// Reducers
import {
  fetchConceptsList,
  fetchOverview,
  updateStatus,
  updateAssetDownload,
} from 'store/reducers/concept';
import { fetchMaintenanceTaskStatus } from 'store/reducers/maintenanceTaskStatus';

// Utilities
import _ from 'lodash';
import { transformConcepts, transformCampaigns } from 'utils/dictionary';

// Styled Components
const StyledBodyWrapper = styled(Stack)({
  padding: '2rem 2rem',
  width: '100%',
  marginLeft: '270px',
});

// Toast notification
const Toast = Swal.mixin({
  toast: true,
  icon: 'success',
  position: 'top-right',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

// Context
import { ConceptProvider } from 'pages/Project/Context';

const Project = () => {
  useRouteGuard();

  // States
  const {
    isFetchingList,
    list: conceptList,
    isFetchingOverview,
    overview,
    isAssetPending,
  } = useSelector((state) => state.concept);
  const { list: maintenanceTaskStatus } = useSelector(
    (state) => state.maintenanceTaskStatus
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const { search: urlParams } = useLocation();
  const [filteredConceptList, setFilteredConceptList] = useState([]);
  const [linkList, setLinkList] = useState([]);
  const [tab, setTab] = useState('Main Table');

  // Hooks
  useEffect(() => {
    const isListNotEmpty = !_.isEmpty(conceptList);
    const hasNoURLParams = _.isEmpty(urlParams);

    setFilteredConceptList(conceptList);

    if (!isFetchingList && isListNotEmpty && hasNoURLParams) {
      history.replace({
        pathname: `/projects`,
        search: `cid=${conceptList[0].uuid}&pid=${conceptList[0].partner_uuid}`,
      });
      dispatchFetchOverview(conceptList[0].uuid, conceptList[0].partner_uuid);
    }
  }, [isFetchingList]);

  useEffect(() => {
    setFilteredConceptList(conceptList);
  }, [conceptList]);

  useEffect(() => {
    const hasURLParams = !_.isEmpty(urlParams);

    dispatch(fetchConceptsList());
    dispatch(fetchMaintenanceTaskStatus());
    if (hasURLParams) {
      dispatchFetchOverview();
    }
  }, []);

  const dispatchFetchOverview = (cid, pid) => {
    dispatch(
      fetchOverview({
        conceptId: cid ?? query.get('cid'),
        partnerId: pid ?? query.get('pid'),
      })
    );
  };

  // Handlers
  const handleSideBarClick = useCallback((index) => {
    setTab('Main Click');
    setLinkList([]);

    history.push({
      pathname: `/projects`,
      search: `cid=${filteredConceptList[index].uuid}&pid=${filteredConceptList[index].partner_uuid}`,
    });
    dispatchFetchOverview(
      filteredConceptList[index].uuid,
      filteredConceptList[index].partner_uuid
    );
  });

  const handleTaskStatusChange = (e, taskId) => {
    const {
      target: { value: statusId },
    } = e;
    dispatch(
      updateStatus({
        type: 'task',
        id: _.toString(taskId),
        status: statusId,
      })
    );
  };

  const handleSidebarSearchFieldChange = (e) => {
    const {
      target: { value: query },
    } = e;
    if (_.isEmpty(query)) {
      return setFilteredConceptList(conceptList);
    }

    setFilteredConceptList(
      conceptList.filter((c) => {
        return c.name.toLowerCase().includes(query.toLowerCase());
      })
    );
  };

  const handleNavChange = (e) => {
    e !== 'Assets' ? setTab(e) : downloadAssets(overview.assets);

    // set links
    !_.isEmpty(overview.concept.link_list)
      ? setLinkList(overview.concept.link_list)
      : null;
  };

  const downloadAssets = async (assets) => {
    const zip = new JSZip();

    if (!_.isEmpty(assets)) {
      dispatch(
        updateAssetDownload({
          id: query.get('cid'),
          isDownloading: true,
        })
      );

      const assetLinks = assets.map(async (item) => {
        const response = await fetch(item.url);
        const data = await response.blob();

        zip.file(item.name, data);

        return data;
      });

      Promise.all(assetLinks).then(() => {
        zip.generateAsync({ type: 'blob' }).then((content) => {
          saveAs(content, `${overview.concept.name}.zip`);
          Toast.fire({
            title: 'Downloaded successfully!',
          }).then(() => {
            dispatch(
              updateAssetDownload({
                id: query.get('cid'),
                isDownloading: false,
              })
            );
          });
        });
      });
    }
  };

  const hasCampaigns = !_.isEmpty(overview.campaigns);

  return (
    <Stack direction="row" justifyContent="space-between">
      <ConceptProvider>
        <ProjectSidebar
          items={filteredConceptList}
          isLoading={isFetchingList}
          onClick={handleSideBarClick}
          onSearch={handleSidebarSearchFieldChange}
        />
        <StyledBodyWrapper spacing={4}>
          <Stack>
            <ProjectHeader data={overview} isLoading={isFetchingOverview} />
            <ProjectNavigation
              data={overview}
              isLoading={isFetchingOverview}
              onChange={handleNavChange}
              tabSelected={tab}
              isAssetPending={isAssetPending}
              setAssetPending={updateAssetDownload}
            />
          </Stack>
          {tab !== 'Links' ? (
            <Stack spacing={5}>
              {isFetchingOverview ? (
                <Fragment>
                  <ProjectProgressSkeletonLoader />
                  <ProjectProgressSkeletonLoader />
                  <ProjectProgressSkeletonLoader />
                </Fragment>
              ) : (
                <Fragment>
                  {!_.isEmpty(transformCampaigns(overview)) && (
                    <Fade in={!isFetchingOverview}>
                      {transformCampaigns(overview, maintenanceTaskStatus).map(
                        (progress, index) => (
                          <ProjectProgress
                            {...progress}
                            key={index}
                            overview={overview}
                            isCampaign
                            onStatusChange={handleTaskStatusChange}
                          />
                        )
                      )}
                    </Fade>
                  )}
                  {!_.isEmpty(transformConcepts(overview)) && (
                    <Fade in={!isFetchingOverview}>
                      {transformConcepts(overview, maintenanceTaskStatus).map(
                        (progress, index) => (
                          <ProjectProgress
                            {...progress}
                            key={index}
                            overview={overview}
                            isCollapsed={!hasCampaigns && index == 0}
                            onStatusChange={handleTaskStatusChange}
                          />
                        )
                      )}
                    </Fade>
                  )}
                </Fragment>
              )}
            </Stack>
          ) : (
            <Stack spacing={5}>
              <ProjectLinkList lists={linkList} />
            </Stack>
          )}
        </StyledBodyWrapper>
        <Extra />
      </ConceptProvider>
    </Stack>
  );
};

export default memo(Project);
