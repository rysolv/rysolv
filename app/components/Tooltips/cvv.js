import React from 'react';

import CvvImage from 'images/cvv_example.png';

import { StyledCvvImage } from './styledComponents';

const CvvTooltip = () => {
  const Image = CvvImage;
  return <StyledCvvImage src={Image} />;
};

export default CvvTooltip;
