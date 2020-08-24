import styled from 'styled-components';

import { FlatIconButton, Upvote } from 'components/base_ui';

import { defaultFontSize, textColor } from 'defaultStyleHelper';

export const Rep = styled.div`
  margin-top: 0.5rem;
`;

export const StyledFlatIconButton = styled(FlatIconButton)`
  padding: 0;
  min-width: 0;
`;

export const StyledUpvote = styled(Upvote)`
  filter: ${({ upvoted }) => (upvoted ? `grayscale(0)` : `grayscale(1)`)};
`;

export const UpvoteContainer = styled.div`
  background-color: #e0e0e0;
  border-top-left-radius: 0.2rem;
  border-bottom-left-radius: ${({ isIssueDetail }) =>
    isIssueDetail ? '0' : '0.2rem'};
  color: ${textColor};
  font-size: ${defaultFontSize};
  font-weight: 550;
  min-height: 10rem;
  padding: 0.25rem;
  text-align: center;
  width: 3.5rem;
`;
