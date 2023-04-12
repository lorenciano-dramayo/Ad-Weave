// React
import { useState, memo } from 'react';

// MUI
import { Button, Stack } from '@mui/material';
import { styled } from '@mui/styles';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

// App Components
import ListContainer from './ListContainer';
import GlobalPopper from 'components/Common/Popper';
import { NestedMenuItem } from 'mui-nested-menu';

// Utilities
import PropTypes from 'prop-types';
import Color from 'color';
import theme from 'theme';

// Styled Components
const StyledNestedMenuItem = styled(NestedMenuItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: Color(theme.palette.secondary.main).alpha(0.05).string(),
  },
}));

const selectedDatesInitial = [
  {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  },
];

function Filter({ anchorEL, datasource, isOpen, onClose, onFilter }) {
  const [selectedDates, setSelectedDates] = useState(selectedDatesInitial);

  const handleSelectionChange = (type, value) => {
    switch (type) {
      case 'Statuses':
        onFilter({ status: value });
        break;
      case 'Members':
        onFilter({ member: value });
        break;
      case 'Partner Group':
        onFilter({ partner: value });
        break;
      case 'Delivery Date':
        onFilter({ deliveryDate: value });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <GlobalPopper
        isOpen={isOpen}
        anchorEl={anchorEL}
        onClose={onClose}
        placement={'bottom-start'}
        content={datasource.map((filter) => (
          <StyledNestedMenuItem
            key={filter.title}
            label={filter.title}
            parentMenuOpen={isOpen}
            rightIcon={null}
          >
            {filter.type == 'date' ? (
              <Stack>
                <DateRange
                  ranges={selectedDates}
                  rangeColors={[
                    Color(theme.palette.secondary.main).alpha(0.8).string(),
                  ]}
                  months={2}
                  direction="horizontal"
                  onChange={(ranges) => {
                    setSelectedDates([ranges.selection]);
                    handleSelectionChange(filter.title, [ranges.selection]);
                  }}
                />
                <Button
                  onClick={() => {
                    setSelectedDates(selectedDatesInitial);
                    handleSelectionChange(filter.title, []);
                  }}
                >
                  Reset
                </Button>
              </Stack>
            ) : (
              filter.items && (
                <ListContainer
                  type={filter.title}
                  items={filter.items}
                  onChange={handleSelectionChange}
                />
              )
            )}
          </StyledNestedMenuItem>
        ))}
      />
    </>
  );
}

Filter.propTypes = {
  anchorEL: PropTypes.any,
  isOpen: PropTypes.bool,
  datasource: PropTypes.arrayOf(PropTypes.object),
  onClose: PropTypes.func,
  onFilter: PropTypes.func,
};

export default memo(Filter);
