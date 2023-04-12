import React from 'react';
import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import makeStyles from '@mui/styles/makeStyles';
import defaultProfile1 from 'assets/images/user1.svg';
import defaultProfile2 from 'assets/images/user2.svg';
import FbIcon from 'assets/images/icons/fb_icon.png';
import GoogleIcon from 'assets/images/icons/google_icon.png';
import YtIcon from 'assets/images/icons/yt_icon.png';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import TabsContainer from 'pages/Project/Partial/TabsContainer';

const useStyles = makeStyles({
  wrapperNav: {
    display: 'flex',
  },
  wrapperNavSpaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  titleTxtH1: {
    marginTop: '0',
    marginBottom: '0',
  },
  descriptionTxt: {
    marginTop: '0',
  },
  starContent: {
    height: '25px',
    width: 'auto',
    marginTop: '7px',
    marginLeft: '20px',
    marginRight: '20px',
    color: '#29125F',
  },
  avatarCountTxt: {
    marginTop: '8px',
    marginLeft: '11px',
    color: '#3167E9',
  },
  iconsMargin: {
    marginRight: '12px',
    height: '75%',
  },
});

const Navbar = () => {
  const classes = useStyles();

  return (
    <Box width="100%" height="100vh">
      <div className={classes.wrapperNavSpaceBetween}>
        <div className={classes.wrapperNav}>
          <h1 className={classes.titleTxtH1}>Lorem ipsum dolor</h1>
          <StarIcon className={classes.starContent} />
          <AvatarGroup max={4}>
            <Avatar alt="Remy Sharp" src={defaultProfile1} />
            <Avatar alt="Travis Howard" src={defaultProfile2} />
          </AvatarGroup>
          <p className={classes.avatarCountTxt}>+ 2</p>
        </div>
        <div className={classes.wrapperNav}>
          <img
            className={classes.iconsMargin}
            src={GoogleIcon}
            alt="google icon"
          />
          <img
            className={classes.iconsMargin}
            src={FbIcon}
            alt="facebook icon"
          />
          <img
            className={classes.iconsMargin}
            src={YtIcon}
            alt="youtube icon"
          />
        </div>
      </div>
      <p className={classes.descriptionTxt}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore...
      </p>
      <TabsContainer />
    </Box>
  );
};

export default Navbar;
