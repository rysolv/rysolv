import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { buttonGrey, hoverLinkColor, textColor } from 'defaultStyleHelper';
import { SecondaryButton } from 'components/base_ui';

export const AcceptButton = styled(SecondaryButton)``;

export const ButtonGroup = styled.div`
  text-align: center;
`;

export const DeleteUserContainer = styled.div`
  padding: 2rem;
`;

export const StyledBodyMessage = styled.div`
  color: ${textColor};
  font-size: 1.6rem;
  padding: 2rem 4rem;
  text-align: justify;
`;

export const StyledLink = styled(Link)`
  color: ${hoverLinkColor};

  &:hover {
    color: ${hoverLinkColor};
    text-decoration: underline;
  }
`;
export const StyledSecondaryButton = styled(SecondaryButton)`
  background-color: ${buttonGrey};

  &:hover {
    background-color: ${buttonGrey};
  }
`;

export const StyledTitle = styled.h3`
  color: ${textColor};
  font-size: 2rem;
  font-weight: 500;
  margin: 1rem 0;
  text-align: center;
`;
