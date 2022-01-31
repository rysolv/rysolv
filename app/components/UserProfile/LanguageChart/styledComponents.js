import styled from 'styled-components';

import { darkBlueColor } from 'defaultStyleHelper';

export const LanguageBar = styled.div`
  background: rgb(53 115 255 / 20%);
  margin: 0.5rem 0 0 0;
  padding: 0.25rem;
  white-space: nowrap;
  width: ${({ width }) => `${width}%`};
`;

export const LanguageContainer = styled.div`
  margin-top: 2.4rem;
  width: 100%;
`;

export const LanguageRow = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
`;

export const Percentage = styled.div`
  white-space: nowrap;
`;

export const TitleRow = styled.div`
  align-items: center;
  color: ${darkBlueColor};
  display: flex;
  font-weight: bold;
  justify-content: space-between;
`;
