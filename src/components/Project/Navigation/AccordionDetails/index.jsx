// React
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
// MUI
import { styled } from '@mui/styles';
import { Stack, Box, Grid, Typography } from '@mui/material';
// App Components
import Fade from 'components/Common/Fade';
import InputField from 'components/Common/InputField';
// API
import { updateDealId, fetchOverview } from 'store/reducers/concept';
// Utilities
import { appColors } from 'theme/variables';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import _ from 'lodash';

// Grid
const StyledGridItem = styled(Grid)({
  fontSize: '1rem',
  '&:nth-of-type(even)': {
    color: appColors.darkGray,
  },
});

// Tag
const StyledTag = styled(Box)(({ isColored, theme }) => ({
  paddingLeft: '0.8rem',
  paddingRight: '0.8rem',
  border: isColored
    ? `1px solid ${theme.palette.secondary.main}`
    : `1px solid ${appColors.darkGray}`,
  borderRadius: 4,
  color: isColored ? theme.palette.secondary.main : appColors.darkGray,
  backgroundColor: appColors.lighterGray,
  textTransform: 'capitalize',
}));

// Div
const StyledDiv = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  '& .MuiBox-root': {
    marginRight: 10,
    marginBottom: 10,
  },
}));

// Counter
const StyledCounter = styled('div')(() => ({
  display: 'flex',
  width: 18,
  height: 18,
  color: 'white',
  borderRadius: 9,
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.7rem',
  backgroundColor: appColors.lightViolet,
}));

const ProjectNavigationAccordionDetails = ({ data }) => {
  const methods = useForm();
  const [dealId, setDealId] = useState('');
  const [isEditing, setEditing] = useState(false);
  const dispatch = useDispatch();

  const {
    concept,
    objectives,
    formats,
    lang,
    additional_info,
    partner_market,
  } = data;

  const objectivesData = !_.isEmpty(objectives.elements)
    ? objectives.elements.map((objective) => ({
        value: objective,
        isTagged: true,
        isColored: false,
      }))
    : [];

  const productMarketsData = !_.isEmpty(partner_market)
    ? partner_market.map((product) => ({
        value: product,
        isTagged: true,
      }))
    : [];

  const languagesData = !_.isEmpty(lang)
    ? lang.map((language) => ({
        value: language,
        isTagged: true,
      }))
    : [];

  // Facebook format
  const facebookStaticFormatData = !_.isEmpty(formats.facebook.static)
    ? formats.facebook.static.map((format) => ({
        value: format,
        isTagged: true,
        isColored: true,
      }))
    : [];

  const facebookVideoFormatData = !_.isEmpty(formats.facebook.video)
    ? formats.facebook.video.map((format) => ({
        value: format,
        isTagged: true,
        isColored: true,
      }))
    : [];

  // Google format
  const googleDisplayFormatData = !_.isEmpty(formats.google.display)
    ? formats.google.display.map((format) => ({
        value: format,
        isTagged: true,
        isColored: true,
      }))
    : [];

  const googleVideoFormatData = !_.isEmpty(formats.google.video)
    ? formats.google.video.map((format) => ({
        value: format,
        isTagged: true,
        isColored: true,
      }))
    : [];

  // Youtube format
  const youtubeVideoFormatData = !_.isEmpty(formats.youtube.video)
    ? formats.youtube.video.map((format) => ({
        value: format,
        isTagged: true,
        isColored: true,
      }))
    : [];
  const datasets = [
    // Deal ID
    {
      title: 'Deal ID',
      descriptions: [
        {
          value: concept.deal_id ?? '-',
          isTagged: false,
          isEditable: true,
        },
      ],
    },
    // Concept name
    {
      title: 'Concept Name',
      descriptions: [
        {
          value: concept.name ?? '',
          isTagged: false,
        },
      ],
    },
    // Objectives
    !_.isEmpty(objectivesData)
      ? {
          title: 'Objectives',
          descriptions: objectivesData,
        }
      : {},
    // Product/Markets
    !_.isEmpty(productMarketsData)
      ? {
          title: 'Product/Markets',
          descriptions: productMarketsData,
        }
      : {},
    // Languages
    !_.isEmpty(languagesData)
      ? {
          title: 'Language',
          descriptions: languagesData,
        }
      : {},
    // Format
    {
      title: 'Format',
      descriptions: [
        {
          value: 'Facebook & Instagram (<b>Video</b>)',
          isTagged: false,
        },
      ],
      counter:
        facebookStaticFormatData.length +
        facebookVideoFormatData.length +
        youtubeVideoFormatData.length +
        googleDisplayFormatData.length +
        googleVideoFormatData.length,
    },
    !_.isEmpty(facebookVideoFormatData)
      ? {
          title: '',
          descriptions: facebookVideoFormatData,
        }
      : {
          title: '',
          descriptions: [
            {
              value: '-- No Format Available --',
              isTagged: false,
            },
          ],
        },
    // Facebook & Instagram Static
    !_.isEmpty(facebookStaticFormatData)
      ? {
          title: '',
          descriptions: [
            {
              value: 'Facebook & Instagram (<b>Static</b>)',
              isTagged: false,
            },
          ],
        }
      : {},
    !_.isEmpty(facebookStaticFormatData)
      ? {
          title: '',
          descriptions: facebookStaticFormatData,
        }
      : {},
    // Youtube Video
    !_.isEmpty(youtubeVideoFormatData)
      ? {
          title: '',
          descriptions: [
            {
              value: 'Youtube (<b>Video</b>)',
              isTagged: false,
            },
          ],
        }
      : {},
    !_.isEmpty(youtubeVideoFormatData)
      ? {
          title: '',
          descriptions: youtubeVideoFormatData,
        }
      : {},
    // Google Display
    !_.isEmpty(googleDisplayFormatData)
      ? {
          title: '',
          descriptions: [
            {
              value: 'Google (<b>Display</b>)',
              isTagged: false,
            },
          ],
        }
      : {},
    !_.isEmpty(googleDisplayFormatData)
      ? {
          title: '',
          descriptions: googleDisplayFormatData,
        }
      : {},
    // Google Video
    !_.isEmpty(googleVideoFormatData)
      ? {
          title: '',
          descriptions: [
            {
              value: 'Google (<b>Video</b>)',
              isTagged: false,
            },
          ],
        }
      : {},
    !_.isEmpty(googleVideoFormatData)
      ? {
          title: '',
          descriptions: googleVideoFormatData,
        }
      : {},
    !_.isEmpty(additional_info)
      ? {
          title: 'Additional Info',
          descriptions: [
            {
              value: additional_info,
              isTagged: false,
            },
          ],
        }
      : {
          title: 'Additional Info',
          descriptions: [
            {
              value: '-- No Additional Info Available --',
              isTagged: false,
            },
          ],
        },
  ];

  const renderDescription = (data) => {
    return data.descriptions.map((description, index) => {
      if (description.isTagged) {
        return (
          <StyledTag key={index} isColored={description.isColored}>
            {description.value}
          </StyledTag>
        );
      } else {
        if (description.isEditable && isEditing) {
          return (
            <Fade key={index} in={true}>
              <FormProvider {...methods}>
                <InputField
                  name="deal_id"
                  placeholder="Deal ID"
                  variant="input"
                  content={dealId}
                  onKeyPress={(e) => {
                    if (e.key == 'Enter') {
                      if (isEditing) {
                        setEditing(false);
                        dispatch(
                          updateDealId({
                            id: concept.id,
                            deal_id: e.target.value,
                          })
                        );
                        setDealId(e.target.value);
                        dispatch(
                          fetchOverview({
                            conceptId: concept.uuid,
                            partnerId: concept.partner_uuid,
                          })
                        );
                      }
                    }
                  }}
                />
              </FormProvider>
            </Fade>
          );
        } else {
          return (
            <Typography
              key={index}
              variant="span"
              sx={{ whiteSpace: 'pre-line' }}
            >
              {parse(description.value)}
            </Typography>
          );
        }
      }
    });
  };

  return (
    <Grid container spacing={1.8} ml={0.5} mt={0}>
      {datasets.map((data, index) => {
        if (_.isEmpty(data)) {
          return;
        }

        return (
          <React.Fragment key={index}>
            <StyledGridItem item xs={2}>
              <Stack direction="row" alignItems="center">
                {data.title}&nbsp;
                {data.counter > 0 && (
                  <StyledCounter>{data.counter}</StyledCounter>
                )}
              </Stack>
            </StyledGridItem>
            <StyledGridItem item xs={10}>
              <StyledDiv
                onDoubleClick={() => {
                  if (index === 0 && !isEditing) {
                    setEditing(true);
                  }
                }}
              >
                {renderDescription(data)}
              </StyledDiv>
            </StyledGridItem>
          </React.Fragment>
        );
      })}
    </Grid>
  );
};

ProjectNavigationAccordionDetails.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProjectNavigationAccordionDetails;
