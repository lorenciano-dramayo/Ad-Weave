// React
import { memo, useState } from 'react';

// MUI Components
import {
  styled,
  Button,
  IconButton,
  Box,
  Stack,
  Collapse,
  TextField,
  Autocomplete,
  Typography,
  Divider,
} from '@mui/material';

// MUI Icons
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

import Input from '../../Components/Input';
import GlobalPopper from 'components/Common/Popper';

import _ from 'lodash';
import PropTypes from 'prop-types';
import { formatDate } from 'utils/date';
import { appColors } from 'theme/variables';
import { Delete } from '@mui/icons-material';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'transparent',
    '&.Mui-focused fieldset': {
      borderColor: '#5025c4',
    },
  },
});

const StyledTextField2 = styled(TextField)({
  cursor: 'pointer',
  width: 92,
  '& .MuiOutlinedInput-root': { backgroundColor: 'transparent' },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 0,
  },
  '& .MuiInputBase-root.Mui-disabled': {
    '-webkit-text-fill-color': appColors.black,
  },
  '& .MuiInputBase-input.Mui-disabled': {
    '-webkit-text-fill-color': appColors.black,
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

const StyledDeleteButton = styled(DeleteOutlineIcon)({
  '&:hover': {
    color: `${appColors.dashboard.error}`,
  },
});

function ListItem({
  log = {},
  inputPlaceholder,
  containerProps,
  tasksDatasource,
  partnersDatasource,
  campaignsDatasource,
  conceptsDatasource,
  onPresetsSelectionChange,
  onPartnersSelectionChange,
  onCampaignsSelectionChange,
  onConceptsSelectionChange,
  onTimeChange,
  onStartPreviousLog,
  onDelete,
  isParent,
}) {
  // React state
  // Start Time picker
  const [startTimePickerPopperAnchorEl, setStartTimePickerPopperAnchorEl] =
    useState(null);
  const [isStartTimePickerOpen, setIsStartTimePickerOpen] = useState(false);
  // End Time picker
  const [endTimePickerPopperAnchorEl, setEndTimePickerPopperAnchorEl] =
    useState(null);
  const [isEndTimePickerOpen, setIsEndTimePickerOpen] = useState(false);
  // Selections
  const [selectionsPopperAnchorEl, setSelectionsPopperAnchorEl] =
    useState(null);
  const [isSelectionsOpen, setIsSelectionsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Time
  const [startTime, setStartTime] = useState(log.start);
  const [endTime, setEndTime] = useState(log.end);

  // Handlers
  const handleStartTimePickerClick = (e) => {
    if (isParent) {
      setIsCollapsed(!isCollapsed);
    } else {
      setStartTimePickerPopperAnchorEl(e.currentTarget);
      setIsStartTimePickerOpen(true);
    }
  };

  const handleEndTimePickerClick = (e) => {
    if (isParent) {
      setIsCollapsed(!isCollapsed);
    } else {
      setEndTimePickerPopperAnchorEl(e.currentTarget);
      setIsEndTimePickerOpen(true);
    }
  };

  const handleSelectionsButtonClick = (e) => {
    setSelectionsPopperAnchorEl(e.currentTarget);
    setIsSelectionsOpen(!isSelectionsOpen);
  };

  function handleTimePickerClose() {
    setIsStartTimePickerOpen(false);
    setIsEndTimePickerOpen(false);
    onTimeChange(
      log,
      formatDate(startTime, 'YYYY-MM-DD HH:mm:ss'),
      formatDate(endTime, 'YYYY-MM-DD HH:mm:ss')
    );
  }

  const filteredConceptsBySelectedPartner = () => {
    return log?.selectedPartner ?? null
      ? conceptsDatasource.filter(
          (c) => log?.selectedPartner?.id === c.partner_uuid
        ) ?? []
      : conceptsDatasource ?? [];
  };

  const filteredCampaignsBySelectedConcept = () => {
    return log?.selectedConcept ?? null
      ? campaignsDatasource.filter(
          (c) => log?.selectedConcept?.uuid === c.concept_id
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
          {isParent && (
            <Button
              variant="contained"
              sx={{ padding: 0, minWidth: 25 }}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {log.data.length}
            </Button>
          )}

          {/* Task selections */}
          <Input
            data={tasksDatasource}
            placeholder={inputPlaceholder}
            value={{
              name: log.selectedTask,
            }}
            onSelectionChange={(data) => onPresetsSelectionChange(log, data)}
            disabled={isParent}
          />
        </Stack>

        {/* Categories Selections */}
        <Stack direction="row" spacing={2} alignItems="center">
          {!isParent && (
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
                startIcon={_.isEmpty(log.selectedPartner) && <AddIcon />}
                color="secondary"
                onClick={handleSelectionsButtonClick}
              >
                {log.selectedPartner?.name ?? 'Project'}
              </Button>
            </Box>
          )}
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ borderStyle: 'dashed' }}
          />

          {/* Time inputs */}
          <>
            <Stack direction="row">
              <Stack direction="row" alignItems="center">
                <StyledTextField2
                  size="small"
                  value={formatDate(startTime, 'hh:mm a')}
                  placeholder="00:00"
                  onClick={handleStartTimePickerClick}
                  disabled
                />
                &nbsp;-&nbsp;
                <StyledTextField2
                  size="small"
                  value={formatDate(endTime, 'hh:mm a')}
                  placeholder="00:00"
                  onClick={handleEndTimePickerClick}
                  disabled
                />
              </Stack>
              {/* <Box>
                <IconButton onClick={handleDatePickerButtonClick}>
                  <CalendarMonthOutlinedIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Box> */}
            </Stack>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ borderStyle: 'dashed' }}
            />
          </>

          {/* Countdown timer */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }} width={85}>
            <Typography variant="h6" fontWeight={700} color="primary">
              {log.total}
            </Typography>
          </Box>

          {/* Controls */}
          <Box>
            <Stack direction="row" spacing={-1}>
              <IconButton
                onClick={() => {
                  if (isParent) {
                    setIsCollapsed(!isCollapsed);
                  } else {
                    onStartPreviousLog(log);
                  }
                }}
              >
                <PlayCircleFilledWhiteOutlinedIcon />
              </IconButton>
              {!isParent && (
                <IconButton
                  onClick={() =>
                    onDelete(
                      log.data ? log?.data[0]?.task_timer_id : log.task_timer_id
                    )
                  }
                >
                  <DeleteOutlineIcon />
                </IconButton>
              )}
              {/* <IconButton>
                  <MoreVertOutlinedIcon />
                </IconButton> */}
            </Stack>
          </Box>
        </Stack>

        {/* Date Picker */}
        {/* <GlobalPopper
          isOpen={isDatePickerOpen}
          anchorEl={datePickerPopperAnchorEl}
          onClose={() => setIsDatePickerOpen(false)}
          placement={'right-start'}
          sx={{ zIndex: 1 }}
          content={
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={date}
                onChange={handleDatePickerChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          }
        /> */}

        {/* Start Time Picker */}
        <GlobalPopper
          isOpen={isStartTimePickerOpen}
          anchorEl={startTimePickerPopperAnchorEl}
          onClose={handleTimePickerClose}
          placement={'right-start'}
          sx={{
            zIndex: 1,
          }}
          content={
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDateTimePicker
                value={startTime}
                componentsProps={{
                  actionBar: {
                    actions: [],
                  },
                }}
                onChange={(newValue) => {
                  setStartTime(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          }
        />

        {/* End Time Picker */}
        <GlobalPopper
          isOpen={isEndTimePickerOpen}
          anchorEl={endTimePickerPopperAnchorEl}
          onClose={handleTimePickerClose}
          placement={'right-start'}
          sx={{ zIndex: 1 }}
          content={
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDateTimePicker
                componentsProps={{
                  actionBar: {
                    actions: [],
                  },
                }}
                value={endTime}
                minDateTime={Date.parse(startTime)}
                onChange={(newValue) => {
                  setEndTime(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          }
        />

        {/* Concept, Campaigns, Partners Selection */}
        <GlobalPopper
          isOpen={isSelectionsOpen}
          anchorEl={selectionsPopperAnchorEl}
          onClose={() => setIsSelectionsOpen(false)}
          placement={'bottom'}
          sx={{ zIndex: 1 }}
          content={
            <Stack spacing={2} p={3} minWidth={350}>
              <StyledAutocomplete
                disablePortal
                freeSolo
                isOptionEqualToValue={(option, value) =>
                  option.uuid === value.id
                }
                value={log.selectedPartner}
                options={partnersDatasource ?? []}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) => onPartnersSelectionChange(log, value)}
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
                  />
                )}
                loading={false}
              />
              <StyledAutocomplete
                disablePortal
                freeSolo
                loading={false}
                isOptionEqualToValue={(option, value) =>
                  option.uuid === value.id
                }
                value={log.selectedConcept}
                options={filteredConceptsBySelectedPartner()}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) => onConceptsSelectionChange(log, value)}
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
                      _.isEmpty(filteredConceptsBySelectedPartner())
                        ? 'No Concepts Available'
                        : 'Select a concept'
                    }
                    placeholder={'Select a concept'}
                  />
                )}
                disabled={_.isEmpty(filteredConceptsBySelectedPartner())}
              />
              <StyledAutocomplete
                disablePortal
                freeSolo
                loading={false}
                isOptionEqualToValue={(option, value) =>
                  option.uuid === value.id
                }
                value={log.selectedCampaign}
                options={filteredCampaignsBySelectedConcept()}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) => onCampaignsSelectionChange(log, value)}
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
                  />
                )}
                disabled={_.isEmpty(filteredCampaignsBySelectedConcept())}
              />
            </Stack>
          }
        />
      </Stack>

      <Collapse
        in={isCollapsed}
        timeout="auto"
        orientation="vertical"
        sx={{ marginTop: '0px !important' }}
        unmountOnExit
      >
        {!_.isEmpty(log.data) &&
          isParent &&
          log.data.map((log, index) => (
            <ListItem
              key={index}
              log={{
                selectedTask: log?.category?.name,
                selectedPartner: log?.partner,
                selectedCampaign: log?.campaign,
                selectedConcept: log?.concept,
                total: log.data ? log?.total_time : log?.total,
                ...log,
              }}
              containerProps={{
                sx: {
                  background: '#5025c407',
                },
              }}
              inputPlaceholder="Add description"
              tasksDatasource={tasksDatasource}
              partnersDatasource={partnersDatasource}
              campaignsDatasource={campaignsDatasource}
              conceptsDatasource={conceptsDatasource}
              onPresetsSelectionChange={onPresetsSelectionChange}
              onPartnersSelectionChange={onPartnersSelectionChange}
              onCampaignsSelectionChange={onCampaignsSelectionChange}
              onConceptsSelectionChange={onConceptsSelectionChange}
              onStartPreviousLog={onStartPreviousLog}
              onDelete={onDelete}
              onTimeChange={onTimeChange}
            />
          ))}
      </Collapse>
    </Stack>
  );
}

ListItem.propTypes = {
  log: PropTypes.any,
  activeTimer: PropTypes.any,
  inputPlaceholder: PropTypes.any,
  containerProps: PropTypes.any,
  tasksDatasource: PropTypes.any,
  partnersDatasource: PropTypes.any,
  campaignsDatasource: PropTypes.any,
  conceptsDatasource: PropTypes.any,
  onStartTimer: PropTypes.any,
  onStopTimer: PropTypes.any,
  onTimeChange: PropTypes.any,
  onPresetsSelectionChange: PropTypes.any,
  onPartnersSelectionChange: PropTypes.any,
  onCampaignsSelectionChange: PropTypes.any,
  onConceptsSelectionChange: PropTypes.any,
  onStartPreviousLog: PropTypes.any,
  onDelete: PropTypes.any,
  isRunnable: PropTypes.bool,
  isParent: PropTypes.bool,
};

export default memo(ListItem);
