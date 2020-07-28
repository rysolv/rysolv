import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import {
  ErrorSuccessBanner,
  PrimaryAsyncButton,
  PrimaryButton,
} from 'components/base_ui';
import {
  borderColor,
  defaultFontFamily,
  defaultFontSize,
  detailFontSize,
  hoverLinkColor,
  subheaderFontSize,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const EmailWrapper = styled.span`
  color: ${hoverLinkColor};
`;

export const HorizontalWrapper = styled.div`
  display: flex;
  flex-direction: row;

  ${mobile} {
    flex-direction: column;
  }
`;

export const InputFormWrapper = styled.div`
  align-self: center;
  background-color: white;
  border-radius: 0.2rem;
  border: 0.1rem solid ${borderColor};
  display: flex;
  flex-direction: column;
  font-size: ${defaultFontSize};
  padding: 5rem;
  width: 50rem;

  ${mobile} {
    padding: 3rem;
    width: 100%;
  }
`;

export const InputSubText = styled.div`
  color: ${textColor};
  font-size: ${detailFontSize};
  margin-bottom: 1rem;
  text-align: left;
`;

export const PasswordRequirements = styled.div`
  color: grey;
  font-size: ${detailFontSize};
  margin: -1.4rem 0 1rem 0;
  padding: 0 1.4rem;
`;

export const RedirectText = styled.span`
  color: ${textColor};
  margin: 1rem 0;
`;

export const SigninWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  width: 100%;
`;

export const StyledButton = styled(Button)`
  color: rgba(0, 0, 0, 0.4);
  font-family: ${defaultFontFamily};
  font-size: ${defaultFontSize};
  font-weight: 500;
  padding: 0;
  text-transform: none;

  &:focus,
  &:hover {
    background-color: transparent;
    color: #1e88e5;
  }
`;

export const StyledErrorSuccessBanner = styled(ErrorSuccessBanner)`
  margin-bottom: 3rem;
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  align-self: center;
  min-width: 50%;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  align-self: center;
  min-width: 50%;
`;

export const SubText = styled.div`
  color: ${textColor};
  font-size: ${detailFontSize};
  margin: 1rem 0;
  text-align: center;

  a {
    color: ${hoverLinkColor};
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Title = styled.div`
  color: ${textColor};
  font-size: ${subheaderFontSize};
  margin-bottom: 3rem;
`;

export const UsernameWrapper = styled.span`
  font-weight: 500;
`;

export const VerificationWrapper = styled.div`
  align-self: center;
  display: flex;
  width: 60%;
`;
