import { useContext, useEffect } from 'react';

import moment from 'moment';

import PropTypes from 'prop-types';

import _ from 'lodash';

import { useDispatch } from 'react-redux';

import { getData } from 'store/reducers/manualTaskCreation';

// Context
import TaskCreationContext from 'components/TaskCreation/Context';

// MUI Components
import { Box, Stack, Button, Divider } from '@mui/material';

// MUI lab
import { TimelineDot } from '@mui/lab';

// MUI ICons
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SaveIcon from '@mui/icons-material/Save';

const backSteps = (i) => {
  let back = '';

  switch (i) {
    case 1:
      back = 'Task Configuration';
      break;

    case 2:
      back = 'Classification';
      break;

    case 3:
      back = 'Details';
      break;
    case 4:
      back = 'References';
      break;
    case 5:
      back = 'Additional Info';
      break;
  }

  return back;
};

const nextStep = (i) => {
  let next = '';

  switch (i) {
    case 0:
      next = 'Classification';
      break;
    case 1:
      next = 'Details';
      break;
    case 2:
      next = 'References';
      break;
    case 3:
      next = 'Additional Info';
      break;
    case 4:
      next = 'Create Task';
  }

  return next;
};

const Footer = ({ step, setIndex }) => {
  const dispatch = useDispatch();
  const formData = new FormData();

  const {
    team,
    taskType,
    partner,
    channel,
    concept,
    subTask,
    campaign,
    asset,
    sizes,
    referenceLinks,
    additionalInformation,
    deliveryDate,
    isRefresh,
    tags,
  } = useContext(TaskCreationContext);

  const handleNext = () => {
    setIndex((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setIndex((prevActiveStep) => prevActiveStep - 1);
  };

  const isDesignConsultationTask =
    taskType?.name?.toLowerCase() === 'design consultation';

  const handleSubmit = () => {
    // Files
    for (const a of asset) {
      formData.append('files[]', a.file);
    }

    // Tags
    for (const t of tags) {
      formData.append(
        'tags[]',
        _.isUndefined(t.inputValue) ? t.title : t.inputValue
      );
    }

    // Sizes
    for (const s of sizes) {
      formData.append('sizes[]', s);
    }

    !_.isUndefined(subTask?.id) && formData.append('subTask', subTask?.id);

    formData.append(
      'name',
      `${
        !_.isEmpty(subTask?.name)
          ? subTask?.name
          : !_.isEmpty(taskType?.name)
          ? taskType?.name
          : ''
      }${
        _.isEmpty(concept?.name)
          ? ' - Untitled'
          : _.isEmpty(campaign?.name)
          ? ` - ${concept?.name}`
          : ` - ${campaign?.name}`
      }${_.isEmpty(channel?.name) ? '' : ` - ${channel?.name}`}`
    );

    formData.append('team', team?.id);
    formData.append('taskType', taskType?.id);
    formData.append('partner', partner?.id);
    formData.append('concept', concept?.uuid ?? concept?.id);
    formData.append('campaign', campaign?.id ?? null);
    formData.append('channel', channel?.name);
    formData.append('additionalInfo', additionalInformation);
    formData.append('comment', additionalInformation);
    formData.append('isRefresh', isRefresh);
    formData.append(
      'deliveryDate',
      moment(deliveryDate).format('MM/DD/YYYY h:mm A')
    );
    formData.append(
      'links',
      JSON.stringify(
        referenceLinks.map((rl) => ({
          name: rl.name,
          url: _.isEmpty(rl.url) ? rl.name : rl.url,
        }))
      )
    );
    // For debugging purposes
    // console.log('partner: ', partner);
    // console.log('campaign: ', campaign);
    // console.log('concept: ', concept);
    // console.log('formdata: ', formData);
    dispatch(getData('add_task', formData));
  };

  return (
    <Box>
      <Divider />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p={1}
      >
        <Box width={220}>
          <Button
            disabled={step <= 0}
            variant="text"
            size="large"
            onClick={handleBack}
            startIcon={step > 0 ? <ChevronLeftIcon /> : null}
          >
            {step > 0 ? backSteps(step) : null}
          </Button>
        </Box>
        <Stack direction="row" spacing={1}>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Box key={i}>
                {i === step ? (
                  <TimelineDot
                    color="secondary"
                    sx={{ boxShadow: 'none', borderWidth: 1 }}
                  />
                ) : i > step ? (
                  <TimelineDot sx={{ boxShadow: 'none', borderWidth: 1 }} />
                ) : (
                  <TimelineDot
                    color="primary"
                    sx={{ boxShadow: 'none', borderWidth: 1 }}
                  />
                )}
              </Box>
            ))}
        </Stack>
        <Box width={220} display="flex" justifyContent="flex-end">
          <Button
            color="secondary"
            variant="contained"
            disableElevation
            size="large"
            onClick={step === 4 ? handleSubmit : handleNext}
            startIcon={
              step === 4 ? (
                <SaveIcon sx={{ width: '0.8em', height: '0.8em' }} />
              ) : null
            }
            endIcon={step === 4 ? null : <ChevronRightIcon />}
            disabled={
              step === 0
                ? _.isEmpty(team) || _.isEmpty(taskType)
                : step === 1
                ? isDesignConsultationTask
                  ? false
                  : _.isEmpty(partner) ||
                    _.isEmpty(channel) ||
                    _.isEmpty(concept)
                : step === 2
                ? _.isNull(deliveryDate) || _.isNull(isRefresh)
                : step === 4
                ? additionalInformation === '<p></p>\n'
                : false
            }
          >
            {nextStep(step)}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

Footer.propTypes = {
  step: PropTypes.number,
  setIndex: PropTypes.func,
};

export default Footer;
