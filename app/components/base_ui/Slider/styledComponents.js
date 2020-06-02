import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';

import { textColor } from 'defaultStyleHelper';

export const StyledSlider = styled(Slider)`
  align-self: center;
  color: #1e88e5;
  width: 90%;

  .markLabel {
    color: ${textColor};
    font-size: 1rem;
  }
`;
