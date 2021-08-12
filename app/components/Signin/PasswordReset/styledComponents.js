import styled from 'styled-components';

import { defaultFontSize, textColor } from 'defaultStyleHelper';

export const ButtonGroup = styled.div`
  align-self: center;
  display: flex;
`;

export const DescriptionText = styled.span`
  border-radius: 0.4rem;
  color: ${textColor};
  font-size: ${defaultFontSize};
  line-height: 1.5;
  margin: 1rem;
  padding: 0.6rem 0;
  width: 100%;
`;
