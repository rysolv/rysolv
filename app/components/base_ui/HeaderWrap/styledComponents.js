import styled from 'styled-components';
import { headerColor } from 'defaultStyleHelper';

export const Container = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${headerColor};
  color: white;
  font-size: 1.4rem;
  padding: 0.5rem;
`;

export const HeaderSection = styled.section`
  padding-bottom: 6rem;
`;

export const LogoWrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: row;
  padding: 1rem;
`;
