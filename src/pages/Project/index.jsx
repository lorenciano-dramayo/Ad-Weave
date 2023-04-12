import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { formatDate } from 'utils/date';
import _ from 'lodash';

import useRouteGuard from 'hooks/useRouteGuard';

// Reducer
import { fetchConceptsList, fetchSubscribers } from 'store/reducers/concept';
import { fetchPartners } from 'store/reducers/partners';
import { fetchMaintenanceTaskStatus } from 'store/reducers/maintenanceTaskStatus';
import { fetchCampaignsList } from 'store/reducers/campaign';

// pages
import Main from 'pages/Project/views/Main';

// MUI Components
import { Stack } from '@mui/material';

export default function Project() {
  useRouteGuard();
  const { path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  // React State
  const [filteredConceptList, setFilteredConceptList] = useState([]);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusesFilter, setSelectedStatusesFilter] = useState([]);
  const [selectedPartnersFilter, setSelectedPartnersFilter] = useState([]);
  const [selectedMembersFilter, setSelectedMembersFilter] = useState([]);
  const [selectedDeliveryDatesFilter, setSelectedDeliveryDatesFilter] =
    useState({});

  // Redux States
  const {
    isFetchingList,
    isFetchingOverview,
    list: { data: conceptList, current_page: currentPage, last_page: lastPage },
  } = useSelector((state) => state.concept);

  const { list: campaign, isFetching: isFechingCampaign } = useSelector(
    (state) => state.campaign
  );

  const { list: stateStatusList } = useSelector(
    (state) => state.maintenanceTaskStatus
  );

  const { subscribers: stateSubscribers } = useSelector(
    (state) => state.concept
  );

  const { list: statePartners } = useSelector((state) => state.partners);

  const statusList = stateStatusList.map((item) => ({
    id: item.title,
    name: item.name,
    isChecked: selectedStatusesFilter.includes(item.title.toLowerCase()),
  }));

  const membersList = stateSubscribers.map((item) => ({
    id: item.id,
    name: item.name,
    isChecked: selectedMembersFilter.includes(item.id),
  }));

  const partnersList = statePartners.map((item) => ({
    id: item.id,
    name: item.name,
    isChecked: selectedPartnersFilter.includes(item.id),
  }));

  const filterParams = {
    filter: {
      name: searchQuery,
      status: selectedStatusesFilter,
      partner_uuid: selectedPartnersFilter,
      'userPartners.user_id': selectedMembersFilter,
      delivery_date: [
        selectedDeliveryDatesFilter.startDate,
        selectedDeliveryDatesFilter.endDate,
      ].filter((i) => i != null),
    },
  };

  const hasFilters =
    !_.isEmpty(searchQuery) ||
    !_.isEmpty(selectedMembersFilter) ||
    !_.isEmpty(selectedStatusesFilter) ||
    !_.isEmpty(selectedPartnersFilter) ||
    !_.isEmpty(selectedDeliveryDatesFilter);

  useEffect(() => {
    document.title = 'Projects | Ad-Weave';
    dispatch(fetchPartners());
    dispatch(fetchSubscribers({}));
    dispatch(fetchMaintenanceTaskStatus());
    dispatch(fetchConceptsList());
  }, []);

  useEffect(() => {
    const shouldRedirectToCampaign = localStorage
      .getItem('redirect')
      ?.includes('campaign');

    if (shouldRedirectToCampaign) {
      const campaignId = localStorage.getItem('redirect').split('/')[2];

      dispatch(fetchCampaignsList(campaignId));

      setFilteredConceptList(conceptList);
      return;
    }

    if (!_.isEmpty(conceptList) && !isFetchingList) {
      if (history.location.pathname === '/projects') {
        history.push(
          `/projects/${conceptList[0].partner_uuid}/concept/${conceptList[0].uuid}`
        );
      } else {
        history.push(history.location.pathname);
      }
    }

    setFilteredConceptList(conceptList);
  }, [conceptList]);

  useEffect(() => {
    const shouldRedirectToCampaign =
      !_.isEmpty(campaign) &&
      localStorage.getItem('redirect')?.includes('campaign');

    if (shouldRedirectToCampaign) {
      history.push(
        `/projects/${campaign.partner_id}/concept/${campaign.concept_id}`
      );
    }
  }, [campaign]);

  useEffect(() => {
    const shouldRedirectToCampaign =
      !_.isEmpty(campaign) &&
      !isFetchingOverview &&
      localStorage.getItem('redirect')?.includes('campaign');

    if (shouldRedirectToCampaign) {
      setTimeout(() => {
        localStorage?.removeItem('isURL');

        history.push({
          pathname: localStorage.getItem('redirect'),
          state: {
            background: location,
            type: null,
            subtask: null,
          },
        });

        localStorage.removeItem('redirect');
      }, 500);
    }
  }, [isFetchingOverview]);

  useEffect(() => {
    if (hasFilters) {
      dispatch(fetchConceptsList(false, true, filterParams));
    } else {
      dispatch(fetchConceptsList(false));
    }
  }, [
    searchQuery,
    selectedStatusesFilter,
    selectedMembersFilter,
    selectedPartnersFilter,
    selectedDeliveryDatesFilter,
  ]);

  const handleSidebarSearchFieldChange = (e) => {
    const {
      target: { value: query },
    } = e;
    setSearchQuery(query);
  };

  const handleSidebarFilterChange = (filters) => {
    // Statuses
    if (selectedStatusesFilter.includes(filters.status)) {
      setSelectedStatusesFilter(
        selectedStatusesFilter.filter((s) => s != filters.status)
      );
    } else {
      if (!_.isUndefined(filters.status)) {
        setSelectedStatusesFilter([...selectedStatusesFilter, filters.status]);
      }
    }

    // Partners
    if (selectedPartnersFilter.includes(filters.partner)) {
      setSelectedPartnersFilter(
        selectedPartnersFilter.filter((s) => s != filters.partner)
      );
    } else {
      if (!_.isUndefined(filters.partner)) {
        setSelectedPartnersFilter([...selectedPartnersFilter, filters.partner]);
      }
    }

    // Members
    if (selectedMembersFilter.includes(filters.member)) {
      setSelectedMembersFilter(
        selectedMembersFilter.filter((s) => s != filters.member)
      );
    } else {
      if (!_.isUndefined(filters.member)) {
        setSelectedMembersFilter([...selectedMembersFilter, filters.member]);
      }
    }

    // Deliver Date
    if (!_.isUndefined(filters.deliveryDate)) {
      if (_.isEmpty(filters.deliveryDate)) {
        setSelectedDeliveryDatesFilter({});
      } else {
        setSelectedDeliveryDatesFilter({
          startDate: formatDate(
            filters.deliveryDate[0].startDate,
            'YYYY-MM-DD'
          ),
          endDate: formatDate(filters.deliveryDate[0].endDate, 'YYYY-MM-DD'),
        });
      }
    }
  };

  const handlePagination = (lastItem) => {
    const nextPage = currentPage + 1;
    if (nextPage <= lastPage) {
      dispatch(
        fetchConceptsList(
          false,
          false,
          hasFilters ? filterParams : {},
          nextPage
        )
      );
    } else {
      lastItem();
    }
  };

  return (
    <>
      <Stack direction="row">
        <Switch>
          <Route
            path={`${path}/:pid/concept/:cid`}
            render={() => (
              <Main
                isFetchingList={isFetchingList}
                statusList={statusList}
                membersList={membersList}
                partnersList={partnersList}
                filteredConceptList={filteredConceptList}
                onSearch={handleSidebarSearchFieldChange}
                onFilter={handleSidebarFilterChange}
                onScrollToLastItem={handlePagination}
              />
            )}
          />
        </Switch>
      </Stack>
    </>
  );
}
