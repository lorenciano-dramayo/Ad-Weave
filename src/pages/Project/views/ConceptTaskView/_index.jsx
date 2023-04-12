import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
// import withStyles from '@mui/styles/withStyles';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import 'react-reflex/styles.css';
import Header from 'components/Tasks/Concept/Header';
import Overview from 'components/Tasks/Concept/Overview';
import Timelog from 'components/Tasks/Concept/Timelog';
import Revision from 'components/Tasks/Concept/Revision';
import Escalation from 'components/Tasks/Concept/Escalation';
import Update from 'components/Tasks/Concept/Update';
import ActivityLog from 'components/Tasks/Concept/ActivityLog';
import Consultation from 'components/Tasks/Concept/Consultation';
import Images from 'components/Tasks/Concept/Images';
import PropTypes from 'prop-types';
import { Grid, AppBar, Tab } from '@mui/material';

// Reducer
import { getTaskByid } from 'store/reducers/tasks';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  flagIcon: {
    height: '40px',
    width: 'auto',
    marginTop: '10px',
  },
  playBtnIcon: {
    height: '20px',
    width: '20px',
    marginTop: '19px',
    marginRight: '7px',
    marginLeft: '7px',
  },
  eyesIcon: {
    height: '25px',
    marginTop: '18px',
    marginRight: '6px',
  },
  borderBottom: {
    borderBottom: '1.5px solid #000000',
    paddingLeft: '27px !important',
  },
  borderLikeReplyContainer: {
    border: '1px solid rgba(0, 0, 0, 0.1)',
  },
  containerLikedIcon: {
    textAlign: 'center',
    borderRight: '1px solid rgba(0, 0, 0, 0.1)',
    padding: '12px',
    alignSelf: 'center',
  },
  containerReplyIcon: {
    textAlign: 'center',
    padding: '12px',
    alignSelf: 'center',
  },
  likedIcon: {
    height: '20px',
    color: '#898989',
  },
  replyIcon: {
    height: '27px',
    color: '#898989',
  },
  textareaReply: {
    background: '#F5F6F8',
    borderRadius: '19px',
    width: '100%',
  },
  downloadAllContainer: {
    textAlign: 'right',
    marginBottom: '20px',
  },
  leftTab: {
    backgroundColor: '#FFFFFF',
    color: '#333',
    marginLeft: '25px',
  },
  main: {
    backgroundColor: '#F5F6F8',
    borderRadius: '20px',
    overflow: 'hidden',
  },
  tabConceptTask: {
    backgroundColor: '#FFFFFF',
  },
  overviewTaskConcept: {
    marginTop: '45px',
    padding: '20px 0px 0px 0px',
  },

  timelogTaskConcept: {
    marginTop: '70px',
    padding: '20px 0px 0px 0px',
    marginLeft: '15px',
    paddingLeft: '15px !important',
  },
  revisionTaskConcept: {
    marginTop: '70px',
    padding: '20px 0px 0px 0px',
    marginLeft: '30px',
    paddingLeft: '15px !important',
  },
  marginRightTaskConcept: {
    marginTop: '55px',
    padding: '20px 0px 0px 0px',
    marginLeft: '10px',
    paddingLeft: '15px !important',
  },
  tabWrapper: {
    paddingLeft: '0px',
  },
}));

// const StyledBadge = withStyles((theme) => ({
//   badge: {
//     backgroundColor: '#44b700',
//     color: '#44b700',
//     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//     '&::after': {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       borderRadius: '50%',
//       animation: '$ripple 1.2s infinite ease-in-out',
//       border: '1px solid currentColor',
//       content: '""',
//     },
//   },
//   '@keyframes ripple': {
//     '0%': {
//       transform: 'scale(.8)',
//       opacity: 1,
//     },
//     '100%': {
//       transform: 'scale(2.4)',
//       opacity: 0,
//     },
//   },
// }))(Badge);

const ConceptTaskView = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const { pathname } = useLocation();
  const [valueLeft, setValueLeft] = React.useState('1');
  const [valueRight, setValueRight] = React.useState('1');

  const { data } = useSelector((state) => state.tasks);
  // const [status, setStatus] = React.useState('resolved');
  // const [openReference, setOpenReference] = React.useState(false);
  // const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(
      getTaskByid({
        taskId: id,
      })
    );
  }, [id]);

  const handleChangeLeft = (event, newValue) => {
    setValueLeft(newValue);
  };

  const handleChangeRight = (event, newValue) => {
    setValueRight(newValue);
  };

  // const handleChangeStatus = (event) => {
  //   setStatus(event.target.value);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  return (
    <ReflexContainer
      className={classes.main}
      orientation="horizontal"
      id="concept_task_modal_data"
    >
      <ReflexElement className="header" flex={0.1}>
        <Header data={data} />
      </ReflexElement>
      <ReflexElement>
        <ReflexContainer orientation="vertical">
          <ReflexElement className="left-pane">
            <div className="pane-content">
              <div className="task_concept_left">
                <Grid container spacing={3}>
                  <Grid
                    id="tab_concept_task"
                    className={classes.tabConceptTask}
                    item
                    xs={12}
                  >
                    <TabContext value={valueLeft} id="tab_concept_modal">
                      <AppBar position="static">
                        <TabList
                          className={classes.leftTab}
                          onChange={handleChangeLeft}
                          aria-label="simple tabs example"
                        >
                          <Tab
                            className={classes.tabWrapper}
                            label="Overview"
                            value="1"
                          />
                          <Tab
                            className={classes.tabWrapper}
                            label="Time Log"
                            value="2"
                          />
                          <Tab
                            className={classes.tabWrapper}
                            label="Revision"
                            value="3"
                          />
                          <Tab
                            className={classes.tabWrapper}
                            label="Escalation"
                            value="4"
                          />
                        </TabList>
                      </AppBar>
                      <TabPanel
                        id="overview_task_concept_modal"
                        className={classes.overviewTaskConcept}
                        value="1"
                      >
                        <Overview data={data} />
                      </TabPanel>
                      <TabPanel
                        id="timelog_tab"
                        value="2"
                        className={classes.timelogTaskConcept}
                      >
                        <Timelog />
                      </TabPanel>
                      <TabPanel
                        id="revision_tab"
                        value="3"
                        className={classes.revisionTaskConcept}
                      >
                        <Revision />
                      </TabPanel>
                      <TabPanel
                        id="escalation_tab"
                        value="4"
                        className={classes.revisionTaskConcept}
                      >
                        <Escalation />
                      </TabPanel>
                    </TabContext>
                  </Grid>
                </Grid>
              </div>
            </div>
          </ReflexElement>

          <ReflexSplitter propagate={true} />

          <ReflexElement className="right-pane">
            <div className="pane-content">
              <div className="task_concept_right">
                <Grid container spacing={3}>
                  <Grid
                    id="tab_concept_task_2"
                    className={classes.tabConceptTask}
                    item
                    xs={12}
                  >
                    <TabContext value={valueRight} id="tab_concept_modal">
                      <AppBar position="static">
                        <TabList
                          onChange={handleChangeRight}
                          aria-label="simple tabs example"
                          className="concept_task_right_bg_tabs"
                        >
                          <Tab label="Update" value="1" />
                          <Tab label="Activity Log" value="2" />
                          <Tab label="Files" value="3" />
                          <Tab label="Dev Consultation" value="4" />
                        </TabList>
                      </AppBar>
                      <TabPanel
                        id="overview_task_concept_modal"
                        value="1"
                        className={classes.marginRightTaskConcept}
                      >
                        <Update />
                      </TabPanel>
                      <TabPanel
                        value="2"
                        className={classes.marginRightTaskConcept}
                      >
                        <ActivityLog />
                      </TabPanel>
                      <TabPanel
                        value="3"
                        id="asset_tab"
                        className={classes.marginRightTaskConcept}
                      >
                        <Images />
                      </TabPanel>
                      <TabPanel
                        value="4"
                        id="overview_task_concept_modal"
                        className="tab_panel_padding"
                      >
                        <Consultation />
                      </TabPanel>
                    </TabContext>
                  </Grid>
                </Grid>
              </div>
            </div>
          </ReflexElement>
        </ReflexContainer>
      </ReflexElement>
    </ReflexContainer>
  );
};

ConceptTaskView.propTypes = {
  id: PropTypes.any,
};

export default ConceptTaskView;
