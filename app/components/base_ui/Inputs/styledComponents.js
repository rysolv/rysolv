import styled from 'styled-components';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import { inputErrorRed } from 'defaultStyleHelper';

export const StyledBaseInput = styled(OutlinedInput)`
  background: white;
  border-radius: 0.5rem;
  font-size: 1rem;
  height: 3rem;
  width: 100%;
`;

export const StyledBaseTextInput = styled(TextField)`
  margin: 0rem 1rem;
  min-width: 20rem;

  .label {
    font-size: 1.4rem;
    margin-left: 0.5rem;
  }

  .helper {
    color: ${inputErrorRed};
    font-size: 1.2rem;
    margin-top: 0.5rem;
  }

  .base-input {
    background: white;
    border-radius: 0.5rem;
    font-size: 1.4rem;
    height: 4rem;
    width: 100%;

    input::-ms-clear,
    input::-ms-reveal {
      display: none;
    }
  }
`;
