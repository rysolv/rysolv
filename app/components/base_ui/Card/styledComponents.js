import styled from 'styled-components';
import Card from '@material-ui/core/Card';

import { borderColor, defaultFontSize, textColor } from 'defaultStyleHelper';

export const StyledCard = styled(Card)`
  background-color: white;
  border-radius: 0.5rem;
  border: 0.1rem solid ${borderColor};
  box-shadow: none;
  color: ${textColor};
  font-size: ${defaultFontSize};
  padding: 2rem;
`;
