import styled from 'styled-components';

import { defaultFontSize, fundingText } from 'defaultStyleHelper';

import { FundingWrapper } from '../../StyledWrappers';

export const AddFundsButton = styled.button`
  background-color: #e5fbf2;
  border: 0;
  color: ${fundingText};
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  stroke-width: 0.2rem;
  stroke: currentColor;

  &:active {
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
    outline: none;
  }

  &:hover {
    box-shadow: 0px 2px 5px 0.5px rgba(0, 0, 0, 0.1);
    cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  }

  svg {
    font-size: 1.4rem;
  }
`;

export const FundAmount = styled.div`
  background-color: #e5fbf2;
  line-height: 2rem;
  padding: 0.3rem 1rem;
  position: relative;

  &:after {
    border-right: 0.1rem solid #08b26e;
    bottom: 0;
    content: '';
    top: 0;
    margin: auto 0;
    position: absolute;
    right: 0;
    text-align: center;
    height: 80%;
  }
`;

export const FundIssueButtonContainer = styled.div`
  border-radius: 0.25rem;
  font-size: ${defaultFontSize};
  display: flex;
`;

export const StyledFundingWrapper = styled(FundingWrapper)`
  padding: 0;
`;
