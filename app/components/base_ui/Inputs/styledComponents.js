import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import {
  defaultFontSize,
  errorBorder,
  inputBorder,
  textColor,
} from 'defaultStyleHelper';

export const Spacer = styled.div`
  height: 1.5rem;
`;

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
  font-size: ${defaultFontSize};

  .base-input {
    font-size: ${defaultFontSize};
  }

  .label {
    color: ${textColor};
    font-size: ${defaultFontSize};

    &.focused {
      color: ${textColor};
    }
  }

  .underline {
    border-bottom: ${({ error }) => (error ? errorBorder : inputBorder)};

    &:before {
      border-bottom: none;
    }

    &:after {
      border-bottom: none;
    }
  }
`;

export const StyledFormControl = styled(FormControl)`
  margin-bottom: 0.7rem;
  width: 100%;
`;
