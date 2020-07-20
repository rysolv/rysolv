import React from 'react';

import iconDictionary from 'utils/iconDictionary';

import {
  StyledCancelIcon,
  StyledFundedIcon,
  StyledGiftIcon,
  StyledPullRequestIcon,
} from './styledComponents';

const CancelIcon = iconDictionary('cancel');
const FundedIcon = iconDictionary('funded');
const GiftIcon = iconDictionary('gift');
const PullRequestIcon = iconDictionary('pullRequest');

export const userTimelineDictionary = {
  funded: {
    Image: <StyledFundedIcon>{FundedIcon}</StyledFundedIcon>,
    title: 'Funded an issue',
  },
  earned: {
    Image: <StyledGiftIcon>{GiftIcon}</StyledGiftIcon>,
    title: 'Earned',
  },
  submitted: {
    Image: <StyledPullRequestIcon>{PullRequestIcon}</StyledPullRequestIcon>,
    title: 'Submitted a pull request',
  },
  withdrew: {
    Image: <StyledCancelIcon>{CancelIcon}</StyledCancelIcon>,
    title: 'Funding has been withdrawn',
  },
};
