import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

const useStyles = makeStyles(() => ({
  svg: {
    height: 'auto',
    position: 'relative',
  },
}));

const SmallPinkShape = (props) => {
  const classes = useStyles();

  return (
    <div>
      <svg {...props} className={classes.svg} viewBox="0 0 363 366">
        <g clipPath="url(#clip0)">
          <g filter="url(#filter0_d)">
            <path
              d="M316.499 -2.99609H361.044C364.479 -2.99609 367.09 -0.540905 367.213 2.80504L374.797 208.995C374.86 210.699 372.618 211.755 371.551 210.524L189.244 0.16749C188.225 -1.00844 189.328 -2.99662 190.999 -2.99569L213.499 -2.9956L316.499 -2.99609Z"
              fill="url(#paint3_linear)"
            />
          </g>
          <g filter="url(#filter1_i)">
            <path
              d="M367.5 204C473.5 435 263.698 279.006 184.998 279.006C106.297 279.006 42.4977 208.938 42.4977 122.506C42.4977 36.0732 26.7977 -31.4943 105.498 -31.4943C197.998 -50.9952 367.5 117.567 367.5 204Z"
              fill="#F0F2FA"
            />
          </g>
          <path
            d="M333.09 234.469C441.302 474.646 227.121 312.454 146.778 312.454C66.4347 312.454 1.30362 239.603 1.30362 149.737C1.30362 59.8702 -14.7241 -10.3816 65.6192 -10.3816C160.05 -30.6573 333.09 144.602 333.09 234.469Z"
            fill="#F0F2FA"
          />
        </g>
        <defs>
          <filter
            id="filter0_d"
            x="158.852"
            y="-28.9961"
            width="245.946"
            height="274.055"
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
          <filter
            id="filter1_i"
            x="41.2207"
            y="-33.0508"
            width="355.578"
            height="369.556"
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
            <feOffset dy="6" />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
            />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
          </filter>
          <linearGradient
            id="paint3_linear"
            x1="-664"
            y1="43.0014"
            x2="3585.65"
            y2="136.455"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F22076" />
            <stop offset="1" stopColor="#25165B" stopOpacity="0" />
          </linearGradient>
          <clipPath id="clip0">
            <rect width="363" height="366" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default SmallPinkShape;
