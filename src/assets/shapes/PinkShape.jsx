import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

const useStyles = makeStyles(() => ({
  svg: {
    height: 'auto',
    width: 'inherit',
  },
}));

const PinkShape = (props) => {
  const classes = useStyles();

  return (
    <div style={{ width: '100%' }}>
      <svg {...props} className={classes.svg} viewBox="0 0 1511 274">
        <g clipPath="url(#clip10000)">
          <g filter="url(#filter0_d2)">
            <path
              d="M-3 3.77936C-3.00001 -0.35218 0.728031 -4.01347 4.94934 -4.0277L1481 -8.99745C1481 -8.99745 1481 -8.99815 1481 -8.99892C1481 -8.99967 1481 -9.00016 1481 -8.99996L786.789 164.967L645.548 196.998C428.402 246.243 208.878 253.219 -0.0108514 217.513C-1.78641 217.209 -2.99995 215.77 -2.99995 213.967L-3 3.77936Z"
              fill="url(#paint0_linear)"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d2"
            x="-33"
            y="-35"
            width="1544"
            height="308.946"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="15" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.145098 0 0 0 0 0.0862745 0 0 0 0 0.356863 0 0 0 0.5 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear"
            x1="893"
            y1="42.998"
            x2="5142.65"
            y2="136.453"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F22076" />
            <stop offset="1" stopColor="#25165B" stopOpacity="0" />
          </linearGradient>
          <clipPath id="clip10000">
            <rect width="1511" height="274" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default PinkShape;
