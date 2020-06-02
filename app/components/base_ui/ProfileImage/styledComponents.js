import styled from 'styled-components';

export const StyledImage = styled.img`
  border-radius: 50%;
  height: ${props => props.size || '4rem'};
  width: ${props => props.size || '4rem'};

  &:hover {
    cursor: pointer;
  }
`;
