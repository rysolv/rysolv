import styled from 'styled-components';

import { defaultFontSize, textColor } from 'defaultStyleHelper';

export const DataWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InputFormWrapper = styled.div`
  padding: 0 6.5rem;
`;

export const KeyAndValueContainer = styled.div`
  display: flex;
`;

export const KeyGroupWrapper = styled.div`
  padding-right: 2rem;
`;

export const KeyWrapper = styled.div`
  color: ${textColor};
  display: flex;
  flex-direction: row;
  font-size: ${defaultFontSize};
  padding: 2rem 0;
  text-decoration: underline;
  min-width: 15rem;
`;

export const ValueWrapper = styled.div`
  display: flex;
  color: ${textColor};
  flex-direction: row;
  font-size: ${defaultFontSize};
  padding: 2rem 0;
`;
