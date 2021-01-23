import React from 'react';

import { StyledCard } from './styledComponents';

const Card = restProps => (
  <StyledCard classes={{ root: 'card' }} {...restProps} />
);

export default Card;
