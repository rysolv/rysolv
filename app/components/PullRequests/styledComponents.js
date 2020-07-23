import styled from 'styled-components';

import { ErrorSuccessBanner } from 'components/base_ui';
import { textColor } from 'defaultStyleHelper';

export const BaseInputWrapper = styled.div`
  margin-left: ${({ hasMargin }) => (hasMargin ? '4rem' : '0')};
  width: 45%;
`;

export const EmptyComponentContainer = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: 1.6rem;
  height: 30rem;
  justify-content: center;
  text-align: center;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  width: 100%;
`;

export const StyledErrorSuccessBanner = styled(ErrorSuccessBanner)`
  margin-bottom: 1rem;
  width: 100%;
`;
