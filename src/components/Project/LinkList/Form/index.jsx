import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Reducers
import { addLinks, editLinks } from 'store/reducers/links';

// Hooks
import useQuery from 'hooks/useQuery';

// MUI Components
import {
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Collapse,
} from '@mui/material';

// Component
import TypesSubs from 'components/Project/LinkList/Form/Chip';

const DrawerForm = ({ onClose, drawerTitle, listId, listLinks }) => {
  const formData = new FormData();
  const dispatch = useDispatch();
  const query = useQuery();

  const { list } = useSelector((state) => state.maintenanceTaskType);

  const [linkName, setLinkName] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [types, setTypes] = useState([]);
  const [rows, setRows] = useState([]);
  const [validDefault, setDefaults] = useState([]);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    setLinkName(
      drawerTitle === 'Edit'
        ? _.filter(listLinks, (item) => item.id === listId)[0].name
        : ''
    );
    setLinkUrl(
      drawerTitle === 'Edit'
        ? _.filter(listLinks, (item) => item.id === listId)[0].link_url
        : ''
    );
    setDefaults(
      drawerTitle === 'Edit'
        ? _.map(
            _.filter(listLinks, (item) => item.id === listId)[0].task_type,
            (task_type) =>
              _.isEmpty(task_type.name)
                ? { name: task_type.task_type_name }
                : { name: task_type.name }
          )
        : []
    );
    // autocomplete selection
    list.map((data) => {
      setRows((old) => [...old, data]);

      if (data.sub_categories?.length > 0) {
        data.sub_categories.map((sub) => {
          setRows((old) => [...old, sub]);
        });
      }
    });
  }, []);

  const handleClick = () => {
    const item = {
      id: drawerTitle === 'Edit' ? listId : null,
      name: linkName,
      url: linkUrl,
      type: _.map(
        _.isEmpty(types)
          ? _.flatten(_.map(validDefault, (item) => _.filter(rows, item)))
          : types,
        (i) => _.join(Object.values(_.pick(i, 'id', 'is_parent')), '_')
      ),
      rel_id: query.get('cid'),
      rel_type: 1,
    };

    for (var key in item) {
      formData.append(key, item[key]);
    }

    drawerTitle === 'Edit'
      ? dispatch(editLinks(formData, types))
      : dispatch(addLinks(formData, types));

    if (drawerTitle !== 'Edit') {
      setLinkName('');
      setLinkUrl('');
      setTypes([]);
    }

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <Stack justifyContent="space-between" height="100vh">
      <Box>
        <Box backgroundColor="#25165B" padding="3em 2em 1em">
          <Typography variant="h6" color="#fff" fontWeight={700}>
            {drawerTitle} Link
          </Typography>
        </Box>
        <Box padding="2em">
          <Stack spacing={2}>
            <Collapse in={isSuccess}>
              <Box>
                <Alert variant="outlined" severity="success">
                  {drawerTitle === 'Edit'
                    ? 'Successfully updated!'
                    : 'New link is now added to the list.'}
                </Alert>
              </Box>
            </Collapse>
            <Box>
              <TextField
                onChange={(e) => setLinkName(e.target.value)}
                value={linkName}
                id="name"
                label="Name"
                variant="outlined"
                autoComplete="off"
                size="large"
                sx={{
                  '.MuiOutlinedInput-root': {
                    height: 'auto',
                  },
                }}
              />
            </Box>
            <Box>
              <TextField
                id="url"
                label="Url"
                onChange={(e) => setLinkUrl(e.target.value)}
                value={linkUrl}
                variant="outlined"
                autoComplete="off"
                size="large"
                sx={{
                  '.MuiOutlinedInput-root': {
                    height: 'auto',
                  },
                }}
              />
            </Box>
            <Box>
              <TypesSubs
                list={rows}
                validDefault={validDefault}
                types={types}
                setType={setTypes}
              />
            </Box>
          </Stack>
        </Box>
      </Box>
      <Box
        padding="1em 2em"
        display="flex"
        justifyContent="flex-end"
        borderTop="1px solid #ececec "
      >
        <Stack spacing={1} direction="row">
          <Button
            variant="contained"
            color="error"
            onClick={() => onClose(drawerTitle)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleClick}
            disabled={
              drawerTitle === 'Edit'
                ? false
                : [types, linkName, linkUrl].some(_.isEmpty)
            }
          >
            {drawerTitle === 'Edit' ? 'Update' : 'Save'}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

DrawerForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  drawerTitle: PropTypes.string,
  listId: PropTypes.number,
  listLinks: PropTypes.array,
};

export default DrawerForm;
