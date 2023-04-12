import { useState, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { styled } from '@mui/styles';
import moment from 'moment';
import { updateCampaignByKey } from 'store/reducers/campaign';
import DatePicker from 'react-datepicker';

import { Typography, Chip, Grid, Box, ButtonBase } from '@mui/material';

import TagIcon from '@mui/icons-material/Tag';
import 'react-datepicker/dist/react-datepicker.css';

const StyledDiv = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  '& .MuiBox-root': {
    marginRight: 10,
    marginBottom: 10,
  },
}));

const StyledTextArea = styled('textarea')(() => ({
  backgroundColor: 'transparent',
  color: 'rgb(102, 102, 102)',
  fontSize: '1em',
  fontFamily: 'Karla, Roboto',
  fontWeight: '400',
  padding: '0px',
  textAlign: 'left',
  alignItems: 'center',
  outline: 'none',
  width: '100%',
  alignSelf: 'center',
  border: '1px solid #DF3C76',
}));

const List = ({ item, data, onPopupOpen }) => {
  const dispatch = useDispatch();
  const [valueString, setValueString] = useState(
    data[item] == null ? '--' : data[item]
  );
  const [isEditingAdditionalInfo, setEditingAdditionalInfo] = useState(false);

  const updateAdditionalInfo_ = (e) => {
    const itemAdditionalInfo = [];
    const {
      target: { value },
    } = e;

    e.preventDefault();
    if (e.key == 'Enter') {
      setEditingAdditionalInfo(false);
      itemAdditionalInfo.push({
        id: data.id,
        key: item?.key,
        value: value,
      });
      setValueString(value);
      dispatch(updateCampaignByKey(itemAdditionalInfo[0]));
    }
  };

  switch (item.key) {
    case 'concept_name':
    case 'name':
      return (
        <Typography sx={{ color: '#707683' }}>
          {!_.isEmpty(data[item?.key]) ? data[item?.key] : '-'}
        </Typography>
      );

    case 'sub_campaign':
      return (
        <Typography sx={{ color: '#707683' }}>
          {data[item?.key]?.length}
        </Typography>
      );

    case 'partner_name':
      return (
        <Chip
          label={data[item?.key]}
          size="small"
          variant="outlined"
          color="secondary"
        />
      );

    case 'delivery_type':
      return (
        <Typography sx={{ color: '#707683', textTransform: 'capitalize' }}>
          {data[item?.key]?.replace(/_/g, ' ').toLowerCase()}
        </Typography>
      );

    case 'created_at':
      return (
        <Typography sx={{ color: '#707683' }}>
          {moment(data[item?.key]).format('MM/DD/YYYY hh:mm A')}
        </Typography>
      );

    case 'launch_date':
    case 'delivery_date':
      return (
        <ButtonBase
          width="fit-content"
          disableRipple={true}
          onClick={(e) => onPopupOpen(e, 'left', item?.key, null)}
        >
          <Typography color="secondary" sx={{ cursor: 'pointer' }}>
            {!_.isEmpty(data[item?.key])
              ? moment(data[item?.key]).format('MM/DD/YYYY hh:mm A')
              : `${item.name} not set.`}
          </Typography>
        </ButtonBase>
      );

    case 'tags':
      return (
        <Box
          onClick={(e) => onPopupOpen(e, 'left', item?.key, null)}
          width="fit-content"
        >
          {!_.isEmpty(data[item?.key]) ? (
            data[item?.key]?.map((e, i) => (
              <Chip
                color="secondary"
                key={i}
                label={e.title}
                size="small"
                variant="outlined"
                sx={{ marginRight: '0.5em', cursor: 'pointer' }}
              />
            ))
          ) : (
            <Chip
              icon={<TagIcon />}
              label="Add tags"
              size="small"
              variant="outlined"
              color="secondary"
              sx={{
                marginRight: '0.5em',
                cursor: 'pointer',
                borderStyle: 'dashed',
                '& .MuiChip-iconSmall': {
                  width: '0.7em',
                  marginLeft: '5px',
                },
              }}
            />
          )}
        </Box>
      );

    case 'total_log_hours':
      return (
        <Typography sx={{ color: '#707683' }}>
          {!_.isEmpty(data[item?.key]) ? data[item?.key] : 0}
        </Typography>
      );

    case 'personalization_type':
      return (
        <Typography
          sx={{
            color: !_.isEmpty(data[item?.key])
              ? data[item?.key]?.toLowerCase() === 'assembly'
                ? '#ffab01'
                : '#84C529'
              : 'default',
          }}
        >
          {!_.isEmpty(data[item?.key])
            ? data[item?.key]?.toLowerCase() === 'assembly'
              ? 'Managed Service'
              : 'Self Service'
            : 'Not Specified'}
        </Typography>
      );

    case 'additional_info':
      return (
        <StyledDiv
          onDoubleClick={() => {
            if (!isEditingAdditionalInfo) {
              setEditingAdditionalInfo(true);
              setValueString(
                <StyledTextArea
                  rows="5"
                  cols="100"
                  onKeyUp={(e) => updateAdditionalInfo_(e)}
                ></StyledTextArea>
              );
            }
          }}
        >
          <Typography sx={{ color: '#707683', textTransform: 'capitalize' }}>
            {valueString}
          </Typography>
        </StyledDiv>
      );
    default:
      return null;
  }
};

List.propTypes = {
  item: PropTypes.string.isRequired,
  data: PropTypes.any,
  value: PropTypes.any,
  onClick: PropTypes.func,
  onPopupOpen: PropTypes.func,
};

export default List;
