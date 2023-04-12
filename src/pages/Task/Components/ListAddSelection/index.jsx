import { useEffect, useState } from 'react';

import _ from 'lodash';

import { PropTypes } from 'prop-types';

import {
  TextField,
  Box,
  styled,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

import empty from 'assets/empty.svg';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#5025c4',
      boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
    },
  },
});

export default function ListAddSelection({
  taskId,
  defaultData,
  // selected,
  type,
  relType,
  handleSave,
}) {
  const [dataFilter, setDataFilter] = useState('');
  // const [filteredTags, setFilteredTags] = useState([]);

  const filteredTags = _.filter(defaultData, (data) =>
    data?.title?.toLowerCase().includes(dataFilter.toLowerCase())
  );

  const filteredTriggers = _.filter(defaultData, (data) =>
    data?.name?.toLowerCase().includes(dataFilter.toLowerCase())
  );

  const displayTags = _.filter(defaultData, (data) =>
    data?.size?.toLowerCase().includes(dataFilter.toLowerCase())
  );

  useEffect(() => {}, []);

  switch (type) {
    case 'mobile_displays':
    case 'desktop_displays':
      return (
        <Box overflow={'hidden'}>
          <Box
            padding={1}
            sx={{ borderBottom: '1px solid #ececec' }}
            onChange={(e) => setDataFilter(e.target.value)}
          >
            <StyledTextField
              size="small"
              placeholder="Search/Add Format"
              onKeyUp={(e) => {
                if (e.key.toLowerCase() === 'enter') {
                  setDataFilter('');
                  handleSave({
                    key: type,
                    ids: '1',
                    action: 'add',
                    // Below are endpoint's parameters
                    task_id: taskId,
                    type: type,
                    size: e.target.value,
                  });
                }
              }}
            />
          </Box>

          {_.isEmpty(displayTags) ? (
            <Stack alignItems="center" p={2}>
              <img
                src={empty}
                alt="Not found"
                style={{ width: '7em', height: 'auto' }}
              />
              <Typography fontWeight={300} variant="body1">
                Format not found
              </Typography>
            </Stack>
          ) : (
            <Box maxHeight={270} overflow="auto">
              <List dense={true}>
                {displayTags.map((data, index) => (
                  <ListItem
                    key={index}
                    component="div"
                    disablePadding
                    secondaryAction={
                      data?.is_selected ? <CheckIcon color="secondary" /> : null
                    }
                  >
                    <ListItemButton
                      onClick={() =>
                        handleSave({
                          key: type,
                          ids: data?.id,
                          action: data?.is_selected ? 'remove' : 'add',
                          // Below are endpoint's parameters
                          task_id: taskId,
                          type: type,
                          size: data?.size,
                        })
                      }
                    >
                      <ListItemIcon>
                        {type === 'desktop_displays' ? (
                          <DesktopWindowsIcon />
                        ) : (
                          <PhoneIphoneIcon />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={data.size} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      );
    case 'tags':
      return (
        <Box overflow={'hidden'}>
          <Box
            padding={1}
            sx={{ borderBottom: '1px solid #ececec' }}
            onChange={(e) => setDataFilter(e.target.value)}
          >
            <StyledTextField
              size="small"
              placeholder="Search/Add Tags"
              onKeyUp={(e) => {
                if (e.key.toLowerCase() === 'enter') {
                  setDataFilter('');
                  handleSave({
                    key: type,
                    action: 'add',
                    // Below are endpoint's parameters
                    rel_id: taskId,
                    type: relType,
                    title: e.target.value,
                  });
                }
              }}
            />
          </Box>
          {_.isEmpty(filteredTags) ? (
            <Stack alignItems="center" p={2}>
              <img
                src={empty}
                alt="Not found"
                style={{ width: '7em', height: 'auto' }}
              />
              <Typography fontWeight={300} variant="body1">
                Tag not found
              </Typography>
            </Stack>
          ) : (
            <Box maxHeight={270} overflow="auto">
              <List dense={true}>
                {filteredTags.map((data, index) => (
                  <ListItem
                    key={index}
                    component="div"
                    disablePadding
                    secondaryAction={
                      data?.is_selected ? <CheckIcon color="secondary" /> : null
                    }
                  >
                    <ListItemButton
                      onClick={() =>
                        handleSave({
                          key: type,
                          action: data?.is_selected ? 'remove' : 'add',
                          // Below are endpoint's parameters
                          ids: data?.id,
                          rel_id: taskId,
                          type: relType,
                          title: data?.title,
                        })
                      }
                    >
                      <ListItemText primary={data.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      );
    case 'triggers':
      return (
        <Box overflow={'hidden'}>
          <Box
            padding={1}
            sx={{ borderBottom: '1px solid #ececec' }}
            onChange={(e) => setDataFilter(e.target.value)}
          >
            <StyledTextField
              size="small"
              placeholder="Search/Add Triggers"
              onKeyUp={(e) => {
                if (e.key.toLowerCase() === 'enter') {
                  setDataFilter('');
                  handleSave({
                    key: type,
                    action: 'add',
                    // Below are endpoint's parameters
                    task_id: taskId,
                    is_parent: relType === 'task' ? 1 : 0,
                    name: e.target.value,
                  });
                }
              }}
            />
          </Box>
          {_.isEmpty(filteredTriggers) ? (
            <Stack alignItems="center" p={2}>
              <img
                src={empty}
                alt="Not found"
                style={{ width: '7em', height: 'auto' }}
              />
              <Typography fontWeight={300} variant="body1">
                Trigger not found
              </Typography>
            </Stack>
          ) : (
            <Box maxHeight={270} overflow="auto">
              <List dense={true}>
                {filteredTriggers.map((data, index) => (
                  <ListItem
                    key={index}
                    component="div"
                    disablePadding
                    secondaryAction={
                      data?.is_selected ? <CheckIcon color="secondary" /> : null
                    }
                  >
                    <ListItemButton
                      onClick={() =>
                        handleSave({
                          key: type,
                          action: data?.is_selected ? 'remove' : 'add',
                          // Below are endpoint's parameters
                          ids: data?.id,
                          task_id: taskId,
                          is_parent: relType === 'task' ? 1 : 0,
                          name: data.name,
                        })
                      }
                    >
                      <ListItemText primary={data.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      );
  }
}

ListAddSelection.propTypes = {
  taskId: PropTypes.any,
  defaultData: PropTypes.any,
  type: PropTypes.any,
  relType: PropTypes.any,
  // selected: PropTypes.any,
  handleSave: PropTypes.any,
};
