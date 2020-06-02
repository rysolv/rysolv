import styled from 'styled-components';

import { defaultFontSize, textColor } from 'defaultStyleHelper';

export const CheckboxWrapper = styled.div`
  color: ${textColor};
  display: flex;
  padding-right: 1.2rem;
  width: 100%;
  .checked {
    color: #1e88e5;
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
    color: #1e88e5;
    height: 2rem;
    width: 2rem;
  }
`;
