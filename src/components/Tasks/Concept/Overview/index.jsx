import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/styles';
import makeStyles from '@mui/styles/makeStyles';
import IconGoogle from 'assets/images/2022/ico_google.png';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import {
  updateTaskDuedate,
  updateTaskDeliveryDate,
  updateTaskAdditionalInfo,
  addTrigger,
  addDisplay,
  getTaskByid,
} from 'store/reducers/tasks';

import { formatDate } from 'utils/date';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import 'assets/css/concept/task/overide.css';
import {
  Box,
  Grid,
  FormControl,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Radio,
  Typography,
  FormControlLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { fetchMaintenanceTrigger } from 'store/reducers/maintenanceTrigger';
import { fetchMaintenanceDisplay } from 'store/reducers/maintenanceDisplay';
import _ from 'lodash';

const useStyles = makeStyles(() => ({
  titleOverviewLeft: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '120%',
    textAlign: 'center',
    letterSpacing: '0.005em',
    color: '#192A3E',
  },
  titleOverviewRight: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '120%',
    textAlign: 'center',
    letterSpacing: '0.005em',
    color: '#707683',
  },
  titleOverviewRightPink: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '120%',
    textAlign: 'center',
    letterSpacing: '0.005em',
    color: '#DF3C76',
  },
  titleOverviewRightBorderGreen: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '120%',
    textAlign: 'center',
    letterSpacing: '0.005em',
    color: '#0F9D58',
    border: '1px solid #0F9D58',
    borderRadius: '2px',
    padding: '5px 10px',
  },
  titleOverviewRightBorderPink: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '120%',
    textAlign: 'center',
    letterSpacing: '0.005em',
    color: '#DF3C76',
    border: '1px solid #DF3C76',
    borderRadius: '2px',
    padding: '5px 10px',
    marginRight: '10px',
    alignSelf: 'center',
    lineBreak: 'anywhere',
  },

  itemElementSpacing: {
    paddingLeft: '26px !important',
  },
  accordionContainer: {
    boxShadow: 'none',
  },

  txtColorPink: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px%',
    letterSpacing: '0.005em',
    color: '#DF3C76',
  },
  txtColorWarning: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px%',
    letterSpacing: '0.005em',
    color: '#FFAB00',
  },
  txtColorGray: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px%',
    letterSpacing: '0.005em',
    color: '#989898',
  },
  flexbetweenContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectRevision: {
    padding: '0px !important',
    fontSize: '14px !important',
  },
  accordionSummary: {
    minHeight: '0px !important',
    height: '48px',
  },
  iconGoogle: {
    margin: '-1px 4px -1px 0px',
  },
  addBoxIconStyle: {
    position: 'absolute',
    color: '#DF3C76',
  },
}));

const StyledDiv = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  '& .MuiBox-root': {
    marginRight: 10,
    marginBottom: 10,
  },
}));

const Overview = (data) => {
  const classes = useStyles();
  const itemDataTask = data;
  const [expanded, setExpanded] = React.useState(false);
  const [item, setItem] = React.useState('');
  const [txtDueDate, setTxtDueDate] = useState(itemDataTask.data.due_date);
  const [isEditingDueDate, setEditingDueDate] = useState(false);
  const [isEditingDesktopDisplay, setEditingDesktopDisplay] = useState(false);
  const [isEditingMobileDisplay, setEditingMobileDisplay] = useState(false);
  const [isEditingTriggers, setEditingTriggers] = useState(false);
  const [txtDeliveryDate, setTxtDeliveryDate] = useState(
    itemDataTask.data.delivery_date
  );
  const [isEditingDeliveryDate, setEditingDeliveryDate] = useState(false);
  const [txtAdditionalInfo, setTxtAdditionalInfo] = useState(
    itemDataTask.data.additional_info
  );
  const [isEditingAdditionalInfo, setEditingAdditionalInfo] = useState(false);
  const dispatch = useDispatch();

  const { list: maintenanceTriggerList } = useSelector(
    (state) => state.maintenanceTrigger
  );

  const { list: maintenanceDisplayList } = useSelector(
    (state) => state.maintenanceDisplay
  );

  const { data: taskData } = useSelector((state) => state.tasks);

  const handleChangeItem = (event) => {
    setItem(event.target.value);
  };

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const updateDueDate_ = (e) => {
    const itemDueDate = [];
    const {
      target: { value },
    } = e;
    setTxtDueDate(value);
    setEditingDueDate(false);
    const dateDuedate = formatDate(value, 'MM-DD-YYYY');
    itemDueDate.push({
      id: itemDataTask.id,
      date: dateDuedate,
    });
    dispatch(updateTaskDuedate(itemDueDate[0]));
  };

  const updateDeliveryDate_ = (e) => {
    const itemDeliveryDate = [];
    const {
      target: { value },
    } = e;

    setTxtDeliveryDate(value);
    setEditingDeliveryDate(false);
    const dateDeliveryDate = formatDate(value, 'MM-DD-YYYY');
    itemDeliveryDate.push({
      id: itemDataTask.id,
      date: dateDeliveryDate,
    });
    dispatch(updateTaskDeliveryDate(itemDeliveryDate[0]));
  };

  const updateAdditionalInfo_ = (e) => {
    const itemAdditionalInfo = [];
    const {
      target: { value },
    } = e;

    e.preventDefault();
    if (e.key == 'Enter') {
      setTxtAdditionalInfo(value);
      setEditingAdditionalInfo(false);
      itemAdditionalInfo.push({
        id: itemDataTask.id,
        date: value,
      });
      dispatch(updateTaskAdditionalInfo(itemAdditionalInfo[0]));
    }
  };

  const addTrigger_ = (e) => {
    const itemTrigger = [];
    const {
      target: { value },
    } = e;
    e.preventDefault();
    if (e.key == 'Enter') {
      // setTxtAdditionalInfo(value);
      setEditingTriggers(false);
      itemTrigger.push({
        task_id: itemDataTask.data.id,
        name: value,
      });
      dispatch(addTrigger(itemTrigger[0]));
    }
  };

  const addDisplayDesktop_ = (e) => {
    const itemDisplay = [];
    const {
      target: { value },
    } = e;
    e.preventDefault();
    if (e.key == 'Enter') {
      setEditingDesktopDisplay(false);
      itemDisplay.push({
        task_id: itemDataTask.data.id,
        size: value,
        type: 'desktop',
      });
      dispatch(addDisplay(itemDisplay[0]));
    }
  };

  const addDisplayMobile_ = (e) => {
    const itemDisplay = [];
    const {
      target: { value },
    } = e;
    e.preventDefault();
    if (e.key == 'Enter') {
      setEditingMobileDisplay(false);
      itemDisplay.push({
        task_id: itemDataTask.data.id,
        size: value,
        type: 'mobile',
      });
      dispatch(addDisplay(itemDisplay[0]));
    }
  };

  useEffect(() => {
    dispatch(fetchMaintenanceTrigger());
    dispatch(fetchMaintenanceDisplay());
  }, []);

  return (
    <Box width="100%" className={classes.itemElementSpacing}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <span className={classes.titleOverviewLeft}>Task Id</span>
        </Grid>
        <Grid item xs={9}>
          <span className={classes.titleOverviewRight}>
            {itemDataTask.data.id}
          </span>
        </Grid>
        <Grid item xs={3}>
          <span className={classes.titleOverviewLeft}>Partner Group</span>
        </Grid>
        <Grid item xs={9}>
          <span className={classes.titleOverviewRight}>
            {taskData.partner_group || '--'}
          </span>
        </Grid>

        <Grid item xs={3}>
          <span className={classes.titleOverviewLeft}>Concept</span>
        </Grid>
        <Grid item xs={9}>
          <span className={classes.titleOverviewRight}>
            {taskData.concept || '--'}
          </span>
        </Grid>

        <Grid item xs={3}>
          <span className={classes.titleOverviewLeft}>Created by</span>
        </Grid>
        <Grid item xs={9}>
          <span className={classes.titleOverviewRight}>
            {taskData.created_by || '--'}
          </span>
        </Grid>

        <Grid item xs={3}>
          <span className={classes.titleOverviewLeft}>Task Type</span>
        </Grid>
        <Grid item xs={9}>
          <span className={classes.titleOverviewRight}>
            {taskData.task_type || '--'}
          </span>
        </Grid>

        <Grid item xs={3}>
          <span className={classes.titleOverviewLeft}>Channel</span>
        </Grid>
        <Grid item xs={9}>
          <span className={classes.titleOverviewRightBorderGreen}>
            <img
              className={classes.iconGoogle}
              src={IconGoogle}
              alt="google icon"
            />
            {taskData.channel}
          </span>
        </Grid>

        <Grid item xs={3}>
          <span className={classes.titleOverviewLeft}>Revision Round</span>
        </Grid>
        <Grid item xs={9}>
          <span className={classes.titleOverviewRight}>
            {taskData.revision_round || '--'}
          </span>
        </Grid>

        <Grid item xs={3}>
          <span className={classes.titleOverviewLeft}>Trigger</span>
        </Grid>
        <Grid item xs={9}>
          {isEditingTriggers ? (
            <Autocomplete
              limitTags={2}
              id="filter-demo"
              options={maintenanceTriggerList}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Triggers"
                  onKeyUp={(e) => addTrigger_(e)}
                  // onKeyPress={(e) => {
                  //   if (e.key == 'Enter') {
                  //     setEditingTriggers(false);
                  //   }
                  // }}
                />
              )}
              sx={{ width: '500px' }}
            />
          ) : (
            <Box>
              {!_.isEmpty(taskData.triggers) &&
                taskData.triggers.map((items, index) => (
                  <span
                    key={index}
                    className={classes.titleOverviewRightBorderPink}
                  >
                    {items.name}
                  </span>
                ))}
              <span
                tabIndex={0}
                role="button"
                className={classes.addBoxIconStyle}
                onClick={() => setEditingTriggers(!isEditingTriggers)}
                onKeyDown={() => setEditingTriggers(!isEditingTriggers)}
              >
                <AddBoxRoundedIcon sx={{ fontSize: '32px' }} />
              </span>
            </Box>
          )}
        </Grid>

        <Grid item xs={3}>
          <span className={classes.titleOverviewLeft}>Delivery Date</span>
        </Grid>
        <Grid item xs={9}>
          <StyledDiv
            onDoubleClick={() => {
              if (!isEditingDeliveryDate) {
                setEditingDeliveryDate(true);
                setTxtDeliveryDate(
                  <input
                    type="date"
                    className="date_input--form"
                    onChange={(e) => updateDeliveryDate_(e)}
                  />
                );
              }
            }}
          >
            <span className={classes.titleOverviewRightPink}>
              {txtDeliveryDate}
            </span>
          </StyledDiv>
        </Grid>

        <Grid item xs={3}>
          <span className={classes.titleOverviewLeft}>Due Date</span>
        </Grid>
        <Grid item xs={9}>
          <StyledDiv
            onDoubleClick={() => {
              if (!isEditingDueDate) {
                setEditingDueDate(true);
                setTxtDueDate(
                  <input
                    type="date"
                    className="date_input--form"
                    onChange={(e) => updateDueDate_(e)}
                  />
                );
              }
            }}
          >
            <span className={classes.titleOverviewRightPink}>{txtDueDate}</span>
          </StyledDiv>
        </Grid>

        <Grid item xs={3}>
          <span className={classes.titleOverviewLeft}>Desktop Display</span>
        </Grid>
        <Grid item xs={9}>
          {isEditingDesktopDisplay ? (
            <Autocomplete
              limitTags={2}
              id="filter-demo"
              options={maintenanceDisplayList}
              getOptionLabel={(option) => option.size}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Desktop Display"
                  onKeyUp={(e) => addDisplayDesktop_(e)}
                />
              )}
              sx={{ width: '500px' }}
            />
          ) : (
            <Box>
              {!_.isEmpty(taskData.desktop_displays) &&
                taskData.desktop_displays.map((items, index) => (
                  <span
                    key={index}
                    className={classes.titleOverviewRightBorderPink}
                  >
                    {items.size}
                  </span>
                ))}
              <span
                tabIndex={0}
                role="button"
                className={classes.addBoxIconStyle}
                onClick={() =>
                  setEditingDesktopDisplay(!isEditingDesktopDisplay)
                }
                onKeyDown={() =>
                  setEditingDesktopDisplay(!isEditingDesktopDisplay)
                }
              >
                <AddBoxRoundedIcon sx={{ fontSize: '32px' }} />
              </span>
            </Box>
          )}
        </Grid>

        <Grid item xs={3}>
          <span className={classes.titleOverviewLeft}>Mobile Display</span>
        </Grid>
        <Grid item xs={9}>
          {isEditingMobileDisplay ? (
            <Autocomplete
              limitTags={2}
              id="filter-demo"
              options={maintenanceDisplayList}
              getOptionLabel={(option) => option.size}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Mobile Display"
                  onKeyUp={(e) => addDisplayMobile_(e)}
                  // onKeyPress={(e) => {
                  //   if (e.key == 'Enter') {
                  //     setEditingTriggers(false);
                  //   }
                  // }}
                />
              )}
              sx={{ width: '500px' }}
            />
          ) : (
            <Box>
              {!_.isEmpty(taskData.mobile_displays) &&
                taskData.mobile_displays.map((items, index) => (
                  <span
                    key={index}
                    className={classes.titleOverviewRightBorderPink}
                  >
                    {items.size}
                  </span>
                ))}
              <span
                tabIndex={0}
                role="button"
                className={classes.addBoxIconStyle}
                onClick={() => setEditingMobileDisplay(!isEditingMobileDisplay)}
                onKeyDown={() =>
                  setEditingMobileDisplay(!isEditingMobileDisplay)
                }
              >
                <AddBoxRoundedIcon sx={{ fontSize: '32px' }} />
              </span>
            </Box>
          )}
        </Grid>

        <Grid item xs={3}>
          <span className={classes.titleOverviewLeft}>Total Log Hours</span>
        </Grid>
        <Grid item xs={9}>
          <span className={classes.titleOverviewRight}>
            {taskData.total_log_hours || '--'}
          </span>
        </Grid>

        <Grid item xs={3}>
          <span className={classes.titleOverviewLeft}>Additional Info</span>
        </Grid>
        <Grid item xs={9}>
          <StyledDiv
            onDoubleClick={() => {
              if (!isEditingAdditionalInfo) {
                setEditingAdditionalInfo(true);
                setTxtAdditionalInfo(
                  <textarea
                    rows="5"
                    cols="100"
                    className="additional_info--form"
                    onKeyUp={(e) => updateAdditionalInfo_(e)}
                  ></textarea>
                );
              }
            }}
          >
            <span className={classes.titleOverviewRight}>
              {txtAdditionalInfo}
            </span>
          </StyledDiv>
        </Grid>

        <Grid item xs={12}>
          <Accordion
            expanded={expanded === 'templateVersion'}
            className={classes.accordionContainer}
            onChange={handleChangeAccordion('templateVersion')}
          >
            <AccordionSummary
              className={classes.accordionSummary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="templateVersionbh-content"
              id="templateVersionbh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {' '}
                Template Version
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                Integer sit amet egestas eros, vitae egestas augue. Duis vel est
                augue.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'referenceLink'}
            className={classes.accordionContainer}
            onChange={handleChangeAccordion('referenceLink')}
          >
            <AccordionSummary
              className={classes.accordionSummary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="referenceLinkbh-content"
              id="referenceLinkbh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Reference Link
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <p className={classes.txtColorPink}>Platform Concept Link</p>
                <p className={classes.txtColorPink}>Brand Guidelines </p>
                <p className={classes.txtColorPink}>Banner sizes </p>
                <p className={classes.txtColorPink}>Logo files</p>
                <p className={classes.txtColorPink}>Font files</p>
                <p className={classes.txtColorPink}>Image files</p>
                <p className={classes.txtColorPink}>HTML files</p>
                <p className={classes.txtColorPink}>Video files</p>
                <p className={classes.txtColorPink}>Audio files</p>
                <p className={classes.txtColorPink}>Subtitle files</p>
                <p className={classes.txtColorPink}>Expected Output</p>
                <p className={classes.txtColorPink}>Special instructions </p>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'subtask'}
            className={classes.accordionContainer}
            onChange={handleChangeAccordion('subtask')}
          >
            <AccordionSummary
              className={classes.accordionSummary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="subtaskbh-content"
              id="subtaskbh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Subtask
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.flexbetweenContainer}>
                <p className={classes.txtColorPink}>Platform Concept Link</p>
                <p className={classes.txtColorWarning}>In Progress </p>
              </Typography>
              <Typography className={classes.flexbetweenContainer}>
                <p className={classes.txtColorPink}>Asset Download</p>
                <p className={classes.txtColorGray}>Not Started </p>
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'revision'}
            className={classes.accordionContainer}
            onChange={handleChangeAccordion('revision')}
          >
            <AccordionSummary
              className={classes.accordionSummary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="revisionbh-content"
              id="revisionbh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Revision
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className={classes.flexbetweenContainer}>
                  <span>Add Revsion</span>

                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      id="overview_selectRevision"
                      value={item}
                      onChange={handleChangeItem}
                      displayEmpty
                      className={classes.selectRevision}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>Revision Round 1</MenuItem>
                      <MenuItem value={2}>Revision Round 2</MenuItem>
                      <MenuItem value={3}>Revision Round 3</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className={classes.flexbetweenContainer}>
                  <p>Revision</p>
                  <p>Approved By</p>
                </div>
                <FormControl>
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Please double check the video. The video is pixelated and very..."
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Please update the image."
                  />
                </FormControl>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'checklist'}
            className={classes.accordionContainer}
            onChange={handleChangeAccordion('checklist')}
          >
            <AccordionSummary
              className={classes.accordionSummary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="checklistbh-content"
              id="checklistbh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Checklist
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className={classes.flexbetweenContainer}>
                  <span>Add Checklist</span>
                </div>

                <FormControl>
                  <FormControlLabel
                    value="Typo checking"
                    control={<Radio />}
                    label="Typo checking"
                  />
                  <FormControlLabel
                    value="Checklist Checking"
                    control={<Radio />}
                    label="Checklist Checking"
                  />
                </FormControl>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Box>
  );
};

Overview.propTypes = {
  data: PropTypes.object,
};

export default Overview;
