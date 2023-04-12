// React
import { useState, useEffect, Fragment } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

//redux
import { useDispatch } from 'react-redux';

// MUI
import { styled } from '@mui/styles';
import {
  Stack,
  Collapse,
  Box,
  Button,
  InputAdornment,
  Typography,
} from '@mui/material';

// MUI Icons
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';

// App Components
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

const StyledInputField = styled(InputField)({
  fontSize: '0.9rem',
  borderRadius: '0.2rem',
  paddingRight: '12px',
  '&.Mui-focused fieldset': {
    border: '1px solid #5025c4 !important',
    boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
  },
});

const StyledButton = styled(Button)({
  textTransform: 'none',
  fontWeight: 700,
  padding: '12px',
  fontSize: '14px',
  lineHeight: '16px',
});

const ProjectNavigation = ({
  data,
  tabSelected,
  onChange,
  onSearch,
  isLoading,
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
    { icon: <CloudDownloadOutlinedIcon />, label: 'Assets' },
    { icon: <LinkOutlinedIcon />, label: 'Links' },
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
                  <StyledButton
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
                      borderBottom: '3px solid transparent',
                      ...(tabSelected === tab.label && {
                        borderBottom: '2px solid #df3c76',
                        color: '#29125f',
                      }),
                      borderRadius: '0 !important',
                      '&:hover': {
                        background: 'transparent',
                      },
                    }}
                  >
                    {tab.label}
                  </StyledButton>
                );
              })}
            </Box>
            <Box>
              {rightList.map((tab, index) => {
                return (
                  <StyledButton
                    disabled={
                      tab.label === 'Assets' &&
                      data?.assets?.length + data?.assetLinks?.length <= 0
                    }
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
                      borderBottom: '3px solid transparent',
                      ...(tabSelected === tab.label && {
                        borderBottom: '2px solid #df3c76',
                        color: '#29125f',
                      }),
                      borderRadius: '0 !important',
                      '&:hover': {
                        background: 'transparent',
                      },
                    }}
                  >
                    <Stack direction="row" spacing={1}>
                      <Box>{tab.label}</Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            backgroundColor: 'rgba(0,0,0,.1)',
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '-.02em',
                            color:
                              tab.label === 'Assets' &&
                              data?.assets?.length + data?.assetLinks?.length <=
                                0
                                ? '#acacac'
                                : '#29125f',
                            padding: '0.5em 0.8em',
                            borderRadius: '50%',
                          }}
                        >
                          {tab.label === 'Assets'
                            ? data?.assets?.length + data?.assetLinks?.length
                            : data?.concept?.link_list?.length}
                        </Typography>
                      </Box>
                    </Stack>
                  </StyledButton>
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
                        color: '#484964',
                      }}
                    />
                  </InputAdornment>
                }
                required
              />
            </FormProvider>
            <Button
              size="small"
              sx={{
                color: appColors.darkGray,
                fontWeight: 700,
                padding: '0.2em 0.5em',
                ':hover': {
                  backgroundColor: appColors.lightViolet,
                  color: '#fff',
                },
                textTransform: 'none',
              }}
              onClick={() => setCollapse(!isCollapsed)}
              startIcon={
                <ArrowDropDownCircleOutlinedIcon
                  sx={{
                    transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              }
            >
              Overview
            </Button>
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
