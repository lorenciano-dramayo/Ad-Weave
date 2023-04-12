// React
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
// Router
import { useParams, Link } from 'react-router-dom';
// MUI
import { styled } from '@mui/styles';
import { Box, Stack, Typography, List } from '@mui/material';
// MUI Icons
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
// App hooks
import useQuery from 'hooks/useQuery';
// Assets
import ClientServicesIcon from 'assets/icons/concept/client_services.svg';
import CompletedIcon from 'assets/icons/concept/completed.svg';
import ForHandoverIcon from 'assets/icons/concept/for_handover.svg';
import InDesignIcon from 'assets/icons/concept/in_design.svg';
import InProgressIcon from 'assets/icons/concept/in_progress.svg';
import NotSupportedIcon from 'assets/icons/concept/not_supported.svg';
import OnHoldIcon from 'assets/icons/concept/on_hold.svg';
import QualityAssuranceIcon from 'assets/icons/concept/quality_assurance.svg';
import WithClientIcon from 'assets/icons/concept/with_client.svg';
// App components
import Button from 'components/Common/Button';
import InputField from 'components/Common/InputField';
import ProjectSidebarListItem from './ListItem';
import SkeletonLoader from './ListItem/skeleton';
import Fade from 'components/Common/Fade';
// Utilities
import { appColors } from 'theme/variables';
import PropTypes from 'prop-types';

// Styled Components
const StyledContainer = styled(Box)({
  width: '270px',
  height: '100vh',
  padding: '1.2rem',
  backgroundColor: appColors.lighterGray,
  borderRight: '1px solid #e0e0e075',
  position: 'absolute',
  overflow: 'hidden',
});

const StyledTitle = styled(Typography)({
  fontSize: '1.05rem',
  fontWeight: 700,
});

const StyledFilterButton = styled(Button)(({ theme }) => ({
  color: `${appColors.darkGray}`,
  width: 'fit-content',
  fontSize: '1em',
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.secondary.main,
    transition: '0.5s',
  },
}));

const StyledHorizontalDivider = styled('div')({
  height: 1,
  width: '100%',
  marginBottom: '0.3em',
  backgroundColor: appColors.lightGray,
});

const StyledInputField = styled(InputField)({
  fontSize: '0.9rem',
  borderRadius: '2px',
  //   paddingLeft: 15,
});

const StyledFade = styled(Fade)({
  height: '100vh',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '0.3em',
    height: '0.3em',
  },
  '&::-webkit-scrollbar-thumb': {
    // backgroundColor: 'rgba(255,255,255,.1)',
    borderRadius: 3,
    backgroundColor: 'sgrey',
  },
  '&:hover': {
    background: 'rgba(255,255,255,.2)',
  },
});

const ProjectSidebar = ({ isLoading, items, onClick, onSearch }) => {
  const { cid } = useParams();
  const methods = useForm();
  const [searchQuery, setSearchQuery] = useState('');

  const handleListItemClick = (_, index) => {
    onClick(index);
  };

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

  return (
    <StyledContainer>
      <Stack>
        <Stack mb={1} spacing={1.4} justifyContent="flex-start">
          <StyledTitle variant="p">Projects</StyledTitle>
          <Box>
            {/* <SearchOutlinedIcon sx={{ position: 'relative', top: 2 }} /> */}
            <FormProvider {...methods}>
              <StyledInputField
                name="search"
                value={searchQuery}
                inputProps={{
                  autoComplete: 'off',
                }}
                type="text"
                placeholder="Search Concept"
                disabled={isLoading}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onSearch(e);
                }}
                required
              />
            </FormProvider>
          </Box>
          <StyledFilterButton
            disableRipple
            size="small"
            startIcon={<FilterAltOutlinedIcon />}
          >
            Filter
          </StyledFilterButton>
        </Stack>
        <StyledHorizontalDivider />
        <List disablePadding>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <StyledFade in={!isLoading}>
              {items.map((item, index) => {
                return (
                  <ProjectSidebarListItem
                    key={index}
                    title={item.name}
                    icon={getStatusIcon(item.status)}
                    isSelected={cid === item.uuid}
                    isNewlyCreated={item.is_new}
                    partnerId={item.partner_uuid}
                    conceptId={item.uuid}
                  />
                );
              })}
            </StyledFade>
          )}
        </List>
      </Stack>
    </StyledContainer>
  );
};

ProjectSidebar.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default ProjectSidebar;
