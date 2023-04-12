import { useEffect, useRef, useState, useCallback } from 'react';
import * as React from 'react';
import { Window } from '@progress/kendo-react-dialogs';
import '@progress/kendo-theme-default/dist/all.css';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import InputBase from '@mui/material/InputBase';
import XIcon from 'assets/images/x.png';
import TimesheetIcon from 'assets/images/icons/Timesheet.png';
import TasktimerIcon from 'assets/images/icons/Task_Timer.png';
import ConceptIconEllipse from 'assets/icons/concept_ellipse.png';
import CampaignIconEllipse from 'assets/icons/campaign_ellipse.png';
import CategoryIconEllipse from 'assets/icons/category_ellipse.png';
import PartnerIconEllipse from 'assets/icons/partner_ellipse.png';
import StopIcon from 'assets/images/icons/stop.png';
import PlayIcon from 'assets/images/icons/play.png';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import SelectUnstyled, {
  selectUnstyledClasses,
} from '@mui/base/SelectUnstyled';
import OptionUnstyled, {
  optionUnstyledClasses,
} from '@mui/base/OptionUnstyled';
import { styled } from '@mui/system';
import { PopperUnstyled } from '@mui/base';
import { Box, Grid } from '@mui/material';

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledButton = styled('button')(
  ({ theme }) => `
  font-size: 13.5px;
  box-sizing: border-box;
  background: ${theme.palette.mode === 'dark' ? 'transparent' : 'transparent'};
  border: 1px solid ${
    theme.palette.mode === 'dark' ? 'transparent' : 'transparent'
  };
  border-radius: 0.75em;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  &:hover {
    border-color: ${
      theme.palette.mode === 'dark' ? 'transparent' : 'transparent'
    };
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '';
    }
  }

  &::after {
    content: '';
    float: right;
  }

  & img {
    margin-right: 10px;
  }
  `
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-size: 13.5px;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 220px;
  max-height: 400px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  & img {
    margin-right: 10px;
  }
  `
);

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} ref={ref} components={components} />;
});

CustomSelect.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Listbox: PropTypes.elementType,
    Popper: PropTypes.func,
    Root: PropTypes.elementType,
  }),
};

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: '3%',
    left: '52px',
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'block',
  },
  drawer: {
    width: '250px',
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  iconSlider: {
    position: 'absolute',
    top: '-45.5vh',
    left: '-18%',
    color: '#333',
  },
  iconColor: {
    color: '#333',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  avatarSub: {
    border: '2px solid #fff',
    width: '70px',
    height: '70px',
    position: 'absolute',
    top: '10%',
    left: '37%',
  },
  active: {
    color: 'white !important',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: '-140px',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: '50px',
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  noDecoration: {
    textDecoration: 'none',
    color: 'black',
  },
  dividerCustom: {
    height: '2px',
    marginBottom: '5px',
    marginTop: '5px',
  },
  listItem: {
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  leftContainer: {
    backgroundColor: '#EFF4F7',
    padding: '30px !important',
    paddingRight: '0px !important',
    paddingBottom: '0px !important',
    paddingLeft: '10px !important',
  },
  rightContainer: {
    paddingLeft: '0px !important',
    backgroundColor: '#EFF4F7',
    padding: '30px !important',
    paddingBottom: '0px !important',
    width: '100%',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '12px',
  },
  headerSearch: {
    backgroundColor: 'white',
    width: '100%',
  },
  textFieldSearchHeader: {
    width: '100%',
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '21px',
    letterSpacing: '-0.03em',
    color: '#898989',
  },
  tagContainer: {
    marginRight: '30px',
    alignItems: 'center',
    marginLeft: '30px',
    display: 'flex',
  },
  tagSize: {
    height: '22px',
    width: '22px',
  },
  timeTextSize: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    alignSelf: 'center',
    marginRight: '15px',
  },
  btnStart: {
    color: 'white',
    padding: '0px 20px',
    fontSize: '12px',
    background: '#03A9F4',
    border: '1px solid',
    margin: '0px',
    borderRadius: '5px',
  },
  btnTimesheet: {
    color: 'white',
    background: 'transparent',
    border: '1px solid transparent',
    margin: '0px',
    height: '30px',
  },
  txtLabelProject: {
    color: '#03A9F4',
  },
  tablePadding: {
    padding: '10px 15px 10px 15px !important',
  },
  tablePaddingTime: {
    padding: '3px 10px 3px 10px !important',
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '32px',
  },
  tablePaddingTotal: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: 'normal !important',
    fontSize: '14px',
    padding: '3px 10px 3px 10px !important',
    lineHeight: '32px',
  },

  tablePaddingDay: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: 'normal !important',
    fontSize: '12px !important',
    padding: '3px 10px 3px 10px !important',
    lineHeight: '32px',
  },
  tablePaddingMain: {
    padding: '3px 10px 3px 10px !important',
    width: '65%',
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: 'normal !important',
    fontSize: '14px',
    lineHeight: '32px',
  },
  tablePaddingMain1: {
    padding: '3px 10px 3px 10px !important',
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: 'normal !important',
    fontSize: '14px',
    lineHeight: '32px',
  },
  actionColumn: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px 10px 15px !important',
  },
  txtDescription: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: 'normal !important',
    fontSize: '15px',
    lineHeight: '13px',
    padding: '10px 15px 10px 15px !important',
    display: 'flex',
  },
  bgHeaderColor: {
    backgroundColor: '#C8D3DA',
  },
  timeColorGray: {
    color: '#898989',
    padding: '10px 15px 10px 15px !important',
  },
  tableWrapper: {
    marginBottom: '30px',
  },
  inputWidth: {
    width: '40px',
  },
  tableContainerPadding: {
    padding: '0px 10px 0px 30px',
    backgroundColor: '#EFF4F7',
  },
  btnPlayPause: {
    backgroundColor: 'transparent',
    border: '1px solid transparent',
    padding: '0px',
  },
  firstColumn: {
    marginRight: '20px',
    alignSelf: 'center',
  },
  dropdownFilter: {
    width: '93px',
    height: '34px',
    background: '#FFFFFF',
    border: '1px solid #C8D3DA',
    boxSizing: 'border-box',
    marginRight: '10px',
  },
  txtTimeClock: {
    marginRight: '40px',
  },
  timesheetIconSize: {
    width: '28px',
    height: '28px',
  },
  tastTimerIconSize: {
    width: '28px',
    height: '28px',
  },
  timesheetMargin: {
    marginRight: '20px',
  },
  btnTimesheetIcon: {
    background: 'transparent',
    border: '0px',
    margin: '0px',
    padding: '0px',
  },
  timesheet: {
    margin: '20px 0px',
  },
  tasktimer: {
    margin: '10px 0px',
  },
  txtTotalWeeks: {
    margin: '0px',
  },
  alignWeekTotalIcon: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const drawerWidth = 320;

const Tastktimer = () => {
  const classes = useStyles();
  const [visible, setVisible] = useState(true);

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [renderedStreamDuration, setRenderedStreamDuration] =
      useState('00:00:00'),
    streamDuration = useRef(0),
    previousTime = useRef(0),
    requestAnimationFrameId = useRef(null),
    [isStartTimer, setIsStartTimer] = useState(false),
    [isStopTimer, setIsStopTimer] = useState(false),
    [isPauseTimer, setIsPauseTimer] = useState(false),
    [isResumeTimer, setIsResumeTimer] = useState(false),
    isStartBtnDisabled = isPauseTimer || isResumeTimer || isStartTimer,
    isStopBtnDisabled = !(isPauseTimer || isResumeTimer || isStartTimer),
    isPauseBtnDisabled = !(isStartTimer || (!isStartTimer && isResumeTimer)),
    isResumeBtnDisabled = !isPauseTimer;

  const updateTimer = useCallback(() => {
    let now = performance.now();
    let dt = now - previousTime.current;

    if (dt >= 1000) {
      streamDuration.current = streamDuration.current + Math.round(dt / 1000);
      const formattedStreamDuration = new Date(streamDuration.current * 1000)
        .toISOString()
        .substr(11, 8);
      setRenderedStreamDuration(formattedStreamDuration);
      previousTime.current = now;
    }

    requestAnimationFrameId.current = requestAnimationFrame(updateTimer);
  }, []);

  const startTimer = useCallback(() => {
    previousTime.current = performance.now();
    requestAnimationFrameId.current = requestAnimationFrame(updateTimer);
  }, [updateTimer]);

  useEffect(() => {
    if (isStartTimer && !isStopTimer) {
      startTimer();
    }

    if (isStopTimer && !isStartTimer) {
      streamDuration.current = 0;
      cancelAnimationFrame(requestAnimationFrameId.current);
      setRenderedStreamDuration('00:00:00');
    }
  }, [isStartTimer, isStopTimer, startTimer]);

  const startHandler = () => {
    setIsStartTimer(true);
    setIsStopTimer(false);
  };

  const stopHandler = () => {
    setIsStopTimer(true);
    setIsStartTimer(false);
    setIsPauseTimer(false);
    setIsResumeTimer(false);
  };

  const pauseHandler = () => {
    setIsPauseTimer(true);
    setIsStartTimer(false);
    setIsResumeTimer(false);
    cancelAnimationFrame(requestAnimationFrameId.current);
  };

  const resumeHandler = () => {
    setIsResumeTimer(true);
    setIsPauseTimer(false);
    startTimer();
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {visible && (
        <Window
          initialHeight={500}
          initialWidth={1000}
          initialLeft={230}
          initialTop={100}
          onMinimize={toggleDialog}
          onClose={toggleDialog}
        >
          <Box
            className={
              selectedIndex === 'timesheet' ? classes.hide : classes.show
            }
          >
            <Grid container spacing={1}>
              <Grid className={classes.leftContainer} item xs={12}>
                <div className="d-flex">
                  <div className={classes.headerSearch}>
                    <div className={classes.spaceBetween}>
                      <div className="w-100 d-flex">
                        <InputBase
                          className={classes.textFieldSearchHeader}
                          sx={{ ml: 1, flex: 1 }}
                          placeholder="What are you working on ?"
                          inputProps={{
                            'aria-label': 'What are you working on ?',
                          }}
                        />
                      </div>

                      <p className={classes.timeTextSize}>00:00:00</p>
                    </div>
                  </div>
                  <button className={classes.btnStart}>START</button>
                </div>
                <div className={classes.tasktimer}>
                  <div className="spaceBetween">
                    <div>
                      <select className={classes.dropdownFilter}>
                        <option>Today</option>
                        <option>Yesterday</option>
                        <option>Last Week</option>
                      </select>
                    </div>
                    <div className={classes.alignWeekTotalIcon}>
                      <div className={classes.timesheetMargin}>
                        <button
                          className={classes.btnTimesheetIcon}
                          onClick={(event) =>
                            handleListItemClick(event, 'timesheet')
                          }
                        >
                          <img
                            className={classes.timesheetIconSize}
                            src={TimesheetIcon}
                            alt="timesheet icon"
                          />
                        </button>
                      </div>
                      <p className={classes.txtTotalWeeks}>
                        Week total:
                        <strong>36:00</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid className={classes.tableContainerPadding} item xs={12}>
                <TableContainer
                  className={classes.tableWrapper}
                  component={Paper}
                >
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow className={classes.bgHeaderColor}>
                        <TableCell className={classes.tablePaddingMain}>
                          Today
                        </TableCell>
                        <TableCell
                          className={classes.tablePaddingTotal}
                          align="right"
                        >
                          {' '}
                        </TableCell>
                        <TableCell
                          className={classes.tablePaddingTime}
                          align="right"
                        >
                          <span className={classes.txtTimeClock}>Total:</span>{' '}
                          6:00
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell
                          className={classes.txtDescription}
                          component="th"
                          scope="row"
                        >
                          <div className={classes.firstColumn}>
                            <span>Meetings</span>
                          </div>
                          <div>
                            <CustomSelect defaultValue={'category'}>
                              {categoryType.map((c) => (
                                <StyledOption key={c.code} value={c.code}>
                                  <img
                                    src={CategoryIconEllipse}
                                    alt="Category icon"
                                  />
                                  {c.label}
                                </StyledOption>
                              ))}
                            </CustomSelect>
                            <CustomSelect defaultValue={'partner'}>
                              {partnerType.map((c) => (
                                <StyledOption key={c.code} value={c.code}>
                                  <img
                                    src={PartnerIconEllipse}
                                    alt="Partner icon"
                                  />
                                  {c.label}
                                </StyledOption>
                              ))}
                            </CustomSelect>
                            <CustomSelect defaultValue={'concept'}>
                              {conceptType.map((c) => (
                                <StyledOption key={c.code} value={c.code}>
                                  <img
                                    src={ConceptIconEllipse}
                                    alt="Concept icon"
                                  />
                                  {c.label}
                                </StyledOption>
                              ))}
                            </CustomSelect>
                            <CustomSelect defaultValue={'campaign'}>
                              {campaignType.map((c) => (
                                <StyledOption key={c.code} value={c.code}>
                                  <img
                                    src={CampaignIconEllipse}
                                    alt="Campaign icon"
                                  />
                                  {c.label}
                                </StyledOption>
                              ))}
                            </CustomSelect>
                          </div>
                        </TableCell>
                        <TableCell
                          className={classes.timeColorGray}
                          align="right"
                        >
                          Preset
                        </TableCell>
                        <TableCell
                          className={classes.actionColumn}
                          align="left"
                        >
                          {renderedStreamDuration}
                          <button
                            onClick={startHandler}
                            disabled={isStartBtnDisabled}
                            className={`timer-controller-btn ${
                              classes.btnPlayPause
                            } ${isStartBtnDisabled ? 'disabled' : ''}`}
                          >
                            <img src={PlayIcon} alt="Play icon" />
                          </button>
                          <button
                            className={`timer-controller-btn danger  ${
                              classes.btnPlayPause
                            } ${isStopBtnDisabled ? 'disabled' : ''}`}
                            disabled={isStopBtnDisabled}
                            onClick={stopHandler}
                          >
                            <img src={StopIcon} alt="Stop icon" />
                          </button>
                          {/* <button
                          className={`timer-controller-btn ${isPauseBtnDisabled ? "disabled" : ""
                            }`}
                          disabled={isPauseBtnDisabled}
                          onClick={pauseHandler}
                        >
                          pause
                        </button>
                        <button
                          className={`timer-controller-btn ${isResumeBtnDisabled ? "disabled" : ""
                            }`}
                          disabled={isResumeBtnDisabled}
                          onClick={resumeHandler}
                        >
                          resume
                        </button> */}

                          <img src={XIcon} alt="X icon" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Box>
          <Box
            className={
              selectedIndex != 'timesheet' ? classes.hide : classes.show
            }
          >
            <div className={classes.timesheet}>
              <div className="spaceBetween">
                <div>
                  <select className={classes.dropdownFilter}>
                    <option>Today</option>
                    <option>Yesterday</option>
                    <option>Last Week</option>
                  </select>
                  <select className={classes.dropdownFilter}>
                    <option selected>Members</option>
                    <option>Anne Curtis</option>
                    <option>Juan Miguel</option>
                  </select>
                </div>
                <div className={classes.alignWeekTotalIcon}>
                  <div className={classes.timesheetMargin}>
                    <button
                      onClick={(event) =>
                        handleListItemClick(event, 'tasktimer')
                      }
                      className={classes.btnTimesheet}
                    >
                      <img
                        src={TasktimerIcon}
                        className={classes.tastTimerIconSize}
                        alt="tasktimer icon"
                      />
                    </button>
                  </div>
                  <p className={classes.txtTotalWeeks}>
                    Week total:
                    <strong>36:00</strong>
                  </p>
                </div>
              </div>
            </div>

            <TableContainer className={classes.tableWrapper} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow className={classes.bgHeaderColor}>
                    <TableCell className={classes.tablePaddingMain1}>
                      Concept QA
                    </TableCell>
                    <TableCell className={classes.tablePaddingDay} align="left">
                      Mon, Feb 11
                    </TableCell>
                    <TableCell className={classes.tablePaddingDay} align="left">
                      Mon, Feb 11
                    </TableCell>
                    <TableCell className={classes.tablePaddingDay} align="left">
                      Mon, Feb 11
                    </TableCell>
                    <TableCell className={classes.tablePaddingDay} align="left">
                      Mon, Feb 11
                    </TableCell>
                    <TableCell className={classes.tablePaddingDay} align="left">
                      Mon, Feb 11
                    </TableCell>
                    <TableCell className={classes.tablePaddingDay} align="left">
                      Mon, Feb 11
                    </TableCell>
                    <TableCell className={classes.tablePaddingDay} align="left">
                      Mon, Feb 11
                    </TableCell>
                    <TableCell className={classes.tablePaddingDay} align="left">
                      Mon, Feb 11
                    </TableCell>
                    <TableCell className={classes.tablePaddingDay} align="left">
                      Total{' '}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      className={classes.txtDescription}
                      component="th"
                      scope="row"
                    >
                      <div>
                        <span className="mr-20">New QA Review</span>
                      </div>
                    </TableCell>
                    <TableCell className={classes.timeColorGray} align="left">
                      <input className={classes.inputWidth} type="number" />
                    </TableCell>
                    <TableCell className={classes.timeColorGray} align="left">
                      <input className={classes.inputWidth} type="number" />
                    </TableCell>
                    <TableCell className={classes.timeColorGray} align="left">
                      <input className={classes.inputWidth} type="number" />
                    </TableCell>
                    <TableCell className={classes.timeColorGray} align="left">
                      <input className={classes.inputWidth} type="number" />
                    </TableCell>
                    <TableCell className={classes.timeColorGray} align="left">
                      <input className={classes.inputWidth} type="number" />
                    </TableCell>
                    <TableCell className={classes.timeColorGray} align="left">
                      <input className={classes.inputWidth} type="number" />
                    </TableCell>
                    <TableCell className={classes.timeColorGray} align="left">
                      <input className={classes.inputWidth} type="number" />
                    </TableCell>
                    <TableCell className={classes.timeColorGray} align="left">
                      <input className={classes.inputWidth} type="number" />
                    </TableCell>
                    <TableCell className={classes.timeColorGray} align="left">
                      0:30 <img src={XIcon} alt="X icon" />
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.bgHeaderColor}>
                    <TableCell className={classes.tablePaddingMain1}>
                      Total
                    </TableCell>
                    <TableCell className={classes.tablePaddingDay} align="left">
                      8:00
                    </TableCell>
                    <TableCell className={classes.tablePaddingDay} align="left">
                      8:00
                    </TableCell>
                    <TableCell className={classes.tablePaddingDay} align="left">
                      8:00
                    </TableCell>
                    <TableCell className={classes.tablePaddingDay} align="left">
                      8:00
                    </TableCell>
                    <TableCell className={classes.tablePaddingDay} align="left">
                      8:00
                    </TableCell>
                    <TableCell className={classes.tablePaddingDay} align="left">
                      8:00
                    </TableCell>
                    <TableCell className={classes.tablePaddingDay} align="left">
                      8:00
                    </TableCell>
                    <TableCell className={classes.tablePaddingDay} align="left">
                      8:00
                    </TableCell>
                    <TableCell className={classes.tablePaddingDay} align="left">
                      Total
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Window>
      )}
    </div>
  );
};

const categoryType = [
  { code: 'category', label: 'Category' },
  { code: 'category2', label: 'Category2' },
  { code: 'category3', label: 'Category3' },
];
const partnerType = [
  { code: 'partner', label: 'Partner' },
  { code: 'partner2', label: 'Partner2' },
  { code: 'partner3', label: 'Partner3' },
];
const conceptType = [
  { code: 'concept', label: 'Concept' },
  { code: 'concept2', label: 'Concept2' },
  { code: 'concept3', label: 'Concept3' },
];
const campaignType = [
  { code: 'campaign', label: 'Campaign' },
  { code: 'campaign2', label: 'Campaign2' },
  { code: 'campaign3', label: 'Campaign3' },
];

export default Tastktimer;
