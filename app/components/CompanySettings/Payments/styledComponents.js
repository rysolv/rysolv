import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import {
  blueColor,
  candidateGreyColor,
  defaultFontFamily,
  grayColor,
  lightBlueColor,
  textColor,
} from 'defaultStyleHelper';

export const CurrentPaymentMethod = styled.div`
  background: ${candidateGreyColor};
  border-radius: 0.7rem;
  color: ${textColor};
  font-size: 1.6rem;
  padding: 1.6rem 2.4rem;
  text-align: ${({ $isCentered }) => ($isCentered ? 'center' : 'left')};
`;

export const HorizontalDivider = styled.div`
  background: ${grayColor};
  height: 0.1rem;
  margin-bottom: 1.6rem;
  width: 100%;
`;

export const PaymentContainer = styled.div`
  margin-top: ${({ $isFirst }) => ($isFirst ? '1.8rem' : '4.2rem')};
`;

export const PaymentLabel = styled.div`
  color: ${blueColor};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.9rem;
`;

export const PaymentLabelWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const StyledButton = styled(Button)`
  color: ${lightBlueColor};
  font-family: ${defaultFontFamily};
  font-size: 1.6rem;
  font-weight: 500;
  margin: 0;
  padding: 0rem;
  text-transform: none;

  &:hover {
    background: transparent;
  }
`;
