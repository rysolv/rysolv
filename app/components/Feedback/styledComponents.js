import styled, { css } from 'styled-components';

import { whiteColor } from 'defaultStyleHelper';

const baseInputStyle = css`
  background: ${whiteColor};
  border-radius: 0.7rem;
  border: none;
  font-size: 1.6rem;
  font-weight: 400;
  height: ${({ height }) => height};
  line-height: 1.936rem;
  margin-top: 0.8rem;
  outline: none;
  overflow: hidden;
  padding: 1.6rem 2.4rem;
  transform: matrix(1, 0, 0, 1, 0, 0);
  width: 100%;
`;

export const FeedbackContainer = styled.div`
  margin-left: 9.7rem;
  width: 59%;

  @media (max-width: 1100px) {
    width: 100%;
  }

  @media (max-width: 1000px) {
    margin-left: 0;
    margin-top: 3.261rem;
  }
`;

export const Input = styled.input`
  ${baseInputStyle};
`;

export const InputLabel = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.936rem;
`;

export const InputWrapper = styled.div`
  margin-bottom: 2.4rem;
`;

export const Textarea = styled.textarea`
  ${baseInputStyle};
`;
