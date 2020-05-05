import styled from 'styled-components';
import {
  defaultFontSize,
  borderColor,
  textColor,
  subheaderFontSize,
} from 'defaultStyleHelper';

export const Title = styled.div`
  color: ${textColor};
  font-size: ${subheaderFontSize};
  margin: 0 0 3rem 0;
`;

export const InputFormWrapper = styled.div`
  align-self: center;
  background-color: white;
  border: 0.1rem solid ${borderColor};
  border-radius: 0.2rem;
  font-size: ${defaultFontSize};
  margin: 10rem 10rem;
  min-height: 40rem;
  min-width: 40rem;
  padding: 5rem;
  width: 30%;
`;
