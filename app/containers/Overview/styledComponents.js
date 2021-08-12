import styled from 'styled-components';

import { headerFontSize, textColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;

  ${mobile} {
    margin: 2rem 0;
    width: 100%;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile} {
    flex-direction: column-reverse;
  }
`;

export const FilterContainer = styled.div`
  width: 30%;

  ${mobile} {
    width: 100%;
  }
`;

export const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${mobile} {
    margin: 0 1rem;
  }
`;

export const OverviewHeader = styled.div`
  color: ${textColor};
  display: flex;
  font-size: ${headerFontSize};
  margin: 5rem 0 2rem 1rem;
  width: 100%;

  ${mobile} {
    margin: 2rem 0;
  }
`;
