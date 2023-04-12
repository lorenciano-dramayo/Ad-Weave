// React
import { useState, memo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

// Router
import { useParams } from 'react-router-dom';

// MUI
import { styled } from '@mui/styles';
import { Box, Stack, Typography, List, InputAdornment } from '@mui/material';

// MUI Icons
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
// Assets
import ClientServicesIcon from 'assets/icons/concept/client_services.svg';
import CompletedIcon from 'assets/icons/concept/completed.svg';
import ForHandoverIcon from 'assets/icons/concept/for_handover.svg';
import InDesignIcon from 'assets/icons/concept/in_design.svg';
import InProgressIcon from 'assets/icons/concept/in_progress.svg';
import InCSIcon from 'assets/icons/concept/in_cs.svg';
import inQAIcon from 'assets/icons/concept/in_qa.svg';
import NotSupportedIcon from 'assets/icons/concept/not_supported.svg';
import OnHoldIcon from 'assets/icons/concept/on_hold.svg';
import QualityAssuranceIcon from 'assets/icons/concept/quality_assurance.svg';
import WithClientIcon from 'assets/icons/concept/with_client.svg';

import InfiniteScroll from 'react-infinite-scroll-component';

// App components
import Button from 'components/Common/Button';
import InputField from 'components/Common/InputField';
import ProjectSidebarListItem from './ListItem';
import SkeletonLoader from './ListItem/skeleton';
import SkeletonList from './Skeleton';
import Fade from 'components/Common/Fade';
import Filter from 'pages/Project/Components/Filter';

// Utilities
import { appColors } from 'theme/variables';
import _ from 'lodash';
import PropTypes from 'prop-types';

// Styled Components
const StyledContainer = styled(Box)({
  width: '270px',
  height: '100vh',
  padding: '1.2rem 1.2rem 0px 1.2rem',
  backgroundColor: appColors.lighterGray,
  borderRight: '1px solid #e0e0e075',
  position: 'absolute',
  overflow: 'hidden',
});

const StyledTitle = styled(Typography)({
  fontSize: '1.05rem',
  fontWeight: 700,
});

const StyledFilterButton = styled(Button)(() => ({
  color: `${appColors.darkGray}`,
  width: 'fit-content',
  fontSize: '14px',
  lineHeight: '16px',
  padding: '8px 12px',
  borderRadius: '3px',
  fontWeight: 700,
  '&:hover': {
    backgroundColor: appColors.lightViolet,
    color: '#fff',
    transition: '0.5s',
  },
}));

const StyledHorizontalDivider = styled('div')({
  height: 1,
  width: '100%',
  backgroundColor: appColors.lightGray,
  marginTop: 8,
});

const StyledInputField = styled(InputField)({
  fontSize: '0.9rem',
  borderRadius: '0.2em',
  //   paddingLeft: 15,

  '&.Mui-focused fieldset': {
    border: '1px solid #5025c4 !important',
    boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
  },
});

const StyledScrollableContainer = styled('div')({
  height: 'calc(100vh - 10.5em)',
  '&::-webkit-scrollbar': {
    width: '0.3em',
    // height: '0.3em',
  },
  '&::-webkit-scrollbar-thumb': {
    // backgroundColor: 'rgba(255,255,255,.1)',
    borderRadius: 3,
    backgroundColor: 'lightgrey',
  },
  '&:hover': {
    background: 'rgba(255,255,255,.2)',
  },
});

function ProjectSidebar({
  isFetchingOverview,
  isLoading,
  items,
  statusList,
  membersList,
  partnersList,
  onSearch,
  onFilter,
  onScrollToLastItem,
}) {
  const { cid } = useParams();
  const methods = useForm();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return CompletedIcon;
      case 'client_services':
        return ClientServicesIcon;
      case 'for_handover':
        return ForHandoverIcon;
      case 'in_design':
        return InDesignIcon;
      case 'in_progress':
        return InProgressIcon;
      case 'in_cs':
        return InCSIcon;
      case 'in_qa':
        return inQAIcon;
      case 'not_supported':
        return NotSupportedIcon;
      case 'on_hold':
        return OnHoldIcon;
      case 'quality_assurance':
        return QualityAssuranceIcon;
      case 'with_client':
        return WithClientIcon;
      default:
        return null;
    }
  };

  const filtersDatasource = [
    {
      title: 'Partner Group',
      items: partnersList,
    },
    {
      title: 'Delivery Date',
      type: 'date',
    },
    {
      title: 'Members',
      items: membersList,
    },
    {
      title: 'Statuses',
      items: statusList,
    },
  ];

  return (
    <>
      <StyledContainer>
        <Stack>
          <Stack spacing={0} justifyContent="center">
            <StyledTitle variant="p">Projects</StyledTitle>
            <Box my={1}>
              {/* <SearchOutlinedIcon sx={{ position: 'relative', top: 2 }} /> */}
              <FormProvider {...methods}>
                <StyledInputField
                  name="search"
                  value={searchQuery}
                  inputProps={{
                    autoComplete: 'off',
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          width: '1em !important',
                          height: '1em !important',
                        }}
                      />
                    </InputAdornment>
                  }
                  type="text"
                  placeholder="Search concept"
                  disabled={isLoading}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    onSearch(e);
                  }}
                  required
                  size="small"
                />
              </FormProvider>
            </Box>
            <StyledFilterButton
              size="small"
              startIcon={<TuneIcon />}
              onClick={(e) => {
                setFilterAnchorEl(e.currentTarget);
                setFilterIsOpen(true);
              }}
            >
              Filter
            </StyledFilterButton>
            <StyledHorizontalDivider />
          </Stack>
          <StyledScrollableContainer
            id="scrollable-container"
            className="scroll-shadows"
            style={{ overflow: isFetchingOverview ? 'hidden' : 'auto' }}
          >
            <List disablePadding>
              {isLoading ? (
                <SkeletonLoader />
              ) : (
                <Fade in={!isLoading}>
                  {items && (
                    <InfiniteScroll
                      dataLength={items.length}
                      hasMore={hasMore}
                      next={() => {
                        onScrollToLastItem(() => {
                          setHasMore(false);
                        });
                      }}
                      loader={
                        <Typography
                          align="center"
                          variant="subtitle1"
                          sx={{ fontSize: '0.8em', opacity: 0.5 }}
                        >
                          Fetching more data...
                        </Typography>
                      }
                      scrollableTarget="scrollable-container"
                    >
                      {items.map((item, index) => {
                        if (!isFetchingOverview) {
                          return (
                            <ProjectSidebarListItem
                              key={index}
                              title={item.name}
                              icon={getStatusIcon(item.status)}
                              isSelected={item.uuid === cid}
                              isNewlyCreated={item.is_new}
                              partnerId={item.partner_uuid}
                              conceptId={item.uuid}
                              isFetchingOverview={isFetchingOverview}
                            />
                          );
                        } else {
                          return item.uuid === cid ? (
                            <ProjectSidebarListItem
                              key={index}
                              title={item.name}
                              icon={getStatusIcon(item.status)}
                              isSelected={item.uuid === cid}
                              isNewlyCreated={item.is_new}
                              partnerId={item.partner_uuid}
                              conceptId={item.uuid}
                              isFetchingOverview={isFetchingOverview}
                            />
                          ) : (
                            <Stack key={index}>
                              <SkeletonList />
                            </Stack>
                          );
                        }
                      })}
                    </InfiniteScroll>
                  )}
                </Fade>
              )}
            </List>
          </StyledScrollableContainer>
        </Stack>
      </StyledContainer>
      {!_.isEmpty(filtersDatasource) && (
        <Filter
          isOpen={filterIsOpen}
          anchorEL={filterAnchorEl}
          datasource={filtersDatasource}
          onFilter={onFilter}
          onClose={() => setFilterIsOpen(false)}
        />
      )}
    </>
  );
}

ProjectSidebar.propTypes = {
  isFetchingOverview: PropTypes.bool,
  isLoading: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object),
  statusList: PropTypes.arrayOf(PropTypes.object),
  membersList: PropTypes.arrayOf(PropTypes.object),
  partnersList: PropTypes.arrayOf(PropTypes.object),
  onScrollToLastItem: PropTypes.func,
  onSearch: PropTypes.func,
  onFilter: PropTypes.any,
};

export default memo(ProjectSidebar);
