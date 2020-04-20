import styled from 'styled-components';
import { headerColor } from 'defaultStyleHelper';

export const Container = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 4rem;
  background-color: ${headerColor};
  color: white;
`;

export const HeaderSection = styled.section`
  padding-bottom: 4rem;
`;

export const LogoWrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: row;
  padding: 1rem;
`;
