import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';

import { lightBlueColor, textColor } from 'defaultStyleHelper';

export const StyledSlider = styled(Slider)`
  align-self: center;
  color: ${lightBlueColor};
  width: 90%;

  .markLabel {
    color: ${textColor};
    font-size: 1rem;
  }
`;
