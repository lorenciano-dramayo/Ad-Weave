// React
import { useState } from 'react';
// MUI
import { makeStyles, styled } from '@mui/styles';
import { Tabs, Tab, Stack } from '@mui/material';

// Utilities
import { appColors } from 'theme/variables';
import PropTypes from 'prop-types';

const StyledStack = styled(Stack)({
  borderBottom: `1px solid ${appColors.lightGray}`,
});

// Overrides Tabs CSS
const useOverridedTabsClasses = makeStyles((theme) => ({
  indicator: {
    height: '4px',
    backgroundColor: theme.palette.secondary.main,
  },
}));

// Overrides Tab CSS
const useOverridedTabClasses = makeStyles((theme) => ({
  root: {
    color: `${theme.palette.primary.light}`,
    paddingLeft: '20px !important',
    paddingRight: '20px !important',
    fontSize: '0.95rem',
    textTransform: 'capitalize',
    fontWeight: 700,
  },
  selected: {
    color: `${theme.palette.primary.main} !important`,
  },
}));

const FavoritesHeaderNavigation = ({ onTabChange }) => {
  const [currentTab, setTab] = useState(0);

  const overridedTabClasses = useOverridedTabClasses();
  const overridedTabsClasses = useOverridedTabsClasses();

  const tabsList = [
    { label: 'All' },
    { label: 'Concept' },
    { label: 'Campaign' },
    { label: 'Task' },
  ];

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
    onTabChange(e, newValue);
  };

  return (
    <Stack spacing={1}>
      <StyledStack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="tabs"
          classes={overridedTabsClasses}
        >
          {tabsList.map((tab, index) => {
            return (
              <Tab
                disableRipple
                key={index}
                id={`tab-${index}`}
                iconPosition="start"
                label={tab.label}
                classes={overridedTabClasses}
                inputprops={{
                  'aria-controls': `tabpanel-${index}`,
                }}
              />
            );
          })}
        </Tabs>
      </StyledStack>
    </Stack>
  );
};

FavoritesHeaderNavigation.propTypes = {
  onTabChange: PropTypes.func,
};

export default FavoritesHeaderNavigation;
