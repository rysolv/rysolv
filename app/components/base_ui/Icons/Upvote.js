import React from 'react';
import iconDictionary from 'utils/iconDictionary';
import { StyledUpvote } from './styledComponents';

const defaultVerified = iconDictionary('upvote');

const Upvote = () => <StyledUpvote>{defaultVerified}</StyledUpvote>;

export default Upvote;
