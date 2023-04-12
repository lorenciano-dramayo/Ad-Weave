import * as React from 'react';
import PropTypes from 'prop-types';
import MultiSelectUnstyled from '@mui/base/MultiSelectUnstyled';
import FormControl from '@mui/material/FormControl';
import { Controller } from 'react-hook-form';
import { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import { styled } from '@mui/system';
import OptionUnstyled, {
  optionUnstyledClasses,
} from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';

const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledButton = styled('button')(
  ({ theme }) => `
    font-family: Karla, sans-serif;
    font-size: 1rem;
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    min-width: 320px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid #E1E3F0;
    border-radius: 0.5rem;
    transition: 0.2s;
    // padding-left: 15px;
    padding: 7px 10px 7px 15px;
    text-align: left;
    line-height: 1.5;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

    &.${selectUnstyledClasses.focusVisible} {
      border: 1px solid red;
    }

    &.${selectUnstyledClasses.expanded} {
      border: 1px solid ${theme.palette.secondary.main};

      &::after {
        content: '▴';
        opacity: 0.54;
      }
    }

    &::after {
      content: '▾';
      opacity: 0.54;
      float: right;
    }
`
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
    font-family: Karla, sans-serif;
    font-size: 1;
    box-sizing: border-box;
    padding: 5px;
    margin: 10px 0;
    min-width: 320px;
    background: #fff;
    border: 1px solid ${grey[200]};
    border-radius: 0.75em;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    overflow: auto;
    outline: 0px;
    `
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 0.2em;
    cursor: default;

    &:last-of-type {
      border-bottom: none;
    }

    &.${optionUnstyledClasses.selected} {
      background-color: ${grey[200]};
    }

    &.${optionUnstyledClasses.highlighted} {
      background-color:  ${grey[100]};
    }

    &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
      background-color:  ${grey[100]};
    }

    &.${optionUnstyledClasses.disabled} {
    }

    &:hover:not(.${optionUnstyledClasses.disabled}) {
      background-color:  ${grey[100]};
    }
`
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const CustomMultiSelect = React.forwardRef(function CustomMultiSelect(
  props,
  ref
) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <MultiSelectUnstyled {...props} ref={ref} components={components} />;
});

CustomMultiSelect.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Listbox: PropTypes.elementType,
    Popper: PropTypes.func,
    Root: PropTypes.elementType,
  }),
};

export default function UnstyledSelectsMultiple({
  name,
  contents,
  control,
  list = [],
  ...props
}) {
  return (
    <FormControl fullWidth>
      <Controller
        control={control}
        name={name}
        defaultValue={contents}
        render={({ field: { onChange, value } }) => (
          <CustomMultiSelect onChange={onChange} value={value || []} {...props}>
            {list.map((option) => (
              <StyledOption key={option.value} value={option.value}>
                {option.label}
              </StyledOption>
            ))}
          </CustomMultiSelect>
        )}
      />
    </FormControl>
  );
}

UnstyledSelectsMultiple.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object,
  contents: PropTypes.arrayOf(PropTypes.string),
  list: PropTypes.arrayOf(PropTypes.object),
};
