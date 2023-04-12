import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonLoader from './skeleton';
import {
  Stack,
  Box,
  InputAdornment,
  OutlinedInput,
  Typography,
  IconButton,
  Collapse,
  Button,
  Grid,
  Card,
  FormControl,
  MenuItem,
  NativeSelect,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  styled,
} from '@mui/material';

import {
  requestAddChecklist_,
  requestUpdateChecklist_,
  requestFetchChecklist_,
  requestDestroyChecklist_,
  requestUncheckedChecklist_,
  requestCheckedChecklist_,
  requestFetchRevision_,
  requestAddRevision_,
  requestUpdateRevision_,
  requestDestroyRevision_,
  requestResolvedRevision_,
  requestFetchRefLink_,
  requestDestroyRefLink_,
  requestAddRefLink_,
  requestFetchSubTask_,
  taskTemplates,
  requestChangeTemplateVersion_,
} from 'store/reducers/tasks';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material//Search';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

// components
import Subtasks from 'pages/Task/Components/CollapsiblePanels/Subtasks';
import Revisions from 'pages/Task/Components/CollapsiblePanels/Revisions';

// Colors
import { appColors } from 'theme/variables';
import { Link } from 'react-router-dom';

// Global CSS
import '../../../../assets/css/concept/task/overide.css';

const StyledInputField = styled(OutlinedInput)({
  fontSize: '0.9rem',
  borderRadius: '0.2rem',
  paddingRight: '12px',
  '&.Mui-focused fieldset': {
    border: '1px solid #5025c4 !important',
    boxShadow: '0 0 0 4px rgb(80 37 196 / 10%)',
  },
});

const CollapsiblePanels = ({
  name,
  dataFields,
  subTask,
  priorityList,
  usersList,
  statusList,
  handleOpen,
  overview,
  data,
  onCloseDialog,
}) => {
  const { data_check, data_revision, creatives, isLoadingTemplate } =
    useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);
  const Swal = require('sweetalert2');
  const { data_reference } = useSelector((state) => state.tasks);

  // Reference Link
  const [filteredRowsReferenceLink, setFilteredRowsReferenceLink] =
    useState(data_reference);
  const [referenceLinkInput01, setReferenceLinkInput01] = useState('');
  const [referenceLinkInput02, setReferenceLinkInput02] = useState('');

  // Checklist
  const [checkedInput, setCheckedInput] = useState('');
  const [filteredRows, setFilteredRows] = useState(data_check);
  const [filteredRowsCount, setFilteredRowsCount] = useState('');
  const [totalLabel, setTotalLabel] = useState('COMPLETED');
  const [filteredValueUpdate, setFilteredValueUpdate] = useState('');
  const [filteredValueUpdateID, setFilteredValueUpdateID] = useState('');

  // Template
  const [versionValue, setVersionValue] = useState('');

  useEffect(() => {
    // Checklist
    if (data_check != null) {
      const itemUnchecked = data_check.filter((item) => item.checked == '0');
      setFilteredRows(itemUnchecked);

      const itemChecked = data_check.filter((item) => item.checked == '1');
      setFilteredRowsCount(itemChecked.length);
    }
  }, [data_check]);

  useEffect(() => {
    setFilteredRowsReferenceLink(data_reference);
  }, [data_reference]);

  useEffect(() => {
    if (data_check != null) {
      dispatch(requestFetchChecklist_(dataFields.id));
      const itemChecked = data_check.filter((item) => item.checked == '1');
      setFilteredRowsCount(itemChecked.length);
    }
  }, []);

  const handleGetDataSubLinkAccordionTrigger = () => {
    dispatch(requestFetchSubTask_(dataFields.id));
  };

  // Template

  const handleGetTempleteVersionValue = (e) => {
    const dataVersion = e.target.value.split(',');

    const item = [];
    item.push({
      concept_id: data?.concept_id,
      rel_id: dataFields.id,
      rel_type: data?.rel_type == 'task' ? '3' : '4',
      template_id: dataVersion[1],
      version: dataVersion[0],
    });

    dispatch(requestChangeTemplateVersion_(item[0]));
  };

  // Reference Link Functionality

  const handleGetDataRefLinkAccordionTrigger = () => {
    if (!expand) {
      dispatch(requestFetchRefLink_(dataFields.id));
    }
  };

  const handleOnKeyUpRefLink = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      if (
        referenceLinkInput01.toString() == '' ||
        referenceLinkInput02.toString() == ''
      ) {
        alert('Please complete all fields.');
      } else {
        const itemRefLink = [];
        itemRefLink.push({
          rel_id: dataFields.id,
          url: referenceLinkInput02,
          name: referenceLinkInput01,
          rel_type: '3',
        });

        dispatch(requestAddRefLink_(itemRefLink[0]));
        setReferenceLinkInput01('');
        setReferenceLinkInput02('');
        dispatch(requestFetchRefLink_(dataFields.id));
        setFilteredRowsReferenceLink(data_reference);
      }
    }
  };

  const handleDeleteRefLink = (e, id, relType) => {
    Swal.fire({
      title: 'Do you want to delete this data?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const itemRefLink = [];
        itemRefLink.push({
          link_id: id,
          rel_id: dataFields.id,
          rel_type: relType,
        });

        dispatch(requestDestroyRefLink_(itemRefLink[0]));
        Swal.fire('Saved!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };

  // Checklist Functionality

  const handleGetData = () => {
    if (totalLabel == 'COMPLETED') {
      setFilteredRows(data_check);
      setTotalLabel('HIDE COMPLETED');
    } else {
      const itemUnchecked = data_check.filter((item) => item.checked == '0');
      setFilteredRows(itemUnchecked);
      setTotalLabel('COMPLETED');
    }
  };

  const handleGetDataUnchecked = () => {
    dispatch(requestFetchChecklist_(dataFields.id));
    const itemUnchecked = data_check.filter((item) => item.checked == '0');
    setFilteredRows(itemUnchecked);
  };

  const handleOnKeyUp = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      const itemChecklist = [];
      itemChecklist.push({
        task_id: dataFields.id,
        description: e.target.value,
        is_parent: '1',
      });
      dispatch(requestAddChecklist_(itemChecklist[0]));
      setCheckedInput('');
      setTotalLabel('COMPLETED');
    }
  };

  const handleSearch = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      if (_.isEmpty(e.target.value)) {
        return setFilteredRows(data_check);
      }

      setFilteredRows(
        data_check.filter(
          (item) =>
            item.description.toLowerCase() == e.target.value.toLowerCase()
        )
      );
    }
  };

  const handleOnKeyUpUpdate = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      const itemChecklist = [];
      itemChecklist.push({
        id: filteredValueUpdateID,
        description: filteredValueUpdate,
        task_id: dataFields.id,
      });
      dispatch(requestUpdateChecklist_(itemChecklist[0]));
      const getDataItem = data_check.filter(
        (item) => item.id == filteredValueUpdateID
      );

      if (getDataItem[0].checked == '1') {
        const itemchecked = data_check.filter((item) => item.checked == '1');
        setFilteredRows(itemchecked);
      } else {
        const itemUnchecked = data_check.filter((item) => item.checked == '0');
        setFilteredRows(itemUnchecked);
      }

      setCheckedInput('');
      setFilteredValueUpdate('');
      setFilteredValueUpdateID('');
      setTotalLabel('COMPLETED');
    }
  };

  const handleDelete = (e, id) => {
    const itemChecklist = [];
    itemChecklist.push({
      ids: id,
      task_id: dataFields.id,
    });
    dispatch(requestDestroyChecklist_(itemChecklist[0]));
    const itemUnchecked = data_check.filter((item) => item.checked == '0');
    setFilteredRows(itemUnchecked);
  };

  const handleUpdate = (e, id) => {
    const getDataItem = data_check.filter((item) => item.id == id);
    setFilteredValueUpdate(getDataItem[0].description);
    setFilteredValueUpdateID(id);
  };

  const handleGetDataRevisionAccordionTrigger = () => {
    dispatch(requestFetchRevision_(dataFields.id));
    // const itemUnchecked = revision.filter(
    //     (item) => item.is_resolved == false
    // );
    // setFilteredRowsRevision(itemUnchecked);

    // const itemCheckedRevision = revision.filter(
    //     (item) => item.is_resolved == true
    // );
    // setFilteredRowsCountRevision(itemCheckedRevision.length);
  };

  const handleCheck = (e, id, type) => {
    if (type == true) {
      const itemChecklist = [];
      itemChecklist.push({
        id: id,
        task_id: dataFields.id,
      });
      dispatch(requestUncheckedChecklist_(itemChecklist[0]));
      const itemUnchecked = data_check.filter((item) => item.checked == '0');
      setFilteredRows(itemUnchecked);
      setTotalLabel('COMPLETED');
    } else {
      const itemChecklist = [];
      itemChecklist.push({
        id: id,
        task_id: dataFields.id,
      });
      dispatch(requestCheckedChecklist_(itemChecklist[0]));
    }
  };

  switch (name.toLowerCase()) {
    case 'subtasks':
      return (
        <>
          <Stack
            mt={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Box>
              <Typography fontWeight={700}>{name}</Typography>
            </Box>
            <Box
              borderBottom="1px solid #ececec"
              borderColor="#0000000a"
              width="100%"
            ></Box>
            <Box>
              <IconButton onClick={() => setExpand(!expand)}>
                {expand ? (
                  <ExpandLessIcon
                    onClick={(e) => handleGetDataSubLinkAccordionTrigger(e)}
                  />
                ) : (
                  <ExpandMoreIcon
                    onClick={(e) => handleGetDataSubLinkAccordionTrigger(e)}
                  />
                )}
              </IconButton>
            </Box>
          </Stack>
          <Collapse in={expand}>
            <Subtasks
              data={dataFields}
              task_id={dataFields.id}
              subTask={subTask}
              priorityList={priorityList}
              usersList={usersList}
              statusList={statusList}
              handleOpen={handleOpen}
              onCloseDialog={onCloseDialog}
            />
          </Collapse>
        </>
      );

    case 'references':
      return (
        <>
          <Stack
            mt={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Box>
              <Typography fontWeight={700}>{name}</Typography>
            </Box>
            <Box
              borderBottom="1px solid #ececec"
              borderColor="#0000000a"
              width="100%"
            ></Box>
            <Box>
              <IconButton onClick={() => setExpand(!expand)}>
                {expand ? (
                  <ExpandLessIcon
                    onClick={(e) => handleGetDataRefLinkAccordionTrigger(e)}
                  />
                ) : (
                  <ExpandMoreIcon
                    onClick={(e) => handleGetDataRefLinkAccordionTrigger(e)}
                  />
                )}
              </IconButton>
            </Box>
          </Stack>
          <Collapse in={expand}>
            {!_.isEmpty(filteredRowsReferenceLink) ? (
              (filteredRowsReferenceLink ?? []).map((reference, index) => (
                <Stack
                  justifyContent="space-between"
                  flexDirection="row"
                  paddingRight="10px"
                  display="flex"
                  key={index}
                >
                  <Typography
                    fontWeight={600}
                    color="#DF3C76"
                    component={Link}
                    to={{
                      pathname: reference?.url,
                    }}
                    target="_blank"
                    sx={{
                      textDecoration: 'none',
                      ':hover': { textDecoration: 'underline' },
                    }}
                  >
                    {reference.name}
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{
                      padding: 0,
                      '&:hover': { background: 'transparent' },
                    }}
                    onClick={(e) =>
                      handleDeleteRefLink(
                        e,
                        reference.id,
                        reference.rel_type,
                        'value'
                      )
                    }
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Stack>
              ))
            ) : (
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
                      <LinkOffIcon />
                    </IconButton>
                  </Box>
                  <Box>
                    <Typography fontWeight={700} color="#999999">
                      No reference link found.
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            )}
            {/* <Button
              startIcon={<AddCircleOutlineIcon />}
              color="secondary"
              sx={{ textTransform: 'capitalize' }}
            >
              Add Reference Link
            </Button> */}
            <Grid sx={{ marginTop: '0px' }} container spacing={2}>
              <Grid item xs={6}>
                <StyledInputField
                  sx={{
                    borderRadius: '0.1em',
                    fieldset: {
                      border: '1px dashed #ececec',
                    },
                  }}
                  onChange={(event) =>
                    setReferenceLinkInput01(event.target.value)
                  }
                  value={referenceLinkInput01}
                  fullWidth
                  name="search"
                  type="text"
                  placeholder="Link Name"
                  inputProps={{
                    autoComplete: 'off',
                  }}
                  size="small"
                  required
                  onKeyUp={handleOnKeyUpRefLink}
                />
              </Grid>
              <Grid item xs={6}>
                <StyledInputField
                  sx={{
                    borderRadius: '0.1em',
                    fieldset: {
                      border: '1px dashed #ececec',
                    },
                  }}
                  onChange={(event) =>
                    setReferenceLinkInput02(event.target.value)
                  }
                  value={referenceLinkInput02}
                  fullWidth
                  name="search"
                  type="text"
                  placeholder="Url"
                  inputProps={{
                    autoComplete: 'off',
                  }}
                  size="small"
                  required
                  onKeyUp={handleOnKeyUpRefLink}
                />
              </Grid>
            </Grid>
          </Collapse>
        </>
      );

    case 'checklist':
      return (
        <>
          <Stack
            mt={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Box>
              <Typography fontWeight={700}>{name}</Typography>
            </Box>
            <Box
              borderBottom="1px solid #ececec"
              borderColor="#0000000a"
              width="100%"
            ></Box>
            <Box>
              <IconButton onClick={() => setExpand(!expand)}>
                {expand ? (
                  <ExpandLessIcon onClick={(e) => handleGetDataUnchecked(e)} />
                ) : (
                  <ExpandMoreIcon onClick={(e) => handleGetDataUnchecked(e)} />
                )}
              </IconButton>
            </Box>
          </Stack>
          <Collapse in={expand}>
            <Stack direction="row" justifyContent="flex-start">
              <Box>
                <StyledInputField
                  name="search"
                  // onChange={(e) => handleSearch(e)}
                  onKeyUp={handleSearch}
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
            {_.isEmpty(filteredRows) ? (
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
                      No checklist found.
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
                    onChange={(event) => setCheckedInput(event.target.value)}
                    value={checkedInput}
                    fullWidth
                    name="search"
                    type="text"
                    placeholder="Add New"
                    inputProps={{
                      autoComplete: 'off',
                    }}
                    size="small"
                    required
                    onKeyUp={handleOnKeyUp}
                  />
                </Box>
                <Box mt={1}>
                  <Button onClick={handleGetData} color="secondary">
                    {filteredRowsCount} {totalLabel}
                  </Button>
                </Box>
              </Card>
            ) : (
              <Box py={1.5}>
                <FormGroup>
                  {(filteredRows ?? []).map((row) => (
                    <Stack
                      key={row.id}
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
                              onClick={(e) =>
                                handleCheck(
                                  e,
                                  row.id,
                                  row.checked == '1' ? true : false,
                                  'value'
                                )
                              }
                              defaultChecked={row.checked == '1' ? true : false}
                            />
                          }
                          label={row.description}
                        />
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          size="small"
                          sx={{
                            padding: 0,
                            '&:hover': { background: 'transparent' },
                          }}
                          onClick={(e) => handleUpdate(e, row.id, 'value')}
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{
                            padding: 0,
                            '&:hover': { background: 'transparent' },
                          }}
                          onClick={(e) => handleDelete(e, row.id, 'value')}
                        >
                          <CloseOutlinedIcon />
                        </IconButton>
                      </Stack>
                    </Stack>
                  ))}
                </FormGroup>

                {_.isEmpty(filteredValueUpdate) ? (
                  <Box>
                    <StyledInputField
                      sx={{
                        borderRadius: '0.1em',
                        fieldset: {
                          border: '1px dashed #ececec',
                        },
                      }}
                      onChange={(event) => setCheckedInput(event.target.value)}
                      value={checkedInput}
                      fullWidth
                      name="search"
                      type="text"
                      placeholder="Add New"
                      inputProps={{
                        autoComplete: 'off',
                      }}
                      size="small"
                      required
                      onKeyUp={handleOnKeyUp}
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
                        setFilteredValueUpdate(event.target.value)
                      }
                      fullWidth
                      value={filteredValueUpdate}
                      name="search"
                      type="text"
                      placeholder="Add New"
                      inputProps={{
                        autoComplete: 'off',
                      }}
                      size="small"
                      required
                      onKeyUp={handleOnKeyUpUpdate}
                    />
                  </Box>
                )}

                <Box mt={1}>
                  <Button onClick={handleGetData} color="secondary">
                    {filteredRowsCount} {totalLabel}
                  </Button>
                </Box>
              </Box>
            )}
          </Collapse>
        </>
      );

    case 'templates':
      return (
        <>
          <Stack
            mt={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Box>
              <Typography fontWeight={700}>{name}</Typography>
            </Box>
            <Box
              borderBottom="1px solid #ececec"
              borderColor="#0000000a"
              width="100%"
            ></Box>
            <Box>
              <IconButton onClick={() => setExpand(!expand)}>
                {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
          </Stack>
          <Collapse in={expand}>
            {isLoadingTemplate ? (
              <SkeletonLoader />
            ) : (
              <Box>
                {!_.isEmpty(creatives?.templates) ? (
                  creatives?.templates?.map((template, index) => (
                    <Stack key={index} mb={1}>
                      <Card variant="outlined">
                        <Stack p={1}>
                          <Typography
                            fontWeight={700}
                            color={appColors.lightViolet}
                            component={Link}
                            to={{
                              pathname: `https://beta.ad-lib.io/concepts/${dataFields?.concept_id}/templates/${template?.template_id}`,
                            }}
                            target="_blank"
                            sx={{
                              textDecoration: 'none',
                              '&:hover': { color: '#25165B' },
                            }}
                          >
                            {template?.name}
                          </Typography>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Typography
                              variant="caption"
                              fontWeight={700}
                              color="secondary"
                            >
                              {template?.size}
                            </Typography>

                            <Stack display="flex">
                              {!_.isEmpty(dataFields['campaign_name']) ? (
                                creatives?.versions
                                  .filter(
                                    (d) =>
                                      d.is_default_version == '1' &&
                                      d.template_id == template?.template_id
                                  )
                                  .map((versionItem, index_) => (
                                    <Typography
                                      key={index_}
                                      variant="caption"
                                      fontWeight={700}
                                      color="secondary"
                                    >
                                      {versionItem.is_approved == true ? (
                                        <CheckCircleIcon
                                          sx={{
                                            position: 'relative',
                                            top: '3px',
                                            right: '4px',
                                            fontSize: '14px',
                                            color: '#4caf50',
                                          }}
                                        />
                                      ) : (
                                        ''
                                      )}

                                      {versionItem.version_name}
                                    </Typography>
                                  ))
                              ) : (
                                <FormControl fullWidth>
                                  <NativeSelect
                                    sx={{
                                      height: '30px',
                                      width: '145px',
                                      padding: '5px 10px',
                                    }}
                                    onChange={(e) =>
                                      handleGetTempleteVersionValue(e)
                                    }
                                  >
                                    {creatives?.versions
                                      .filter(
                                        (d) =>
                                          d.template_id == template?.template_id
                                      )
                                      .map((versionItem, index_) => (
                                        <option
                                          selected={versionItem.is_selected}
                                          key={index_}
                                          value={[
                                            versionItem.version_name +
                                              ',' +
                                              versionItem.template_id,
                                          ]}
                                        >
                                          {versionItem.version_name}
                                        </option>
                                      ))}
                                  </NativeSelect>
                                </FormControl>
                              )}
                            </Stack>
                          </Stack>
                        </Stack>
                      </Card>
                    </Stack>
                  ))
                ) : (
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
                          <DashboardIcon />
                        </IconButton>
                      </Box>
                      <Box>
                        <Typography fontWeight={700} color="#999999">
                          No templates found.
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                )}
              </Box>
            )}
          </Collapse>
        </>
      );

    case 'revisions':
      return (
        <>
          <Stack
            mt={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Box>
              <Typography fontWeight={700}>{name}</Typography>
            </Box>
            <Box
              borderBottom="1px solid #ececec"
              borderColor="#0000000a"
              width="100%"
            ></Box>
            <Box>
              <IconButton onClick={() => setExpand(!expand)}>
                {expand ? (
                  <ExpandLessIcon
                    onClick={(e) => handleGetDataRevisionAccordionTrigger(e)}
                  />
                ) : (
                  <ExpandMoreIcon
                    onClick={(e) => handleGetDataRevisionAccordionTrigger(e)}
                  />
                )}
              </IconButton>
            </Box>
          </Stack>
          <Collapse in={expand}>
            <Revisions
              data={dataFields}
              task_id={dataFields.id}
              revision={data_revision}
            />
          </Collapse>
        </>
      );
  }
};

CollapsiblePanels.propTypes = {
  name: PropTypes.string,
  dataFields: PropTypes.any,
  overview: PropTypes.any,
  data: PropTypes.any,
  subTask: PropTypes.any,
  creatives: PropTypes.any,
  priorityList: PropTypes.any,
  usersList: PropTypes.any,
  statusList: PropTypes.any,
  handleOpen: PropTypes.func,
  onCloseDialog: PropTypes.func,
};

export default CollapsiblePanels;
