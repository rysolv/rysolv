import React from 'react';
import T from 'prop-types';

import {
  Description,
  PositionProfileContainer,
  PositionTitle,
} from './styledComponents';

const PositionProfile = ({ position }) => {
  const { description, title } = position;

  const formattedDescription = description
    ? `${description.substring(0, 74)}${description.length > 75 ? '...' : ''}`
    : '';

  return (
    <PositionProfileContainer>
      <PositionTitle>{title}</PositionTitle>
      <Description>{formattedDescription}</Description>
    </PositionProfileContainer>
  );
};

PositionProfile.propTypes = {
  position: T.object,
};

export default PositionProfile;
