import styled from 'styled-components';

export const LanguageBar = styled.div`
  width: ${({ width }) => `${width}%`};
  background: rgb(53 115 255 / 20%);
  padding: 0.25rem;
  margin: 0.5rem 0 0 0;
  white-space: nowrap;
`;

export const LanguageContainer = styled.div`
  width: 100%;
`;

export const LanguageRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Percentage = styled.div``;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;
