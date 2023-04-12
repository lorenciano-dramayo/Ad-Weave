import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import _ from 'lodash';
import PropTypes from 'prop-types';

// Reducer
import {
  requestAddRevision_,
  requestUpdateRevision_,
  requestDestroyRevision_,
  requestResolvedRevision_,
} from 'store/reducers/tasks';

import {
  Stack,
  Box,
  InputAdornment,
  OutlinedInput,
  Typography,
  IconButton,
  Button,
  Card,
  FormGroup,
  FormControlLabel,
  Checkbox,
  styled,
} from '@mui/material';

import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import SearchIcon from '@mui/icons-material//Search';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import '../../../../../assets/css/concept/task/overide.css';
// Colors

const StyledInputField = styled(OutlinedInput)({
  fontSize: '0.9rem',
  borderRadius: '0.2rem',
  paddingRight: '12px',
  '&.Mui-focused fieldset': {
    border: '1px solid #5025c4 !important',
    boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
  },
});

export default function Revisions({ revision, task_id, data }) {
  const Swal = require('sweetalert2');
  const [filteredRowsRevision, setFilteredRowsRevision] = useState(revision);
  const [revisionInput, setRevisionInput] = useState('');
  const [filteredRowsCountRevision, setFilteredRowsCountRevision] =
    useState('0');
  const [totalLabelRevision, setTotalLabelRevision] = useState('COMPLETED');
  const [filteredValueUpdateRevision, setFilteredValueUpdateRevision] =
    useState('');
  const [filteredValueUpdateIDrevision, setFilteredValueUpdateIDrevision] =
    useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const itemUnchecked = revision?.filter((item) => item.is_resolved == false);
    setFilteredRowsRevision(itemUnchecked);

    const itemChecked = revision?.filter((item) => item.is_resolved == true);
    setFilteredRowsCountRevision(itemChecked?.length);
  }, [revision]);

  const handleSearchRevision = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      const valueSearch = e.target.value.toLowerCase();

      if (_.isEmpty(valueSearch)) {
        return setFilteredRowsRevision(revision);
      }

      const itemRevision = revision?.filter((item) =>
        item.feedback.includes(valueSearch)
      );

      setFilteredRowsRevision(itemRevision);
    }
  };

  const handleOnKeyUpUpdateRevision = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      const itemRevision = [];
      itemRevision.push({
        id: filteredValueUpdateIDrevision,
        comment: filteredValueUpdateRevision,
        task_id: task_id,
      });
      dispatch(requestUpdateRevision_(itemRevision[0]));
      const getDataItem = revision.filter(
        (item) => item.id == filteredValueUpdateIDrevision
      );

      if (getDataItem[0].is_resolved == true) {
        const itemchecked = revision.filter((item) => item.is_resolved == true);
        setFilteredRowsRevision(itemchecked);
      } else {
        const itemUnchecked = revision.filter(
          (item) => item.is_resolved == false
        );
        setFilteredRowsRevision(itemUnchecked);
      }

      setRevisionInput('');
      setFilteredValueUpdateRevision('');
      setFilteredValueUpdateIDrevision('');
      setTotalLabelRevision('COMPLETED');
    }
  };

  const handleGetDataRevision = () => {
    if (totalLabelRevision == 'COMPLETED') {
      const itemChecked = revision.filter((item) => item.is_resolved == true);
      setFilteredRowsRevision(itemChecked);
      setTotalLabelRevision('HIDE COMPLETED');
    } else {
      const itemUnchecked = revision.filter(
        (item) => item.is_resolved == false
      );
      setFilteredRowsRevision(itemUnchecked);
      setTotalLabelRevision('COMPLETED');
    }
  };

  const handleOnKeyUpRevision = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      const itemRevision = [];
      itemRevision.push({
        rel_id: task_id,
        rel_type: 'task',
        comment: e.target.value.toLowerCase(),
        report_link: '',
      });
      dispatch(requestAddRevision_(itemRevision[0]));
      setRevisionInput('');
      setTotalLabelRevision('COMPLETED');
    }
  };

  const handleDeleteRevision = (id) => {
    Swal.fire({
      title: 'Do you want to delete this revision?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const itemRevision = [];
        itemRevision.push({
          rel_id: task_id,
          ids: id,
          rel_type: 'task',
        });
        dispatch(requestDestroyRevision_(itemRevision[0]));

        Swal.fire('Saved!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };

  const handleCheckRevision = (id) => {
    const itemRevision = [];
    itemRevision.push({
      id: id,
      task_id: task_id,
    });
    dispatch(requestResolvedRevision_(itemRevision[0]));
  };

  const handleUpdateRevision = (id) => {
    const getDataItem = revision.filter((item) => item.id == id);
    setFilteredValueUpdateRevision(getDataItem[0].feedback);
    setFilteredValueUpdateIDrevision(id);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="flex-start">
        <Box>
          <StyledInputField
            name="search"
            onKeyUp={handleSearchRevision}
            type="text"
            placeholder="Search..."
            inputProps={{
              autoComplete: 'off',
            }}
            size="small"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    width: '1em !important',
                    height: '1em !important',
                    color: '#484964',
                  }}
                />
              </InputAdornment>
            }
            required
          />
        </Box>
      </Stack>
      {_.isEmpty(filteredRowsRevision) ? (
        <Card variant="outlined" sx={{ borderStyle: 'none' }}>
          <Stack alignItems="center" p={1}>
            <Box>
              <IconButton
                size="large"
                color="error"
                disableRipple
                disableTouchRipple
                disableFocusRipple
                sx={{ backgroundColor: '#f2445c1a' }}
              >
                <RemoveDoneIcon />
              </IconButton>
            </Box>
            <Box>
              <Typography fontWeight={700} color="#999999">
                No revision found.
              </Typography>
            </Box>
          </Stack>
          <Box>
            <StyledInputField
              sx={{
                borderRadius: '0.1em',
                fieldset: {
                  border: '1px dashed #ececec',
                },
              }}
              onChange={(event) => setRevisionInput(event.target.value)}
              value={revisionInput}
              fullWidth
              name="search"
              type="text"
              placeholder="Add New"
              inputProps={{
                autoComplete: 'off',
              }}
              size="small"
              required
              onKeyUp={handleOnKeyUpRevision}
            />
          </Box>
          <Box mt={1}>
            <Button onClick={handleGetDataRevision} color="secondary">
              {filteredRowsCountRevision} {totalLabelRevision}
            </Button>
          </Box>
        </Card>
      ) : (
        <Box py={1.5}>
          <FormGroup>
            {(filteredRowsRevision ?? []).map((item, index) => (
              <Stack
                key={index}
                px={1.5}
                direction="row"
                justifyContent={'space-between'}
                sx={{
                  border: '1px solid #ececec',
                  marginBottom: '0.2em',
                  marginLeft: 0,
                  marginRight: 0,
                  '&:hover': {
                    boxShadow: '0 3px 15px rgb(80 37 196 / 40%)',
                  },
                }}
              >
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onClick={(e) => handleCheckRevision(item.id)}
                        checked={item.is_resolved}
                      />
                    }
                    label={item.feedback}
                  />
                </Box>
                <Stack direction="row" spacing={1}>
                  <IconButton
                    size="small"
                    sx={{
                      padding: 0,
                      '&:hover': { background: 'transparent' },
                    }}
                    onClick={(e) => handleUpdateRevision(item.id)}
                  >
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      padding: 0,
                      '&:hover': { background: 'transparent' },
                    }}
                    onClick={(e) => handleDeleteRevision(item.id)}
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Stack>
              </Stack>
            ))}
          </FormGroup>

          {_.isEmpty(filteredValueUpdateRevision) ? (
            <Box>
              <StyledInputField
                sx={{
                  borderRadius: '0.1em',
                  fieldset: {
                    border: '1px dashed #ececec',
                  },
                }}
                onChange={(event) => setRevisionInput(event.target.value)}
                value={revisionInput}
                fullWidth
                name="search"
                type="text"
                placeholder="Add New"
                inputProps={{
                  autoComplete: 'off',
                }}
                size="small"
                required
                onKeyUp={handleOnKeyUpRevision}
              />
            </Box>
          ) : (
            <Box>
              <StyledInputField
                sx={{
                  borderRadius: '0.1em',
                  fieldset: {
                    border: '1px dashed #ececec',
                  },
                }}
                onChange={(event) =>
                  setFilteredValueUpdateRevision(event.target.value)
                }
                fullWidth
                value={filteredValueUpdateRevision}
                name="search"
                type="text"
                placeholder="Add New"
                inputProps={{
                  autoComplete: 'off',
                }}
                size="small"
                required
                onKeyUp={handleOnKeyUpUpdateRevision}
              />
            </Box>
          )}

          <Box mt={1}>
            <Button onClick={handleGetDataRevision} color="secondary">
              {filteredRowsCountRevision} {totalLabelRevision}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

Revisions.propTypes = {
  revision: PropTypes.any,
  data: PropTypes.any,
  task_id: PropTypes.any,
};
