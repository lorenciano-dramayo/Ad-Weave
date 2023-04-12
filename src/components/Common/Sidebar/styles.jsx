import makeStyles from '@mui/styles/makeStyles';
import { sidebarWidth } from 'theme/variables';

const useStyles = makeStyles((theme) => ({
  sidebarContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 4,
  },
  sidebar: {
    width: sidebarWidth,
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 0,
    overflow: 'hidden',
    padding: '2em 0',
  },
  logoContainer: {
    width: '100%',
    height: 'auto',
    textAlign: 'center',
    padding: '0 0.4em',
  },
  logoSize: {
    height: 'auto',
    width: '-webkit-fill-available',
  },
  list: {
    height: 'calc(100% - 1.2em)',
    paddingTop: '26px',
  },
  nav: {
    height: '-webkit-fill-available',
  },
  avatar: {
    width: '35px',
    height: '35px',
  },
  items: {
    color: '#fff',
  },
  avatarItems: {
    display: 'flex',
    justifyContent: 'center',
  },
  sidebarItem: {
    width: 'auto',
    height: 'auto',
    borderRadius: '4px',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0.4em 0',
    '&:hover': {
      backgroundColor: '#5025c4',
      opacity: 1,
    },
  },
  staticItem: {
    width: 'auto',
    height: 'auto',
    borderRadius: '4px',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0.4em 0',
    '&:hover': {
      backgroundColor: '#5025c4',
      opacity: 1,
    },
  },
  sidebarItemAvatar: {
    padding: 0,
    borderRadius: '2em',
    border: '2px solid #fff',
    width: 'fit-content',
    marginTop: '2em',
  },
  active: {
    backgroundColor: theme.palette.secondary.main,
    opacity: 1,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  activeAvatar: {
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
  },
  iconContainer: {
    minWidth: 'inherit',
    color: 'hsla(0,0%,100%,.75)',
  },
  staticIconContainer: {
    minWidth: 'inherit',
    color: 'hsla(0,0%,100%,.75)',
  },
  icon: {
    width: '24px',
    height: '24px',
  },
  grid: {
    width: '100%',
    padding: '0.3em',
  },
  drawer: {
    zIndex: 3,
  },
  popper: {
    left: '0.5em !important',
    zIndex: 3,
  },
}));

export { useStyles };
