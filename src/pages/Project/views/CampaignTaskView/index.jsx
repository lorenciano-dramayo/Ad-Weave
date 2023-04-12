import React from 'react';
import FormControl from '@mui/material/FormControl';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import NativeSelect from '@mui/material/NativeSelect';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Badge from '@mui/material/Badge';
import defaultProfile from 'assets/avatar2.png';
import TimeIcon from 'assets/icons/time.png';
import MessageIcon from 'assets/icons/message.png';
import SmileIcon from 'assets/icons/smile.png';
import AttachIcon from 'assets/icons/attach.png';
import MentionIcon from 'assets/icons/mention.png';
import LikedVioletIcon from 'assets/icons/likedviolet.png';
import LikedWhiteIcon from 'assets/icons/likedWhite.png';
import LineVertical from 'assets/icons/lineVertical.png';
import Chip from '@mui/material/Chip';
import FlagRedIcon from 'assets/icons/flag_red.png';
import CopyIcon from 'assets/icons/copy.png';
import ActionIcon from 'assets/icons/action.png';
import StarFilledIcon from 'assets/icons/star_filled.png';
import ClockGreen from 'assets/icons/clock_green1.png';
import ClockRed from 'assets/icons/clock_red.png';
import DownloadIconGray from 'assets/icons/download_icon_gray.png';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import 'react-reflex/styles.css';
import Paper from '@mui/material/Paper';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyIcon from '@mui/icons-material/Reply';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FilesDummyImage from 'assets/files_dummy.png';
import 'assets/css/partial/overide.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
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
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: '30px',
    paddingTop: '30px',
    paddingBottom: '30px',
    marginTop: '20px',
  },
  borderLikeReplyContainer: {
    border: '1px solid rgba(0, 0, 0, 0.1)',
  },
  campaignTask: {
    color: '#F6C269',
    fontSize: '27px',
    fontWeight: 'bold',
    letterSpacing: '-1px',
  },

  campaignTaskRed: {
    color: '#ED6740',
    fontSize: '27px',
    fontWeight: 'bold',
    letterSpacing: '-1px',
  },
  conceptTextTable: {
    fontSize: '20px',
    letterSpacing: '-1px',
    fontWeight: 'normal',
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
  copyIcon: {
    height: '20px',
    marginTop: '20px',
    marginLeft: '15px',
  },
  chipContainer: {
    marginLeft: '5px',
    backgroundColor: '#29125F',
    color: 'white',
    borderRadius: '6px',
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const CampaignTaskView = () => {
  const classes = useStyles();
  const [valueLeft, setValueLeft] = React.useState('1');
  const [valueRight, setValueRight] = React.useState('1');
  const [status, setStatus] = React.useState('resolved');
  const [openReference, setOpenReference] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleChangeLeft = (event, newValue) => {
    setValueLeft(newValue);
  };

  const handleChangeRight = (event, newValue) => {
    setValueRight(newValue);
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="w-100">
      <Grid container spacing={3}>
        <Grid className={classes.borderBottom} item xs={12}>
          <div>
            <div className="d-flex-row">
              <FormControl className={classes.formControl}>
                <NativeSelect className="status_task">
                  <option>In Progress</option>
                  <option>Pending</option>
                  <option>Completed</option>
                </NativeSelect>
              </FormControl>
              <p>Milo VN Teens</p>
              <img
                src={CopyIcon}
                className={classes.copyIcon}
                alt="copy icon"
              />
              <img
                src={StarFilledIcon}
                className={classes.copyIcon}
                alt="copy icon"
              />
              <AvatarGroup id="avatar_with_idle" max={4}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  variant="dot"
                >
                  <Avatar alt="Remy Sharp" src={defaultProfile} />
                </StyledBadge>

                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  variant="dot"
                >
                  <Avatar alt="Remy Sharp" src={defaultProfile} />
                </StyledBadge>

                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  variant="dot"
                >
                  <Avatar alt="Remy Sharp" src={defaultProfile} />
                </StyledBadge>
              </AvatarGroup>
              <img
                src={FlagRedIcon}
                className={classes.flagIcon}
                alt="flag red"
              />
            </div>
          </div>
          <div>
            <img
              src={ActionIcon}
              className={classes.copyIcon}
              alt="copy icon"
            />
          </div>
        </Grid>
        <Grid id="tab_concept_task" className="pl_pr-0" item xs={12}>
          <TabContext value={valueLeft} id="tab_concept_modal">
            <AppBar position="static" className="plr-45">
              <TabList
                onChange={handleChangeLeft}
                aria-label="simple tabs example"
              >
                <Tab label="Overview" value="1" />
                <Tab label="Sub-Campaign" value="2" />
                <Tab label="Tasks" value="3" />
                <Tab label="Timelog" value="4" />
              </TabList>
            </AppBar>
            <TabPanel
              id="overview_task_concept_modal"
              className="tab_panel_padding mb-5"
              value="1"
            >
              <Grid className="plr-45 mb-5" container spacing={3}>
                <Grid item xs={4}>
                  <span className="task_concept_overview_left">Concept</span>
                </Grid>
                <Grid item xs={6}>
                  <span className="task_concept_overview_right">
                    Milo VN Teens{' '}
                    <img
                      src={CopyIcon}
                      className="copy_icon--concept"
                      alt="copy icon"
                    />
                  </span>
                </Grid>
                <Grid className="padding_top-0" item xs={12}>
                  <hr />
                </Grid>

                <Grid item xs={4}>
                  <span className="task_concept_overview_left">
                    Partner Group
                  </span>
                </Grid>
                <Grid item xs={6}>
                  <span className="task_concept_overview_right_border">
                    Lorem ipsum
                  </span>
                </Grid>
                <Grid className="padding_top-0" item xs={12}>
                  <hr />
                </Grid>

                <Grid item xs={4}>
                  <span className="task_concept_overview_left">
                    Partner Node
                  </span>
                </Grid>
                <Grid item xs={6}>
                  <span className="task_concept_overview_right_border">
                    Lorem ipsum
                  </span>
                </Grid>
                <Grid className="padding_top-0" item xs={12}>
                  <hr />
                </Grid>

                <Grid item xs={4}>
                  <span className="task_concept_overview_left">
                    Launched Date
                  </span>
                </Grid>
                <Grid item xs={6}>
                  <span className="task_concept_overview_right">
                    11Aug2021 17:31:34
                  </span>
                </Grid>
                <Grid className="padding_top-0" item xs={12}>
                  <hr />
                </Grid>

                <Grid item xs={4}>
                  <span className="task_concept_overview_left">
                    Total Logged Hours
                  </span>
                </Grid>
                <Grid item xs={6}>
                  <span className="task_concept_overview_right">04:19</span>
                </Grid>
                <Grid className="padding_top-0" item xs={12}>
                  <hr />
                </Grid>

                <Grid item xs={4}>
                  <span className="task_concept_overview_left">
                    Additional Info
                  </span>
                </Grid>
                <Grid item xs={6}>
                  <span className="task_concept_overview_right">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore...
                  </span>
                </Grid>
              </Grid>

              <Grid id="tab_concept_task_2" item xs={12}>
                <TabContext value={valueRight} id="tab_concept_modal">
                  <AppBar position="static">
                    <TabList
                      onChange={handleChangeRight}
                      aria-label="simple tabs example"
                      className="concept_task_right_bg_tabs"
                    >
                      <Tab label="Discussion" value="1" />
                      <Tab label="Activity Log" value="2" />
                      <Tab label="File" value="3" />
                    </TabList>
                  </AppBar>
                  <TabPanel
                    id="overview_task_concept_modal"
                    className="tab_panel_padding"
                    value="1"
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <input
                          placeholder="Write an update..."
                          type="text"
                          className="input_update"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Paper className="post_update_task_mod" elevation={0}>
                          <div className="container_post_mod_task_concept">
                            <div className="d-flex--between">
                              <div>
                                <StyledBadge
                                  overlap="circular"
                                  anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                  }}
                                  variant="dot"
                                >
                                  <Avatar
                                    alt="Remy Sharp"
                                    src={defaultProfile}
                                  />
                                </StyledBadge>

                                <span className="title_post_mod_task_concept">
                                  John Wick
                                </span>
                              </div>
                            </div>
                            <p className="desc_post_mod_task_concept">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim
                            </p>
                            <div className="d-flex-right">
                              <img
                                src={TimeIcon}
                                className={classes.eyesIcon}
                                alt="Time icon"
                              />
                              <p>25m</p>
                            </div>
                          </div>
                          <Grid
                            container
                            className={classes.borderLikeReplyContainer}
                          >
                            <Grid
                              item
                              xs={6}
                              className={classes.containerLikedIcon}
                            >
                              <ThumbUpIcon className={classes.likedIcon} />
                              <span className="like_reply_mod_text">Like</span>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              className={classes.containerReplyIcon}
                            >
                              <ReplyIcon className={classes.replyIcon} />
                              <span className="like_reply_mod_text mt-3px">
                                Reply
                              </span>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12}>
                        <Paper className="post_update_task_mod" elevation={0}>
                          <div className="container_post_mod_task_concept">
                            <StyledBadge
                              overlap="circular"
                              anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                              variant="dot"
                            >
                              <Avatar alt="Remy Sharp" src={defaultProfile} />
                            </StyledBadge>

                            <span className="title_post_mod_task_concept">
                              John Wick
                            </span>

                            <p className="desc_post_mod_task_concept">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim
                            </p>
                            <div className="d-flex-right">
                              <img
                                src={LikedVioletIcon}
                                className={classes.eyesIcon}
                                alt="eyes icon"
                              />
                              <p>5 likes</p>
                            </div>
                          </div>
                          <Grid
                            container
                            className={classes.borderLikeReplyContainer}
                          >
                            <Grid
                              item
                              xs={6}
                              className={classes.containerLikedIcon}
                            >
                              <ThumbUpIcon className={classes.likedIcon} />
                              <span className="like_reply_mod_text">Like</span>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              className={classes.containerReplyIcon}
                            >
                              <ReplyIcon className={classes.replyIcon} />
                              <span className="like_reply_mod_text mt-3px">
                                Reply
                              </span>
                            </Grid>
                          </Grid>
                          <Grid container className="p-25px">
                            <Grid item xs={1}>
                              <StyledBadge
                                overlap="circular"
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                                }}
                                variant="dot"
                              >
                                <Avatar alt="Remy Sharp" src={defaultProfile} />
                              </StyledBadge>
                            </Grid>
                            <Grid item xs={11}>
                              <div className="title_comment">
                                {' '}
                                <span className="mr-10px">Juan Gomez</span>{' '}
                                <img
                                  src={TimeIcon}
                                  className="absolute"
                                  alt="time icon"
                                />{' '}
                                <span className="ml-25px">25m</span>{' '}
                              </div>
                              <div className="desc_comment">
                                <span>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit
                                </span>
                              </div>
                              <div className="comment_container--icon">
                                <p className="font-roboto text_primary-gray comment_message_number--text">
                                  2
                                </p>
                                <img
                                  className="comment_message_icon--size"
                                  src={MessageIcon}
                                  alt="message icon"
                                />
                                <img
                                  src={LineVertical}
                                  className="line_vertical_icon--margin"
                                  alt="line vertical icon"
                                />
                                <img
                                  src={LikedVioletIcon}
                                  className="liked_violet--size"
                                  alt="line vertical icon"
                                />
                              </div>
                            </Grid>

                            <Grid item xs={1}>
                              <StyledBadge
                                overlap="circular"
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                                }}
                                variant="dot"
                              >
                                <Avatar alt="Remy Sharp" src={defaultProfile} />
                              </StyledBadge>
                            </Grid>
                            <Grid item xs={11}>
                              <div className="title_comment">
                                {' '}
                                <span className="mr-10px">
                                  Dwayne Johnson
                                </span>{' '}
                                <img
                                  src={TimeIcon}
                                  className="absolute"
                                  alt="time icon"
                                />{' '}
                                <span className="ml-25px">25m</span>{' '}
                              </div>
                              <div className="desc_comment">
                                <span>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit
                                </span>
                              </div>
                              <div className="comment_container--icon">
                                <p className="font-roboto text_primary-gray comment_message_number--text">
                                  2
                                </p>
                                <img
                                  className="comment_message_icon--size"
                                  src={MessageIcon}
                                  alt="message icon"
                                />
                                <img
                                  src={LineVertical}
                                  className="line_vertical_icon--margin"
                                  alt="line vertical icon"
                                />
                                <img
                                  src={LikedWhiteIcon}
                                  className="liked_violet--size"
                                  alt="line vertical icon"
                                />
                              </div>
                            </Grid>

                            <Grid item xs={1}>
                              <StyledBadge
                                overlap="circular"
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                                }}
                                variant="dot"
                              >
                                <Avatar alt="Remy Sharp" src={defaultProfile} />
                              </StyledBadge>
                            </Grid>
                            <Grid item xs={11}>
                              <TextField
                                id="outlined-multiline-static"
                                multiline
                                className={classes.textareaReply}
                                rows={4}
                                placeholder="| Type here..."
                                variant="outlined"
                              />
                              <div className="d-flex--between">
                                <div className="mt-10px d-flex">
                                  <div className="d-flex">
                                    <img
                                      className="h-20px w-auto"
                                      src={AttachIcon}
                                      alt="icon"
                                    />{' '}
                                    <p className="mt-0 text_reply--mod">
                                      Add files
                                    </p>
                                  </div>
                                  <div className="d-flex">
                                    <img
                                      className="h-20px w-auto"
                                      src={SmileIcon}
                                      alt="icon"
                                    />{' '}
                                    <p className="mt-0 text_reply--mod">
                                      Emoji
                                    </p>
                                  </div>
                                  <div className="d-flex">
                                    <img
                                      className="h-20px w-auto"
                                      src={MentionIcon}
                                      alt="icon"
                                    />{' '}
                                    <p className="mt-0 text_reply--mod">
                                      Mention
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-10px">
                                  <Button variant="contained" color="primary">
                                    Reply
                                  </Button>
                                </div>
                              </div>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value="2">
                    <table id="timelog">
                      <thead>
                        <tr>
                          <td>Time</td>
                          <td>Team</td>
                          <td>User</td>
                          <td>Description</td>
                        </tr>
                      </thead>
                      <tr>
                        <td>2021-05-18 18:23:12</td>
                        <td>Design</td>
                        <td>John Wick</td>
                        <td>
                          <span className="text_primary-violet">
                            Change the status...
                          </span>
                        </td>
                      </tr>
                    </table>
                  </TabPanel>
                  <TabPanel value="3" id="asset_tab">
                    <Grid container spacing={1}>
                      <Grid
                        item
                        xs={12}
                        className={classes.downloadAllContainer}
                      >
                        <img
                          className="download_button"
                          src={DownloadIconGray}
                          alt="download icon gray"
                        />
                        <span>Download All</span>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={4}>
                        <img
                          src={FilesDummyImage}
                          alt="sample"
                          className="w-96"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <img
                          src={FilesDummyImage}
                          alt="sample"
                          className="w-96"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <img
                          src={FilesDummyImage}
                          alt="sample"
                          className="w-96"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <img
                          src={FilesDummyImage}
                          alt="sample"
                          className="w-96"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <img
                          src={FilesDummyImage}
                          alt="sample"
                          className="w-96"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <img
                          src={FilesDummyImage}
                          alt="sample"
                          className="w-96"
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel
                    value="4"
                    id="overview_task_concept_modal"
                    className="tab_panel_padding"
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <input
                          placeholder="Write an update..."
                          type="text"
                          className="input_update"
                        />
                        {/* <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      highlightDates={[subDays(new Date(), 7), addDays(new Date(), 7)]}
      placeholderText="This highlights a week ago and a week from today"
    /> */}
                      </Grid>
                      <Grid item xs={12}>
                        <Paper className="post_update_task_mod" elevation={0}>
                          <div className="container_post_mod_task_concept">
                            <div className="d-flex--between">
                              <div>
                                <StyledBadge
                                  overlap="circular"
                                  anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                  }}
                                  variant="dot"
                                >
                                  <Avatar
                                    alt="Remy Sharp"
                                    src={defaultProfile}
                                  />
                                </StyledBadge>

                                <span className="title_post_mod_task_concept">
                                  John Wick
                                </span>
                              </div>
                              <div></div>
                            </div>
                            <p className="desc_post_mod_task_concept">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim
                            </p>
                            <div className="d-flex-left">
                              <img
                                src={ClockRed}
                                className="clock-size"
                                alt="Clock Green icon"
                              />
                              <Button
                                variant="contained"
                                className="btn_google_meet"
                                color="primary"
                              >
                                Ad-Weave Weekly Meet
                              </Button>
                              <span className="date_dev_consultation_txt">
                                Sept 22,2021 (5-6PM)
                              </span>
                            </div>
                          </div>
                        </Paper>
                      </Grid>

                      <Grid item xs={12}>
                        <Paper className="post_update_task_mod" elevation={0}>
                          <div className="container_post_mod_task_concept">
                            <div className="d-flex--between">
                              <div>
                                <StyledBadge
                                  overlap="circular"
                                  anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                  }}
                                  variant="dot"
                                >
                                  <Avatar
                                    alt="Remy Sharp"
                                    src={defaultProfile}
                                  />
                                </StyledBadge>

                                <span className="title_post_mod_task_concept">
                                  John Wick
                                </span>
                              </div>
                              <div></div>
                            </div>
                            <p className="desc_post_mod_task_concept">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim
                            </p>
                            <div className="d-flex-left">
                              <img
                                src={ClockGreen}
                                className="clock-size"
                                alt="Clock Green icon"
                              />
                              <Button
                                variant="contained"
                                className="btn_google_meet"
                                color="primary"
                              >
                                Ad-Weave Weekly Meet
                              </Button>
                              <span className="date_dev_consultation_txt">
                                Sept 22,2021 (5-6PM)
                              </span>
                            </div>
                          </div>
                        </Paper>
                      </Grid>
                    </Grid>
                  </TabPanel>
                </TabContext>
              </Grid>
            </TabPanel>
            <TabPanel id="timelog_tab" value="2">
              <div className="table_container plr-45">
                <table id="project_table_campaign">
                  <thead>
                    <tr>
                      <th className="text-left">
                        <span className={classes.campaignTask}>Campaigns</span>
                      </th>
                      <th>
                        <span className={classes.conceptTextTable}>
                          Channel
                        </span>
                      </th>
                      <th>
                        <span className={classes.conceptTextTable}>Tags</span>
                      </th>
                      <th>
                        <span className={classes.conceptTextTable}>
                          Launched Date
                        </span>
                      </th>
                      <th>
                        <span className={classes.conceptTextTable}>
                          Members
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="borderLeftRightYellow">
                      <td className="content w25">
                        <div className="spaceBetween">
                          <div>Concept Design</div>
                        </div>
                      </td>
                      <td className="content w15">Sony</td>
                      <td className="content">
                        <Chip
                          className={classes.chipContainer}
                          label="Tags"
                          onDelete={handleDelete}
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          className={classes.chipContainer}
                          label="Tags"
                          onDelete={handleDelete}
                          color="primary"
                          variant="outlined"
                        />
                      </td>
                      <td className="content">10Aug2021 00:00:00 </td>
                      <td className="content">
                        <AvatarGroup
                          className={classes.avatarGroupCenter}
                          max={4}
                        >
                          <Avatar alt="Remy Sharp" src={defaultProfile} />
                          <Avatar alt="Travis Howard" src={defaultProfile} />
                        </AvatarGroup>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabPanel>
            <TabPanel id="revision_tab" value="3">
              <div className="table_container plr-45">
                <table id="project_table_campaign">
                  <thead>
                    <tr>
                      <th className="text-left">
                        <span className={classes.campaignTaskRed}>
                          Campaigns
                        </span>
                      </th>
                      <th>
                        <span className={classes.conceptTextTable}>Status</span>
                      </th>

                      <th>
                        <span className={classes.conceptTextTable}>
                          Date Created
                        </span>
                      </th>
                      <th>
                        <span className={classes.conceptTextTable}>
                          Due Date
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="borderLeftRightRed">
                      <td className="content w25">
                        <div className="spaceBetween">
                          <div>Concept Design</div>
                        </div>
                      </td>
                      <td className="content w15 bg_green_txt_white">
                        In Progress
                      </td>

                      <td className="content">10Aug2021 00:00:00 </td>
                      <td className="content">10Aug2021 00:00:00 </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </div>
  );
};

export default CampaignTaskView;
