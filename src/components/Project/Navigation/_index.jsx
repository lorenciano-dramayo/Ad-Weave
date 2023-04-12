// React
import { useState, useEffect, Fragment } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

//redux
import { useDispatch } from 'react-redux';

// MUI
import { styled } from '@mui/styles';
import {
  Stack,
  IconButton,
  Collapse,
  Box,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import ClickAwayListener from '@mui/base/ClickAwayListener';

// MUI Icons
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';

// App Components
import Button from 'components/Common/Button';
import InputField from 'components/Common/InputField';
import ProjectNavigationAccordionDetails from './AccordionDetails';

// Loader
import SkeletonLoader from './skeleton';

// Utilities
import { appColors } from 'theme/variables';
import PropTypes from 'prop-types';
import _ from 'lodash';

const StyledStack = styled(Stack)({
  borderBottom: `1px solid ${appColors.lightGray}`,
  marginTop: '0.5em',
});

const StyledCTAButton = styled(Button)(({ theme }) => ({
  color: `${appColors.darkGray}`,
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.secondary.main,
    transition: '0.5s',
  },
}));

const StyledAccordionButton = styled(IconButton)({
  color: `${appColors.darkGray}`,
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

const StyledInputField = styled(InputField)({
  fontSize: '0.9rem',
  borderRadius: '0.5rem',
  paddingRight: '12px',
  '&.Mui-focused fieldset': {
    border: '1px solid #5025c4 !important',
    boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
  },
});

const ProjectNavigation = ({
  data,
  tabSelected,
  onChange,
  onSearch,
  isLoading,
  isAssetPending,
  setAssetPending,
}) => {
  const dispatch = useDispatch();

  const [isCollapsed, setCollapse] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const methods = useForm();

  const tabsList = [
    { icon: <HomeOutlinedIcon />, label: 'Main Table' },
    // { icon: <ViewAgendaOutlinedIcon />, label: 'Kanban' },
    // { icon: <AssessmentOutlinedIcon />, label: 'Graph' },
    // { icon: <FlightTakeoffOutlinedIcon />, label: 'Milestone' },
    // { icon: <WcOutlinedIcon />, label: 'Handover' },
  ];

  const rightList = [
    { icon: <DownloadOutlinedIcon />, label: 'Assets' },
    { icon: <ContentCopyOutlinedIcon />, label: 'Links' },
  ];

  // Handlers

  function handleOnSearch(query) {
    setSearchQuery(query);
    onSearch(query);
  }

  useEffect(() => {
    if (!isLoading) {
      dispatch(
        setAssetPending({
          id: data.concept?.uuid,
          isDownloading: data.concept?.downloading_assets,
        })
      );
    }
  }, [isLoading]);

  return !_.isEmpty(data) && !isLoading ? (
    <Stack spacing={2}>
      <StyledStack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box width="100%">
          <Stack direction="row" justifyContent="space-between">
            <Box>
              {tabsList.map((tab, index) => {
                return (
                  <Button
                    disableElevation
                    disableRipple
                    key={index}
                    id={`tab-${index}`}
                    variant="text"
                    startIcon={tab.icon}
                    size="small"
                    onClick={() => onChange(tab.label)}
                    sx={{
                      color: '#5025C4',
                      margin: '0 !important',
                      padding: '0.6em 1.4em 0 !important',
                      borderBottom: '3px solid transparent',
                      ...(tabSelected === tab.label && {
                        borderBottom: '3px solid #df3c76',
                      }),
                      borderRadius: '0 !important',
                      fontSize: '1em !important',
                      '&:hover': {
                        background: 'transparent',
                      },
                    }}
                  >
                    {tab.label}
                  </Button>
                );
              })}
            </Box>
            <Box>
              {rightList.map((tab, index) => {
                return (
                  <Button
                    disableElevation
                    disabled={
                      tab.label === 'Assets' &&
                      (_.isEmpty(data.assets) || isAssetPending)
                    }
                    disableRipple
                    key={index}
                    id={`tab-${index}`}
                    variant="text"
                    startIcon={
                      tab.label === 'Assets' ? (
                        !isAssetPending ? (
                          tab.icon
                        ) : (
                          <CircularProgress size={10} color="secondary" />
                        )
                      ) : (
                        tab.icon
                      )
                    }
                    size="small"
                    onClick={() => onChange(tab.label)}
                    sx={{
                      color: '#5025C4',
                      margin: '0 !important',
                      borderBottom: '3px solid transparent',
                      padding: '0.6em 1.4em 0 !important',
                      ...(tabSelected === tab.label && {
                        borderBottom: '3px solid #df3c76',
                      }),
                      borderRadius: '0 !important',
                      fontSize: '1em !important',
                      '&:hover': {
                        background: 'transparent',
                      },
                    }}
                  >
                    {tab.label}
                  </Button>
                );
              })}
            </Box>
          </Stack>
        </Box>
        <Box></Box>
      </StyledStack>
      {tabSelected !== 'Links' ? (
        <Fragment>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormProvider {...methods}>
              <StyledInputField
                name="search"
                value={searchQuery}
                type="text"
                placeholder="Search task name"
                inputProps={{
                  autoComplete: 'off',
                }}
                onChange={(e) => {
                  handleOnSearch(e.target.value);
                }}
                size="small"
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
                required
              />
            </FormProvider>
            <StyledAccordionButton
              size="small"
              onClick={() => setCollapse(!isCollapsed)}
            >
              <ArrowDropDownCircleOutlinedIcon
                sx={{
                  transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </StyledAccordionButton>

            <Button>Overview</Button>
          </Stack>
          <Collapse
            in={isCollapsed}
            timeout="auto"
            orientation="vertical"
            sx={{ marginLeft: 2.5 }}
            unmountOnExit
          >
            <ProjectNavigationAccordionDetails data={data} />
          </Collapse>
        </Fragment>
      ) : null}
    </Stack>
  ) : (
    <SkeletonLoader />
  );
};

ProjectNavigation.propTypes = {
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  tabSelected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  isAssetPending: PropTypes.bool.isRequired,
  setAssetPending: PropTypes.any,
};

export default ProjectNavigation;
