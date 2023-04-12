import { useEffect, useContext } from 'react';
import _ from 'lodash';

import { useDispatch, useSelector } from 'react-redux';

//Reducer
import { getData } from 'store/reducers/manualTaskCreation';

// Context
import TaskCreationContext from 'components/TaskCreation/Context';

import { Box, Stack, Typography, styled } from '@mui/material';

// Custom Component
import TaskInput from 'components/TaskCreation/Components/TaskInput';

const StyledTypography = styled(Typography)`
  background-image: linear-gradient(90deg, #e0238c, #f22076 47.43%, #f96666);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`;

const TaskClassification = () => {
  const dispatch = useDispatch();
  const {
    partner,
    setPartner,
    concept,
    setConcept,
    campaign,
    setCampaign,
    channel,
    setChannel,
    setSizes,
  } = useContext(TaskCreationContext);

  const {
    data: { partnerList, conceptList, campaignList, channelList, formatsList },
    fetching,
  } = useSelector((state) => state.manualTaskCreation);

  useEffect(() => {
    dispatch(getData('get_partners'));
  }, []);

  const onInputChange = (e, v, name) => {
    switch (name.toLowerCase().replace(/ /g, '_')) {
      case 'partner':
        _.isNull(v) ? setPartner(null) : setPartner(v);

        dispatch(getData('get_concepts', v?.id));
        break;
      case 'concept':
        _.isNull(v) ? setConcept(null) : setConcept(v);

        dispatch(
          getData('get_concept_overview', {
            conceptId: v.id,
            partnerId: partner.id,
          })
        );
        break;
      case 'campaign':
        _.isNull(v) ? setCampaign(null) : setCampaign(v);
        break;

      case 'channel':
        _.isNull(v) ? setChannel(null) : setChannel(v);
        switch (v.name.split(' ')[0].toLowerCase()) {
          case 'google':
            setSizes(
              _.merge(formatsList.google.display, formatsList.google.video)
            );
            break;
          case 'social':
            if (v.name.split(' ')[1].toLowerCase() === 'static') {
              setSizes(formatsList.facebook.static);
            } else if (v.name.split(' ')[1].toLowerCase() === 'video') {
              setSizes(formatsList.facebook.video);
            }

            break;
          case 'youtube':
            setSizes(formatsList.youtube.video);
            break;
        }

        break;
    }
  };

  return (
    <Box
      padding="40px 60px"
      height="calc(100vh - 7.2em)"
      sx={{ overflowY: 'auto' }}
    >
      <Stack direction="row">
        <Typography variant="h4" color="primary" fontWeight={800}>
          Concept &amp; Campaign&nbsp;
        </Typography>
        <StyledTypography variant="h4" fontWeight={800}>
          Details
        </StyledTypography>
      </Stack>
      <Box mb={4}>
        <Typography>Please fill the required fields below.</Typography>
      </Box>

      <TaskInput
        data={partnerList}
        name="Partner"
        defaultValue={partner}
        description="All fields will be enabled once a partner is selected."
        isRequired={true}
        isDisabled={partnerList.length === 0}
        onInputChange={onInputChange}
      />

      <TaskInput
        data={conceptList}
        name="Concept"
        defaultValue={concept}
        description={
          _.isEmpty(conceptList)
            ? 'This has been disabled, please select a Partner'
            : null
        }
        isRequired={true}
        isDisabled={conceptList.length === 0}
        onInputChange={onInputChange}
      />

      <TaskInput
        data={campaignList}
        name="Campaign"
        defaultValue={campaign}
        description={
          _.isEmpty(campaignList) ? 'No campaign found in this concept.' : null
        }
        isRequired={false}
        isDisabled={campaignList.length === 0}
        onInputChange={onInputChange}
        loading={fetching}
      />

      <TaskInput
        data={channelList}
        name="Channel"
        defaultValue={channel}
        isRequired={true}
        isDisabled={channelList.length === 0}
        onInputChange={onInputChange}
      />
    </Box>
  );
};

export default TaskClassification;
