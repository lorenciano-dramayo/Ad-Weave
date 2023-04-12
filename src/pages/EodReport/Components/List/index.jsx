import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Check from '@mui/icons-material/Check';
import Avatar from '@mui/material/Avatar';
import { Popover, Button, styled } from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const StyledListItemButton = styled(ListItemButton)`
  border-radius: 36px 0 0 36px;
`;

export default function EodList() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value}
            secondaryAction={
              <Button
                sx={{ textTransform: 'capitalize' }}
                aria-describedby={id}
                onClick={handleClick}
                endIcon={<ArrowDropDownIcon />}
              >
                Editor
              </Button>
            }
            disablePadding
          >
            <StyledListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText
                id={labelId}
                primary={`Line item ${value + 1}`}
                secondary={'line@gmail.com'}
              />
            </StyledListItemButton>
          </ListItem>
        );
      })}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Paper sx={{ width: 'auto' }}>
          <MenuList dense>
            <MenuItem>
              <ListItemText inset>Viewer</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Check />
              </ListItemIcon>
              Editor
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemText>Remove Access</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Popover>
    </List>
  );
}
