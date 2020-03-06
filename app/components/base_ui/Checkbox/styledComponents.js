import styled from 'styled-components';

import { defaultFontSize, subHeaderColor, textColor } from 'defaultStyleHelper';

export const CheckboxWrapper = styled.div`
  color: ${textColor};
  display: flex;
  padding-right: 1.2rem;
  width: 100%;
  .checked {
    color: ${subHeaderColor};
  }
  .formControl {
    margin: 0;
  }
  .label {
    font-size: ${defaultFontSize};
  }
  svg {
    color: ${subHeaderColor};
    height: 2rem;
    width: 2rem;
  }
`;
