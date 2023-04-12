import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import defaultProfile from 'assets/images/user1.svg';
import ChevronLeftIcon from '@mui/icons-material//ChevronLeft';
import ChevronRightIcon from '@mui/icons-material//ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PermIdentityOutlinedIcon from '@mui/icons-material//PermIdentityOutlined';
import TimelineIcon from '@mui/icons-material//Timeline';
import { Link, useLocation } from 'react-router-dom';
import FilterListIcon from '@mui/icons-material//FilterList';
import defaultBanner from 'assets/images/banner-default.png';
import Navbar from 'pages/Project/Partial/Navbar';
import SearchIcon from '@mui/icons-material//Search';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const drawerWidth = 320;
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
  appBarShift: {
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: drawerWidth,
    // transition: theme.transitions.create(['margin', 'width'], {
    //   easing: theme.transitions.easing.easeOut,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
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
  dividerCustom: {
    height: '2px',
    marginBottom: '5px',
    marginTop: '5px',
  },
  listItem: {
    paddingTop: '5px',
    paddingBottom: '5px',
  },
}));

const SidebarProject = () => {
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
    <div className={classes.root}>
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
            <h4>Project</h4>
            <IconButton onClick={handleDrawerClose} size="large">
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon className={classes.iconColor} />
              ) : (
                <ChevronRightIcon className={classes.iconColor} />
              )}
            </IconButton>
          </div>
        </div>

        <div>
          <img height="100px" width="100%" src={defaultBanner} alt="Banner" />
          <Avatar className={classes.avatarSub} src={defaultProfile} />
        </div>

        <List className={classes.navContainer} component="nav">
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <PermIdentityOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="John Wick" />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Designer" />
          </ListItem>
          <Divider className={classes.dividerCustom} />
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <FilterListIcon />
            </ListItemIcon>
            <ListItemText primary="Filter" />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
          <Divider className={classes.dividerCustom} />
          <h3>Concepts</h3>
          <Link className={classes.noDecoration} to="/project">
            <ListItem
              button
              selected={pathname === '/project'}
              onClick={(event) => handleListItemClick(event, 16)}
            >
              <ListItemIcon>
                <InsertDriveFileIcon
                  className={pathname === '/project' ? classes.active : ''}
                />
              </ListItemIcon>
              <ListItemText primary="Lorem ipsum dummy ..." />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <section>
          <Navbar />
        </section>
      </main>
    </div>
  );
};

export default SidebarProject;
