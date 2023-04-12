import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
// MUI Components
import {
  Paper,
  Stack,
  Box,
  Button,
  ButtonGroup,
  Divider,
  styled,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

// MUI Icons
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';

// Styles
import { useStyles } from 'components/Widgets/ListFilter/styles';

const StyledButton = styled(Button)`
  color: #000;
  text-transform: capitalize;
  font-weight: 700;
  cursor: auto;
  &:hover {
    background-color: transparent;
  }
`;

const StyleGroupButtons = styled(Button)`
  border-right: none !important;
  color: '#8c8a93 !important';
`;

const ListFilter = ({ headline, filters, dataItem }) => {
  const [list, setList] = useState([]);
  const [activeFilter, setActiveFilter] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setList(dataItem);
    setActiveFilter(filters[0].label);
  }, []);

  const handleFilter = (filter) => {
    setList(_.filter(dataItem, filter.node[0]));
    setActiveFilter(filter.label);
  };

  return (
    <Paper className={classes.root} elevation={0} variant="outlined">
      <Stack direction="row" justifyContent="space-between" mx={1}>
        <Box>
          <StyledButton
            variant="text"
            startIcon={<LocalActivityOutlinedIcon color="success" />}
            disableRipple
          >
            {`${headline} (${list.length})`}
          </StyledButton>
        </Box>
        <Box m={'0.1em'}>
          <ButtonGroup variant="text" aria-label="list filter button group">
            {filters.map((filter, index) => (
              <StyleGroupButtons
                key={index}
                startIcon={
                  <FiberManualRecordIcon
                    sx={{ fontSize: '12px !important' }}
                    color={filter.color}
                  />
                }
                size="small"
                onClick={() => handleFilter(filter)}
                variant={activeFilter === filter.label ? 'contained' : 'text'}
                disableElevation
              >
                {filter.label}
              </StyleGroupButtons>
            ))}
          </ButtonGroup>
        </Box>
      </Stack>
      <Divider />
      <Stack my={0.5} overflow="auto" height="calc(100% - 3em)">
        <List disablePadding>
          {list.map((item, index) => (
            <ListItem disablePadding key={index} component={Link} to={item.url}>
              <ListItemButton sx={{ padding: '0 1em' }}>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: '16px',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Paper>
  );
};

ListFilter.propTypes = {
  headline: PropTypes.string.isRequired,
  filters: PropTypes.array.isRequired,
  dataItem: PropTypes.array.isRequired,
};

export default ListFilter;
