import { useState } from 'react';

import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

// Mui Components
import { Stack, styled } from '@mui/material';

// global components
import ProjectSidebar from 'components/Project/Sidebar';

// local components
import Sidebar from 'pages/Project/views/Sidebar';
import Content from 'pages/Project/views/Content';

export default function Main({
  isFetchingList,
  filteredConceptList,
  statusList,
  membersList,
  partnersList,
  onFilter,
  onSearch,
  onScrollToLastItem,
}) {
  // React State
  const [open, setOpen] = useState(true);

  const { isFetchingOverview } = useSelector((state) => state.concept);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Sidebar
        isOpen={open}
        handleClose={handleDrawerClose}
        content={
          <ProjectSidebar
            isFetchingOverview={isFetchingOverview}
            isLoading={isFetchingList}
            items={filteredConceptList}
            statusList={statusList}
            membersList={membersList}
            partnersList={partnersList}
            onFilter={onFilter}
            onSearch={onSearch}
            onScrollToLastItem={onScrollToLastItem}
          />
        }
      />
      <Default open={open} sx={{ padding: '30px 40px' }}>
        <Stack>
          <Content />
        </Stack>
      </Default>
    </>
  );
}

Main.propTypes = {
  filteredConceptList: PropTypes.any,
  statusList: PropTypes.any,
  membersList: PropTypes.any,
  partnersList: PropTypes.any,
  isFetchingList: PropTypes.bool,
  onScrollToLastItem: PropTypes.func,
  onSearch: PropTypes.func,
  onFilter: PropTypes.func,
};

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
