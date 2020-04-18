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
import { FlatIconButton } from '../Buttons';

export const Spacer = styled.div`
  height: 1.5rem;
`;

export const StyledBaseInput = styled(OutlinedInput)`
  background: white;
  border-radius: 0.5rem;
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.4rem;
  height: 3rem;
  overflow: hidden;
  width: 100%;

  &.adornedStart {
    padding: 0;
  }

  .input {
    padding: 0 2rem;
  }
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

export const StyledFlatIcon = styled.div`
  font-size: 1.4rem;
  justify-content: flex-end;
  padding: 0;
`;

export const StyledFlatIconButton = styled(FlatIconButton)`
  font-size: 1.4rem;
  justify-content: flex-end;
  padding: 0;
`;

export const StyledModalIcon = styled.div`
  background-color: rgba(0, 0, 0, 0.12);
  border-radius: 0;
  font-size: ${({ fontSize }) => fontSize || '1.4rem'};
  padding: 2rem 0;
  text-align: center;
  width: 10rem;
`;
