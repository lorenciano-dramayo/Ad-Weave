import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    display: 'flex',
    width: '36%',
    top: 0,
  },
  svg: {
    height: 'auto',
  },
}));

const PurpleShape = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <svg
        {...props}
        width="100%"
        className={classes.svg}
        viewBox="0 0 733 232"
      >
        <g clipPath="url(#clip20000)">
          <g filter="url(#filter0_i)">
            <path
              d="M-1.52995 1.62214C-1.51177 0.032999 0.621325 -1.01793 3.89661 -1.05141L709.911 -8.26862C717.577 -8.34698 725.13 -3.36383 721.344 -0.72568L661.002 41.3216L646.152 51.1006C501.286 146.493 276.228 204.507 1.64706 217.239C-0.933625 217.358 -3.98249 215.966 -3.96772 214.675L-1.52995 1.62214Z"
              fill="url(#paint1_linear)"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_i"
            x="-3.96777"
            y="-8.26953"
            width="726.32"
            height="229.516"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
            />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
          </filter>
          <linearGradient
            id="paint1_linear"
            x1="160.664"
            y1="-407.508"
            x2="258.478"
            y2="150.976"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.057232" stopColor="#29125F" stopOpacity="0" />
            <stop offset="1" stopColor="#29125F" />
          </linearGradient>
          <clipPath id="clip20000">
            <rect width="733" height="232" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default PurpleShape;
