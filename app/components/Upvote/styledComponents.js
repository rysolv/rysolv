import styled from 'styled-components';
import { FlatIconButton } from 'components/base_ui';

import { defaultFontSize, selectedColor, textColor } from 'defaultStyleHelper';

export const StyledFlatIconButton = styled(FlatIconButton)`
  padding: 0;
  min-width: 0;
`;

export const UpvoteContainer = styled.div`
  background-color: #e0e0e0;
  border-top-left-radius: 0.2rem;
  border-bottom-left-radius: ${({ isIssueDetail }) =>
    isIssueDetail ? '0' : '0.2rem'};
  color: ${textColor};
  * {
    color: ${({ upvoted }) => (upvoted ? selectedColor : textColor)};
  }
  font-size: ${defaultFontSize};
  font-weight: 550;
  min-height: 10rem;
  padding: 0.25rem;
  text-align: center;
  width: 3.5rem;
`;
