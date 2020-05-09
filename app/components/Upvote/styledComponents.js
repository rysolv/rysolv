import styled from 'styled-components';
import { FlatIconButton } from 'components/base_ui';

import { defaultFontSize, textColor } from 'defaultStyleHelper';

export const StyledFlatIconButton = styled(FlatIconButton)`
  padding: 0;
  min-width: 0;
`;

export const UpvoteContainer = styled.div`
  background-color: #e0e0e0;
  color: ${textColor};
  * {
    color: ${({ upvoted }) => (upvoted ? '#ff5722' : textColor)};
  }
  min-height: 10rem;
  width: 3.5rem;
  font-weight: 550;
  font-size: ${defaultFontSize};
  padding: 0.25rem;
  text-align: center;
  border-radius: 0.2rem;
`;
