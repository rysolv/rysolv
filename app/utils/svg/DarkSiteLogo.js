import React from 'react';

const DarkSiteLogo = props => (
  <svg
    width="173"
    height="173"
    viewBox="0 0 173 173"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="86.5" cy="86.5" r="86" fill="#153486" stroke="white" />
    <path
      d="M54.9414 62.2074H67.2012V126.458C67.2012 126.458 80.3692 68.7381 101.483 76.9113C122.598 85.0845 125.322 62.2074 125.322 62.2074"
      stroke="white"
      strokeWidth="18.1627"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g filter="url(#filter0_d)">
      <path
        d="M67.2031 126.458C67.2031 126.458 80.3711 68.7381 101.485 76.9113C122.599 85.0845 125.324 62.2074 125.324 62.2074"
        stroke="white"
        strokeWidth="18.1627"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <filter
        id="filter0_d"
        x="52.6711"
        y="51.3088"
        width="83.5514"
        height="89.6814"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx="-1.81627" dy="1.81627" />
        <feGaussianBlur stdDeviation="1.81627" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
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
    </defs>
  </svg>
);

export default DarkSiteLogo;
