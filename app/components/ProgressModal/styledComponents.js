import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  commentHeaderColor,
  defaultFontSize,
  hoverLinkColor,
  textColor,
} from 'defaultStyleHelper';

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: fit-content;
`;

export const ContentWrapper = styled.div`
  padding: 2rem;
`;

export const LogoWrapper = styled.div`
  align-items: center;
  background: ${commentHeaderColor};
  display: flex;
  height: 15rem;
  justify-content: center;

  svg {
    height: 12.5rem;
    width: 12.5rem;
  }
`;

export const ModalBody = styled.p`
  font-size: ${defaultFontSize};
`;

export const ModalTitle = styled.h1`
  font-weight: 500;
`;

export const ProgressContainer = styled.div`
  color: ${textColor};
  text-align: center;
`;

export const StyledLink = styled(Link)`
  color: ${hoverLinkColor};
  font-size: ${defaultFontSize};
  font-weight: 500;
  margin: 1rem;

  &:hover {
    color: ${hoverLinkColor};
    text-decoration: underline;
  }
`;
