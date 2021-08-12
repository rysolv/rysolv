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
  height: ${({ height }) => `${height}px` || '50rem'};
  justify-content: center;
  margin: 0.5rem 1rem;
  text-align: center;
`;

export const StyledErrorSuccessBanner = styled(ErrorSuccessBanner)`
  font-size: ${defaultFontSize};
  margin: 1rem;
`;

export const TagWrapper = styled.div`
  background: ${({ tagColor }) => tagColor};
  border-radius: 0.25rem;
  color: white;
  display: flex;
  height: fit-content;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  place-content: center;
  width: fit-content;
`;
