import styled, { css } from 'styled-components';

import { StripeInput } from 'components/base_ui';
import {
  candidateGreyColor,
  defaultFontSize,
  errorRed,
  textColor,
} from 'defaultStyleHelper';

const baseInputStyle = css`
  background: ${candidateGreyColor};
  border-radius: 0.7rem;
  border: none;
  color: ${textColor};
  font-size: 1.6rem;
  font-weight: 400;
  height: ${({ height, multiple }) => (multiple ? 'auto' : height)};
  line-height: 1.936rem;
  margin-top: 0.8rem;
  min-height: ${({ height, multiple }) => (multiple ? height : 'auto')};
  outline: none;
  overflow: hidden;
  padding: 1.6rem 2.4rem;
  transform: matrix(1, 0, 0, 1, 0, 0);
  width: 100%;
`;

const baseOptionTextStyle = css`
  font-weight: 400;
  line-height: 1.936rem;
`;

export const HorizontalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Input = styled.input`
  ${baseInputStyle};
`;

export const OptionError = styled.div`
  color: ${errorRed};
  font-size: ${defaultFontSize};
  height: 2.4rem;
  padding: 0.5rem 0;
`;

export const OptionLabel = styled.div`
  ${baseOptionTextStyle};
  align-self: start;
  color: ${textColor};
  font-size: 1.6rem;
`;

export const OptionWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem 0;
  width: ${({ width }) => width || '100%'};
`;

export const StyledStripeInput = styled(StripeInput)`
  ${baseInputStyle};
`;
