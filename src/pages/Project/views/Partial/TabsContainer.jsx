import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import 'assets/css/partial/overide.css';
import MainTableIcon from 'assets/images/icons/main_table.png';
import KanbanIcon from 'assets/images/icons/kanban.png';
import GraphsIcon from 'assets/images/icons/graphs.png';
import MilestonesIcon from 'assets/images/icons/milestone.png';
import SearchIcon from 'assets/images/icons/search.png';
import ExportIcon from 'assets/images/icons/export.svg';
import FilterIcon from 'assets/images/icons/filter.png';
import NotesIcon from 'assets/images/icons/notes.png';
import Avatar from '@mui/material/Avatar';
import MainTable from '../MainTable';
import Kanban from '../Kanban';
import Graphs from '../Graphs';
import Milestone from '../Milestone';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  iconTabs: {
    height: '30px',
    width: 'auto',
    marginRight: '10px',
  },
  dflex: {
    display: 'flex',
  },
  boxWrapper: {
    backgroundColor: '#F4F4F4',
    padding: '5px 22px',
    borderRadius: '5px',
    border: '1px solid #200E32',
    marginRight: '15px',
  },
  infoTitleText: {
    fontSize: '20px',
    fontWeight: '700',
  },
  iconLessMore: {
    marginTop: '10px',
    border: '1px solid #FFFFFF',
    boxShadow: '0 3px 10px rgb(0 0 0 / 20%);',
  },
  dflexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  dividerCustom: {
    height: '1px',
    width: '100%',
    marginBottom: '15px',
    marginTop: '15px',
  },
  // marginGrid: {
  //   marginTop:'20px',
  //   marginLeft:'15px'
  // },
  iconWrapperActive: {
    display: 'flex',
    marginRight: '30px',
    backgroundColor: 'red',
  },
  iconWrapper: {
    display: 'flex',
    marginRight: '30px',
  },
  iconSize: {
    height: '27px',
    marginRight: '9px',
    objectFit: 'contain',
  },
  buttonAdjustmentWrapper: {
    marginTop: '-11px',
  },
  menuCustomize: {
    width: '300px',
  },
  notesWrapper: {
    backgroundColor: '#F5F6F8',
    borderRadius: '5px',
    paddingTop: '10px',
  },
  closeIcon: {
    position: 'absolute',
    right: '90px',
    color: 'red',
    fontSize: '20px',
  },
  notesDescription: {
    paddingTop: '23px',
    paddingRight: '25px',
    paddingLeft: '25px',
  },
  notesDate: {
    fontSize: '13px',
    marginTop: '0px',
    textAlign: 'right',
  },
}));

const TabsContainer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElFilter, setAnchorElFilter] = React.useState(null);
  const [openCampaign, setOpenCampaign] = React.useState(false);
  const [openNotes, setOpenNotes] = React.useState(false);

  const handleClick = (event, index, type) => {
    if (type == 'export') {
      setSelectedIndex(index);
      setAnchorEl(event.currentTarget, 'export');
    } else {
      setSelectedIndex(index);
      setAnchorElFilter(event.currentTarget, 'filter');
    }
  };

  const handleClose = () => {
    setAnchorEl(null);

    setAnchorElFilter(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar id="tabsWrapper" position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="full width tabs example"
        >
          <Tab
            label="Main Table"
            icon={
              <Avatar
                className={classes.iconTabs}
                alt="main table"
                src={MainTableIcon}
              />
            }
            {...a11yProps(0)}
          />
          <Tab
            label="Kanban"
            icon={
              <Avatar
                className={classes.iconTabs}
                alt="kanban"
                src={KanbanIcon}
              />
            }
            {...a11yProps(1)}
          />
          <Tab
            label="Graphs"
            icon={
              <Avatar
                className={classes.iconTabs}
                alt="graphs"
                src={GraphsIcon}
              />
            }
            {...a11yProps(2)}
          />
          <Tab
            label="Milestone"
            icon={
              <Avatar
                className={classes.iconTabs}
                alt="milestone"
                src={MilestonesIcon}
              />
            }
            {...a11yProps(3)}
          />
        </Tabs>
      </AppBar>
      <div className={classes.dflexBetween}>
        <div className={classes.dflex}>
          <div className={classes.iconWrapper}>
            <Button>
              <img
                className={classes.iconSize}
                alt="main table"
                src={SearchIcon}
              />
              <p>Search</p>
            </Button>
          </div>
          <div className={classes.iconWrapper}>
            <Button
              aria-controls="export-menu"
              aria-haspopup="true"
              onClick={(event) => handleClick(event, 12, 'export')}
            >
              <img
                className={classes.iconSize}
                alt="main table"
                src={ExportIcon}
              />
              <p>Export</p>
            </Button>
            <Menu
              id="export-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>HTML</MenuItem>
              <MenuItem onClick={handleClose}>CSV</MenuItem>
              <MenuItem onClick={handleClose}>XLS</MenuItem>
              <MenuItem onClick={handleClose}>PDF</MenuItem>
            </Menu>
          </div>
          <div className={classes.iconWrapper}>
            <Button
              aria-controls="filter-menu"
              aria-haspopup="true"
              onClick={(event) => handleClick(event, 11, 'filter')}
            >
              <img
                className={classes.iconSize}
                alt="main table"
                src={FilterIcon}
              />
              <p>Filter</p>
            </Button>
            <Menu
              id="filter-menu"
              anchorElFilter={anchorElFilter}
              keepMounted
              open={Boolean(anchorElFilter)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Not Started</MenuItem>
              <MenuItem onClick={handleClose}>In CS</MenuItem>
              <MenuItem onClick={handleClose}>In Design</MenuItem>
              <MenuItem onClick={handleClose}>In Production</MenuItem>
              <MenuItem onClick={handleClose}>In QA</MenuItem>
              <MenuItem onClick={handleClose}>With Client</MenuItem>
              <MenuItem onClick={handleClose}>On Hold</MenuItem>
            </Menu>
          </div>
          <div className={classes.iconWrapper}>
            <Button onClick={() => setOpenNotes(!openNotes)}>
              <img
                className={classes.iconSize}
                alt="main table"
                src={NotesIcon}
              />
              <p>Notes</p>
            </Button>
          </div>
        </div>
        <div>
          <div className={classes.iconWrapper}>
            <IconButton
              className={classes.iconLessMore}
              aria-label="expand row"
              size="small"
              onClick={() => setOpenCampaign(!openCampaign)}
            >
              {openCampaign ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </div>
        </div>
      </div>
      <Collapse in={openNotes} timeout="auto" unmountOnExit>
        <div className="container mt-5">
          <Grid container className={classes.marginGrid}>
            <Grid item xs={2}>
              <div className={classes.infoTitleText}>John Doe</div>
            </Grid>
            <Grid item xs={10} className={classes.notesWrapper}>
              <CloseIcon className={classes.closeIcon} />
              <div className={classes.notesDescription}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu.
                <p className={classes.notesDate}>29/09/2021</p>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.dividerCustom} />
            </Grid>
          </Grid>
        </div>
      </Collapse>

      <Collapse in={openCampaign} timeout="auto" unmountOnExit>
        <div className="container">
          <Grid container spacing={2} className={classes.marginGrid}>
            <Grid item xs={2}>
              <div className={classes.infoTitleText}>Concept</div>
            </Grid>
            <Grid item xs={10}>
              <div className="container">Lucy Hudson Evans</div>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.dividerCustom} />
            </Grid>

            <Grid item xs={2}>
              <div className={classes.infoTitleText}>Objectives</div>
            </Grid>
            <Grid item xs={10}>
              <div className={classes.dflex}>
                <Box className={classes.boxWrapper}>Awareness</Box>
                <Box className={classes.boxWrapper}>Consideration</Box>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.dividerCustom} />
            </Grid>

            <Grid item xs={2}>
              <div className={classes.infoTitleText}>Products/Markets</div>
            </Grid>
            <Grid item xs={10}>
              <div className={classes.dflex}>
                <Box className={classes.boxWrapper}>
                  Dancow FortiGro Indonesia
                </Box>
                <Box className={classes.boxWrapper}>Nestle</Box>
                <Box className={classes.boxWrapper}>Dancow</Box>
                <Box className={classes.boxWrapper}>APAC</Box>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.dividerCustom} />
            </Grid>

            <Grid item xs={2}>
              <div className={classes.infoTitleText}>Language</div>
            </Grid>
            <Grid item xs={10}>
              <div className={classes.dflex}>
                <Box className={classes.boxWrapper}>Indonesian</Box>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.dividerCustom} />
            </Grid>

            <Grid item xs={2}>
              <div className={classes.infoTitleText}>Additional Info</div>
            </Grid>
            <Grid item xs={10}>
              <div className={classes.dflex}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.dividerCustom} />
            </Grid>
          </Grid>
        </div>
      </Collapse>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <MainTable />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Kanban />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Graphs />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Milestone />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

export default TabsContainer;
