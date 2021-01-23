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
  lightBlueColor,
  lightGreyColor,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const Divider = styled.div`
  align-self: center;
  background-color: ${borderColor};
  height: 0.1rem;
  margin: 3rem 0 2rem;
  width: 95%;
`;

export const DividerWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

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

export const InputFormWrapper = styled.form`
  align-self: center;
  background-color: white;
  border-radius: 0.2rem;
  border: 0.1rem solid ${borderColor};
  display: flex;
  flex-direction: column;
  font-size: ${defaultFontSize};
  padding: 5rem 7rem;
  width: 47.5rem;

  ${mobile} {
    padding: 3rem;
    width: 100%;
  }
`;

export const InputSubText = styled.div`
  color: ${textColor};
  font-size: ${detailFontSize};
  margin-bottom: 2rem;
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
  margin: 1rem 0 2rem;
`;

export const SigninWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  width: 100%;

  ${mobile} {
    margin-bottom: 5rem;
  }
`;

export const StyledButton = styled(Button)`
  align-self: center;
  color: ${lightGreyColor};
  font-family: ${defaultFontFamily};
  font-size: ${defaultFontSize};
  font-weight: 500;
  padding: 0;
  text-transform: none;
  width: 95%;

  &:focus,
  &:hover {
    background-color: transparent;
    color: ${lightBlueColor};
  }
`;

export const StyledErrorSuccessBanner = styled(ErrorSuccessBanner)`
  align-self: center;
  margin-bottom: 2rem;
  width: 95%;
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  align-self: center;
  min-width: 50%;
  width: 95%;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  align-self: center;
  min-width: 50%;
  width: 95%;
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
  align-self: center;
  color: ${textColor};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const UsernameWrapper = styled.span`
  font-weight: 500;
`;

export const VerificationWrapper = styled.div`
  align-self: center;
  display: flex;
  width: 75%;
`;

export const WordDivider = styled.div`
  background: white;
  bottom: 20%;
  color: ${textColor};
  left: 50%;
  padding: 0.5rem;
  position: absolute;
`;
