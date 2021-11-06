/* eslint-disable indent */
import styled from 'styled-components';

import { darkBlueColor, errorRed, successGreen } from 'defaultStyleHelper';

import { InputSubText } from '../styledComponents';

export const ButtonGroup = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
`;

export const IconWrapper = styled.span`
  svg {
    color: ${({ isError, isSuccess }) =>
      // eslint-disable-next-line no-nested-ternary
      isError ? errorRed : isSuccess ? successGreen : darkBlueColor};
    height: 2.4rem;
    margin: 0 0.8rem 0.6rem 0;
    width: 2.4rem;
  }
`;

export const MessageWrapper = styled.div`
  text-align: left;
`;

export const ResetSubText = styled(InputSubText)`
  display: flex;
  margin: 0 auto;
`;

export const TextInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;
