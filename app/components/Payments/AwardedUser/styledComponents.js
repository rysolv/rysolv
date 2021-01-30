import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { hoverLinkColor, rewardColor } from 'defaultStyleHelper';

export const AwardedUserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  padding: 0 0.5rem 0.5rem;
`;

export const CoinWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  svg {
    height: 2.25rem;
    padding-right: 0.5rem;
    width: 2.25rem;
  }
`;

export const ContentWrapper = styled.div`
  align-items: center;
  align-self: center;
  display: flex;
`;

export const LinkWrapper = styled.div`
  display: flex;
  margin: 1rem;

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const Rewarded = styled.span`
  align-self: center;
  color: ${rewardColor};
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.5rem 0.5rem 2rem;
`;

export const StyledExternalLink = styled.a`
  padding-left: 0.5rem;
  white-space: nowrap;

  &:hover {
    color: ${hoverLinkColor};
  }
`;

export const StyledInternalLink = styled(Link)`
  font-weight: 500;

  &:hover {
    color: ${hoverLinkColor};
  }
`;
