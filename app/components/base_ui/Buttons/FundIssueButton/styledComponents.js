import styled from 'styled-components';

import { defaultFontSize, fundingText } from 'defaultStyleHelper';

import { FundingWrapper } from '../../StyledWrappers';

export const AddFundsButton = styled.button`
  align-items: center;
  background-color: #e5fbf2;
  border: 0;
  color: ${fundingText};
  cursor: pointer;
  display: ${({ open }) => (!open ? 'none' : 'inherit')};
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
    font-size: ${defaultFontSize};
  }
`;

export const FundAmount = styled.div`
  background: ${({ open }) => (!open ? '#edeef0' : '#e5fbf2')};
  border-radius: ${({ open }) => (!open ? '0.25rem' : '0')};
  line-height: 2rem;
  padding: ${({ open }) => (!open ? '0.2rem 1rem' : '0.3rem 1rem')};
  position: relative;

  &:after {
    border-right: ${({ open }) => (!open ? 'none' : '0.1rem solid #08b26e')};
    bottom: 0;
    content: '';
    height: 80%;
    margin: auto 0;
    position: absolute;
    right: 0;
    text-align: center;
    top: 0;
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
