import styled from 'styled-components';

export const StyledUserNavBar = styled.div`
  padding: 0.25rem 0.5rem;
  background-color: #263238;
  border-radius: 5rem;
  border: 0.2rem solid #263238;
  margin: 0.25rem 1rem;

  &:hover {
    cursor: pointer;
    border-color: #1a2327;
  }
`;

export const StyledAvatar = styled.img`
  display: inline-flex;
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 50%;
`;

export const IconWrapper = styled.div`
  margin: 0 1.5rem 0 0.5rem;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
`;

export const NumberContainer = styled.div`
  align-self: center;
  padding-left: 0.5rem;
  font-weight: 500;
`;
