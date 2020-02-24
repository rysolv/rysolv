import styled from 'styled-components';
import BaseButton from './BaseButton';

const PrimaryButton = styled(BaseButton)`
  &:hover {
    background-color: green;
  }
  background-color: blue;
  color: white;
`;

export default PrimaryButton;
