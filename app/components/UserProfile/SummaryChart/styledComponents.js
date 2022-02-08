import styled from 'styled-components';

import { darkBlueColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { laptop } = mediaQueriesByDevice;

export const IconWrapper = styled.div`
  width: 2.5rem;

  svg {
    height: 1.8rem;
    width: 1.8rem;
  }
`;

export const LabelWrapper = styled.div`
  align-items: flex-end;
  display: flex;
`;

export const SummaryContainer = styled.div`
  margin-top: 2.4rem;
  padding-right: 4rem;
  width: 100%;

  ${laptop} {
    padding: 0;
  }
`;

export const SummaryRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

export const Total = styled.div``;

export const TitleRow = styled.div`
  align-items: center;
  color: ${darkBlueColor};
  display: flex;
  font-weight: bold;
  justify-content: space-between;
`;
