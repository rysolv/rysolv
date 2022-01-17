import styled from 'styled-components';

import { LoadingIndicator } from 'components/base_ui';
import { blueColor } from 'defaultStyleHelper';

export const CandidateLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10rem 0;
  text-align: center;
`;

export const StyledLoadingIndicator = styled(LoadingIndicator)`
  height: 10rem;
`;

export const Subtext = styled.div`
  color: ${blueColor};
  font-size: 2rem;
  font-weight: 400;
  line-height: 3.45rem;
`;
