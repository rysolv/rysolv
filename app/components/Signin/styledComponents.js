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

export const InputFormWrapper = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  border: 0.1rem solid ${borderColor};
  display: flex;
  flex-direction: column;
  font-size: ${defaultFontSize};
  height: auto;
  margin: 10rem 0 0 0;
  min-width: 40rem;
  padding: 5rem;
  width: 30%;
`;

export const SigninWrapper = styled.div``;

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
