import styled from 'styled-components';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { tablet } = mediaQueriesByDevice;

export const AppBody = styled.div`
  display: flex;
`;

export const RoutesWrapper = styled.section`
  display: flex;
  flex: 1 100%;
  justify-content: center;
  min-height: 100vh;
  padding: 0 5% 0 5%;
  width: 100%;

  ${tablet} {
    padding: 0 1rem;
  }
`;
