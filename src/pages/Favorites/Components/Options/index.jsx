import React, { useState, useEffect } from 'react';

import _ from 'lodash';

import { useHistory } from 'react-router-dom';

// hooks
import { useOnMount } from 'pages/Dashboard/hooks';

// Mui Components
import {
  Stack,
  IconButton,
  Box,
  Tooltip,
  Button,
  FormControlLabel,
  Switch,
  Checkbox,
} from '@mui/material';

// MUI Icons
import TuneIcon from '@mui/icons-material/Tune';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import SearchIcon from '@mui/icons-material/Search';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

// helper
import {
  StyledStack,
  StyledTextField,
} from 'pages/Dashboard/views/DesignQADash/helpers';

// colors
import { appColors } from 'theme/variables';

let timer = null;

export default function Options() {
  const [showResourcesBtn, setShowResourcesBtn] = useState(false);
  const [filter, setFilter] = useState(false);
  const [isBackdrop, setBackdrop] = useState(false);
  const [isFavorites, setIsFavorites] = useState(false);
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [searchString, setSearchString] = useState('');

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <StyledStack
          direction="row"
          position="relative"
          alignItems="center"
          sx={
            isBackdrop && {
              boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
              border: `1px solid ${appColors.lightViolet}`,
            }
          }
        >
          <IconButton
            disableRipple
            disableFocusRipple
            disableTouchRipple
            sx={{
              padding: '0 8px',
              color: isBackdrop && `${appColors.lightViolet}`,
            }}
          >
            <SearchIcon />
          </IconButton>
          <StyledTextField
            placeholder="Search"
            size="small"
            value={searchString}
            onFocus={() => setBackdrop(true)}
            onBlur={() => setBackdrop(false)}
            onChange={(e) => {
              e.preventDefault();
            }}
            onKeyUp={(e) => {
              e.preventDefault();
              clearTimeout(timer);
            }}
          />
          {!_.isEmpty(searchString) && (
            <IconButton
              disableRipple
              disableFocusRipple
              disableTouchRipple
              sx={{
                padding: 0,
                margin: '5px 8px',
                fontSize: '15px',
                color: !isBackdrop ? '#c7c7c7' : appColors.lightViolet,
                position: 'absolute',
                right: 0,
              }}
              onClic
            >
              <CancelIcon />
            </IconButton>
          )}
        </StyledStack>

        <Button
          startIcon={<TuneIcon />}
          sx={{
            height: '-webkit-fill-available',
            padding: '4.446px 12px',
            borderRadius: '3px',
            backgroundColor: filter ? appColors.lightViolet : 'inherit',
            borderColor: appColors.lightViolet,
            color: filter ? '#fff' : appColors.lightViolet,
            textTransform: 'capitalize',
            fontWeight: 800,
            '&:hover': {
              backgroundColor: appColors.lightViolet,
              color: '#fff',
            },
          }}
          variant="outlined"
          size="small"
        >
          Filters
        </Button>
      </Stack>
      {/* <Stack direction="row" spacing={4} alignItems="center">
        <Stack direction="row" spacing={2}>
          <FormControlLabel
            value="subtask"
            control={
              <Switch checked={showSubtasks} color="primary" size="small" />
            }
            label="Subtasks"
            sx={{
              marginRight: 0,
              '.MuiFormControlLabel-label': {
                fontSize: '12px',
                fontWeight: 700,
              },
            }}
          />
          <FormControlLabel
            sx={{
              '.MuiFormControlLabel-label': {
                fontSize: '12px',
                fontWeight: 700,
              },
            }}
            control={
              <Checkbox
                checked={isFavorites}
                disableFocusRipple
                disableRipple
                disableTouchRipple
                sx={{
                  fontSize: '22px',
                  padding: 0,
                  marginRight: '9px',
                }}
                icon={<StarOutlineRoundedIcon sx={{ color: '#bdbdbd' }} />}
                checkedIcon={<StarRoundedIcon sx={{ color: '#FFB946' }} />}
              />
            }
            label="Favorites"
          />
        </Stack>
        <Button
          startIcon={
            <CategoryOutlinedIcon sx={{ fontSize: '14px !important' }} />
          }
          sx={{
            height: '-webkit-fill-available',
            textTransform: 'capitalize',
            fontWeight: 800,
            padding: '4.446px 12px',
            borderRadius: '3px',
          }}
          variant="contained"
          color="secondary"
          disableElevation
          size="small"
        >
          Sort by
        </Button>
        {showResourcesBtn && (
          <Box>
            <Tooltip title="Resources" arrow>
              <span>
                <IconButton
                  color="primary"
                  size="small"
                  sx={{
                    fontSize: '1.46rem',
                    border: '1px solid',
                    backgroundColor: '#5025c4',
                    color: '#fff',
                    padding: '4px 7px',
                    borderRadius: '3px',
                    '&:hover': {
                      border: '1px solid #5025c4',
                      color: '#5025c4',
                    },
                  }}
                >
                  <SupervisorAccountOutlinedIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        )}
      </Stack> */}
    </Stack>
  );
}
