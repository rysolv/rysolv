import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
  &:active {
    box-shadow: none;
  }
  box-shadow: none;
  font-size: 1rem;
  font-weight: 400;
  margin: 1rem;
`;

export default StyledButton;
