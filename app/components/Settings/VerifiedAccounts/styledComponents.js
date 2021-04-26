import styled from 'styled-components';

import {
  commentHeaderColor,
  defaultFontSize,
  hoverLinkColor,
  lightGreyColor,
  textColor,
  verifyBackgroundColor,
  verifyColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobileS } = mediaQueriesByDevice;

export const AccountIcon = styled.div`
  margin-bottom: 2rem;

  svg {
    color: ${({ isVerified }) => (isVerified ? 'rgb(8,178,110)' : textColor)};
    height: 7.5rem;
    opacity: 0.8;
    width: 7.5rem;
  }
`;

export const AccountSquare = styled.div`
  background-color: ${commentHeaderColor};
  border-radius: 0.3rem;
  height: 16.2rem;
  padding: 1.6rem 2.4rem;
  width: 15rem;

  ${mobileS} {
    margin: 3rem auto 0;
  }
`;

export const AccountWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: ${({ isVerified }) => (isVerified ? 'auto' : '100%')};
  justify-content: space-evenly;
`;

export const StyledText = styled.div`
  color: ${lightGreyColor};
  font-size: ${defaultFontSize};
  font-weight: 500;
  margin-top: 0.25rem;
  text-align: center;
`;

export const VerifiedWrapper = styled.div`
  background: ${verifyBackgroundColor};
  border-radius: 0.25rem;
  color: ${verifyColor};
  font-size: ${defaultFontSize};
  padding: 0.5rem;
`;

export const VerifyLink = styled.a`
  color: ${hoverLinkColor};
  font-size: ${defaultFontSize};
  font-weight: 500;

  &:hover {
    color: ${hoverLinkColor};
  }
`;
