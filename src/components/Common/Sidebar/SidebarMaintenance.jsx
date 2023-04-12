import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import maintenanceBanner from 'assets/images/maintenance.png';
import { Link, useLocation } from 'react-router-dom';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import TaskType from 'pages/Maintenance/TaskType';
import User from 'pages/Maintenance/views/User';
import TaskCategory from 'pages/Maintenance/TaskCategory';
import Teams from 'pages/Maintenance/Teams';
import TaskStatus from 'pages/Maintenance/TaskStatus';
import PresetTasks from 'pages/Maintenance/views/PresetTasks';
import RolesIcon from 'assets/icons/roles.png';
import TaskStatusIcon from 'assets/icons/task_status.png';
import PresetTasksIcon from 'assets/icons/preset_tasks.png';
import TaskCategoryIcon from 'assets/icons/task_category.png';
import UserIcon from 'assets/icons/user.png';

const drawerWidth = 280;
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
    marginLeft: 0,
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: '13px',
  },
  navContainer: {
    padding: '20px',
  },
  noDecoration: {
    textDecoration: 'none',
    color: 'black',
  },
}));

const SidebarMaintenance = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
            size="large"
          >
            <ChevronRightIcon className={classes.iconSlider} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <div className={classes.spaceBetween}>
            <h4>Maintenance</h4>
            <IconButton onClick={handleDrawerClose} size="large">
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon className={classes.iconColor} />
              ) : (
                <ChevronRightIcon className={classes.iconColor} />
              )}
            </IconButton>
          </div>
        </div>
        <img src={maintenanceBanner} alt="Banner" />
        <Divider />
        <List className={classes.navContainer} component="nav">
          <Link className={classes.noDecoration} to="/maintenance/user">
            <ListItem
              button
              selected={pathname === '/maintenance/user'}
              onClick={(event) =>
                handleListItemClick(event, 'maintenance-user')
              }
            >
              <ListItemIcon>
                <img
                  src={UserIcon}
                  alt="user icon"
                  className={
                    pathname === '/maintenance/user' ? classes.active : ''
                  }
                />
              </ListItemIcon>
              <ListItemText primary="User" />
            </ListItem>
          </Link>
          <Link className={classes.noDecoration} to="/maintenance/task-type">
            <ListItem
              button
              selected={pathname === '/maintenance/task-type'}
              onClick={(event) => handleListItemClick(event, 12)}
            >
              <ListItemIcon>
                <TableChartOutlinedIcon
                  className={
                    pathname === '/maintenance/task-type' ? classes.active : ''
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Task Type" />
            </ListItem>
          </Link>
          <Link
            className={classes.noDecoration}
            to="/maintenance/task-category"
          >
            <ListItem
              button
              selected={pathname === '/maintenance/task-category'}
            >
              <ListItemIcon>
                <img
                  src={TaskCategoryIcon}
                  alt="task Category icon"
                  className={
                    pathname === '/maintenance/task-category'
                      ? classes.active
                      : ''
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Task Category" />
            </ListItem>
          </Link>

          <Link className={classes.noDecoration} to="/maintenance/teams">
            <ListItem button selected={pathname === '/maintenance/teams'}>
              <ListItemIcon>
                <GroupOutlinedIcon
                  className={
                    pathname === '/maintenance/teams' ? classes.active : ''
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Teams" />
            </ListItem>
          </Link>

          <Link className={classes.noDecoration} to="/maintenance/roles">
            <ListItem button selected={pathname === '/maintenance/roles'}>
              <ListItemIcon>
                <img
                  src={RolesIcon}
                  alt="roles icon"
                  className={
                    pathname === '/maintenance/roles' ? classes.active : ''
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Roles" />
            </ListItem>
          </Link>
          <Link className={classes.noDecoration} to="/maintenance/task-status">
            <ListItem button selected={pathname === '/maintenance/task-status'}>
              <ListItemIcon>
                <img
                  src={TaskStatusIcon}
                  alt="task status icon"
                  className={
                    pathname === '/maintenance/task-status'
                      ? classes.active
                      : ''
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Task Status" />
            </ListItem>
          </Link>
          <Link className={classes.noDecoration} to="/maintenance/preset-tasks">
            <ListItem
              button
              selected={pathname === '/maintenance/preset-tasks'}
            >
              <ListItemIcon>
                <img
                  src={PresetTasksIcon}
                  alt="preset task icon"
                  className={
                    pathname === '/maintenance/preset-tasks'
                      ? classes.active
                      : ''
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Preset Tasks" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <Box
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Box
          className={
            pathname === '/maintenance/task-type' ? classes.show : classes.hide
          }
        >
          <TaskType />
        </Box>

        <Box
          className={
            pathname === '/maintenance/user' ? classes.show : classes.hide
          }
        >
          <User />
        </Box>

        <Box
          className={
            pathname === '/maintenance/task-category'
              ? classes.show
              : classes.hide
          }
        >
          <TaskCategory />
        </Box>

        <Box
          className={
            pathname === '/maintenance/teams' ? classes.show : classes.hide
          }
        >
          <Teams />
        </Box>

        <Box
          className={
            pathname === '/maintenance/task-status'
              ? classes.show
              : classes.hide
          }
        >
          <TaskStatus />
        </Box>
        <Box
          className={
            pathname === '/maintenance/preset-tasks'
              ? classes.show
              : classes.hide
          }
        >
          <PresetTasks />
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarMaintenance;
