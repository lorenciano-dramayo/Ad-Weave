import React, { useState, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import IconFlag from 'assets/images/2022/ico_flag_gray.png';
import IconPlay from 'assets/images/2022/ico_play_gray.png';
import PropTypes from 'prop-types';
import FavoriteIcon from '@mui/icons-material/Star';
import { appColors } from 'theme/variables';
import { Box, Grid, AvatarGroup, Avatar } from '@mui/material';
import { pinFavorites } from 'store/reducers/favorites';
import { getTaskById } from 'store/reducers/tasks';
import _ from 'lodash';

const useStyles = makeStyles(() => ({
  wrapperContainer: {
    marginLeft: '36px',
    alignItems: 'center',
    marginTop: '0px',
  },
  statusIndicator: {
    alignItems: 'center',
    padding: '4px 24px 11px 24px',
    background: '#FFAB00',
    borderRadius: '8px',
    color: 'white',
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '16px',
    width: 'auto',
    height: '40px',
    marginRight: '30px',
  },
  taskName: {
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '120%',
    textAlign: 'left',
    letterSpacing: '0.005em',
    color: '#192A3E',
    marginRight: '30px',
    width: '40%',
  },
  flagSize: {
    height: '16px',
    width: '14px',
    marginRight: '30px',
  },
  starSize: {
    height: '18px',
    width: '19px',
    marginRight: '30px',
  },
  playSize: {
    height: '15px',
    width: '15px',
    marginRight: '30px',
  },
  dlfexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarGroup: {
    marginRight: '30px',
    height: '33px',
  },
  avatarSize: {
    width: '33px',
    height: '33px',
  },
  txtDateCreated: {
    paddingRight: '30px',
    borderRight: '2.5px solid #EBEFF2',
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '120%',
    textAlign: 'center',
    letterSpacing: '0.005em',
    color: '#707683',
  },
  txtStatus: {
    marginRight: '15px',
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '120%',
    textAlign: 'center',
    letterSpacing: '0.005em',
    color: '#192A3E',
  },
  txtTimeTracker: {
    margin: '0px 30px 0px 15px',
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '120%',
    textAlign: 'center',
    letterSpacing: '0.005em',
    color: '#192A3E',
  },
  txtTime: {
    paddingRight: '30px',
    borderRight: '2.5px solid #EBEFF2',
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '120%',
    textAlign: 'center',
    letterSpacing: '0.005em',
    color: '#707683',
  },
  txtWatcher: {
    paddingRight: '30px',
    paddingLeft: '30px',
    fontFamily: 'Karla',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '120%',
    textAlign: 'center',
    letterSpacing: '0.005em',
    color: '#192A3E',
  },
  headerContainer: {
    padding: '13px 0px',
  },
}));

const Header = (data) => {
  const classes = useStyles();
  const [favorited, setFavorited] = useState('');
  const [, setOnClickFav] = useState('');
  const dispatch = useDispatch();
  const { data: taskData } = useSelector((state) => state.tasks);
  const dispatchFavoritesPin = () => {
    setFavorited(!favorited);
    dispatch(
      pinFavorites({
        data_id: taskData.id,
        type: 'task',
      })
    );

    setOnClickFav(true);
  };

  useEffect(() => {
    if (taskData.is_pinned == 'true') {
      setOnClickFav(true);
    } else {
      setOnClickFav(false);
    }

    dispatch(
      getTaskById({
        taskId: taskData.id,
      })
    );
  }, []);

  const headerItem = data;
  return (
    <Box width="100%" className={classes.headerContainer}>
      <Grid container className={classes.wrapperContainer} spacing={2}>
        <Grid item xs={6} className={classes.dlfexRow}>
          <span className={classes.statusIndicator}>
            {_.capitalize(
              _.replace(headerItem.status ?? '-', new RegExp('_', 'g'), ' ') ??
                ''
            )}
          </span>
          <span className={classes.taskName}>{headerItem.name}</span>
          <AvatarGroup className={classes.avatarGroup} max={4}>
            {!_.isEmpty(taskData.assignees) &&
              taskData.assignees.map((items) => (
                <Avatar
                  key={items.id}
                  className={classes.avatarSize}
                  alt={items.name}
                  src={items.avatar}
                />
              ))}
          </AvatarGroup>
          <img className={classes.flagSize} src={IconFlag} alt="icon flag" />
          <FavoriteIcon
            onClick={() => {
              dispatchFavoritesPin();
            }}
            sx={{
              fontSize: 25,
              cursor: 'pointer',
              color: favorited ? appColors.favorited : appColors.lightGray,
            }}
          />
          {/* <img className={classes.starSize} src={IconStar} alt="icon star" /> */}
        </Grid>
        <Grid item xs={6} className={classes.dlfexRow}>
          <span className={classes.txtDateCreated}>
            <strong className={classes.txtStatus}>Created</strong> Aug 11, 2021
            - 5:36 pm
          </span>
          <span className={classes.txtTimeTracker}>Time Tracker</span>
          <img className={classes.playSize} src={IconPlay} alt="icon Play" />
          <span className={classes.txtTime}>00:00:00</span>
          <span className={classes.txtWatcher}>Watchers</span>
        </Grid>
      </Grid>
    </Box>
  );
};

Header.propTypes = {
  data: PropTypes.object,
};

export default Header;
