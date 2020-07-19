import styled from 'styled-components';

import { ErrorSuccessBanner, PrimaryAsyncButton } from 'components/base_ui';
import {
  borderColor,
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

export const SigninWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  width: 100%;
`;

export const StyledErrorSuccessBanner = styled(ErrorSuccessBanner)`
  margin-bottom: 3rem;
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  align-self: center;
  min-width: 50%;
  width: fit-content;
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

export const VerificationWrapper = styled.div`
  align-self: center;
  display: flex;
  width: 60%;
`;
