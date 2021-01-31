import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { defaultFontSize, hoverLinkColor } from 'defaultStyleHelper';

export const AwardedUserWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: ${defaultFontSize};
  padding: 0 0.5rem 0.5rem;
`;

export const CoinWrapper = styled.div`
  align-items: center;
  display: flex;
  font-size: 2rem;
  justify-content: center;
  padding-bottom: 1rem;

  svg {
    height: 2.25rem;
    padding-right: 0.5rem;
    width: 2.25rem;
  }
`;

export const LinkWrapper = styled.div`
  align-items: center;
  display: flex;
  margin: 1rem 0 0.5rem;

  svg {
    height: 2rem;
    width: 2rem;
  }
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
  font-size: 2rem;
  &:hover {
    color: ${hoverLinkColor};
  }
`;
