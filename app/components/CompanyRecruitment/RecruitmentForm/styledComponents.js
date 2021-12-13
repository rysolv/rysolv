import styled, { css } from 'styled-components';

import { defaultFontSize, errorRed, whiteColor } from 'defaultStyleHelper';

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

export const ButtonWrapper = styled.div`
  margin-top: 4.8rem;
  text-align: center;
  width: 100%;
`;

export const Input = styled.input`
  ${baseInputStyle};
`;

export const InputError = styled.div`
  color: ${errorRed};
  font-size: ${defaultFontSize};
  height: 2.4rem;
  padding: 0.5rem 0;
`;

export const InputLabel = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.936rem;
`;

export const InputWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const RecruitmentFormContainer = styled.div`
  max-width: 58rem;
  width: 100%;
`;
