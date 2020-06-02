import styled from 'styled-components';
import { defaultFontSize, headerColor } from 'defaultStyleHelper';

export const Container = styled.section`
  background-color: ${headerColor};
  color: white;
  display: flex;
  flex-direction: row;
  font-size: ${defaultFontSize};
  height: 6rem;
  justify-content: space-between;
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
  width: 40%;
`;

export const StyledLink = styled.div`
  align-self: center;
  padding-right: 2rem;
  white-space: nowrap;
`;
