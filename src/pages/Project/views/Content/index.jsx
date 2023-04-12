import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import _ from 'lodash';

// Utils
import { transformConcepts, transformCampaigns } from 'utils/dictionary';

// Reducers
import {
  fetchOverview,
  updateAssetDownload,
  updateStatus,
  populateTable,
} from 'store/reducers/concept';

// MUI Components
import { Stack, CircularProgress, Button } from '@mui/material';

// Global Components
import ProjectHeader from 'components/Project/Header';
import ProjectNavigation from 'components/Project/Navigation';
import ProjectProgress from 'components/Project/Progress';
import ProjectLinkList from 'pages/Project/views/LinkList';
import ProjectProgressSkeletonLoader from 'components/Project/Progress/skeleton';
import Fade from 'components/Common/Fade';
import GlobalDrawer from 'components/Common/Drawer';

// local components
import AssetDownload from 'pages/Project/views/AssetDownload';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Content() {
  const { pid, cid } = useParams();
  const dispatch = useDispatch();

  // React State
  const [linkList, setLinkList] = useState([]);
  const [tab, setTab] = useState('Main Table');

  const [conceptTable, setConceptTable] = useState({});
  const [campaignTable, setCampaignTable] = useState({});
  const [isSearching, setIsSearching] = useState(false);

  const [isAssetOpen, setIsAssetOpen] = useState(false);

  // redux state
  const { overview, isFetchingOverview, isAssetPending } = useSelector(
    (state) => state.concept
  );

  const { list: maintenanceTaskStatus } = useSelector(
    (state) => state.maintenanceTaskStatus
  );

  const concept = transformConcepts(overview, maintenanceTaskStatus);
  const campaign = transformCampaigns(overview, maintenanceTaskStatus);

  useEffect(() => {
    setTab('Main Table');

    dispatch(
      fetchOverview({
        conceptId: cid,
        partnerId: pid,
      })
    );
  }, [cid, pid]);

  useEffect(() => {
    dispatch(
      populateTable({
        campaign: campaign,
        concept: concept,
      })
    );

    setConceptTable(concept);
    setCampaignTable(campaign);
  }, [overview]);

  // navigation
  const handleNavChange = (e) => {
    // e !== 'Assets' ? setTab(e) : downloadAssets(overview.assets);

    e !== 'Assets' ? setTab(e) : setIsAssetOpen(!isAssetOpen);
    // set links
    !_.isEmpty(overview.concept.link_list)
      ? setLinkList(overview.concept.link_list)
      : null;
  };

  // task status
  const handleTaskStatusChange = (e, taskId, relType) => {
    const {
      target: { value: statusId },
    } = e;

    dispatch(
      updateStatus({
        id: _.toString(taskId),
        status: statusId,
        rel_type:
          relType === 'task'
            ? 3
            : relType === 'subtask'
            ? 4
            : relType === 'campaign'
            ? 2
            : 1,
      })
    );
  };

  const handleSearch = (query) => {
    if (_.isEmpty(query)) {
      setIsSearching(false);
      setConceptTable(concept);
      setCampaignTable(campaign);
      return;
    }

    setIsSearching(true);

    const filteredConceptTable = concept.filter((data) => {
      const rows = data.dataset.rows.filter((x) => {
        return x.name.toLowerCase().includes(query.toLowerCase());
      });
      data.dataset.rows = rows;
      return !_.isEmpty(rows);
    });

    const filteredCampaignTable = campaign.filter((data) => {
      const rows = data.dataset.rows.filter((x) => {
        return x.name.toLowerCase().includes(query.toLowerCase());
      });
      data.dataset.rows = rows;
      return !_.isEmpty(rows);
    });

    setConceptTable(filteredConceptTable);
    setCampaignTable(filteredCampaignTable);
  };

  const handleScrollPaginate = () => {};

  const hasCampaigns = !_.isEmpty(overview.campaigns);

  return (
    <>
      <Stack>
        <ProjectHeader data={overview} isLoading={isFetchingOverview} />
        <ProjectNavigation
          data={overview}
          isLoading={isFetchingOverview}
          onChange={handleNavChange}
          onSearch={handleSearch}
          tabSelected={tab}
          isAssetPending={isAssetPending}
          setAssetPending={updateAssetDownload}
        />
      </Stack>
      {tab !== 'Links' ? (
        <Stack spacing={5}>
          {isFetchingOverview ? (
            <ProjectProgressSkeletonLoader />
          ) : (
            <>
              {!_.isEmpty(campaignTable) && (
                <Fade in={!isFetchingOverview}>
                  {campaignTable.map((progress, index) => (
                    <ProjectProgress
                      {...progress}
                      key={index}
                      overview={overview}
                      onStatusChange={handleTaskStatusChange}
                      isCampaign
                    />
                  ))}
                  {/* {!_.isEmpty([]) ? (
                    <Stack direction="row" justifyContent="center">
                      <CircularProgress
                        size={26}
                        color="secondary"
                        thickness={7}
                      />
                    </Stack>
                  ) : (
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button
                        onClick={handleScrollPaginate}
                        endIcon={<ExpandMoreIcon />}
                        sx={{ fontSize: '0.75em', fontWeight: '600' }}
                        // size="small"
                      >
                        {'Load More'}
                      </Button>
                    </Stack>
                  )} */}
                </Fade>
              )}
              {!_.isEmpty(conceptTable) && (
                <Fade in={!isFetchingOverview}>
                  {conceptTable.map((progress, index) => (
                    <ProjectProgress
                      {...progress}
                      key={index}
                      overview={overview}
                      isCollapsed={(!hasCampaigns && index == 0) || isSearching}
                      onStatusChange={handleTaskStatusChange}
                    />
                  ))}
                </Fade>
              )}
            </>
          )}
        </Stack>
      ) : (
        <Fade in={!isFetchingOverview}>
          <Stack spacing={5}>
            <ProjectLinkList lists={linkList} id={cid} />
          </Stack>
        </Fade>
      )}
      <GlobalDrawer
        content={
          <AssetDownload
            overview={overview}
            onClose={() => setIsAssetOpen(!isAssetOpen)}
            conceptId={cid}
          />
        }
        name="asset-center"
        width={976}
        isOpen={isAssetOpen}
        anchor="right"
        BackdropProps={{
          invisible: false,
          sx: { backgroundColor: '#25165b7a' },
        }}
        transitionDuration={{ enter: 500, exit: 500 }}
        hideBackdrop={false}
        onClose={() => setIsAssetOpen(!isAssetOpen)}
      />
    </>
  );
}
