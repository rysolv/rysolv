import styled from 'styled-components';

import { PrimaryButton } from 'components/base_ui';
import {
  borderColor,
  defaultFontSize,
  detailFontSize,
  hoverLinkColor,
  hyperlinkColor,
  subheaderFontSize,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const InputFormWrapper = styled.div`
  align-self: center;
  background-color: white;
  border-radius: 0.2rem;
  border: 0.1rem solid ${borderColor};
  display: flex;
  flex-direction: column;
  font-size: ${defaultFontSize};
  padding: 5rem;
  width: 40rem;

  ${mobile} {
    width: 100%;
  }
`;

export const SigninWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  width: 100%;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  align-self: center;
  width: fit-content;
`;

export const SubText = styled.div`
  font-size: ${detailFontSize};
  margin: 3rem 0 0 0;
  text-align: center;

  a {
    color: ${hyperlinkColor};
    :hover {
      color: ${hoverLinkColor};
    }
  }
`;

export const Title = styled.div`
  color: ${textColor};
  font-size: ${subheaderFontSize};
  margin: 0 0 3rem 0;
`;
