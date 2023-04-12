// React
import React, { useState, Fragment, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory, useLocation } from 'react-router-dom';

// MUI
import { styled } from '@mui/styles';
import {
  Avatar,
  Box,
  TableCell,
  TableRow,
  Typography,
  Collapse,
  Stack,
  IconButton,
  Select,
  OutlinedInput,
  MenuItem,
  Button,
  Chip,
} from '@mui/material';

// MUI Icons
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import TagIcon from '@mui/icons-material/Tag';

// App Components
import SelectionPopover from 'components/Widgets/SelectionPopover';
import CollapsibleTable from '..';

// Reducers
import {
  fetchAssignees,
  fetchTags,
  updateAssignees,
  updateTags,
} from 'store/reducers/concept';
import {
  updateTaskDeliveryDate,
  updateCampaignDeliveryDate,
  updateCampaignLaunchDate,
} from 'store/reducers/tasks';

// Utilities
import _ from 'lodash';
import PropTypes from 'prop-types';
import Color from 'color';
import { appColors } from 'theme/variables';
import { updateTaskDuedate } from 'store/reducers/tasks';
import { getItemByKey } from 'utils/dictionary';
import { formatDate } from 'utils/date';
import moment from 'moment';

// Styled Components
const StyledAccordionButton = styled(IconButton)({
  color: `${appColors.darkGray}`,
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

// Table Body
const StyledBodyRow = styled(TableRow)({
  backgroundColor: appColors.lighterGray,
  cursor: 'pointer',
});

// Channels: Facebook Tag
const StyledFacebookTag = styled(Box)({
  display: 'flex',
  height: 27,
  width: 90,
  margin: 'auto',
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'capitalize',
  color: appColors.social.facebook,
  backgroundColor: Color(appColors.social.facebook).alpha(0.2).string(),
});

// Channels: Google Tag
const StyledGoogleTag = styled(Box)({
  display: 'flex',
  height: 27,
  width: 90,
  margin: 'auto',
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'capitalize',
  color: appColors.social.google,
  backgroundColor: Color(appColors.social.google).alpha(0.2).string(),
});

// Channels: Youtube Tag
const StyledYoutubeTag = styled(Box)({
  display: 'flex',
  height: 27,
  width: 90,
  margin: 'auto',
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'capitalize',
  color: appColors.social.youtube,
  backgroundColor: Color(appColors.social.youtube).alpha(0.2).string(),
});

// Table Body Cell
const StyledBodyCell = styled(TableCell)({
  textAlign: 'center',
  padding: '0px 0px',
  borderBottom: 0,
  color: appColors.darkGray,
  // backgroundColor: 'inherit',
  width: 'auto',
  '&:first-child': {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: appColors.black,
    textAlign: 'left',
  },
  '&:nth-of-type(even)': {
    // Apply border to EVEN rows only
    borderLeft: '0.2rem solid white',
    borderRight: '0.2rem solid white',
  },
});

const StyledUserAvatar = styled(Avatar)({
  width: 20,
  height: 20,
});

const StyledSelect = styled(Select)({
  backgroundColor: 'transparent',
  position: 'inherit',
  color: 'white',
  '& .MuiSvgIcon-root': {
    display: 'none',
  },
  '& .MuiSelect-select': {
    padding: '0px !important',
    height: '-webkit-fill-available',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: '0px solid transparent',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: '0px solid transparent',
  },
});

// const StyledUserListCount = styled('div')(({ theme }) => ({
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   fontSize: '1em',
//   color: 'white',
//   height: 22,
//   width: 22,
//   borderRadius: 11,
//   marginLeft: -11,
//   zIndex: 1,
//   backgroundColor: theme.palette.primary.main,
// }));

const SELECTION_TYPES = {
  ASSIGNEES: 'assignees',
  TAGS: 'tags',
};

const REL_TYPES = {
  TASK: 'task',
  SUBTASK: 'subtask',
  CAMPAIGN: 'campaign',
};

const CollapsibleTableRow = ({
  config,
  data,
  className,
  columns,
  tableProps,
  isEditable,
  onStatusChange,
  onClickRow,
  searchData,
  searchType,
}) => {
  const {
    id,
    name,
    level,
    channel,
    dateCreated,
    subdata,
    subdata2,
    collection,
    relType,
    ...rest
  } = data;
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const [isCollapsed, setCollapse] = useState(false);
  const [taskStatusId, setTaskStatusId] = useState(
    getItemByKey('title', rest.status, collection?.statuses).id
  );

  const [dueDate, setDueDate] = useState(rest.dueDate);
  const [launchDate, setLaunchDate] = useState(rest.launchDate);
  const [deliveryDate, setDeliveryDate] = useState(rest.deliveryDate);
  const [assignees, setAssignees] = useState(rest.assignees);
  const [tags, setTags] = useState(rest.tags);
  const [status, setStatus] = useState(rest.status);

  const [assigneesPopoverAnchorEl, setAssigneesPopoverAnchorEl] =
    useState(null);
  const [tagsPopoverAnchorEl, setTagsPopoverAnchorEl] = useState(null);

  // States
  const {
    overview,
    assignees: assigneesDatasource,
    isFetchingAssignees,
    tags: tagsDatasource,
    isFetchingTags,
  } = useSelector((state) => state.concept);

  const hasSubdata = !_.isEmpty(subdata?.rows);
  const shouldOpenAssigneesPopover = Boolean(
    assigneesPopoverAnchorEl && isEditable
  );
  const shouldOpenTagsPopover = Boolean(tagsPopoverAnchorEl && isEditable);

  // Dispatches
  /**
   * @param tag The assignee in object datatype.
   */
  const dispatchUpdateAssignees = async (assignee) => {
    const relId = relType == 'task' ? id : overview.concept.uuid;
    const params = { type: relType, user_id: assignee.id, rel_id: `${relId}` };
    const response = await dispatch(updateAssignees(params));
    setAssignees(response);
  };

  /**
   * @param tag The tag in object datatype.
   */
  const dispatchUpdateTags = async (tag) => {
    const relId = relType.includes('task') ? id : overview.concept.uuid;
    const params = { type: relType, title: tag.name, rel_id: `${relId}` };
    const response = await dispatch(updateTags(params));
    setTags(response);
  };

  const handleSelectionPopoverOpen = (type, e) => {
    switch (type) {
      case SELECTION_TYPES.ASSIGNEES:
        dispatch(
          fetchAssignees({
            type: relType,
            relId: id,
          })
        );
        setAssigneesPopoverAnchorEl(e.currentTarget);
        break;
      case SELECTION_TYPES.TAGS:
        dispatch(
          fetchTags({
            relId: id,
          })
        );
        setTagsPopoverAnchorEl(e.currentTarget);
        break;
      default:
        break;
    }
  };

  const handleSelectionPopoverClose = (type) => {
    switch (type) {
      case SELECTION_TYPES.ASSIGNEES:
        setAssigneesPopoverAnchorEl(null);
        break;
      case SELECTION_TYPES.TAGS:
        setTagsPopoverAnchorEl(null);
        break;
      default:
        break;
    }
  };

  const handlePopoverSelectionChange = (type, data) => {
    switch (type) {
      case SELECTION_TYPES.ASSIGNEES:
        dispatchUpdateAssignees(data);
        break;
      case SELECTION_TYPES.TAGS:
        dispatchUpdateTags(data);
        break;
      default:
        break;
    }
  };

  const handlePopoverOnClickEnter = (tag) => {
    dispatchUpdateTags({ name: tag });
  };

  const handleDueDateChange = (e) => {
    const {
      target: { value },
    } = e;

    setDueDate(value);
    dispatch(
      updateTaskDuedate({
        id: id,
        date: moment(value).format('MM/DD/YYYY h:mm A'),
        rel_type: relType === 'task' ? 3 : relType === 'subtask' ? 4 : 2,
      })
    );
  };

  const handleLink = (e, id, level, relType, name) => {
    if (searchType == 'campaign') {
      const getIDs = _.filter(searchData?.data, (item) => item?.id === id)[0];

      localStorage?.removeItem('isURL');

      history.push({
        pathname: `/${searchType}/${getIDs?.uuid}`,
        state: {
          background: location,
          type: searchType,
          subtask: name.toLowerCase().includes('task') ? `${level > 1}` : null,
        },
      });

      onClickRow(relType);
    } else if (searchType == 'concept') {
      const getIDs = _.filter(searchData?.data, (item) => item?.id === id)[0];

      localStorage?.removeItem('isURL');

      history.push({
        pathname: `/projects/${getIDs?.partner_id}/concept/${getIDs?.uuid}`,
        state: {
          background: location,
          type: searchType,
          subtask: name.toLowerCase().includes('task') ? `${level > 1}` : null,
        },
      });
      window.location.replace(
        `/projects/${getIDs?.partner_id}/concept/${getIDs?.uuid}`
      );

      onClickRow(relType);
    } else {
      const getIDsFromSearchResults = _.filter(
        searchData?.data,
        (item) => item?.id === id
      )[0];
      localStorage?.removeItem('isURL');

      if (!_.isEmpty(getIDsFromSearchResults)) {
        const relTypeFromSearchResults = getIDsFromSearchResults.rel_type;

        history.push({
          pathname: `/${relTypeFromSearchResults}/${id}`,
          state: {
            background: location,
            type: relTypeFromSearchResults,
            subtask: relTypeFromSearchResults.toLowerCase().includes('task')
              ? `${level > 1}`
              : null,
          },
        });
      } else {
        history.push({
          pathname: `/${relType}/${id}`,
          state: {
            background: location,
            type: relType,
            subtask: name.toLowerCase().includes('task')
              ? `${level > 1}`
              : null,
          },
        });
      }
    }
  };

  const handleDeliveryDateChange = (e) => {
    const {
      target: { value },
    } = e;

    setDeliveryDate(value);

    switch (relType) {
      case REL_TYPES.SUBTASK:
        dispatch(
          updateTaskDeliveryDate({
            id: id,
            date: moment(value).format('MM/DD/YYYY h:mm A'),
            rel_type: 4,
          })
        );
        break;
      case REL_TYPES.TASK:
        dispatch(
          updateTaskDeliveryDate({
            id: id,
            date: moment(value).format('MM/DD/YYYY h:mm A'),
            rel_type: 3,
          })
        );
        break;
      case REL_TYPES.CAMPAIGN:
        dispatch(
          updateCampaignDeliveryDate({
            id: id,
            date: moment(value).format('MM/DD/YYYY h:mm A'),
            rel_type: 2,
          })
        );
        break;
      default:
        break;
    }
  };

  const handleLaunchDateChange = (e) => {
    const {
      target: { value },
    } = e;

    setLaunchDate(value);

    dispatch(
      updateCampaignLaunchDate({
        id: id ?? '',
        date: moment(value).format('MM/DD/YYYY h:mm A'),
      })
    );
  };

  return (
    <Fragment>
      <StyledBodyRow className={className}>
        {columns.map((column, index) => {
          switch (column) {
            case 'Concept Tasks':
            case 'Campaign Tasks':
            case 'Campaigns':
            case 'Sub Campaigns':
            case 'Concepts':
            case 'Tasks':
              return (
                <StyledBodyCell
                  key={index}
                  sx={{
                    minHeight: '3em',
                    borderLeft: `8px solid ${
                      level % 2 != 0
                        ? config.color
                        : Color(config.color).alpha(0.45).string()
                    }`,
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      width: '-webkit-fill-available',
                    }}
                  >
                    <Box
                      component={Button}
                      sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textTransform: 'initial',
                        borderRadius: 0,
                        width: '-webkit-fill-available',
                      }}
                    >
                      <Box
                        sx={{
                          color: 'initial',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          textDecoration: 'none',
                          textAlign: 'left',
                          width: 'inherit',
                        }}
                        onClick={(e) =>
                          handleLink(
                            e,
                            data?.id,
                            data?.level,
                            data?.relType,
                            column
                          )
                        }
                      >
                        {name}
                      </Box>
                    </Box>
                    {hasSubdata && (
                      <StyledAccordionButton
                        size="small"
                        onClick={() => setCollapse(!isCollapsed)}
                      >
                        {isCollapsed ? (
                          <IndeterminateCheckBoxOutlinedIcon />
                        ) : (
                          <AddBoxOutlinedIcon />
                        )}
                      </StyledAccordionButton>
                    )}
                  </Stack>
                </StyledBodyCell>
              );
            case 'Status':
              return (
                <StyledBodyCell
                  key={index}
                  sx={{
                    backgroundColor: appColors.status[_.camelCase(status)],
                  }}
                >
                  {_.isUndefined(collection) ? (
                    <Typography
                      variant="p"
                      fontWeight="500"
                      fontSize="1em"
                      textTransform="capitalize"
                      color="white"
                    >
                      {_.replace(status, new RegExp('_', 'g'), ' ') ?? ''}
                    </Typography>
                  ) : (
                    <StyledSelect
                      value={taskStatusId}
                      input={
                        <OutlinedInput fullWidth sx={{ height: '38px' }} /> ??
                        ''
                      }
                      renderValue={(selectedId) => (
                        <Typography
                          variant="p"
                          fontWeight="500"
                          fontSize="1em"
                          textTransform="capitalize"
                        >
                          {_.replace(
                            getItemByKey('id', selectedId, collection.statuses)
                              .title ?? '-',
                            new RegExp('_', 'g'),
                            ' '
                          ) ?? ''}
                        </Typography>
                      )}
                      onChange={(e) => {
                        setTaskStatusId(e.target.value);
                        setStatus(
                          getItemByKey(
                            'id',
                            e.target.value,
                            collection.statuses
                          ).title
                        );

                        onStatusChange(e, id, relType);
                      }}
                      // MenuProps={MenuProps}
                    >
                      {_.filter(collection.statuses, (stats) =>
                        _.map(
                          stats?.related_to,
                          (types) => types.name === 'task'
                        ).includes(true)
                      ).map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          <SquareRoundedIcon
                            sx={{
                              color:
                                appColors.status[
                                  _.camelCase(
                                    item?.title
                                      ?.toLowerCase()
                                      .replace(/_/g, ' ')
                                  )
                                ],
                              marginRight: '1em',
                            }}
                          />

                          {_.capitalize(
                            _.replace(
                              item.title ?? '-',
                              new RegExp('_', 'g'),
                              ' '
                            ) ?? ''
                          )}
                        </MenuItem>
                      ))}
                    </StyledSelect>
                  )}
                </StyledBodyCell>
              );
            case 'Channels':
              switch (channel?.toLowerCase()) {
                case 'youtube':
                  return (
                    <StyledBodyCell key={index}>
                      <StyledYoutubeTag>{channel}</StyledYoutubeTag>
                    </StyledBodyCell>
                  );
                case 'facebook':
                  return (
                    <StyledBodyCell key={index}>
                      <StyledFacebookTag>{channel}</StyledFacebookTag>
                    </StyledBodyCell>
                  );
                case 'google':
                  return (
                    <StyledBodyCell key={index}>
                      <StyledGoogleTag>{channel}</StyledGoogleTag>
                    </StyledBodyCell>
                  );
                default:
                  return <StyledBodyCell key={index}>{'-'}</StyledBodyCell>;
              }

            case 'Date Created':
              return (
                <StyledBodyCell key={index}>
                  <Box
                    sx={{
                      fontSize: '0.9em',
                      cursor: 'default',
                      height: '39px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {moment(dateCreated).format('DD/MM/YYYY h:mm A') ?? '-'}
                  </Box>
                </StyledBodyCell>
              );
            case 'Launch Date':
              return (
                <StyledBodyCell key={index}>
                  {isEditable ? (
                    <Box sx={{ fontSize: '0.9em' }}>
                      <input
                        type="datetime-local"
                        value={formatDate(launchDate ?? '', 'MM-DD-YYYYThh:mm')}
                        onChange={handleLaunchDateChange}
                        className={
                          _.isEmpty(launchDate)
                            ? 'date_input--form'
                            : 'date_input--form-active'
                        }
                      />
                    </Box>
                  ) : (
                    <Box sx={{ fontSize: '0.9em' }}>{launchDate ?? '-'}</Box>
                  )}
                </StyledBodyCell>
              );
            case 'Delivery Date':
              return (
                <StyledBodyCell key={index}>
                  {isEditable ? (
                    <Box sx={{ fontSize: '0.9em' }}>
                      <input
                        type="datetime-local"
                        value={formatDate(
                          deliveryDate ?? '',
                          'YYYY-MM-DDThh:mm'
                        )}
                        onChange={handleDeliveryDateChange}
                        className={
                          _.isNull(deliveryDate)
                            ? 'date_input--form'
                            : 'date_input--form-active'
                        }
                      />
                    </Box>
                  ) : (
                    <Box sx={{ fontSize: '0.9em' }}>{deliveryDate ?? '-'}</Box>
                  )}
                </StyledBodyCell>
              );
            case 'Due Date':
              return (
                <StyledBodyCell key={index}>
                  {isEditable ? (
                    <Box sx={{ fontSize: '0.9em' }}>
                      <input
                        type="datetime-local"
                        value={formatDate(dueDate ?? '', 'YYYY-MM-DDThh:mm')}
                        onChange={handleDueDateChange}
                        className={
                          _.isNull(dueDate)
                            ? 'date_input--form'
                            : 'date_input--form-active'
                        }
                      />
                    </Box>
                  ) : (
                    <Box sx={{ fontSize: '0.9em' }}>{dueDate ?? '-'}</Box>
                  )}
                </StyledBodyCell>
              );
            case 'Members':
            case 'Assigned To':
              return (
                <StyledBodyCell
                  key={index}
                  onClick={(e) => {
                    handleSelectionPopoverOpen(SELECTION_TYPES.ASSIGNEES, e);
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    {_.isEmpty(assignees) ? (
                      <Avatar
                        sx={{
                          width: 25,
                          height: 25,
                          backgroundColor: 'transparent',
                          border: '1px dashed #9f9f9f',
                          color: '#bfbfbf',
                        }}
                      >
                        <PersonAddAltIcon sx={{ fontSize: '0.8em' }} />
                      </Avatar>
                    ) : (
                      <Fragment>
                        {assignees.slice(0, 3).map((x) => (
                          <StyledUserAvatar key={x.id} src={x.avatar} />
                        ))}
                        {assignees.length > 3 && (
                          <Typography>+{assignees.length - 3}</Typography>
                        )}
                      </Fragment>
                    )}
                  </Stack>
                </StyledBodyCell>
              );
            case 'Tags':
              return (
                <StyledBodyCell
                  key={index}
                  onClick={(e) => {
                    handleSelectionPopoverOpen(SELECTION_TYPES.TAGS, e);
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    {_.isEmpty(tags) ? (
                      <Button
                        startIcon={<TagIcon />}
                        size="small"
                        disableRipple
                        disableElevation
                        disableFocusRipple
                        disableTouchRipple
                        sx={{
                          color: '#bfbfbf',
                          border: '1px dashed #9f9f9f',
                          textTransform: 'none',
                          padding: '0 0.6em',
                          borderRadius: '2em',
                          '&:hover': {
                            backgroundColor: 'transparent',
                          },
                        }}
                      >
                        Add a Tag
                      </Button>
                    ) : (
                      <Fragment>
                        {tags.slice(0, 3).map((t) => (
                          <Chip
                            key={t.id}
                            color="primary"
                            label={t.title}
                            size="small"
                            variant="outlined"
                            sx={{
                              marginRight: '0.5em',
                              cursor: 'pointer',
                            }}
                          />
                          // <StyledTaskTag key={t.id}>{t.title}</StyledTaskTag>
                        ))}
                        {tags.length > 3 && (
                          <Typography>+{tags.length - 3}</Typography>
                        )}
                      </Fragment>
                    )}
                  </Stack>
                </StyledBodyCell>
              );
          }
        })}
      </StyledBodyRow>
      <TableRow>
        <TableCell
          colSpan={columns.length}
          sx={{ padding: '0.12em 0px', borderBottom: 0 }}
        >
          <Collapse
            in={isCollapsed}
            timeout="auto"
            orientation="vertical"
            sx={{ marginLeft: 2.5 }}
            unmountOnExit
          >
            {subdata && (
              <CollapsibleTable
                config={config}
                dataset={subdata}
                tableProps={tableProps}
                onStatusChange={onStatusChange}
                onClickRow={() => {}}
                isEditable
              />
            )}
            {subdata2 && (
              <CollapsibleTable
                config={config}
                dataset={subdata2}
                tableProps={tableProps}
                onStatusChange={onStatusChange}
                onClickRow={() => {}}
                isEditable
              />
            )}
          </Collapse>
        </TableCell>
      </TableRow>

      {/* Assignees selection popover */}
      <SelectionPopover
        searchPlaceholder="Search User"
        booleanKey="is_assignee"
        isLoading={isFetchingAssignees}
        open={shouldOpenAssigneesPopover}
        anchorEl={assigneesPopoverAnchorEl}
        datasource={assigneesDatasource}
        maxHeight={300}
        onClose={() => {
          handleSelectionPopoverClose(SELECTION_TYPES.ASSIGNEES);
        }}
        onSelectionChange={(data) => {
          handlePopoverSelectionChange(SELECTION_TYPES.ASSIGNEES, data);
        }}
      />

      {/* Tags selection popover */}
      <SelectionPopover
        searchPlaceholder="Search Tags"
        booleanKey="is_tagged"
        isLoading={isFetchingTags}
        open={shouldOpenTagsPopover}
        anchorEl={tagsPopoverAnchorEl}
        datasource={tagsDatasource.map((i) => {
          return { name: i.title, is_tagged: i.is_tagged };
        })}
        maxHeight={300}
        onClose={() => {
          handleSelectionPopoverClose(SELECTION_TYPES.TAGS);
        }}
        onSelectionChange={(data) => {
          handlePopoverSelectionChange(SELECTION_TYPES.TAGS, data);
        }}
        onClickEnter={handlePopoverOnClickEnter}
      />
    </Fragment>
  );
};

CollapsibleTableRow.propTypes = {
  className: PropTypes.string,
  config: PropTypes.object,
  data: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string),
  tableProps: PropTypes.object,
  isEditable: PropTypes.bool,
  onStatusChange: PropTypes.func,
  onClickRow: PropTypes.func,
  searchData: PropTypes.any,
  searchType: PropTypes.any,
};

export default memo(CollapsibleTableRow);
