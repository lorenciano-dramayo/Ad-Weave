// React
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
// MUI
import { styled } from '@mui/styles';
import {
  Box,
  Typography,
  Stack,
  Select,
  Avatar,
  AvatarGroup,
  FormControl,
  MenuItem,
  OutlinedInput,
  IconButton,
  Tooltip,
} from '@mui/material';
// CSS
import 'assets/css/concept/overide.css';
// constant
import { channelIcons } from 'constants/widgets';
// MUI Icons
import FavoriteIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
// Reducers
import { pinFavorites } from 'store/reducers/favorites';
import {
  fetchSubscribers,
  fetchConceptsList,
  updateConceptCampaignStatus,
  updateMembers,
} from 'store/reducers/concept';
// App Components
import SkeletonLoader from './skeleton';
import Fade from 'components/Common/Fade';
import SelectionPopover from 'components/Widgets/SelectionPopover';
// Utilities
import _ from 'lodash';
import PropTypes from 'prop-types';
import { appColors } from 'theme/variables';
import { getItemByKey } from 'utils/dictionary';

const MenuProps = {
  PaperProps: {
    style: {
      width: 148.56,
      marginTop: '4px',
    },
    sx: {
      '& .MuiMenu-List': {
        padding: 0,
      },
    },
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
    getContentAnchorEl: null,
  },
};

// Styled Components
const StyledTitle = styled(Typography)({
  fontWeight: 800,
});

const StyledStatus = styled('div')({
  display: 'flex',
  height: 27,
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '0.85rem',
  textTransform: 'capitalize',
  padding: '3px 28px',
  borderRadius: '0.2em',
  fontWeight: '700',
});

const StyledVerticalDivider = styled('div')({
  width: 1,
  height: 21,
  backgroundColor: appColors.lightGray,
});

const StyledUserAvatar = styled(Avatar)({
  width: 30,
  height: 30,
  cursor: 'pointer',
});

const StyledUserListCount = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '0.7em',
  color: 'white',
  height: 17,
  width: 17,
  fontWeight: 700,
  borderRadius: 11,
  marginLeft: -6,
  zIndex: 1,
  backgroundColor: 'rgb(80 37 196)',
}));

const StyledOutlinedInput = styled(OutlinedInput)({
  backgroundColor: 'transparent',
  borderRadius: 0,
  fontSize: 0,
  border: 0,
  '& fieldset': {
    border: '0px solid transparent !important',
  },
  '&.Mui-focused fieldset': {
    border: '0px solid transparent !important',
  },
});

const StyledSelect = styled(Select)({
  padding: '0 !important',
  '& .MuiSelect-select': {
    padding: '0 !important',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
  },
});

const StyledMenuItem = styled(MenuItem)({
  textTransform: 'capitalize',
  fontSize: '0.9em',
  padding: '0.2em 1em',
  fontWeight: 700,
});

const ProjectHeader = ({ isLoading, data }) => {
  const { concept } = data;

  const dispatch = useDispatch();

  const { list: maintenanceTaskStatus } = useSelector(
    (state) => state.maintenanceTaskStatus
  );
  const { subscribers: subscribersState, isFetchingSubscribers } = useSelector(
    (state) => state.concept
  );

  const [conceptStatusId, setConceptStatusId] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);

  const shouldOpenPopover = Boolean(popoverAnchorEl);

  // Dispatch
  const dispatchPinConcept = () => {
    setIsFavorited(!isFavorited);

    dispatch(
      pinFavorites({
        data_id: concept?.uuid,
        type: 'concept',
      })
    );
  };

  const dispatchUpdateStatus = async (uuid, status_id) => {
    const isSuccess = await dispatch(
      updateConceptCampaignStatus({
        type: 'concept',
        id: uuid,
        status: status_id,
      })
    );
    if (isSuccess) {
      dispatch(fetchConceptsList(false));
    }
  };

  // Hooks
  useEffect(() => {
    if (!_.isUndefined(concept)) {
      setConceptStatusId(
        getItemByKey('title', concept.status ?? '', maintenanceTaskStatus).id
      );
      setIsFavorited(concept.is_pinned ?? false);
    }
  }, [concept]);

  // Handlers
  const handleConceptStatusChange = (e) => {
    e.preventDefault();
    const {
      target: { value },
    } = e;
    setConceptStatusId(value);
    dispatchUpdateStatus(concept.uuid, value);
  };

  const handlePopoverSelectionChange = (subscriber) => {
    dispatch(
      updateMembers({
        id: subscriber.id,
        partner_id: concept.partner_uuid ?? '',
        concept_id: concept.uuid ?? '',
      })
    );
  };

  const handleSelectionPopoverOpen = (e) => {
    dispatch(fetchSubscribers({ partnerId: concept.partner_uuid ?? '' }));
    setPopoverAnchorEl(e.currentTarget);
  };

  const handleSelectionPopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <Fade in={!isLoading}>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack flexDirection="row" alignItems="center">
          <StyledTitle
            className="header__title--overlay"
            variant="h4"
            color="secondary"
          >
            {concept?.name ?? '-'}

            <Tooltip
              title={`${isFavorited ? 'Remove' : 'Add'} to favorites`}
              arrow
            >
              {isFavorited ? (
                <FavoriteIcon
                  onClick={() => {
                    dispatchPinConcept();
                  }}
                  sx={{
                    fontSize: 22,
                    marginLeft: '10px',
                    cursor: 'pointer',
                    color: appColors.favorited,
                  }}
                />
              ) : (
                <StarBorderOutlinedIcon
                  onClick={() => {
                    dispatchPinConcept();
                  }}
                  sx={{
                    fontSize: 22,
                    marginLeft: '10px',
                    cursor: 'pointer',
                    color: appColors.favorited,
                  }}
                />
              )}
            </Tooltip>
          </StyledTitle>
        </Stack>
        <Stack flexDirection="row">
          {concept?.channel.google_display === 1 ||
          concept?.channel.google_video === 1 ? (
            <IconButton
              sx={{
                backgroundColor: '#25165B',
                marginLeft: '0.2em',
                '&:hover': { backgroundColor: '#4011eb' },
              }}
            >
              <Box width="1em" height="1em">
                {channelIcons.google}
              </Box>
            </IconButton>
          ) : null}

          {concept?.channel.facebook_static === 1 ||
          concept?.channel.facebook_video === 1 ? (
            <IconButton
              sx={{
                backgroundColor: '#25165B',
                marginLeft: '0.2em',
                '&:hover': { backgroundColor: '#4011eb' },
              }}
            >
              <Box width="1em" height="1em">
                {channelIcons.facebook}
              </Box>
            </IconButton>
          ) : null}

          {concept?.channel.youtube_video === 1 ? (
            <IconButton
              sx={{
                backgroundColor: '#25165B',
                marginLeft: '0.2em',
                '&:hover': { backgroundColor: '#4011eb' },
              }}
            >
              <Box width="1em" height="1em">
                {channelIcons.youtube}
              </Box>
            </IconButton>
          ) : null}
        </Stack>
      </Stack>
      <Stack
        direction="row"
        flexDirection="row"
        alignItems="center"
        spacing={2.5}
        mt={1}
      >
        <FormControl id="concept_status--select" sx={{ width: 'auto' }}>
          <StyledSelect
            value={conceptStatusId || ''}
            onChange={handleConceptStatusChange}
            input={<StyledOutlinedInput />}
            renderValue={(selectedId) => (
              <StyledStatus
                style={{
                  backgroundColor:
                    appColors.status[
                      _.camelCase(
                        getItemByKey('id', selectedId, maintenanceTaskStatus)
                          .title
                      )
                    ] ?? '#ADADAD',
                }}
              >
                {_.replace(
                  getItemByKey('id', selectedId, maintenanceTaskStatus).title ??
                    '-',
                  new RegExp('_', 'g'),
                  ' '
                ) ?? ''}
              </StyledStatus>
            )}
            MenuProps={MenuProps}
          >
            {_.filter(maintenanceTaskStatus, (stats) =>
              _.map(
                stats?.related_to,
                (types) => types.name === 'concept'
              ).includes(true)
            ).map((item) => (
              <StyledMenuItem key={item.id} value={item.id}>
                <SquareRoundedIcon
                  sx={{
                    color:
                      appColors.status[
                        _.camelCase(
                          item?.title?.toLowerCase().replace(/_/g, ' ')
                        )
                      ],
                    marginRight: '1em',
                  }}
                />
                {_.capitalize(
                  _.replace(item.title ?? '-', new RegExp('_', 'g'), ' ') ?? ''
                )}
              </StyledMenuItem>
            ))}
          </StyledSelect>
        </FormControl>
        <StyledVerticalDivider />
        <Tooltip title="Date Created" arrow>
          <Typography
            variant="body2"
            color={appColors.darkGray}
            display={'flex'}
            alignItems={'center'}
            sx={{ cursor: 'default' }}
            fontWeight={700}
          >
            <CalendarMonthIcon
              color={'secondary'}
              sx={{ marginRight: '0.5em' }}
            />
            {concept?.created_at ?? null
              ? moment(concept?.created_at).format('llll')
              : '-'}
          </Typography>
        </Tooltip>
        <StyledVerticalDivider />
        <Tooltip title="Partner" arrow>
          <Typography
            fontWeight={700}
            sx={{
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
            variant="p"
            color="secondary"
            component={Link}
            to={{
              pathname: `https://beta.ad-lib.io/concepts?partner=${concept?.partner_uuid}`,
            }}
            target="_blank"
          >
            {concept?.partner_name ?? '-'}
          </Typography>
        </Tooltip>
        <StyledVerticalDivider />

        <Box sx={{ cursor: 'pointer' }} onClick={handleSelectionPopoverOpen}>
          {_.isEmpty(concept?.subscribers) ? (
            <Tooltip title="Concept Members" arrow>
              <Typography sx={{ color: appColors.gray }}>
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    backgroundColor: '#ffffff',
                    border: `1px dashed #747474`,
                    color: '#747474',
                  }}
                >
                  <GroupAddIcon />
                </Avatar>
              </Typography>
            </Tooltip>
          ) : (
            <AvatarGroup>
              {concept.subscribers.slice(0, 3).map((subscriber) => (
                <Tooltip
                  title={subscriber.name ?? ''}
                  key={subscriber.id}
                  arrow
                >
                  {subscriber?.avatar?.split('/').pop() !== 'thumb_' ? (
                    <StyledUserAvatar
                      alt={subscriber.name}
                      src={subscriber.avatar}
                    />
                  ) : (
                    <StyledUserAvatar>
                      {`${subscriber.name.split(' ')[0][0]}${
                        subscriber.name.split(' ')[1][0]
                      }`}
                    </StyledUserAvatar>
                  )}
                </Tooltip>
              ))}

              {concept.subscribers?.length > 3 && (
                <Tooltip
                  title={concept.subscribers.map(
                    (data, index) =>
                      index > 2 && (
                        <Typography key={index} variant="body2">
                          {data.name}
                        </Typography>
                      )
                  )}
                  placement="right-start"
                >
                  <StyledUserListCount>
                    +{concept.subscribers?.length - 3}
                  </StyledUserListCount>
                </Tooltip>
              )}
            </AvatarGroup>
          )}
        </Box>
      </Stack>

      <SelectionPopover
        searchPlaceholder="Search User"
        booleanKey="is_subscribed"
        isLoading={isFetchingSubscribers}
        open={shouldOpenPopover}
        anchorEl={popoverAnchorEl}
        datasource={subscribersState}
        onClose={handleSelectionPopoverClose}
        onSelectionChange={handlePopoverSelectionChange}
      />
    </Fade>
  );
};

ProjectHeader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
};

export default ProjectHeader;
