const drawerWidth = 1000;

export const styles = () => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'fixed',
    width: 'auto',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    // [theme.breakpoints.up("md")]: {
    //   width: `calc(100% - ${drawerWidth}px)`
    // }
  },
  navIconHide: {
    // [theme.breakpoints.up("md")]: {
    //   display: "none"
    // }
  },
  // toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    minWidth: drawerWidth,
    boxShadow: '0px 0px 10px 0px #25175aa3',
    overflowX: 'hidden',
    // [theme.breakpoints.up("md")]: {
    //   position: "relative"
    // }
  },
  content: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.default,
    // padding: theme.spacing.unit * 3
  },
  dragger: {
    width: '14px',
    cursor: 'ew-resize',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: '1',
    backgroundColor: '#f5f6f8',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.7em',
    color: '#585454',
  },
});
