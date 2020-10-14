import styled from 'styled-components';

import {
  commentHeaderColor,
  defaultFontSize,
  textColor,
} from 'defaultStyleHelper';

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
