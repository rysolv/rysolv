import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { darkBlueColor, lightBlueColor, textColor } from 'defaultStyleHelper';

export const IconWrapper = styled.img`
  align-self: center;
  height: 9.219rem;
  width: 9.189rem;
`;

export const LinkWrapper = styled(Link)`
  color: ${lightBlueColor};
  text-decoration: underline;

  &:hover {
    color: ${lightBlueColor};
  }
`;

export const StyledParagraph = styled.p`
  color: ${darkBlueColor};
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
`;

export const StyledSubParagraph = styled.p`
  color: ${textColor};
  font-size: 1.6rem;
`;

export const UserProfileContainer = styled.div`
  align-self: center;
  text-align: center;
  width: 100%;
`;
