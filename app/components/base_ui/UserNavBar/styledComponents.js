import styled from 'styled-components';

import { darkTextColor } from 'defaultStyleHelper';

export const IconWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 1.5rem 0 0.5rem;
`;

export const NumberContainer = styled.div`
  align-self: center;
  font-weight: 500;
  padding-left: 0.5rem;
`;

export const StyledAvatar = styled.img`
  border-radius: 50%;
  display: inline-flex;
  height: 3.5rem;
  width: 3.5rem;
`;

export const StyledUserNavBar = styled.div`
  align-items: center;
  background-color: ${darkTextColor};
  border-radius: 5rem;
  border: 0.2rem solid ${darkTextColor};
  display: flex;
  margin: 0.25rem 1rem;
  padding: 0.25rem 0.5rem;

  &:hover {
    cursor: pointer;
    border-color: #1a2327;
  }
`;
