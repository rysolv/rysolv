import styled from 'styled-components';

import { defaultFontSize, lightBlueColor, textColor } from 'defaultStyleHelper';

export const CheckboxWrapper = styled.div`
  color: ${textColor};
  display: flex;
  padding-right: 1.2rem;
  width: 100%;

  .checked {
    color: ${lightBlueColor};
  }

  .checkbox {
    padding: 0.6rem;
  }

  .formControl {
    margin: 0;
  }

  .label {
    font-size: ${defaultFontSize};
  }

  svg {
    color: ${lightBlueColor};
    height: 2rem;
    width: 2rem;
  }
`;
