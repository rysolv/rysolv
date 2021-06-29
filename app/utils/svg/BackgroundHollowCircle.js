import React from 'react';

const BackgroundHollowCircle = props => (
  <svg
    width="640"
    height="640"
    viewBox="0 0 640 640"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="320"
      cy="320"
      r="318.5"
      stroke="#4A62A0"
      strokeWidth="3"
      strokeDasharray="16 8"
    />
  </svg>
);

export default BackgroundHollowCircle;
