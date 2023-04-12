import GridViewIcon from '@mui/icons-material/GridView';
import LayersIcon from '@mui/icons-material/Layers';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
//import HandshakeIcon from '@mui/icons-material/Handshake';

export const upperNavigation = [
  { icon: GridViewIcon, index: 0, label: 'Dashboard', link: '/dashboard' },
  { icon: LayersIcon, index: 1, label: 'Projects', link: '/projects' },
  // { icon: StarBorderIcon, index: 2, label: 'Favorites', link: '/favorites' },
  // { icon: HandshakeIcon, index: 3, label: 'Handover', link: '/handover' },
];

export const lowerNavigation = [
  { icon: NotificationsIcon, index: 4, label: 'Notifications', link: null },
  { icon: SearchIcon, index: 5, label: 'Search', link: null },
  { icon: HelpOutlineIcon, index: 6, label: 'Help Center', link: null },
  { icon: null, index: 7, label: 'Profile', link: null },
];
