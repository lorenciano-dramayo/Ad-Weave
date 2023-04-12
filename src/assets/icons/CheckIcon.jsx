import { SvgIcon } from '@mui/material';
import React from 'react';

const CheckIcon = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 23 16">
      <path
        d="M2 8.25L8.25 14.5L20.75 2"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default CheckIcon;
