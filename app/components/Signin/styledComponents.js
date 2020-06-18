import styled from 'styled-components';

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
  align-self: center;
  display: flex;
  flex-direction: column;
  width: 100%;
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
