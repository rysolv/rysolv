import styled from 'styled-components';
import {
  defaultFontSize,
  detailFontSize,
  borderColor,
  textColor,
  hyperlinkColor,
  hoverLinkColor,
  subheaderFontSize,
} from 'defaultStyleHelper';

export const InputFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.2rem;
  border: 0.1rem solid ${borderColor};
  font-size: ${defaultFontSize};
  height: 35%;
  margin: 10rem 0 0 0;
  min-width: 40rem;
  padding: 5rem;
  width: 30%;
`;
export const Title = styled.div`
  color: ${textColor};
  font-size: ${subheaderFontSize};
  margin: 0 0 3rem 0;
`;
export const SigninWrapper = styled.div``;

export const SubText = styled.div`
  margin: 3rem 0 0 0;
  font-size: ${detailFontSize};
  text-align: center;

  a {
    color: ${hyperlinkColor};
    :hover {
      color: ${hoverLinkColor};
    }
  }
`;
