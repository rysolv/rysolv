import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import {
  defaultFontFamily,
  defaultFontSize,
  hoverLinkColor,
  textColor,
} from 'defaultStyleHelper';

export const Account = styled.span`
  color: ${textColor};
  flex-grow: 1;
  font-size: 1.6rem;
  font-weight: 500;
`;

export const AccountListItem = styled.li`
  border-top: 0.1rem solid #d5d5d5;
  list-style: none;
  margin: 0 1rem 2.2rem;
  padding: 2rem 1rem;

  & :last-child {
    border-bottom: 0.1rem solid #d5d5d5;
  }
`;

export const AccountWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 0.5rem;
`;

export const VerifiedText = styled.div`
  color: ${textColor};
  font-size: ${defaultFontSize};
  padding: 0 1rem 2rem;
`;

export const VerifiedWrapper = styled.div`
  background: ${({ isVerified }) =>
    isVerified ? 'rgb(229, 251, 242)' : '#f6f8fa'};
  border-radius: 0.25rem;
  color: ${({ isVerified }) => (isVerified ? 'rgb(8, 178, 110)' : '#586069')};
  font-size: ${defaultFontSize};
  padding: 0.5rem;
  width: fit-content;
`;

export const VerifyButton = styled(Button)`
  color: ${hoverLinkColor};
  font-family: ${defaultFontFamily};
  font-size: ${defaultFontSize};
  padding: 0;
  text-transform: none;

  &:hover {
    background-color: transparent;
  }
`;
