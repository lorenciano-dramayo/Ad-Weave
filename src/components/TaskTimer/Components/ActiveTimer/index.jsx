// React
import { memo, useState, useEffect } from 'react';

// MUI Components
import {
  styled,
  Button,
  Box,
  Stack,
  Autocomplete,
  Divider,
  TextField,
  Typography,
} from '@mui/material';

// MUI Icons
import AddIcon from '@mui/icons-material/Add';

import Input from '../Input';
import GlobalPopper from 'components/Common/Popper';

import _ from 'lodash';
import PropTypes from 'prop-types';
import TimerControl from './TimerControl';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'transparent',
    '&.Mui-focused fieldset': {
      borderColor: '#5025c4',
      // boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
    },
  },
});

const StyledAutocomplete = styled(Autocomplete)({
  width: 'auto',
  '&.MuiListSubheader-root': {
    color: 'rgb(242 32 118)',
    lineHeight: '32px',
    backgroundColor: '#f0f0f0',
  },
  flex: 1,
});

function ActiveTimer({
  timer,
  inputPlaceholder,
  containerProps,
  tasksDatasource,
  partnersDatasource,
  campaignsDatasource,
  conceptsDatasource,
  canStopTimer,
  requiredFields,
  onPresetsSelectionChange,
  onPartnersSelectionChange,
  onCampaignsSelectionChange,
  onConceptsSelectionChange,
  onStartTimer,
  onStopTimer,
}) {
  // React state
  const [selectionsPopperAnchorEl, setSelectionsPopperAnchorEl] =
    useState(null);
  const [isSelectionsOpen, setIsSelectionsOpen] = useState(false);

  // TODO: These are redundant state. Can be improved by using the state of the parent.
  const [selectedTaskCategory, setSelectedTaskCategory] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedConcept, setSelectedConcept] = useState(null);

  // Hooks
  useEffect(() => {
    if (!_.isEmpty(timer) && _.isNull(selectedTaskCategory)) {
      setSelectedTaskCategory(timer.category);
    }
  }, [timer]);

  useEffect(() => {
    if (selectedPartner) {
      // console.log('selectedPartner: ', selectedPartner);
      // console.log(
      //   'conceptsDatasource.filter: ',
      //   conceptsDatasource.filter(
      //     (c) => selectedPartner.uuid === c.partner_uuid
      //   )
      // );
    }
  }, [selectedPartner]);

  // Handlers
  const handleSelectionsButtonClick = (e) => {
    setSelectionsPopperAnchorEl(e.currentTarget);
    setIsSelectionsOpen(!isSelectionsOpen);
  };

  const handleOnStartTimer = () => {
    onStartTimer();
  };

  const handleOnStopTimer = () => {
    if (selectedTaskCategory || timer) {
      setSelectedTaskCategory(null);
      setSelectedPartner(null);
      setSelectedCampaign(null);
      setSelectedConcept(null);
      onStopTimer(timer);
    }
  };

  const filteredConceptsBySelectedPartner = () => {
    return selectedPartner || (timer?.partner ?? null)
      ? conceptsDatasource.filter(
          (c) => (selectedPartner?.uuid ?? timer?.partner.id) === c.partner_uuid
        ) ?? []
      : conceptsDatasource ?? [];
  };

  const filteredCampaignsBySelectedConcept = () => {
    return selectedConcept || (timer?.concept ?? null)
      ? campaignsDatasource.filter(
          (c) => (selectedConcept?.uuid ?? timer?.concept.uuid) === c.concept_id
        ) ?? []
      : campaignsDatasource ?? [];
  };

  return (
    <Stack spacing={1} {...containerProps}>
      <Stack direction="row" justifyContent="space-between" m={1} spacing={2}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ width: '-webkit-fill-available' }}
        >
          {/* Task selections */}
          <Input
            data={tasksDatasource.list ?? []}
            placeholder={inputPlaceholder}
            value={{
              name: selectedTaskCategory?.name ?? timer?.category?.name,
            }}
            onSelectionChange={(data) => {
              setSelectedTaskCategory(data);
              onPresetsSelectionChange(data);
            }}
          />
        </Stack>

        {/* Project Selections */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              minWidth: '5rem',
              whiteSpace: 'nowrap',
            }}
          >
            <Button
              sx={{
                textTransform: 'none',
                '& .MuiButton-startIcon': {
                  marginRight: '4px',
                  '& .MuiSvgIcon-root': { fontSize: '14px' },
                },
              }}
              startIcon={
                _.isNull(timer?.partner ?? null) &&
                _.isNull(selectedPartner) && <AddIcon />
              }
              color="secondary"
              onClick={handleSelectionsButtonClick}
            >
              {selectedPartner?.name ?? (timer?.partner?.name || 'Partner')}
            </Button>
          </Box>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ borderStyle: 'dashed' }}
          />
          <TimerControl
            timer={timer}
            canStopTimer={canStopTimer}
            onStart={handleOnStartTimer}
            onStop={handleOnStopTimer}
          />
        </Stack>

        {/* Concept, Campaigns, Partners Selection */}
        <GlobalPopper
          isOpen={isSelectionsOpen}
          anchorEl={selectionsPopperAnchorEl}
          onClose={() => setIsSelectionsOpen(false)}
          placement={'bottom'}
          sx={{ zIndex: 1 }}
          content={
            <Stack p={3} minWidth={350}>
              {/* Partner */}
              <Stack
                spacing={-0.5}
                mb={requiredFields?.includes('partner') ? 1 : 2}
              >
                <StyledAutocomplete
                  disablePortal
                  freeSolo
                  isOptionEqualToValue={(option, value) =>
                    option.uuid === value.id ?? value.uuid
                  }
                  value={selectedPartner ?? timer?.partner}
                  options={partnersDatasource ?? []}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, value) => {
                    setSelectedPartner(value);
                    onPartnersSelectionChange(value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      // Prevent's default 'Enter' behavior.
                      event.defaultMuiPrevented = true;
                    }
                  }}
                  renderOption={(props, option) => (
                    <li {...props} key={option.key}>
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <StyledTextField
                      {...params}
                      size="small"
                      label="Select a partner"
                      placeholder={'Select a partner'}
                      required={requiredFields?.includes('partner')}
                    />
                  )}
                  loading={false}
                  disabled={_.isNull(selectedTaskCategory)}
                />
                {requiredFields?.includes('partner') && (
                  <Typography
                    pl={0.5}
                    variant="span"
                    color="secondary"
                    fontSize={11}
                  >
                    This field is required
                  </Typography>
                )}
              </Stack>

              {/* Concept */}
              <Stack
                spacing={-0.5}
                mb={requiredFields?.includes('concept') ? 0 : 2}
              >
                <StyledAutocomplete
                  disablePortal
                  freeSolo
                  loading={false}
                  isOptionEqualToValue={(option, value) =>
                    option.uuid === value.id ?? value.uuid
                  }
                  value={selectedConcept ?? timer?.concept ?? null}
                  options={filteredConceptsBySelectedPartner()}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, value) => {
                    setSelectedConcept(value);
                    onConceptsSelectionChange(value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      // Prevent's default 'Enter' behavior.
                      event.defaultMuiPrevented = true;
                    }
                  }}
                  renderOption={(props, option) => (
                    <li {...props} key={option.key}>
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <StyledTextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                      }}
                      size="small"
                      label={
                        _.isEmpty(filteredConceptsBySelectedPartner())
                          ? 'No Concepts Available'
                          : 'Select a concept'
                      }
                      placeholder={'Select a concept'}
                      required={requiredFields?.includes('concept')}
                    />
                  )}
                  disabled={
                    _.isEmpty(filteredConceptsBySelectedPartner()) ||
                    _.isNull(selectedTaskCategory)
                  }
                />
                {requiredFields?.includes('concept') && (
                  <Typography
                    pl={0.5}
                    variant="span"
                    color="secondary"
                    fontSize={11}
                  >
                    This field is required
                  </Typography>
                )}
              </Stack>

              {/* Campaign */}
              <Stack spacing={-0.5}>
                <StyledAutocomplete
                  disablePortal
                  freeSolo
                  loading={false}
                  isOptionEqualToValue={(option, value) =>
                    option.uuid === value.id ?? value.uuid
                  }
                  value={selectedCampaign ?? timer?.campaign}
                  options={filteredCampaignsBySelectedConcept()}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, value) => {
                    setSelectedCampaign(value);
                    onCampaignsSelectionChange(value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      // Prevent's default 'Enter' behavior.
                      event.defaultMuiPrevented = true;
                    }
                  }}
                  renderOption={(props, option) => (
                    <li {...props} key={option.key}>
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <StyledTextField
                      {...params}
                      size="small"
                      label={
                        _.isEmpty(filteredCampaignsBySelectedConcept())
                          ? 'No Campaigns Available'
                          : 'Select a campaign'
                      }
                      placeholder={'Select a campaign'}
                      required={requiredFields?.includes('campaign')}
                    />
                  )}
                  disabled={
                    _.isEmpty(filteredCampaignsBySelectedConcept()) ||
                    _.isNull(selectedTaskCategory)
                  }
                />
                {/* <VirtualizedSelection /> */}
                {requiredFields?.includes('campaign') && (
                  <Typography
                    pl={0.5}
                    variant="span"
                    color="secondary"
                    fontSize={11}
                  >
                    This field is required
                  </Typography>
                )}
              </Stack>
            </Stack>
          }
        />
      </Stack>
    </Stack>
  );
}

ActiveTimer.propTypes = {
  timer: PropTypes.any,
  inputPlaceholder: PropTypes.any,
  containerProps: PropTypes.any,
  tasksDatasource: PropTypes.any,
  partnersDatasource: PropTypes.any,
  campaignsDatasource: PropTypes.any,
  conceptsDatasource: PropTypes.any,
  requiredFields: PropTypes.any,
  canStopTimer: PropTypes.any,
  onStartTimer: PropTypes.any,
  onStopTimer: PropTypes.any,
  onPresetsSelectionChange: PropTypes.any,
  onPartnersSelectionChange: PropTypes.any,
  onCampaignsSelectionChange: PropTypes.any,
  onConceptsSelectionChange: PropTypes.any,
};

export default memo(ActiveTimer);
