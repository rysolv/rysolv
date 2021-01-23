import styled from 'styled-components';

import { BodyCard } from 'components/MarkdownRender';
import { cardHeaderFontSize, hoverLinkColor } from 'defaultStyleHelper';

export const NameWrapper = styled.div`
  font-size: ${cardHeaderFontSize};
  margin: 0 1rem 1rem;
`;

export const StyledBodyCard = styled(BodyCard)`
  margin: 0.5rem 1rem;
`;

export const StyledLink = styled.a`
  color: ${hoverLinkColor};
  display: inline-block;
  margin: 0 1rem;
  width: auto;

  &:hover {
    color: ${hoverLinkColor};
    cursor: pointer;
    text-decoration: underline;
  }
`;
