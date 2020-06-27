import styled from 'styled-components';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { tablet } = mediaQueriesByDevice;

export const AppBodyWrapper = styled.div`
  padding-bottom: 10rem;
`;

export const AppContentWrapper = styled.div`
  display: flex;
`;

export const RoutesWrapper = styled.section`
  display: flex;
  justify-content: center;
  margin: 0 0 10rem 0;
  padding: 0 5% 0 5%;
  width: 100%;

  ${tablet} {
    padding: 0 1rem;
  }
`;
