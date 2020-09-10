import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { hoverLinkColor } from 'defaultStyleHelper';

export const IconWrapper = styled.div`
  svg {
    height: 10rem;
    width: 10rem;
  }
`;

export const LinkWrapper = styled(Link)`
  color: ${hoverLinkColor};

  &:hover {
    color: ${hoverLinkColor};
    text-decoration: underline;
  }
`;
