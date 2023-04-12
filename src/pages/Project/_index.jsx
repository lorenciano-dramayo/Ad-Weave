import { useEffect, useState, useCallback } from 'react';

import _ from 'lodash';

// Utils
import { transformConcepts, transformCampaigns } from 'utils/dictionary';

import useRouteGuard from 'hooks/useRouteGuard';

// Sweetalert
import Swal from 'sweetalert2';

// Asset Download
import JSZip from 'jszip';

// Saver
import { saveAs } from 'file-saver';

// router
import { useParams, useHistory } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';

// Reducers
import { fetchOverview, fetchConceptsList, updateAssetDownload, updateStatus } from 'store/reducers/concept';
import { fetchMaintenanceTaskStatus } from 'store/reducers/maintenanceTaskStatus';

// Components
import ProjectSidebar from 'components/Project/Sidebar';
import ProjectHeader from 'components/Project/Header';
import ProjectNavigation from 'components/Project/Navigation';
import ProjectProgress from 'components/Project/Progress';
import ProjectProgressSkeletonLoader from 'components/Project/Progress/skeleton';
import Fade from 'components/Common/Fade';

// MUI Component
import { Stack, styled } from '@mui/material';

// pages
import ProjectLinkList from 'pages/Project/views/LinkList';
import Sidebar from 'pages/Project/views/Sidebar';

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

// Content Pusher
const Default = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(5),
  width: 'calc(100vw - 26.4rem)',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export default function Project() {
  useRouteGuard();
  const history = useHistory();
  const dispatch = useDispatch();
  const { pid, cid } = useParams();
  // component state
  const [open, setOpen] = useState(true);
  const [filteredConceptList, setFilteredConceptList] = useState([]);
  const [linkList, setLinkList] = useState([]);
  const [tab, setTab] = useState('Main Table');

  // redux state
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

  useEffect(() => {
    _.isEmpty(conceptList) && dispatch(fetchConceptsList());
    _.isEmpty(maintenanceTaskStatus) && dispatch(fetchMaintenanceTaskStatus());

    dispatch(
      fetchOverview({
        conceptId: cid,
        partnerId: pid,
      })
    );
  }, []);

  // component on update
  useEffect(() => {
    setFilteredConceptList(conceptList);
  }, [conceptList]);

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

  const handleSideBarClick = useCallback((index) => {
    setTab('Main Table');
    setLinkList([]);
    history.push(`/projects/${filteredConceptList[index].partner_uuid}/concept/${filteredConceptList[index].uuid}`)
  });


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

  const handleDrawerClose = () => {
    setOpen(false);
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
          id: cid,
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
                id: cid,
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
    <Stack direction="row">
      <Sidebar
        isOpen={open}
        handleClose={handleDrawerClose}
        content={
          <ProjectSidebar
            items={filteredConceptList}
            isLoading={isFetchingList}
            onClick={handleSideBarClick}
            onSearch={handleSidebarSearchFieldChange}
          />
        }
      />
      <Default open={open}>
        <Stack spacing={4}>
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
                <>
                  <ProjectProgressSkeletonLoader />
                  <ProjectProgressSkeletonLoader />
                  <ProjectProgressSkeletonLoader />
                </>
              ) : (
                <>
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
                </>
              )}
            </Stack>
          ) : (
            <Stack spacing={5}>
              <ProjectLinkList lists={linkList} />
            </Stack>
          )}
        </Stack>
      </Default>
    </Stack>
  );
}
