import PropTypes from 'prop-types';

import { useState } from 'react';
import _ from 'lodash';

import { Stack, Box, Button, Typography, styled } from '@mui/material';

import { updateTaskByKey } from 'store/reducers/tasks';
import {
  updateCampaignByKey,
  updateCampaignStatus,
} from 'store/reducers/campaign';

// Redux
import { useDispatch } from 'react-redux';

// MUI Icons
import FavoriteIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import Popup from 'pages/Task/Components/Popup';
import ListSelection from 'pages/Task/Components/ListSelection';

import { appColors } from 'theme/variables';

import { getItemByKey } from 'utils/dictionary';

const StyledTypography = styled(Typography)`
  background-image: linear-gradient(90deg, #b233cf, #d721cf 48.44%, #e920a5);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  color: #29125f;
  word-break: break-word;
  display: flex;
  align-items: center;
`;

export default function Header({
  status,
  isPinned,
  channel,
  statusList,
  taskId,
  name,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [horizontal, setHorizontal] = useState('left');
  const [isPinnedFav, setIsPinnedFav] = useState(isPinned);
  const [option, setOption] = useState([]);
  const [optionType, setOptionType] = useState(null);
  const [selected, setSelected] = useState(null);
  const [, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const handlePin = (id) => {
    if (isPinnedFav == true) {
      setIsPinnedFav(false);
    } else {
      setIsPinnedFav(true);
    }

    dispatch(
      updateTaskByKey({
        is_parent: 0,
        id: id,
        key: 'pin',
        value: '',
      })
    );
  };

  const handleSave = (data) => {
    dispatch(updateCampaignByKey(data));
    // dispatch(updateCampaignStatus(data));
  };

  const handleOpen = (event, position, type, data, select) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelected(select);
    setHorizontal(position);
    setOptionType(type);
    setOption(data);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (e, select) => {
    e.preventDefault();
    setSelected(select);
    setIsEdit(select === 'edit_info' && true);
    setAnchorEl(null);
  };

  return (
    <>
      <Stack
        px={5}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack spacing={2} direction="row" alignItems="center">
          <Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor:
                  appColors.status[
                    _.camelCase(`${status}`?.replace(/_/g, ' '))
                  ],
                textTransform: 'capitalize',
                '&:hover': {
                  backgroundColor:
                    appColors.status[
                      _.camelCase(`${status}`?.replace(/_/g, ' '))
                    ],
                },
              }}
              onClick={(e) =>
                handleOpen(
                  e,
                  'left',
                  'status',
                  statusList,
                  getItemByKey('title', status, statusList).id
                )
              }
            >
              {`${status}`.replace(/_/g, ' ').toLowerCase()}
            </Button>
          </Box>
          <Box>
            <StyledTypography variant="h6" fontWeight={700}>
              {name}
              {isPinnedFav ? (
                <FavoriteIcon
                  onClick={() => handlePin(taskId, 0)}
                  sx={{
                    fontSize: 22,
                    marginLeft: '10px',
                    cursor: 'pointer',
                    color: appColors.favorited,
                  }}
                />
              ) : (
                <StarBorderOutlinedIcon
                  onClick={() => handlePin(taskId, 0)}
                  sx={{
                    fontSize: 22,
                    marginLeft: '10px',
                    cursor: 'pointer',
                    color: appColors.favorited,
                  }}
                />
              )}
            </StyledTypography>
          </Box>
        </Stack>
        <Box
          sx={{
            width: '2em',
            height: '2em',
          }}
        >
          {channel}
        </Box>
      </Stack>

      {/* Popup */}
      <Popup
        handleClose={handleClose}
        anchorEl={anchorEl}
        horizontal={horizontal}
        content={
          <ListSelection
            option={option}
            type={optionType}
            selected={selected}
            taskId={taskId}
            rel="campaign"
            handleSave={handleSave}
            handleClose={handleClose}
            handleEdit={handleEdit}
          />
        }
      />
    </>
  );
}

Header.propTypes = {
  statusId: PropTypes.any,
  taskId: PropTypes.any,
  status: PropTypes.string,
  isPinned: PropTypes.bool,
  name: PropTypes.string,
  channel: PropTypes.any,
  statusList: PropTypes.any,
};
