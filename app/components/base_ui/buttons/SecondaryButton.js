import styled from 'styled-components';
import BaseButton from './BaseButton';

const SecondaryButton = styled(BaseButton)`
  &:hover {
    background-color: pink;
  }
  background-color: purple;
  color: white;
`;

export default SecondaryButton;
