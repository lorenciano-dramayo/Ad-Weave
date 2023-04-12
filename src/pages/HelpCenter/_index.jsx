import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//MUI Components
import {
  Box,
  Grid,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// constant
import { helpCategories } from 'constants/helpItems';

//Styles
import { useStyles } from './styles';

const HelpCenter = ({ setIsModalOpen, onSelect, user }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Box className={classes.header}>
            <Typography variant="h4" fontWeight={700}>
              Help Center
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <List disablePadding>
            {helpCategories.map((category, index) =>
              !user?.toLowerCase().includes('admin') &&
              category?.title?.toLowerCase() === 'maintenance' ? null : (
                <div key={index}>
                  <ListItem
                    disablePadding
                    component={Link}
                    to={
                      category?.title?.toLowerCase() === 'support'
                        ? null
                        : category.link
                    }
                    onClick={() => {
                      if (category?.title?.toLowerCase() === 'support') {
                        setIsModalOpen(true);
                      }

                      onSelect();
                    }}
                  >
                    <ListItemButton className={classes.listButton}>
                      <ListItemIcon className={classes.listIcon}>
                        {<category.icon sx={{ fontSize: 50 }} />}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography fontWeight={700} color="primary">
                            {category.title}
                          </Typography>
                        }
                        secondary={category.description}
                      />
                      <ListItemSecondaryAction className={classes.extraAction}>
                        <ArrowForwardIosIcon sx={{ color: '#858181' }} />
                      </ListItemSecondaryAction>
                    </ListItemButton>
                  </ListItem>
                  {index === helpCategories.length - 1 ? null : (
                    <Divider component="li" className={classes.divider} />
                  )}
                </div>
              )
            )}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

HelpCenter.propTypes = {
  onSelect: PropTypes.func.isRequired,
  user: PropTypes.any,
  setIsModalOpen: PropTypes.func,
};

export default HelpCenter;
