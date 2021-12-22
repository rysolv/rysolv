import styled from 'styled-components';

import { defaultFontSize, textColor } from 'defaultStyleHelper';

export const CurrentPaymentMethod = styled.div`
  background: #c4c4c44d;
  border-radius: 0.2rem;
  color: ${textColor};
  font-size: ${defaultFontSize};
  margin: 2rem 1rem;
  padding: 2rem 4rem;
  width: fit-content;
`;
