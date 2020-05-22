import styled from 'styled-components';

import { FlatIconButton } from 'components/base_ui/Buttons';
import { defaultFontSize } from 'defaultStyleHelper';

export const BannerWrapper = styled.div`
  align-items: center;
  background-color: ${({ color }) => color || 'transparent'};
  border-radius: 0.4rem;
  color: white;
  display: ${({ displayState }) => (displayState ? 'flex' : 'none')};
  font-size: ${defaultFontSize};
  height: ${({ displayState }) => (displayState ? 'auto' : '0')};
  margin-bottom: ${({ marginRequired }) => marginRequired || '0'};
  margin-top: ${({ topMarginRequired }) => topMarginRequired || '0'};
  overflow: hidden;
  padding: ${({ displayState }) => (displayState ? '0.5rem' : '0')};
  transition: all 0.25s;
`;

export const CloseButton = styled(FlatIconButton)`
  background-color: transparent;
  color: white;
  margin-left: auto;
  min-width: 3rem;
  padding: 0.6rem 1.6rem;
`;

export const IconWrapper = styled.div`
  margin-left: 2rem;
`;

export const MessageWrapper = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const SingleText = styled.div`
  font-size: ${defaultFontSize};
  margin: 0rem 1rem;
`;

export const StyledListItem = styled.li`
  list-style: none;
`;
