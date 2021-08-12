import styled from 'styled-components';

import { ErrorSuccessBanner } from 'components/base_ui';
import { defaultFontSize, textColor } from 'defaultStyleHelper';

export const MessageWrapper = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  color: ${textColor};
  display: flex;
  font-size: 1.6rem;
  height: 50rem;
  justify-content: center;
  margin: 0.5rem 1rem;
  text-align: center;
`;

export const StyledErrorSuccessBanner = styled(ErrorSuccessBanner)`
  font-size: ${defaultFontSize};
  margin: 1rem;
`;
