import { useState, memo } from 'react';

import PropTypes from 'prop-types';

import _ from 'lodash';

import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Stack,
  Avatar,
  TextField,
  styled,
  Tooltip,
} from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';

import { FixedSizeList, areEqual } from 'react-window';

import empty from 'assets/empty.svg';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '3px',
    '&.Mui-focused fieldset': {
      borderColor: '#5025c4',
      boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
    },
  },
});

const renderRow = memo(({ data, index, style }) => {
  const { items, toggleItemActive, clickFunc } = data;
  const item = items[index];

  return (
    <>
      <ListItem
        style={style}
        key={index}
        component="div"
        disablePadding
        secondaryAction={
          _.map(toggleItemActive, (sel) =>
            Number(sel.user_id ?? sel.id)
          ).includes(item.id) && <CheckIcon color="secondary" />
        }
        onClick={(e) => clickFunc(e, item)}
      >
        <ListItemButton
          sx={{ paddingTop: 0, paddingBottom: 0, height: 'inherit' }}
          selected={_.map(toggleItemActive, (sel) =>
            Number(sel.user_id ?? sel.id)
          ).includes(item.id)}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            {item.profile_picture?.split('/').pop() !== 'thumb_' ||
            !_.isEmpty(item.profile_picture) ? (
              <Avatar
                sx={{ width: '25px', height: '25px' }}
                alt={item.fullname.toUpperCase()}
                src={item.profile_picture}
              />
            ) : (
              <Avatar
                sx={{
                  width: '25px',
                  height: '25px',
                  fontSize: '1em',
                }}
              >
                {`${item.fullname.toUpperCase().split(' ')[0][0]}${
                  item.fullname.toUpperCase().split(' ')[1][0]
                }`}
              </Avatar>
            )}

            <Tooltip title={item.fullname ?? ''} arrow>
              <ListItemText
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '1',
                  WebkitBoxOrient: 'vertical',
                }}
                primary={item.fullname}
              />
            </Tooltip>
          </Stack>
        </ListItemButton>
      </ListItem>
    </>
  );
}, areEqual);

renderRow.propTypes = {
  data: PropTypes.any,
  index: PropTypes.any,
  style: PropTypes.any,
};

const createItemData = _.memoize((items, toggleItemActive, clickFunc) => ({
  items,
  toggleItemActive,
  clickFunc,
}));

export default function VirtualListSelection({
  taskId,
  option,
  type,
  handleSave,
  selected,
  isSubtask,
  isParent,
}) {
  const [dataFilter, setDataFilter] = useState('');

  const handleClick = (e, data) => {
    e.preventDefault();

    handleSave({
      is_parent: isParent,
      id: isSubtask == null ? taskId : isSubtask,
      key: type,
      value: data.id,
      selectedArr: {
        avatar: data.profile_picture,
        id: data.id,
        is_assignee: true,
        name: data.fullname,
        order: 1,
      },
    });
  };

  const itemData = createItemData(
    _.filter(
      _.sortBy(option, (type) =>
        _.map(selected, (sel) => Number(sel.user_id ?? sel.id)).includes(
          type.id
        )
          ? 0
          : 1
      ),
      (data) => data?.fullname?.toLowerCase().includes(dataFilter.toLowerCase())
    ),
    selected,
    handleClick
  );

  return (
    <Box>
      <Box
        padding={1}
        sx={{ borderBottom: '1px solid #ececec' }}
        onChange={(e) => setDataFilter(e.target.value)}
      >
        <StyledTextField size="small" placeholder="Search user" />
      </Box>

      {!_.isEmpty(
        _.filter(
          _.sortBy(option, (type) =>
            _.map(selected, (sel) => Number(sel.user_id ?? sel.id)).includes(
              type.id
            )
              ? 0
              : 1
          ),
          (data) =>
            data?.fullname?.toLowerCase().includes(dataFilter.toLowerCase())
        )
      ) ? (
        <FixedSizeList
          height={240}
          width={'auto'}
          itemSize={40}
          itemCount={
            _.filter(
              _.sortBy(option, (type) =>
                _.map(selected, (sel) =>
                  Number(sel.user_id ?? sel.id)
                ).includes(type.id)
                  ? 0
                  : 1
              ),
              (data) =>
                data?.fullname?.toLowerCase().includes(dataFilter.toLowerCase())
            )?.length
          }
          overscanCount={5}
          itemData={itemData}
        >
          {renderRow}
        </FixedSizeList>
      ) : (
        <Stack alignItems="center" p={2}>
          <img
            src={empty}
            alt="Not found"
            style={{ width: '7em', height: 'auto' }}
          />
          <Typography fontWeight={300} variant="body1">
            User not found
          </Typography>
        </Stack>
      )}
    </Box>
  );
}

VirtualListSelection.propTypes = {
  option: PropTypes.any,
  selected: PropTypes.any,
  type: PropTypes.string,
  taskId: PropTypes.any,
  isSubtask: PropTypes.any,
  isParent: PropTypes.any,
  handleSave: PropTypes.func,
};
