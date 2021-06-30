import styled from 'styled-components';

import { whiteColor } from 'defaultStyleHelper';

export const FeedbackContainer = styled.div`
  margin-left: 9.7rem;
`;

export const Input = styled.textarea`
  background: ${whiteColor};
  border-radius: 0.7rem;
  border: none;
  font-size 1.6rem;
  font-weight: 400;
  height: ${({ height }) => height};
  line-height 1.936rem;
  margin-top: 0.8rem;
  outline: none;
  overflow: hidden;
  padding: 1.6rem 2.4rem;
  transform: matrix(1, 0, 0, 1, 0, 0);
  width: 61.1rem;
`;

export const InputLabel = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.936rem;
`;

export const InputWrapper = styled.div`
  margin-bottom: 2.4rem;
`;
