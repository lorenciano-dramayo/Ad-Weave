// React
import { useState, memo } from 'react';

// MUI
import { MenuItem } from '@mui/material';
import { styled } from '@mui/styles';

// Libs
import InfiniteScroll from 'react-infinite-scroll-component';

// App Components
import SelectionCheckbox from 'components/Widgets/SelectionPopover/Checkbox';

// Utilities
import PropTypes from 'prop-types';
import Color from 'color';

const StyleMenuItem = styled(MenuItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: Color(theme.palette.secondary.main).alpha(0.05).string(),
  },
}));

const ListContainer = ({ type, items, onChange }) => {
  const [list, setList] = useState(items.slice(0, 20));

  const paginate = () => {
    setList([...items.slice(0, list.length + 20)]);
  };

  return (
    <InfiniteScroll
      dataLength={list.length}
      hasMore={list.length != items.length}
      next={paginate}
      height={400}
    >
      {list.map((item) => (
        <StyleMenuItem key={item.id}>
          <SelectionCheckbox
            isChecked={item.isChecked}
            onChange={() => {
              onChange(type, item.id);
            }}
          />
          {item.name}
        </StyleMenuItem>
      ))}
    </InfiniteScroll>
  );
};

ListContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.string,
  onChange: PropTypes.any,
};

export default memo(ListContainer);
