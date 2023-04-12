import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//constant
import { upperNavigation, lowerNavigation } from 'constants/sidebarItems';

//MUI Components
import { Box, List, ListItem, Avatar, Grid } from '@mui/material';

import SidebarItem from '../SidebarItem';

//Pages
import SearchModule from 'pages/Search/_old';

//images
import defaultProfile from 'assets/images/user1.svg';

//styles
import { useStyles } from '../styles';
import 'assets/global.css';

const SidebarList = () => {
  const classes = useStyles();

  const [activeItem, setActiveItem] = useState();

  const { data: user } = useSelector((state) => state.user);

  const onItemClick = (index) => {
    if (!user.first_login) {
      setActiveItem(index);
    }
  };

  return (
    <List className={classes.list}>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        className={classes.nav}
      >
        <Grid item className={classes.grid}>
          {upperNavigation.map((items, index) => (
            <SidebarItem
              {...items}
              key={index}
              onItemClick={() => onItemClick(items.index)}
              activeItem={activeItem}
              isFirstLogin={user.first_login}
            />
          ))}
        </Grid>

        <Grid item className={classes.grid}>
          {lowerNavigation.map((items, index) => (
            <SidebarItem
              {...items}
              key={index}
              onItemClick={() => onItemClick(items.index)}
              activeItem={activeItem}
              isFirstLogin={user.first_login}
            />
          ))}
        </Grid>
      </Grid>
      {/* {sidebarItems.map((sidebarItem, index) => {
        const mainItemsLength = 3;

        return index <= mainItemsLength - 1 ? (
          <SidebarItem
            {...sidebarItem}
            key={index}
            onItemClick={() => onItemClick(index)}
            activeItem={activeItem}
            index={index}
            isFirstLogin={user.first_login}
          />
        ) : (
          <Fragment key={index} />
        );
      })} */}
      {/* <Box className={classes.footer}>
        {sidebarItems.map((sidebarItem, index) => {
          const startIndex = 3;

          return index >= startIndex ? (
            <SidebarItem
              {...sidebarItem}
              key={index}
              onItemClick={() => onItemClick(index)}
              activeItem={activeItem}
              index={index}
              isFirstLogin={user.first_login}
            />
          ) : (
            <Fragment key={index} />
          );
        })}

        <Box
          display="flex"
          justifyContent="center"
          className={classes.profileButtonContainer}
        >
          <ListItem id="asd1" button className={classes.profileButton}>
            <SearchModule id="asd" />
          </ListItem>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          className={classes.profileButtonContainer}
        >
          <Link className={classes.noDecoration} to="/profile">
            <ListItem button className={classes.profileButton}>
              <Avatar className={classes.avatar} src={defaultProfile} />
            </ListItem>
          </Link>
        </Box>
      </Box> */}
    </List>
  );
};

export default SidebarList;
