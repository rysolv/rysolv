import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { darkBlueColor, lightBlueColor } from 'defaultStyleHelper';

export const NoMessagesContainer = styled.div`
  align-self: center;
  padding: 10%;
  text-align: center;
`;

export const IconWrapper = styled.img`
  align-self: center;
  height: 9.219rem;
  width: 9.189rem;
`;

export const StyledParagraph = styled.div`
  color: ${darkBlueColor};
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
`;

export const LinkWrapper = styled(Link)`
  color: ${lightBlueColor};
  text-decoration: underline;

  &:hover {
    color: ${lightBlueColor};
  }
`;

export const StyledSubParagraph = styled.p`
  font-size: 1.6rem;
`;
