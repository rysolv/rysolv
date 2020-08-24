import React from 'react';

import iconDictionary from 'utils/iconDictionary';

import { StyledUpvote } from './styledComponents';

const defaultVerified = iconDictionary('star');

const Upvote = ({ ...restProps }) => (
  <StyledUpvote {...restProps}>{defaultVerified}</StyledUpvote>
);

export default Upvote;
