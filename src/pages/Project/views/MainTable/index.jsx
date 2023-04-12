import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ProgressCircle from 'assets/images/progress.png';
import LinearProgress from '@mui/material/LinearProgress';
import ToolTipImage from 'assets/images/label_time.png';
import ClockIcon from 'assets/images/clock.png';
import Avatar from '@mui/material/Avatar';
import defaultProfile from 'assets/images/user1.svg';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import AvatarGroup from '@mui/material/AvatarGroup';
import lineCollapse from 'assets/icons/line.png';
import PlusIcon from 'assets/icons/plus.png';
import MinusIcon from 'assets/icons/minus.png';
import Link from '@mui/material/Link';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import ConceptTaskView from '../ConceptTaskView';
import CampaignTaskView from '../CampaignTaskView';
import Drawer from '@mui/material/Drawer';

const useStyles = makeStyles({
  wrapperProgressSection: {
    padding: '40px 16px',
    borderLeft: '15px solid #29125F',
    boxShadow: '0 0px 4px rgb(0 0 0 / 90%)',
    borderRight: '15px solid #E5E9F2',
    display: 'flex',
  },
  titleProgress: {
    color: '#29125F',
    fontWeight: 'bold',
    fontSize: '27px',
    letterSpacing: '-2px',
  },
  wrapperProgressPink: {
    backgroundColor: '#DF3C76',
    display: 'inline-block',
    borderRadius: '50%',
    width: '37px',
    height: '37px',
    textAlign: 'center',
  },
  wrapperProgressGray: {
    backgroundColor: '#C4C4C4',
    display: 'inline-block',
    borderRadius: '50%',
    width: '37px',
    height: '37px',
    textAlign: 'center',
  },
  progressSpan: {
    verticalAlign: 'middle',
    color: 'white',
  },
  progressLabel: {
    margin: '0px 0px 0px 15px',
    fontSize: '15px',
  },
  linearProgress: {
    width: '100px',
    height: '5px',
    marginRight: '15px',
    marginLeft: '15px',
    borderRadius: '100px',
  },
  clockWrap: {
    position: 'absolute',
    top: '10px',
    fontSize: '14px',
    color: 'white',
    left: '20px',
  },
  clockAllign: {
    marginRight: '5px',
  },
  clockAllignSpan: {
    marginTop: '-34.5px',
    marginLeft: '17px',
  },
  avatarContainer: {
    display: 'flex',
    padding: '10px 20px !important',
    textAlign: 'center',
  },
  avatarContainer_concept: {
    display: 'flex',
    padding: '14px 20px !important',
    textAlign: 'center',
  },
  chipContainer: {
    marginLeft: '5px',
    backgroundColor: '#29125F',
    color: 'white',
    borderRadius: '6px',
  },
  conceptTask: {
    color: '#A03DC1',
    fontSize: '27px',
    fontWeight: 'bold',
    letterSpacing: '-1px',
  },
  campaignTask: {
    color: '#EB474D',
    fontSize: '27px',
    fontWeight: 'bold',
    letterSpacing: '-1px',
  },
  conceptTextTable: {
    fontSize: '20px',
    letterSpacing: '-1px',
    fontWeight: 'normal',
  },
  avatarContain: {
    height: '35px',
    width: '35px',
    marginRight: '3px',
  },
  avatarGroupCenter: {
    justifyContent: 'center',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '70%',
  },
  paper: {
    backgroundColor: 'white',
    height: '90%',
    width: '90%',
    boxShadow: '0 3px 7px rgba(0, 0, 0, 0.3)',
    borderRadius: '25px',
  },
});

function LinearProgressWithLabel(props) {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <div className="tooltip-on-hover">
        <div className="p-5">
          <LinearProgress
            className={classes.linearProgress}
            variant="determinate"
            {...props}
          />
        </div>
      </div>
      <div className="tooltip">
        <div className={classes.clockWrap}>
          <img className={classes.clockAllign} src={ClockIcon} alt="tooltip" />
          <p className={classes.clockAllignSpan}>00 : 00 : 00</p>
        </div>
        <img src={ToolTipImage} alt="tooltip" />
      </div>
    </Box>
  );
}

const MainTable = () => {
  const classes = useStyles();
  const [openConcept, setOpenConcept] = React.useState(false);
  const [openCampaign, setOpenCampaign] = React.useState(false);
  const [progress1, setProgress1] = React.useState(0);
  const [progress2, setProgress2] = React.useState(0);
  const [progress3, setProgress3] = React.useState(0);
  const [progress4, setProgress4] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown') {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className="w-100"
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <CampaignTaskView />
    </div>
  );
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setInterval(() => setProgress1(Math.floor(50)), 3000);
    setInterval(() => setProgress2(Math.floor(0)), 3000);
    setInterval(() => setProgress3(Math.floor(0)), 3000);
    setInterval(() => setProgress4(Math.floor(0)), 3000);
  }, []);

  return (
    <Box width="100%" height="100vh">
      <div id="root"></div>
      <h2 className={classes.titleProgress}>Concept Progress</h2>

      <div className={classes.wrapperProgressSection}>
        <div className={classes.wrapperProgressPink}>
          <img
            className={classes.progressSpan}
            src={ProgressCircle}
            alt="Circle Progress"
          />
        </div>
        <span className={classes.progressLabel}>Concept Design</span>
        <LinearProgressWithLabel value={progress1} />

        <div className={classes.wrapperProgressGray}>
          <span className={classes.progressSpan}>2</span>
        </div>
        <span className={classes.progressLabel}>Concept Build</span>
        <LinearProgressWithLabel value={progress2} />

        <div className={classes.wrapperProgressGray}>
          <span className={classes.progressSpan}>3</span>
        </div>
        <span className={classes.progressLabel}>Design QA</span>
        <LinearProgressWithLabel value={progress3} />

        <div className={classes.wrapperProgressGray}>
          <span className={classes.progressSpan}>4</span>
        </div>
        <span className={classes.progressLabel}>Concept QA</span>
        <LinearProgressWithLabel value={progress4} />
      </div>

      <div className="table_container">
        <table id="project_table_campaign">
          <thead>
            <tr>
              <th className="text-left">
                <span className={classes.campaignTask}>
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                  Campaigns
                </span>
              </th>
              <th>
                <span className={classes.conceptTextTable}>Partner</span>
              </th>
              <th>
                <span className={classes.conceptTextTable}>Tags</span>
              </th>
              <th>
                <span className={classes.conceptTextTable}>Delivery Date</span>
              </th>
              <th>
                <span className={classes.conceptTextTable}>Members</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="borderLeftRightViolet">
              <td className="content w25">
                <div className="spaceBetween">
                  <div>
                    <Checkbox
                      className="ml16"
                      color="primary"
                      defaultChecked
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    {['right'].map((anchor) => (
                      <React.Fragment key={anchor}>
                        <Link
                          className="pointer "
                          onClick={toggleDrawer(anchor, true)}
                        >
                          Concept Design
                        </Link>
                        <Drawer
                          id="main_table_campaign_task_view"
                          anchor={anchor}
                          open={state[anchor]}
                          onClose={toggleDrawer(anchor, false)}
                        >
                          {list(anchor)}
                        </Drawer>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="mt-5">
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpenCampaign(!openCampaign)}
                    >
                      {openCampaign ? (
                        <img src={MinusIcon} alt="minus" />
                      ) : (
                        <img src={PlusIcon} alt="plus" />
                      )}
                    </IconButton>
                  </div>
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
                <AvatarGroup className={classes.avatarGroupCenter} max={4}>
                  <Avatar alt="Remy Sharp" src={defaultProfile} />
                  <Avatar alt="Travis Howard" src={defaultProfile} />
                </AvatarGroup>
              </td>
            </tr>
            <tr className="collapse_table_data">
              <td colSpan={6} className="collapse_table_td">
                <Collapse in={openCampaign} timeout="auto" unmountOnExit>
                  <img
                    src={lineCollapse}
                    className="line_collapse"
                    alt="line"
                  />
                  <Table
                    id="project_table_collapse_campaign"
                    size="small"
                    aria-label="purchases"
                  >
                    <TableBody>
                      <tr>
                        <td className="content w23_5">
                          <Checkbox
                            className="ml16"
                            color="primary"
                            defaultChecked
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                          Concept Design
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
                    </TableBody>
                  </Table>
                </Collapse>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="table_container">
        <table id="project_table">
          <thead>
            <tr>
              <th className="text-left">
                <span className={classes.conceptTask}>
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                  Tasks
                </span>
              </th>
              <th>
                <span className={classes.conceptTextTable}>Partner Group</span>
              </th>
              <th>
                <span className={classes.conceptTextTable}>Tags</span>
              </th>
              <th>
                <span className={classes.conceptTextTable}>Delivery Date</span>
              </th>
              <th>
                <span className={classes.conceptTextTable}>Members</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="borderLeftRightViolet">
              <td className="content w25">
                <div className="spaceBetween">
                  <Link className="pointer" onClick={handleOpen}>
                    <div>
                      <Checkbox
                        className="ml16"
                        color="primary"
                        defaultChecked
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      />
                      Concept Design
                    </div>
                  </Link>
                  <div className="mt-5">
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpenConcept(!openConcept)}
                    >
                      {openConcept ? (
                        <img src={MinusIcon} alt="minus" />
                      ) : (
                        <img src={PlusIcon} alt="plus" />
                      )}
                    </IconButton>
                  </div>
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
                <AvatarGroup className={classes.avatarGroupCenter} max={4}>
                  <Avatar alt="Remy Sharp" src={defaultProfile} />
                  <Avatar alt="Travis Howard" src={defaultProfile} />
                </AvatarGroup>
              </td>
            </tr>
            <tr className="collapse_table_data">
              <td colSpan={6} className="collapse_table_td">
                <Collapse in={openConcept} timeout="auto" unmountOnExit>
                  <img
                    src={lineCollapse}
                    className="line_collapse"
                    alt="line"
                  />
                  <Table
                    id="project_table_collapse"
                    size="small"
                    aria-label="purchases"
                  >
                    <TableBody>
                      <tr>
                        <td className="content w23_5">
                          <Checkbox
                            className="ml16"
                            color="primary"
                            defaultChecked
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                          Concept Design
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
                            max={42}
                          >
                            <Avatar alt="Remy Sharp" src={defaultProfile} />
                            <Avatar alt="Travis Howard" src={defaultProfile} />
                          </AvatarGroup>
                        </td>
                      </tr>
                    </TableBody>
                  </Table>
                </Collapse>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <ConceptTaskView />
          </div>
        </Fade>
      </Modal>
    </Box>
  );
};

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default MainTable;
