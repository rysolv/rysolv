import styled from 'styled-components';

export const StyledImage = styled.img`
  height: ${props => (props.small ? '4rem' : '7.5rem')};
  width: ${props => (props.small ? '4rem' : '7.5rem')};
  border-radius: 50%;

  &:hover {
    cursor: pointer;
  }
`;
