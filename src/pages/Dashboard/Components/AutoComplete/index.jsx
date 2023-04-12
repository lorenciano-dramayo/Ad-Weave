import * as React from 'react';
import PropTypes from 'prop-types';

import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { styled } from '@mui/material/styles';

import { autocompleteClasses } from '@mui/material/Autocomplete';

const Root = styled('div')(
  () => `
  color:rgba(0,0,0,.85);
  font-size: 14px;
`
);

const InputWrapper = styled('div')(
  () => `
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;
  min-height: 48px;
  align-items: center;
  padding: 0.3em;

  &:hover {
    border-color: rgba(80,37,196,.5);
    box-shadow: 0 0 0 4px rgb(80 37 196 / 5%);
  }

  &.focused {
    border: 1px solid rgba(80,37,196,.5);
    box-shadow: 0 0 0 4px rgb(80 37 196 / 5%);
  }

  & input {
    background-color: #fff';
    color: rgba(0,0,0,.85);
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  () => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: #25165B;
  color: #ececec;
  border: 1px solid #454545;
  border-radius: 4px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color:#40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

const Listbox = styled('ul')(
  () => `
  width: -webkit-fill-available;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #fafafa;
    font-weight: 600;
    align-items: center;
    & svg {
      color: #F22076;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: #f2207624;
    cursor: pointer;
    align-items: center;
    & svg {
      color: #25165B;
    }
  }
`
);

export default function AutoComplete({
  data,
  type,
  handleFilterChange,
  defaultValue,
}) {
  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: type,
    defaultValue: defaultValue,
    multiple: true,
    options: data,
    onChange: (e, value) => {
      e.preventDefault();
      handleFilterChange(type, value);
    },
    getOptionLabel: (option) => option.name || option.fullname,
  });

  return (
    <Root>
      <div {...getRootProps()}>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option, index) => (
            <StyledTag
              key={index}
              label={option.name || option.fullname}
              {...getTagProps({ index })}
            />
          ))}

          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li key={index} {...getOptionProps({ option, index })}>
              <span>{option.name || option.fullname}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
}

AutoComplete.propTypes = {
  data: PropTypes.any,
  type: PropTypes.any,
  handleFilterChange: PropTypes.func,
  defaultValue: PropTypes.any,
};
